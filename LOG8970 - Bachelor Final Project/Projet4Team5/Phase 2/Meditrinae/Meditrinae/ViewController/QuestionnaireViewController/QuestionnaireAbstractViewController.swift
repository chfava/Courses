//
//  QuestionnaireAbstractViewController.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-09-24.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import iOSDropDown
import Foundation
import SwiftMessages

class QuestionnaireAbstractViewController: UIViewController, UITextFieldDelegate {
    
    var questionnaire : Questionnaire!
    var position : CGPoint = CGPoint(x: 30, y: 50)
    var progressView: UIProgressView!
    var upLoadBUtton: UIButton!
    var nextButton: UIButton!
    var rootViewController: PatientHomeViewController!
    var blackUIView: UIView!
    var newNoteUIView: NoteUIView!
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var heightValue: NSLayoutConstraint!
    
    var SCROLL_VIEW_HEIGHT: CGFloat = 3000
    
    var leaveDataEntryUIView: LeaveDataEntryUIView!
    
    var listUITextFields = [UITextField:(Question,AnswerInput)]()
    var listUISegmentedControl = [UISegmentedControl:Question]()
    var listDropDown = [DropDown:Question]()
    
    var ID: String!
    var height: CGFloat!
    var width: CGFloat!
    var canSubmit: Bool! = false
    var patientMode: Bool! = true
    var medicalExam: MedicalExam!
    
    var messageView: MessageView!
    
    var nextQuestionnaireID: String!

    override func viewDidLoad() {
        super.viewDidLoad()
        if (!(self.navigationController?.navigationBar.isHidden ?? true)) {
            if self.view.frame.origin.y == 0 {
                self.view.frame.origin.y = self.navigationController?.navigationBar.frame.height ?? 0  + OUTTER_PADDING
            }
        }
        let blackFrame = CGRect(x: 0, y: 0, width: self.view.frame.width, height: SCROLL_VIEW_HEIGHT)
        blackUIView = UIView(frame: blackFrame)
        blackUIView.backgroundColor = UIColor.black.withAlphaComponent(0.8)
        self.hideKeyboardWhenTappedAround()
        height = self.view.frame.height - 2 * OUTTER_PADDING
        width = self.view.frame.width - 2 * OUTTER_PADDING
        if (self.navigationController != nil) {
            setUpNavigationBar()
        }
        if let canSubmit = canSubmit {
            if (canSubmit) {
                self.addUploadButton()
                self.addBackButton()
            }
        }
        if (patientMode) {
            self.addNextButton()
        }
    }
    
   func setUpNavigationBar() {
        let medicalExamDateLabel = UILabel()
        medicalExamDateLabel.setUp(text: self.questionnaire?.date?.print() ?? Date().print(), origin: CGPoint(x: 0, y: 0)) 
        navigationItem.titleView = medicalExamDateLabel
        
        if let noteImage = UIImage(named: "note") {
            let noteButton = UIButton()
            noteButton.setUp(position: CGPoint(x: 0, y: 0), image: noteImage, width: 30, height: 30)
            noteButton.addTarget(self, action: #selector(noteButtonTapped), for: .touchUpInside)
            navigationItem.rightBarButtonItem = UIBarButtonItem(customView: noteButton)
        }
        navigationController?.navigationBar.backgroundColor = WHITE
        navigationController?.navigationBar.isTranslucent = false
    }

    @objc func noteButtonTapped(sender: UIButton) {
        self.scrollView.addSubview(self.blackUIView)
        let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
        self.newNoteUIView = NoteUIView(frame: frame)
        self.newNoteUIView.newNoteDelegate = self
        UIView.animate(withDuration: 0.5, animations: {
            self.navigationController?.navigationBar.isHidden = true
            self.scrollView.addSubview(self.newNoteUIView)
            self.scrollView.scrollToTop(animated: true)
        })
    
    }
    func addQuestionnaireToView(questionnaire: Questionnaire){
        addLabelToView(text : questionnaire.name, textSize: CGFloat(45))
        if questionnaire.description != nil{
            self.position.y += PADDING
            addLabelToView(text : questionnaire.description!)
            self.position = CGPoint(x: self.position.x ,y: self.position.y + 50)
        }
        self.position.y += (3*PADDING)
        for question in questionnaire.questions{
            processQuestion(question: question)
            self.position.y += PADDING
        }
        
    }
    
    func setUpProgressBar() {
        let y: CGFloat = self.view.frame.height * 1/2
        let x: CGFloat = self.view.frame.width - 4 * OUTTER_PADDING
        progressView = UIProgressView(progressViewStyle: .bar)
        progressView.frame.origin = CGPoint(x: x - OUTTER_PADDING, y: y)
        progressView.trackTintColor = UIColor.lightGray
        progressView.tintColor = UIColor.blue
        progressView.transform = progressView.transform.scaledBy(x: 20, y: 20)
        progressView.transform = CGAffineTransform(rotationAngle: (CGFloat(-90) / CGFloat(180.0) * CGFloat(Double.pi)))

        progressView.isUserInteractionEnabled = false
        view.addSubview(progressView)
        setProgress()
    }
    
    func setProgress()  {
        if (self.questionnaire != nil) {
            let progressNumber = self.questionnaire.calculateProgress()
            progressView.setProgress( progressNumber, animated: true)
            if (progressNumber == 1) {
                progressView.tintColor = GREEN
            }
            else {
                 progressView.tintColor = UIColor.blue
            }
        }
    }
    
    func processQuestion(question: Any){
        if var questionCasted = question as? Question {
            if(questionCasted.isShown){
                if ((questionCasted.answer as? AnswerMultipleChoices) != nil) || ((questionCasted.answer as? AnswerInput) != nil) {
                    addQuestionToView(question: &questionCasted)
                    self.questionnaire.nbQuestion += 1
                }
                else if ((questionCasted.answer as? [AnswerInput]) != nil) {
                    addQuestionToView(question: &questionCasted)
                    self.questionnaire.nbQuestion += 1
                }
                else if let newQuestion = questionCasted.answer as? Question{
                    addLabelToView(text: questionCasted.text)
                    let tempPositionX = self.position.x
                    self.position = CGPoint(x: self.position.x + 100 ,y: self.position.y)
                    processQuestion(question: newQuestion)
                    self.position = CGPoint(x: tempPositionX ,y: self.position.y)
                }
                else if questionCasted.answer is [Question]{
                    addLabelToView(text: questionCasted.text)
                    let tempPositionX = self.position.x
                    self.position = CGPoint(x: self.position.x + 100 ,y: self.position.y)
                    let questionCastedList = (questionCasted.answer as? [Question])!
                    for questionIndex in questionCastedList{
                        processQuestion(question: questionIndex)
                    }
                    self.position = CGPoint(x: tempPositionX ,y: self.position.y)
                }
                else {
                    addQuestionToView(question: &questionCasted)
                    self.questionnaire.nbQuestion += 1
                }
            }
        }
    }
    
    func addLabelToView(text: String, textSize: CGFloat = 25){
        let label = UILabel(frame: .zero)
        label.preferredMaxLayoutWidth = self.view.frame.width - self.position.x - 80
        label.textAlignment = .natural
        label.text = text
        label.font = UIFont.preferredFont(forTextStyle: .footnote)
        label.font = label.font.withSize(textSize)
        label.textColor = .black
        label.lineBreakMode = .byWordWrapping
        label.numberOfLines = 0
        let height = label.intrinsicContentSize.height
        label.frame = CGRect(x: 0, y: 0, width: self.view.frame.width - self.position.x - 80, height: height)
        label.frame.origin = self.position
        self.contentView.addSubview(label)
        self.position = CGPoint(x: self.position.x, y: (self.position.y + height))
        
    }
    
    func addQuestionToView(question: inout Question){
        addLabelToView(text: question.text)
        if let listOfAnswers = question.answer as? AnswerMultipleChoices{
            let numerOfAnswers = listOfAnswers.answerCount
            if(numerOfAnswers > 4) {
                addDropDownToView(question: question)
            }
            else{
                addSegmentedControlToView(question: question)
            }
        }
        
        else if let answer = question.answer as? AnswerInput{
            if(answer.type as? String.Type != nil){
                addTextFieldToView(question: &question)
            }
            else if(answer.type as? Int.Type != nil){
                addTextFieldToView(question: &question)
            }
        }
        else if question.answer is AnswerRangeInt {
            addSegmentedControlToView(question: question)
        }
        else if question.answer is [AnswerInput] {
            addTextFieldToView(question: &question)
        }
    }
    
    func addTextFieldToView( question: inout Question){
        if let answers = question.answer as? [AnswerInput]{
            for answer in answers{
                let textField =  UITextField(frame: CGRect(x: self.position.x, y: self.position.y , width: 200, height: 40))
                textField.placeholder = ""
                textField.font = UIFont.systemFont(ofSize: 15)
                textField.borderStyle = UITextField.BorderStyle.roundedRect
                textField.autocorrectionType = UITextAutocorrectionType.no
                textField.keyboardType = UIKeyboardType.default
                textField.returnKeyType = UIReturnKeyType.done
                textField.clearButtonMode = UITextField.ViewMode.whileEditing
                textField.contentVerticalAlignment = UIControl.ContentVerticalAlignment.center
                
                if(answer.value != nil){
                    textField.text = answer.value as? String
                }
                textField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
                self.contentView.addSubview(textField)
                self.position = CGPoint(x: self.position.x, y: self.position.y + 45)
                self.listUITextFields[textField] = (question,answer)
            }
        }
        else{
            let textField =  UITextField(frame: CGRect(x: self.position.x, y: self.position.y , width: 200, height: 40))
            textField.font = UIFont.systemFont(ofSize: 15)
            textField.borderStyle = UITextField.BorderStyle.roundedRect
            textField.autocorrectionType = UITextAutocorrectionType.no
            textField.keyboardType = UIKeyboardType.default
            textField.returnKeyType = UIReturnKeyType.done
            textField.clearButtonMode = UITextField.ViewMode.whileEditing
            textField.contentVerticalAlignment = UIControl.ContentVerticalAlignment.center
            
            let answer = question.answer as? AnswerInput
            if answer?.placeHolder != nil{
                 textField.placeholder = answer?.placeHolder
            }
            else{
                textField.placeholder = ""
            }
            if let answer = answer {
                if(answer.value != nil){
                    textField.text = answer.value as? String
                }
            }
            textField.delegate=self
            textField.keyboardType = UIKeyboardType.numbersAndPunctuation
            textField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
            self.contentView.addSubview(textField)
            self.position = CGPoint(x: self.position.x, y: self.position.y + 45)
            self.listUITextFields[textField] = (question,answer) as? (Question, AnswerInput)
        }
    }
    
    func addSegmentedControlToView(question : Question){
        if let answer = question.answer as? AnswerMultipleChoices{
            let segmentedControl = UISegmentedControl(items : answer.possibleValues as? [Any])
            segmentedControl.center = CGPoint(x: self.view.center.x ,y: self.position.y + 50)
            segmentedControl.addTarget(self, action: #selector(self.indexChanged(_:)), for: .valueChanged)
            segmentedControl.layer.cornerRadius = 5.0
            segmentedControl.backgroundColor = .white
            segmentedControl.tintColor = .blue
            
            if(answer.value != nil){
                for i in 0 ... answer.answerCount - 1{
                    if segmentedControl.titleForSegment(at: i) == answer.value as? String{
                        segmentedControl.selectedSegmentIndex = i
                    }
                }
            }
            self.contentView.addSubview(segmentedControl)
            self.position = CGPoint(x: self.position.x, y: self.position.y + 80)
            self.listUISegmentedControl[segmentedControl] = question
            
        }
        if let answer = question.answer as? AnswerRangeInt {
            var possibleValues = [String]()
            for i in answer.min ... answer.max{
                possibleValues.append(String(i))
            }
            let segmentedControl = UISegmentedControl(items : possibleValues)
            segmentedControl.center = CGPoint(x: self.view.center.x ,y: self.position.y + 50)
            segmentedControl.addTarget(self, action: #selector(self.indexChanged(_:)), for: .valueChanged)
            
            segmentedControl.layer.cornerRadius = 5.0
            segmentedControl.backgroundColor = .white
            segmentedControl.tintColor = .blue
            
            if(answer.value != nil){
                for i in 0 ... answer.max - answer.min - 1{
                    if segmentedControl.titleForSegment(at: i) == answer.value as? String{
                        segmentedControl.selectedSegmentIndex = i
                    }
                }
            }
            
            self.contentView.addSubview(segmentedControl)
            self.position = CGPoint(x: self.position.x, y: self.position.y + 80)
            answer.segmentedControl = segmentedControl
            self.listUISegmentedControl[segmentedControl] = question
        }
    }
    
    
    func addDropDownToView(question:Question){
        let  dropDown = DropDown(frame: CGRect(x: self.position.x, y: self.position.y, width: 500, height: 50)) // set frame
        let answer = question.answer as? AnswerMultipleChoices
        dropDown.optionArray = answer?.possibleValues as! [String]
        self.contentView.addSubview(dropDown)
        self.position = CGPoint(x: self.position.x, y: self.position.y + 60)
        listDropDown[dropDown] = question
        dropDown.didSelect{(selectedText , index ,id) in
        if let answer = self.listDropDown[dropDown]?.answer as? AnswerMultipleChoices {
            answer.value = selectedText
            self.questionnaire.exportedData[self.listDropDown[dropDown]?.ID! ?? ""] = answer.value as? String
            }
        }
    }
    
    func checkQuestion(question: Any) -> Bool{
           if let questionCasted = question as? Question {
               if(questionCasted.isShown){
                   if let answerMultiple = questionCasted.answer as? AnswerMultipleChoices {
                        if (answerMultiple.value == nil){
                            return false
                        }
                   }
                   else if let answerInput = questionCasted.answer as? AnswerInput {
                    if (answerInput.value == nil){
                           return false
                       }
                   }
                   else if let answerRange = questionCasted.answer as? AnswerRangeInt {
                       if (answerRange.value == nil){
                           return false
                       }
                       
                   }
                   else if let newQuestion = questionCasted.answer as? Question{
                       return checkQuestion(question: newQuestion)
                   }
                   else if let questionCastedList = questionCasted.answer as? [Question]{
                       for questionIndex in questionCastedList{
                            let returnValue = checkQuestion(question: questionIndex)
                            if returnValue == false{
                                return false
                            }
                       }
                   }
               }
           }
           return true
       }
    
    func addUploadButton() {
        if let uploadImage = UIImage(named: "upload") {
            upLoadBUtton = UIButton()
            let point = CGPoint(x: width - OUTTER_PADDING - BUTTON_HEIGHT , y: height - 2 * OUTTER_PADDING - BUTTON_HEIGHT)
            upLoadBUtton.setUp(position: point, image: uploadImage, width: BUTTON_HEIGHT, height: BUTTON_HEIGHT)
            upLoadBUtton.addTarget(self, action: #selector(postButtonTapped), for: .touchUpInside)
            self.view.addSubview(upLoadBUtton)
            self.view.bringSubviewToFront(upLoadBUtton)
        }
    }
    
    func addNextButton() {
        if let nextImage = UIImage(named: "next") {
            nextButton = UIButton()
            let point = CGPoint(x: width - OUTTER_PADDING - BUTTON_HEIGHT , y: height - 2 * OUTTER_PADDING - BUTTON_HEIGHT)
            nextButton.setUp(position: point, image: nextImage, width: BUTTON_HEIGHT, height: BUTTON_HEIGHT)
            nextButton.addTarget(self, action: #selector(nextButtonTapped), for: .touchUpInside)
            self.view.addSubview(nextButton)
            self.view.bringSubviewToFront(nextButton)
        }
    }
    
    func addBackButton() {
        let backButton = UIButton(type: .custom)
        backButton.setImage(UIImage(named: "BackButton"), for: .normal)
        backButton.setTitle("Back", for: .normal)
        backButton.setTitleColor(backButton.tintColor, for: .normal)
        backButton.addTarget(self, action: #selector(self.backAction(_:)), for: .touchUpInside)

        self.navigationItem.leftBarButtonItem = UIBarButtonItem(customView: backButton)
    }
    
    @objc func backAction(_ sender: UIButton) {
        self.scrollView.addSubview(self.blackUIView)
        let height = (self.view.frame.height - 2 * OUTTER_PADDING ) * 1/2
        let width = self.view.frame.width - 2 * OUTTER_PADDING
        let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: width, height: height)
        leaveDataEntryUIView = LeaveDataEntryUIView(frame: frame)
        leaveDataEntryUIView.leaveDataEntryDelegate = self
        self.scrollView.addSubview(leaveDataEntryUIView)
    }
    
    @objc func nextButtonTapped(sender: UIButton!) {
          if (checkAllInput) {
              if(checkNext()){
                ServerService.shared.postResults(token: self.medicalExam.patient?.token ?? "", patientID: self.medicalExam.patientID, practicienID: self.medicalExam.praticienID, questionnaire: self.questionnaire, completion: {(error, succes) in
                      if let succes = succes {
                          if (succes) {
                            self.performSegue()
                          }
                          else {
                              Alert.showBasic(title: "Erreur", message: "Il est impossible de soummettre le document.", vc: self)
                          }
                      }
                  })
              }
              else {
                  Alert.showBasic(title: "Erreur", message: "SVP répondre à toutes les questions", vc: self)
              }
          }
      }
    
    func performSegue() {
        let storyBoard = UIStoryboard(name: "Main", bundle: nil)
        var VC: UIViewController?
        switch self.nextQuestionnaireID {
        case "OBC":
            VC = storyBoard.instantiateViewController(identifier: "OBCViewController")
            if let VC = VC as? OBCViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
        case "DD" :
            VC = storyBoard.instantiateViewController(identifier: "DepistageDouleurViewController")
            if let VC = VC as? DepistageDouleurViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "QS":
            VC = storyBoard.instantiateViewController(identifier: "SymptomesViewController")
            if let VC = VC as? SymptomesViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "GAD7":
            VC = storyBoard.instantiateViewController(identifier: "GAD7ViewController")
            if let VC = VC as? GAD7ViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "PHQ4":
            VC = storyBoard.instantiateViewController(identifier: "PHQ4ViewController")
            if let VC = VC as? PHQ4ViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "PHQ9":
            VC = storyBoard.instantiateViewController(identifier: "PHQ9ViewController")
            if let VC = VC as? PHQ9ViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "MAN8":
            VC = storyBoard.instantiateViewController(identifier: "ELFMan8ViewController")
            if let VC = VC as? ELFMan8ViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "MAN20":
            VC = storyBoard.instantiateViewController(identifier: "ELFMan20ViewController")
            if let VC = VC as? ELFMan20ViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "GCPS":
            VC = storyBoard.instantiateViewController(identifier: "GCPSViewController")
            if let VC = VC as? GCPSViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "MORPHO":
            VC = storyBoard.instantiateViewController(identifier: "MorphologieDouleurViewController")
            if let VC = VC as? MorphologieDouleurViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case"DEMO":
            VC = storyBoard.instantiateViewController(identifier: "DemographicsViewController")
            if let VC = VC as? DemographicsViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case"IS":
            VC = storyBoard.instantiateViewController(identifier: "InsomniaViewController")
            if let VC = VC as? InsomniaViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case"SS":
            VC = storyBoard.instantiateViewController(identifier: "SleepninessScallViewController")
            if let VC = VC as? SleepninessScallViewController {
                VC.canSubmit = false
                VC.patientMode = true
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
                VC.setAnswers(exportedData: questionnaire.exportedData)
            }
            break
        case "FDI":
            VC = storyBoard.instantiateViewController(identifier: "FDI1ViewController")
            if let VC = VC as? FDIAbstract {
                VC.rootViewController = self.rootViewController
                VC.medicalExam = self.medicalExam
                VC.questionnaire = questionnaire
            }
        case .none:
            VC = nil
        case .some(_):
            VC = nil
        }
        if (VC != nil) {
            self.navigationController?.pushViewController(VC!, animated: true)
        }
    }
    
    func checkNext()->Bool {
        for question in questionnaire.questions {
            let anwser = checkQuestion(question: question)
            if (!anwser) {
                return false
            }
        }
        return true
    }
    
    @objc func indexChanged(_ sender: UISegmentedControl) {
        let answer = listUISegmentedControl[sender]?.answer as? AnswerMultipleChoices
        if((answer) != nil){
            answer!.value = sender.titleForSegment(at: sender.selectedSegmentIndex)
            self.questionnaire.exportedData[listUISegmentedControl[sender]!.ID!] = answer!.value as? String
        }
        else {
            let answer2 = listUISegmentedControl[sender]?.answer as? AnswerRangeInt
            answer2?.value = sender.titleForSegment(at: sender.selectedSegmentIndex)
            self.questionnaire.exportedData[listUISegmentedControl[sender]!.ID!] = (answer2!.value as! String)
        }
        
        if !listUISegmentedControl[sender]!.skip!.isEmpty {
            if listUISegmentedControl[sender]!.skipValue == sender.titleForSegment(at: sender.selectedSegmentIndex){
                for questionToSkip in listUISegmentedControl[sender]!.skip!{
                    questionToSkip.isShown = false
                }
                previousViewController = self.contentView
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                let controller = storyboard.instantiateViewController(withIdentifier: "SymptomesViewController")
                controller.modalPresentationStyle = .fullScreen
                if let controller = controller as? SymptomesViewController {
                    controller.medicalExam = medicalExam
                    controller.canSubmit = true
                    controller.rootViewController = self.rootViewController
                    controller.navigationController?.initRootViewController(vc: self.rootViewController)
                    controller.navigationController?.navigationBar.isHidden = false
                }
                self.navigationController?.pushViewController(controller, animated: false)
                previousViewController!.removeFromSuperview()
            }
            else{
                for questionToSkip in listUISegmentedControl[sender]!.skip!{
                    questionToSkip.isShown = true
                }
                previousViewController = self.contentView
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                let controller = storyboard.instantiateViewController(withIdentifier: "SymptomesViewController")
                controller.modalPresentationStyle = .fullScreen
                if let controller = controller as? SymptomesViewController {
                    controller.canSubmit = true
                    controller.medicalExam = medicalExam
                    controller.rootViewController = self.rootViewController
                    controller.navigationController?.initRootViewController(vc: self.rootViewController)
                    controller.navigationController?.navigationBar.isHidden = false
                }
                self.navigationController?.pushViewController(controller, animated: false)
                previousViewController!.removeFromSuperview()
            }
        }
        setProgress()
    }
    
    @objc func textFieldDidChange(textField: UITextField){
        let combo = listUITextFields[textField]
        let question = combo?.0
        let answer = combo?.1
        if((answer) != nil){
            if(question != nil && question!.ID == "QS2" ){
                let components = (textField.text!).split(separator: "/")
                if(components.count == 2){
                    answer!.value = String(describing : (components[0] as NSString).floatValue + ((components[1] as NSString).floatValue / 12))
                    self.questionnaire.exportedData[listUITextFields[textField]!.0.ID ?? ""] = answer!.value as? String
                }
                else{
                    answer!.value = textField.text!
                    self.questionnaire.exportedData[listUITextFields[textField]!.0.ID ?? ""]  = answer!.value as? String
                    
                }
            }
            else{
                answer!.value = textField.text!
                self.questionnaire.exportedData[listUITextFields[textField]!.0.ID ?? ""] = answer!.value as? String
            }
            self.questionnaire.exportedData[question!.ID ?? ""] = answer!.value as? String
        }
        setProgress()
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        if ((listUITextFields[textField]?.1.type as? Int.Type)) != nil{
            var allowedCharacters = CharacterSet.decimalDigits
            allowedCharacters.insert(charactersIn: "/")
          let characterSet = CharacterSet(charactersIn: string)
          return allowedCharacters.isSuperset(of: characterSet)
        }
        return true
    }
    
    @objc func postButtonTapped(sender: UIButton!) {
        if (checkAllInput) {
            if(checkNext()){
                ServerService.shared.postResults(token: medicalExam.patient!.token, patientID: medicalExam.patientID, practicienID: medicalExam.praticienID, questionnaire: self.questionnaire, completion: {(error, succes) in
                    if let succes = succes {
                        if (succes) {
                            if (self.rootViewController != nil) {
                                self.navigationController?.popToViewController(self.rootViewController, animated: true)
                            }
                            else {
                                self.navigationController?.popToRootViewController(animated: true)
                            }
                        }
                        else {
                            Alert.showBasic(title: "Erreur", message: "Il est impossible de soummettre le document.", vc: self)
                        }
                    }
                })
            }
            else {
                Alert.showBasic(title: "Erreur", message: "SVP répondre à toutes les questions", vc: self)
            }
        }
    }
    
    func getAnswer(question: Question)-> String{
          if(question.isShown){
                  if let answerMultiple = question.answer as? AnswerRangeInt {
                      if (answerMultiple.value != nil){
                          guard let answer = answerMultiple.value as? String
                              else {
                                  Alert.showBasic(title: "Erreur", message: "SVP répondre à toutes les questions", vc: self)
                                  return ""
                          }
                          return answer
                      }
                  }
                  else if let newQuestion = question.answer as? Question{
                      _ = checkQuestion(question: newQuestion)
                  }
                  else if let questionCastedList = question.answer as? [Question]{
                      for questionIndex in questionCastedList{
                        _ = checkQuestion(question: questionIndex)
                      }
                  }
              }
          return ""
    }
    
    func setAnswers(exportedData: [String:String]) {
        if let questionnaire = self.questionnaire {
            for question in questionnaire.questions {
                processAnswer(question: question, dict: exportedData)
            }
        }
    }
    
    func processAnswer(question: Any, dict: [String:String]){
        if let questionCasted = question as? Question {
               if(questionCasted.isShown){
                    if let answer = questionCasted.answer as? AnswerMultipleChoices {
                        answer.value = (dict[questionCasted.ID])
                    }
                    else if let answer = questionCasted.answer as? AnswerInput {
                        answer.value = (dict[questionCasted.ID])
                    }
                    else if let answer = questionCasted.answer as? AnswerRangeInt {
                        answer.value = (dict[questionCasted.ID])
                    }
                    else if let newQuestion = questionCasted.answer as? Question{
                       processAnswer(question: newQuestion, dict: dict)
                    }
                    else if questionCasted.answer is [Question]{
                       let questionCastedList = (questionCasted.answer as? [Question])!
                       for questionIndex in questionCastedList{
                            processAnswer(question: questionIndex, dict: dict)
                    }
                }
            }
        }
    }
    
    func calculateScore()-> Int{
        var counter = 0
        for question in self.questionnaire.questions {
            let answer = getAnswer(question: question)
            if (answer != "") {
                counter += Int(answer) ?? 0
            }
        }
        return counter
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(true)
        self.contentView.removeFromSuperview()
        self.view.removeFromSuperview()
        self.scrollView.removeFromSuperview()
    }
}


extension QuestionnaireAbstractViewController: NewNoteDelegate {
     func newNote(note: String) {
        if let user = self.medicalExam.patient {
            let date = Date()
            let note = MedicalNote(note: note, title: date)
               user.notes?.append(note)
               ServerService.shared.updatePatient(token: user.token, patient: user, completion: {(error, patient) in
                if patient != nil {
                       self.dissmissNoteView()
                        self.messageView = MessageView.viewFromNib(layout: .cardView)
                        self.messageView.configureDropShadow()
                        self.messageView.configureTheme(.success, iconStyle: .none)
                        self.messageView.accessibilityPrefix = "Success"
                        self.messageView.configureContent(title: "Ajouté !", body: "La note a été ajouté au dossier du patient.")
                        self.messageView.button = nil
                        self.messageView.button?.removeFromSuperview()
                        var config = SwiftMessages.Config()
                        config.presentationContext = .window(windowLevel: .statusBar)
                        config.duration = .seconds(seconds: 3)
                        config.dimMode = .gray(interactive: true)
                        config.interactiveHide = true
                        SwiftMessages.show(config: config, view: self.messageView)
                   }
               })
           }
       }
       
       func dissmissNoteView() {
           UIView.animate(withDuration: 0.8 , animations: {
               self.newNoteUIView.removeFromSuperview()
               self.newNoteUIView = nil
               self.blackUIView.removeFromSuperview()
               self.navigationController?.navigationBar.isHidden = false
           })
           
       }
       
       func alertEmptyNote() {
           Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas envoyer une note vide.", vc: self)
       }
}

extension QuestionnaireAbstractViewController: LeaveDataEntryDelegate {
    func leaveDataEntry(submit: Bool) {
        leaveDataEntryUIView.removeFromSuperview()
        leaveDataEntryUIView = nil
        self.blackUIView.removeFromSuperview()
        if (submit) {
            self.navigationController?.popViewController(animated: true)
        }
        else {
            self.scrollView.scrollToTop(animated: true)
        }
    }
}




