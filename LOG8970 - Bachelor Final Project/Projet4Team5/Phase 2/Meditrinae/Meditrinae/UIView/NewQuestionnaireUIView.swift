//
//  NewQuestionnaireUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-15.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit
import iOSDropDown


var quesitonnairesID = [1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14]
var questionnairesString = ["OBC", "DepistageDouleur", "Symptomes", "GAD7", "PHQ4", "PHQ9", "ELFMan8", "ELFMan20", "GCPS", "Morphologie", "Demographics", "FDI", "Sleepiness Scale", "Insomnia Severity Index"]

var questionnairesDict: [Int: String] = [1: "OBC", 2: "DD", 3: "QS", 4: "GAD7", 5: "PHQ4", 6: "PHQ9", 7: "ELFMan8", 8: "ELFMan20", 9: "GCPS", 10: "MOR", 11: "DEMO", 12: "FDI", 13: "Sleepiness Scale", 14: "Insomnia Severity Index"]

protocol NewQuestionnaireDelegate {
    func setNewQuestionnaire(VC: QuestionnaireAbstractViewController)
    func setNewQuestionnaire(VC: FDIAbstract)
    func dismissUiView()
}



class NewQuestionnaireUIView: UIView {
    
    var dropDownQuestionnaire: DropDown!
    var newQuestionnaireDelegate: NewQuestionnaireDelegate!
    var selectedID = 0
    
    let storyBoard = UIStoryboard(name: "Main", bundle: nil)
    
    var scrollView: UIScrollView!
    var patient: Patient!
    var patientHomeViewController: PatientHomeViewController!
    
    init(frame: CGRect, patient: Patient, patientHomeViewController: PatientHomeViewController) {
        self.patient = patient
        self.patientHomeViewController = patientHomeViewController
        patient.currentMedicalExam = MedicalExam(patient: patient)
        super.init(frame: frame)
        buildUI(frame: frame)
    }
       
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setUpScollView() {
        scrollView = UIScrollView()
        self.addSubview(scrollView)
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        scrollView.backgroundColor = WHITE
        scrollView.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        scrollView.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
        scrollView.leftAnchor.constraint(equalTo: self.leftAnchor).isActive = true
        scrollView.rightAnchor.constraint(equalTo: self.rightAnchor).isActive = true
        scrollView.layoutIfNeeded()
        scrollView.isScrollEnabled = true
        scrollView.contentSize = CGSize(width: 2000, height:self.frame.height)
    }
    
    func buildUI(frame: CGRect) {
        setUpScollView()
        self.frame = frame
        self.layer.cornerRadius = CORNER_RADIUS
        self.layer.borderWidth = BORDER_SIZE
        self.layer.borderColor = DARK_GRAY.cgColor
        self.backgroundColor = WHITE
    
        var x =  2 * OUTTER_PADDING
        let y = 2 * OUTTER_PADDING
        
        if let allDocsImage = UIImage(named: "docs") {
        let allQuestionnairesButton = UIButton()
            allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
            allQuestionnairesButton.setTitle("OBC", for: .normal)
            allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
            allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
            allQuestionnairesButton.addTarget(self, action: #selector(OBC), for: .touchUpInside)
            scrollView.addSubview(allQuestionnairesButton)
            x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
               let allQuestionnairesButton = UIButton()
                   allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
                   allQuestionnairesButton.setTitle("DD", for: .normal)
                   allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
                   allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
                   allQuestionnairesButton.addTarget(self, action: #selector(DD), for: .touchUpInside)
                   scrollView.addSubview(allQuestionnairesButton)
                   x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
               let allQuestionnairesButton = UIButton()
                   allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
                   allQuestionnairesButton.setTitle("QS", for: .normal)
                   allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
                   allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
                   allQuestionnairesButton.addTarget(self, action: #selector(QS), for: .touchUpInside)
                   scrollView.addSubview(allQuestionnairesButton)
                   x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
               let allQuestionnairesButton = UIButton()
                   allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
                   allQuestionnairesButton.setTitle("GAD7", for: .normal)
                   allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
                   allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
                   allQuestionnairesButton.addTarget(self, action: #selector(GAD7), for: .touchUpInside)
                   scrollView.addSubview(allQuestionnairesButton)
                   x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
               let allQuestionnairesButton = UIButton()
                   allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
                   allQuestionnairesButton.setTitle("PHQ4", for: .normal)
                   allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
                   allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
                   allQuestionnairesButton.addTarget(self, action: #selector(PHQ4), for: .touchUpInside)
                   scrollView.addSubview(allQuestionnairesButton)
                   x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
               let allQuestionnairesButton = UIButton()
                   allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
                   allQuestionnairesButton.setTitle("PHQ9", for: .normal)
                   allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
                   allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
                   allQuestionnairesButton.addTarget(self, action: #selector(PHQ9), for: .touchUpInside)
                   scrollView.addSubview(allQuestionnairesButton)
                   x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
               let allQuestionnairesButton = UIButton()
                   allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
                   allQuestionnairesButton.setTitle("MAN8", for: .normal)
                   allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
                   allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
                   allQuestionnairesButton.addTarget(self, action: #selector(MAN8), for: .touchUpInside)
                   scrollView.addSubview(allQuestionnairesButton)
                   x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
            let allQuestionnairesButton = UIButton()
            allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
            allQuestionnairesButton.setTitle("MAN20", for: .normal)
            allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
            allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
            allQuestionnairesButton.addTarget(self, action: #selector(MAN20), for: .touchUpInside)
            scrollView.addSubview(allQuestionnairesButton)
            x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
            let allQuestionnairesButton = UIButton()
            allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
            allQuestionnairesButton.setTitle("GCPS", for: .normal)
            allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
            allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
            allQuestionnairesButton.addTarget(self, action: #selector(GCPS), for: .touchUpInside)
            scrollView.addSubview(allQuestionnairesButton)
            x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
            let allQuestionnairesButton = UIButton()
                allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
                allQuestionnairesButton.setTitle("MOR", for: .normal)
                allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
                allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
                allQuestionnairesButton.addTarget(self, action: #selector(MOR), for: .touchUpInside)
                scrollView.addSubview(allQuestionnairesButton)
                x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }

        if let allDocsImage = UIImage(named: "docs") {
            let allQuestionnairesButton = UIButton()
            allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
            allQuestionnairesButton.setTitle("DEMO", for: .normal)
            allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
            allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
            allQuestionnairesButton.addTarget(self, action: #selector(DEMO), for: .touchUpInside)
            scrollView.addSubview(allQuestionnairesButton)
            x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
            let allQuestionnairesButton = UIButton()
            allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
            allQuestionnairesButton.setTitle("FDI", for: .normal)
            allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
            allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
            allQuestionnairesButton.addTarget(self, action: #selector(FDI), for: .touchUpInside)
            scrollView.addSubview(allQuestionnairesButton)
            x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
            let allQuestionnairesButton = UIButton()
            allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
            allQuestionnairesButton.setTitle("SS", for: .normal)
            allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
            allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
            allQuestionnairesButton.addTarget(self, action: #selector(SS), for: .touchUpInside)
            scrollView.addSubview(allQuestionnairesButton)
            x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
        if let allDocsImage = UIImage(named: "docs") {
            let allQuestionnairesButton = UIButton()
            allQuestionnairesButton.setUp(position: CGPoint(x: x, y: y), image: allDocsImage, width: BUTTON_ICON_HEIGHT, height:BUTTON_ICON_HEIGHT)
            allQuestionnairesButton.setTitle("IS", for: .normal)
            allQuestionnairesButton.setTitleColor(UIColor.black, for: .normal)
            allQuestionnairesButton.alignContentVerticallyByCenter(offset: 5)
            allQuestionnairesButton.addTarget(self, action: #selector(IS), for: .touchUpInside)
            scrollView.addSubview(allQuestionnairesButton)
            x += allQuestionnairesButton.frame.width + 2 * OUTTER_PADDING
        }
    
        scrollView.contentSize.width = x
        
    }
    
    @objc func IS(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "InsomniaViewController")
        if let VC = VC as? InsomniaViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.canSubmit = true
            VC.patientMode = false
            VC.rootViewController = self.patientHomeViewController
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }
    
    @objc func OBC(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "OBCViewController")
        if let VC = VC as? OBCViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.canSubmit = true
            VC.patientMode = false
            VC.rootViewController = self.patientHomeViewController
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }
    
    @objc func PHQ4(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "PHQ4ViewController")
        if let VC = VC as? PHQ4ViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.canSubmit = true
            VC.patientMode = false
            VC.rootViewController = self.patientHomeViewController
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }

    
    @objc func PHQ9(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "PHQ9ViewController")
        if let VC = VC as? PHQ9ViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.rootViewController = self.patientHomeViewController
            VC.canSubmit = true
            VC.patientMode = false
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }
    
    @objc func GAD7(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "GAD7ViewController")
        if let VC = VC as? GAD7ViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.rootViewController = self.patientHomeViewController
            VC.canSubmit = true
            VC.patientMode = false
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }
    
    @objc func MAN8(sender: UIButton) {
           let VC = self.storyBoard.instantiateViewController(identifier: "ELFMan8ViewController")
           if let VC = VC as? ELFMan8ViewController {
                VC.medicalExam = patient.currentMedicalExam
                VC.canSubmit = true
                VC.patientMode = false
                VC.rootViewController = self.patientHomeViewController
                self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
                self.newQuestionnaireDelegate.dismissUiView()
           }
       }

    @objc func MAN20(sender: UIButton) {
           let VC = self.storyBoard.instantiateViewController(identifier: "ELFMan20ViewController")
           if let VC = VC as? ELFMan20ViewController {
                VC.medicalExam = patient.currentMedicalExam
                VC.canSubmit = true
                VC.patientMode = false
                VC.rootViewController = self.patientHomeViewController
                self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
                self.newQuestionnaireDelegate.dismissUiView()
           }
       }

    @objc func GCPS(sender: UIButton) {
           let VC = self.storyBoard.instantiateViewController(identifier: "GCPSViewController")
           if let VC = VC as? GCPSViewController {
                VC.medicalExam = patient.currentMedicalExam
                VC.canSubmit = true
                VC.patientMode = false
                VC.rootViewController = self.patientHomeViewController
                self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
                self.newQuestionnaireDelegate.dismissUiView()
           }
       }
    
    @objc func QS(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "SymptomesViewController")
        if let VC = VC as? SymptomesViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.canSubmit = true
            VC.patientMode = false
            VC.rootViewController = self.patientHomeViewController
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }

    @objc func DD(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "DepistageDouleurViewController")
        if let VC = VC as? DepistageDouleurViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.canSubmit = true
            VC.patientMode = false
            VC.rootViewController = self.patientHomeViewController
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }
    
    @objc func MOR(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "MorphologieDouleurViewController")
        if let VC = VC as? MorphologieDouleurViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.canSubmit = true
            VC.patientMode = false
            VC.rootViewController = self.patientHomeViewController
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }
    
    @objc func DEMO(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "DemographicsViewController")
        if let VC = VC as? DemographicsViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.canSubmit = true
            VC.patientMode = false
            VC.rootViewController = self.patientHomeViewController
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }
    
    @objc func SS(sender: UIButton) {
        let VC = self.storyBoard.instantiateViewController(identifier: "SleepninessScallViewController")
        if let VC = VC as? SleepninessScallViewController {
            VC.medicalExam = patient.currentMedicalExam
            VC.canSubmit = true
            VC.patientMode = false
            VC.rootViewController = self.patientHomeViewController
            self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
            self.newQuestionnaireDelegate.dismissUiView()
        }
    }
    
    @objc func FDI(sender: UIButton) {
           let VC = self.storyBoard.instantiateViewController(identifier: "FDI1ViewController")
           if let VC = VC as? FD1ViewController {
                VC.rootViewController = patientHomeViewController
                VC.medicalExam = MedicalExam(patient: patient)
                self.newQuestionnaireDelegate.setNewQuestionnaire(VC: VC)
                self.newQuestionnaireDelegate.dismissUiView()
           }
       }
}
