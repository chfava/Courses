//
//  FD1ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-05.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import SceneKit
import Lottie


class FD1ViewController: FDIAbstract {
    weak var head: Head!
    var selectedArea: Area = Area()
    var isSelectedArea: Bool = false
    var scrollView: UIScrollView!
    
    var nonDSwitch: UISwitch!
    var nonGSwitch: UISwitch!
    
    var temporalDSwitch: UISwitch!
    var temporalGSwitch: UISwitch!
    
    var autreDSwitch: UISwitch!
    var autreGSwitch: UISwitch!
    
    var surPlombInclysufVerSwitch: UISwitch!
    var surPlombInclysufHorSwitch: UISwitch!
    
    var surPlombInclusifVerTextField: UITextField!
    var surPlombInclusifHorTextField: UITextField!
    var devMedTextField: UITextField!
    
    var devMedSegmentedControl: UISegmentedControl!
    var patronOuvertureSeg: UISegmentedControl!
    
    var leaveDataEntryUIView: LeaveDataEntryUIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.setNeedsDisplay()
        buildUI()
        self.setUpNextButton()
        if (canSubmit) {
            self.addBackButton()
        }
        self.nextQuestionnaireSegue = "FDI2ViewController"
    }
    
    deinit {
       NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    @objc func keyboardWillShow(notification: NSNotification) {
        if let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
            if self.view.frame.origin.y == 0 {
                self.view.frame.origin.y -= keyboardSize.height
            }
        }
    }

    @objc func keyboardWillHide(notification: NSNotification) {
        if self.view.frame.origin.y != 0 {
            self.view.frame.origin.y = self.navigationController?.navigationBar.frame.height ?? 0
        }
    }
    
    func setUpScollView() {
          scrollView = UIScrollView()
          view.addSubview(scrollView)
          scrollView.translatesAutoresizingMaskIntoConstraints = false
          scrollView.contentSize.height = 1600
          scrollView.backgroundColor = WHITE
          scrollView.topAnchor.constraint(equalTo: self.view.topAnchor).isActive = true
          scrollView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor).isActive = true
          scrollView.leftAnchor.constraint(equalTo: self.view.leftAnchor).isActive = true
          scrollView.rightAnchor.constraint(equalTo: self.view.rightAnchor).isActive = true
      }
    
    func buildUI() {
        setUpScollView()
        let width: CGFloat = self.view.frame.width - 2 * OUTTER_PADDING
        
        let positionX = OUTTER_PADDING
        var positionY = 2 * OUTTER_PADDING
        
        let FDITitleLabel = UILabel()
        self.scrollView.addSubview(FDITitleLabel)
        FDITitleLabel.setUp(text: "Formulaire Examen Clinique", origin: CGPoint(x: positionX, y: positionY) , font: TITLE_FONT, width: width, textAlignment: .center)
        
        positionY += FDITitleLabel.frame.height + OUTTER_PADDING
        
        let frameQuestion1 = CGRect(x: positionX, y: positionY, width: width, height: 900)
        let question1UIView = UIView(frame: frameQuestion1)
        scrollView.addSubview(question1UIView)
        buildQuestion1(view: question1UIView)
        
        positionY += question1UIView.frame.height + OUTTER_PADDING
        
        let frameQuestion2 = CGRect(x: positionX, y: positionY, width: width, height: 300)
        let question2UIView = UIView(frame: frameQuestion2)
        scrollView.addSubview(question2UIView)
        buildQuestion2(view: question2UIView)
        
         positionY += question2UIView.frame.height + OUTTER_PADDING
        
        let frameQuestion3 = CGRect(x: positionX, y: positionY, width: width, height: 200)
        let question3UIView = UIView(frame: frameQuestion3)
        scrollView.addSubview(question3UIView)
        buildQuestion3(view: question3UIView)
        
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: UIResponder.keyboardWillHideNotification, object: nil)
        
        self.setUpHeads()
        self.view.setNeedsDisplay()
        
    }
    
    func buildQuestion1(view: UIView) {
        view.layer.cornerRadius = CORNER_RADIUS
        view.layer.borderColor = LIGHT_GRAY.cgColor
        view.layer.borderWidth = SMALL_BORDER
        
        let positionX = OUTTER_PADDING
        var positionY = OUTTER_PADDING
        
        let width = view.frame.width - 2 * PADDING
        let height = view.frame.height - 2 * PADDING
        
        let question1aLabel = UILabel()
        view.addSubview(question1aLabel)
        question1aLabel.setUp(text: "1.a SITE DOULOUREUX: ", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        positionY += question1aLabel.frame.height + PADDING
        
        let indicationQuestion1aLabel = UILabel()
        view.addSubview(indicationQuestion1aLabel)
        indicationQuestion1aLabel.setUp(text: "La praticien précise les sites douloureux au touché.", origin: CGPoint(x: positionX, y: positionY), font: SMALL_FONT)
        
        positionY += indicationQuestion1aLabel.frame.height + OUTTER_PADDING
        
        
        heads[0].setHead(headID: "DOUL", doComplete: true, questionnaire: self.questionnaire, questionID: "E1")
        self.head = heads[0]
        self.head.sceneView.frame = CGRect(x: positionX, y: positionY, width: width * 4/5 , height: height * 3/7)
        view.addSubview(self.head.sceneView)
        
        positionY += head.sceneView.frame.height + PADDING
        
        if let trashImage = UIImage(named: "trash") {
            let trashButton = UIButton()
            view.addSubview(trashButton)
            trashButton.setUp(position: CGPoint(x: positionX, y: positionY), image: trashImage, width: BUTTON_SIZE_HEIGHT , height: BUTTON_SIZE_HEIGHT)
            positionY += trashButton.frame.height + OUTTER_PADDING
            trashButton.addTarget(self, action: #selector(trashTapped), for: .touchUpInside)
        }
        
        let question1bLabel = UILabel()
        view.addSubview(question1bLabel)
        question1bLabel.setUp(text: "1.b SITE MAL DE TÊTE: ", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        positionY += question1bLabel.frame.height + PADDING
        
        let indicationQuestion1bLabel = UILabel()
        view.addSubview(indicationQuestion1bLabel)
        indicationQuestion1bLabel.setUp(text: "Avez-vous eu des maux de têtes ? (30 derniers jours)", origin: CGPoint(x: positionX, y: positionY), font: SMALL_FONT)
        
        
        positionY += indicationQuestion1bLabel.frame.height + 2 * OUTTER_PADDING
        
        
        let positionXCol1 = OUTTER_PADDING
        let positionXCol2 = OUTTER_PADDING + view.frame.width / 3
        let positionXCol3 = OUTTER_PADDING + view.frame.width * 2/3
        
        let rightLabel = UILabel()
        view.addSubview(rightLabel)
        rightLabel.setUp(text: "Droit", origin: CGPoint(x: positionXCol2, y: positionY), font: SUBTITLE_FONT)
        
        let leftLabel = UILabel()
        view.addSubview(leftLabel)
        leftLabel.setUp(text: "Gauche", origin: CGPoint(x: positionXCol3, y: positionY), font: SUBTITLE_FONT)
        
        positionY += leftLabel.frame.height + OUTTER_PADDING
        
        let noLabel = UILabel()
        view.addSubview(noLabel)
        noLabel.setUp(text: "Non", origin: CGPoint(x: positionXCol1, y: positionY), font: SUBTITLE_FONT)
        
        nonDSwitch = UISwitch()
        view.addSubview(nonDSwitch)
        nonDSwitch.setUp(offsetH: positionXCol2, offsetV: positionY, mode: false)
        
        nonGSwitch = UISwitch()
        view.addSubview(nonGSwitch)
        nonGSwitch.setUp(offsetH: positionXCol3, offsetV: positionY, mode: false)
        
        positionY += noLabel.frame.height + OUTTER_PADDING
        
        let temporalLabel = UILabel()
        view.addSubview(temporalLabel)
        temporalLabel.setUp(text: "Temporal", origin: CGPoint(x: positionXCol1, y: positionY), font: SUBTITLE_FONT)
        
        temporalDSwitch = UISwitch()
        view.addSubview(temporalDSwitch)
        temporalDSwitch.setUp(offsetH: positionXCol2, offsetV: positionY, mode: false)
        
        temporalGSwitch = UISwitch()
        view.addSubview(temporalGSwitch)
        temporalGSwitch.setUp(offsetH: positionXCol3, offsetV: positionY, mode: false)
        
        positionY += temporalLabel.frame.height + OUTTER_PADDING
        
        let autreLabel = UILabel()
        view.addSubview(autreLabel)
        autreLabel.setUp(text: "Autre", origin: CGPoint(x: positionXCol1, y: positionY), font: SUBTITLE_FONT)
        
        autreDSwitch = UISwitch()
        view.addSubview(autreDSwitch)
        autreDSwitch.setUp(offsetH: positionXCol2, offsetV: positionY, mode: false)
        
        autreGSwitch = UISwitch()
        view.addSubview(autreGSwitch)
        autreGSwitch.setUp(offsetH: positionXCol3, offsetV: positionY, mode: false)
    }
    
    func buildQuestion2(view: UIView) {
        view.layer.cornerRadius = CORNER_RADIUS
        view.layer.borderColor = LIGHT_GRAY.cgColor
        view.layer.borderWidth = SMALL_BORDER
        
        let positionX = OUTTER_PADDING
        var positionY = OUTTER_PADDING
        
        let width = view.frame.width - 2 * OUTTER_PADDING
        
        let titleLabel = UILabel()
        view.addSubview(titleLabel)
        titleLabel.setUp(text: "2. RELATION INCISIVE", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        let positionXCol1 = OUTTER_PADDING
        let positionXCol2 = OUTTER_PADDING + view.frame.width * 1/2
        let positionXCol3 = OUTTER_PADDING + view.frame.width * 2/3
        
        positionY += titleLabel.frame.height + OUTTER_PADDING
        
        let negLabel = UILabel()
        view.addSubview(negLabel)
        negLabel.setUp(text: "Negatif", origin: CGPoint(x: positionXCol3, y: positionY), font: SUBTITLE_FONT)
        
        positionY += titleLabel.frame.height + OUTTER_PADDING
        
        let surPlombInclusifHorLabel = UILabel()
        view.addSubview(surPlombInclusifHorLabel)
        surPlombInclusifHorLabel.setUp(text: "Surplomb incisif horizontal", origin: CGPoint(x: positionXCol1, y: positionY), font: SUBTITLE_FONT)
        
        surPlombInclusifHorTextField = UITextField()
        view.addSubview(surPlombInclusifHorTextField)
        surPlombInclusifHorTextField.setUp(placeHolder: "mm", position: CGPoint(x: positionXCol2, y: positionY), width: TEXT_FIELD_WIDTH_SMALL, height: TEXT_FIELD_HEIGHT)
        surPlombInclusifHorTextField.keyboardType = UIKeyboardType.numberPad
        surPlombInclusifHorTextField.delegate=self
        nonEmptyObject.append(surPlombInclusifHorTextField)
        
        surPlombInclysufHorSwitch = UISwitch()
        view.addSubview(surPlombInclysufHorSwitch)
        surPlombInclysufHorSwitch.setUp(offsetH: positionXCol3, offsetV: positionY, mode: false)
        
        positionY += surPlombInclusifHorLabel.frame.height + OUTTER_PADDING
        
        
        let surPlombInclusifVerLabel = UILabel()
        view.addSubview(surPlombInclusifVerLabel)
        surPlombInclusifVerLabel.setUp(text: "Surplomb incisif vertical", origin: CGPoint(x: positionXCol1, y: positionY), font: SUBTITLE_FONT)
        
        surPlombInclusifVerTextField = UITextField()
        view.addSubview(surPlombInclusifVerTextField)
        surPlombInclusifVerTextField.setUp(placeHolder: "mm", position: CGPoint(x: positionXCol2, y: positionY), width: TEXT_FIELD_WIDTH_SMALL, height: TEXT_FIELD_HEIGHT)
        surPlombInclusifVerTextField.keyboardType = UIKeyboardType.numberPad
        surPlombInclusifVerTextField.delegate=self
        nonEmptyObject.append(surPlombInclusifVerTextField)
        
        surPlombInclysufVerSwitch = UISwitch()
        view.addSubview(surPlombInclysufVerSwitch)
        surPlombInclysufVerSwitch.setUp(offsetH: positionXCol3, offsetV: positionY, mode: false)
        
        positionY += surPlombInclusifVerLabel.frame.height + OUTTER_PADDING
        
        let devMediLabel = UILabel()
        view.addSubview(devMediLabel)
        devMediLabel.setUp(text: "Déviation Médiane", origin: CGPoint(x: positionXCol1, y: positionY), font: SUBTITLE_FONT)
        
        devMedTextField = UITextField()
        view.addSubview(devMedTextField)
        devMedTextField.setUp(placeHolder: "mm", position: CGPoint(x: positionXCol2, y: positionY), width: TEXT_FIELD_WIDTH_SMALL, height: TEXT_FIELD_HEIGHT)
        devMedTextField.keyboardType = UIKeyboardType.numberPad
        devMedTextField.delegate = self
        nonEmptyObject.append(devMedTextField)
        
        let devMedFrame = CGRect(x: positionXCol3, y: positionY, width: width/3 - 2 * OUTTER_PADDING, height: SEGMENTED_CONTROL_HEIGHT)
        devMedSegmentedControl = UISegmentedControl(frame: devMedFrame)
        view.addSubview(devMedSegmentedControl)
        devMedSegmentedControl.removeAllSegments()
        devMedSegmentedControl.insertSegment(withTitle: "Aucun", at: 0, animated: true)
        devMedSegmentedControl.insertSegment(withTitle: "Droite", at: 1, animated: true)
        devMedSegmentedControl.insertSegment(withTitle: "Gauche", at: 2, animated: true)
        nonEmptyObject.append(devMedSegmentedControl)
        
        positionY += devMediLabel.frame.height + OUTTER_PADDING
        
    }
    
    
    func buildQuestion3(view: UIView) {
        view.layer.cornerRadius = CORNER_RADIUS
        view.layer.borderColor = LIGHT_GRAY.cgColor
        view.layer.borderWidth = SMALL_BORDER
        
        let positionX = OUTTER_PADDING
        var positionY = OUTTER_PADDING
        
        let width = view.frame.width - 2 * OUTTER_PADDING
        
        let titleLabel = UILabel()
        view.addSubview(titleLabel)
        titleLabel.setUp(text: "3. PATRON OUVERTURE", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        positionY += titleLabel.frame.height + OUTTER_PADDING
        
        let patOuvertureFrame = CGRect(x: positionX, y: positionY, width: width, height: SEGMENTED_CONTROL_HEIGHT)
        patronOuvertureSeg = UISegmentedControl(frame: patOuvertureFrame)
        view.addSubview(patronOuvertureSeg)
        patronOuvertureSeg.removeAllSegments()
        patronOuvertureSeg.insertSegment(withTitle: "Rectiligne", at: 0, animated: true)
        patronOuvertureSeg.insertSegment(withTitle: "Dév. en baionette", at: 1, animated: true)
        patronOuvertureSeg.insertSegment(withTitle: "Dév. non-corrigée droite", at: 2, animated: true)
        patronOuvertureSeg.insertSegment(withTitle: "Dév. non corrigée gauche", at: 3, animated: true)
        nonEmptyObject.append(patronOuvertureSeg)
    }
    
    override func buildAnswers() {
        self.questionnaire.exportedData["E1B_D"] = getSwitchValue(input: nonDSwitch)
        self.questionnaire.exportedData["E1B_D"] = getSwitchValue(input: nonGSwitch)
        self.questionnaire.exportedData["E2NEG_H"] = getSwitchValue(input: surPlombInclysufHorSwitch)
        self.questionnaire.exportedData["E2NEG_V"] = getSwitchValue(input: surPlombInclysufVerSwitch)
        self.questionnaire.exportedData["E2DIST_H"] = getInputTextValue(input: surPlombInclusifHorTextField)
        self.questionnaire.exportedData["E2DIST_V"] = getInputTextValue(input: surPlombInclusifVerTextField)
        self.questionnaire.exportedData["E2DIST_MEDIA"] = getInputTextValue(input: devMedTextField)
        self.questionnaire.exportedData["E2DEVIA_MEDIA"] = getSegmentedControlValue(input: devMedSegmentedControl)
        self.questionnaire.exportedData["E31"] = getSegmentedControlValue(input: patronOuvertureSeg)
    }
    
   func addBackButton() {
        let backButton = UIButton(type: .custom)
        backButton.setImage(UIImage(named: "BackButton"), for: .normal)
        backButton.setTitle("Back", for: .normal)
        backButton.setTitleColor(backButton.tintColor, for: .normal)
        backButton.addTarget(self, action: #selector(self.backAction(_:)), for: .touchUpInside)

        self.navigationItem.leftBarButtonItem = UIBarButtonItem(customView: backButton)
    }
    
    func setUpHeads() {
        if let morphoHead = self.medicalExam.patient?.morphoHead {
            heads[0].setHeadFromMuscles(areas: morphoHead)
        }
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
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(true)
        queue.async {
            heads[0].loadHead()
        }
      }
    
    @objc func trashTapped(sender: UIButton!) {
        head.clearMuscles()
    }
}

extension FD1ViewController: LeaveDataEntryDelegate {
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


