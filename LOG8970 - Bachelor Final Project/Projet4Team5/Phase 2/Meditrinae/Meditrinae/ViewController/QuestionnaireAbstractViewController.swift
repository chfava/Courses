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

class QuestionnaireAbstractViewController: UIViewController, UITextFieldDelegate {

    
    var questionnaire : Questionnaire!
    var position : CGPoint = CGPoint(x: 30, y: 50)
    var nextQuestionnaireSegue = ""
    var homeSegue = ""
    
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var heightValue: NSLayoutConstraint!
    
    var listUITextFields = [UITextField:(Question,AnswerInput)]()
    var listUISegmentedControl = [UISegmentedControl:Question]()
    var listDropDown = [DropDown:Question]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //self.addBackButton()
        self.addNextButton()
    }
    
    func addQuestionnaireToView(questionnaire: Questionnaire){
        addLabelToView(text : questionnaire.name, textSize: CGFloat(45))
        if questionnaire.description != nil{
            addLabelToView(text : questionnaire.description!)
            self.position = CGPoint(x: self.position.x ,y: self.position.y + 50)
        }
        for question in questionnaire.questions{
            processQuestion(question: question)
        }
        
    }
    
    func processQuestion(question: Any){
        if var questionCasted = question as? Question {
            if(questionCasted.isShown){
                if ((questionCasted.answer as? AnswerMultipleChoices) != nil) || ((questionCasted.answer as? AnswerInput) != nil) {
                        addQuestionToView(question: &questionCasted)
                }
                else if ((questionCasted.answer as? [AnswerInput]) != nil) {
                    addQuestionToView(question: &questionCasted)
                }
                else if let newQuestion = questionCasted.answer as? Question{
                    addLabelToView(text: questionCasted.text)
                    let tempPositionX = self.position.x
                    self.position = CGPoint(x: self.position.x + 100 ,y: self.position.y)
                    processQuestion(question: newQuestion)
                    self.position = CGPoint(x: tempPositionX ,y: self.position.y)
                }
                else if let isQuestion = questionCasted.answer as? [Question]{
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
                }
            }
        }
    }
    
    func addLabelToView(text: String, textSize: CGFloat = 25){
        //Add question to view
        let label = UILabel(frame: .zero)
        label.preferredMaxLayoutWidth = self.view.frame.width - self.position.x - 80
        label.textAlignment = .justified
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
                print("String")
                addTextFieldToView(question: &question)
            }
            else if(answer.type as? Int.Type != nil){
                addTextFieldToView(question: &question)
                
            }
            else if(answer.type as? Date.Type != nil){
                addDatePickerToView()
            }
        }
        else if let answer = question.answer as? AnswerRangeInt{
            addSegmentedControlToView(question: question)
        }
        else if let answer = question.answer as? [AnswerInput]{
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
                    textField.text = answer.value as! String
                }
                
                textField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
                self.contentView.addSubview(textField)
                self.position = CGPoint(x: self.position.x, y: self.position.y + 45)
                self.listUITextFields[textField] = (question,answer)
                if(question.ID == "QS6"){
                    print("ID de question initial: ")
                    print(ObjectIdentifier(question))
                }
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
            
            if(answer?.value != nil){
                textField.text = answer?.value as! String
            }
            textField.delegate=self
            //textField.keyboardType = UIKeyboardType.numbersAndPunctuation
            textField.addTarget(self, action: #selector(textFieldDidChange(textField:)), for: .editingChanged)
            self.contentView.addSubview(textField)
            self.position = CGPoint(x: self.position.x, y: self.position.y + 45)
            self.listUITextFields[textField] = (question,answer) as! (Question, AnswerInput)
            if(question.ID == "QS6"){
                print("ID de question initial: ")
                print(ObjectIdentifier(question))
            }
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
        if var answer = question.answer as? AnswerRangeInt{
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
            var answer = self.listDropDown[dropDown]?.answer as? AnswerMultipleChoices
            answer?.value = selectedText
            self.questionnaire.exportedData[self.listDropDown[dropDown]?.ID as! String] = answer!.value as? String
        }
    }
    
    func addDatePickerToView(){
        var datePicker: UIDatePicker = UIDatePicker()
        datePicker.datePickerMode = UIDatePicker.Mode.date
        datePicker.frame = CGRect(x: self.position.x, y: self.position.y, width: self.view.frame.width / 2, height: 150)
        datePicker.timeZone = NSTimeZone.local
        datePicker.backgroundColor = UIColor.white
        datePicker.addTarget(self, action: #selector(self.datePickerValueChanged(_:)), for: .valueChanged)
        self.contentView.addSubview(datePicker)
        self.position = CGPoint(x: self.position.x, y: self.position.y + 150)
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
                       checkQuestion(question: newQuestion)
                   }
                   else if let questionCastedList = questionCasted.answer as? [Question]{
                       for questionIndex in questionCastedList{
                           checkQuestion(question: questionIndex)
                       }
                   }
               }
           }
           return true
       }
    
    @objc func sliderValueDidChange(_ sender:UISlider!)
    {
        print("Slider value changed")
        let step:Float=1
        // Use this code below only if you want UISlider to snap to values step by step
        let roundedStepValue = round(sender.value / step) * step
        sender.value = roundedStepValue
        
        print("Slider step value \(Int(roundedStepValue))")
    }
    func addBackButton() {
        let frame = CGRect(x: position.x, y: position.y, width: CGFloat(100), height: CGFloat(100))
        let backButton = UIButton(frame: frame)
        backButton.setTitle("Home", for: .normal)
        backButton.backgroundColor = .blue
        backButton.addTarget(self, action: #selector(backbuttonAction), for: .touchUpInside)
        self.view.addSubview(backButton)
    }
    func addNextButton() {
        let frame = CGRect(x: self.view.frame.width - CGFloat(100) , y: (position.y + self.view.frame.height - CGFloat(200)), width: CGFloat(100), height: CGFloat(100))
        let nextButton = UIButton(frame: frame)
        let image = UIImage(named: "next")
        nextButton.setImage(image, for: .normal)
        nextButton.addTarget(self, action: #selector(nextbuttonAction), for: .touchUpInside)
        self.view.addSubview(nextButton)
       }
    
    @objc func switchStateDidChange(_ sender:UISwitch){
        if (sender.isOn == true){
            print("UISwitch state is now ON")
        }
        else{
            print("UISwitch state is now Off")
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
        //var answer = sender.property.answer as? AnswerMultipleChoices
        let answer = listUISegmentedControl[sender]?.answer as? AnswerMultipleChoices
        if((answer) != nil){
            answer!.value = sender.titleForSegment(at: sender.selectedSegmentIndex)
            self.questionnaire.exportedData[listUISegmentedControl[sender]!.ID as! String] = answer!.value as? String
        }
        else {
            var answer2 = listUISegmentedControl[sender]?.answer as? AnswerRangeInt
            answer2?.value = sender.titleForSegment(at: sender.selectedSegmentIndex)
            self.questionnaire.exportedData[listUISegmentedControl[sender]!.ID as! String] = answer2!.value as! String
        }
        
        if !listUISegmentedControl[sender]!.skip!.isEmpty {
            if listUISegmentedControl[sender]!.skipValue == sender.titleForSegment(at: sender.selectedSegmentIndex){
                for questionToSkip in listUISegmentedControl[sender]!.skip!{
                    questionToSkip.isShown = false
                }
                print("reload needed")
                previousViewController = self.contentView
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                let controller = storyboard.instantiateViewController(withIdentifier: "SymptomeQuestionnaire")
                controller.modalPresentationStyle = .fullScreen
                self.present(controller, animated: false, completion: nil)
                previousViewController!.removeFromSuperview()
            }
            else{
                for questionToSkip in listUISegmentedControl[sender]!.skip!{
                    questionToSkip.isShown = true
                }
                previousViewController = self.contentView
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                let controller = storyboard.instantiateViewController(withIdentifier: "SymptomeQuestionnaire")
                controller.modalPresentationStyle = .fullScreen
                self.present(controller, animated: false, completion: nil)
                previousViewController!.removeFromSuperview()
            }
        }
    }
    
    @objc func textFieldDidChange(textField: UITextField){
        print(listUITextFields[textField] != nil)
        let combo = listUITextFields[textField]
        let question = combo?.0
        let answer = combo?.1
        if((answer) != nil){
            print(textField.text!)
            if(question != nil && question!.ID == "QS2" ){
                let components = (textField.text as! String).split(separator: "/")
                if(components.count == 2){
                    print(components)
                    answer!.value = String(describing : (components[0] as NSString).floatValue + ((components[1] as NSString).floatValue / 12))
                    self.questionnaire.exportedData[listUITextFields[textField]!.0.ID as! String] = answer!.value as? String
                }
                else{
                    answer!.value = textField.text!
                    self.questionnaire.exportedData[listUITextFields[textField]!.0.ID as! String] = answer!.value as? String
                    
                }
            }
            else{
                answer!.value = textField.text!
                self.questionnaire.exportedData[listUITextFields[textField]!.0.ID as! String] = answer!.value as? String
            }
            self.questionnaire.exportedData[question!.ID as! String] = answer!.value as? String
            print(answer!.value!)
            
        }
        
    }
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool
    {
        if ((listUITextFields[textField]?.1.type as? Int.Type)) != nil{
            var allowedCharacters = CharacterSet.decimalDigits
            allowedCharacters.insert(charactersIn: "/")
          let characterSet = CharacterSet(charactersIn: string)
          return allowedCharacters.isSuperset(of: characterSet)
        }
        return true
    }
    
    
    @objc func datePickerValueChanged(_ sender: UIDatePicker){
        let formatter: DateFormatter = DateFormatter()
        formatter.dateFormat = "MM/dd/yyyy hh:mm a"
        let selectedDate: String = formatter.string(from: sender.date)
        print("\(selectedDate)")
    }

    @objc func backbuttonAction(sender: UIButton!) {
        performSegue(withIdentifier: self.homeSegue, sender: self)
    }
    
    @objc func nextbuttonAction(sender: UIButton!) {
        if (checkAllInput) {
            if(checkNext()){
                nextSegue()
            }
            else {
                Alert.showBasic(title: "Answer missing", message: "Please fill out all the questions", vc: self)
            }
        }
        else{
            nextSegue()
        }
        
    }
    
    func nextSegue() {
        ServerService.shared.postResults(questionnaire: self.questionnaire){(error) in
            if let error = error {
                fatalError(error.localizedDescription)
            }
        }
        performSegue(withIdentifier: self.nextQuestionnaireSegue, sender: self)
    }
}


extension UISegmentedControl {
    
    struct Holder {
        static var question = [String:Question]()
    }
    
    var property:Question {
        get {
            return Holder.question[self.debugDescription]!
        }
        set(newValue) {
            Holder.question[self.debugDescription] = newValue
        }
    }
    
}

