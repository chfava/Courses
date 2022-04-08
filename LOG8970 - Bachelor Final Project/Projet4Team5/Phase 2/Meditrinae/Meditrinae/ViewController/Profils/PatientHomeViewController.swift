//
//  PatientHomeViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import SwiftMessages

class PatientHomeViewController: HomeViewAbstractViewController {
    
    var diagnosticView: DiagnosticsUIView!
    var notesView: SelectionUIView!
    var praticientVC: PraticienHomeViewController!
    var questionnaireUIView: NewQuestionnaireUIView!
    var messageView: MessageView!
    var currentMedicalExam: MedicalExam!

    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = WHITE
        addBackButton()
        self.navigationController?.navigationBar.isHidden = false
        if self.view.frame.origin.y == 0 {
            self.view.frame.origin.y = self.navigationController?.navigationBar.frame.height ?? 0 + PADDING
        }
        if let user = self.user as? Patient {
            self.setUpUI(title: "Quesitonnaires", data: [], options: [], user: user, dropDown: false, dataToAdd: [])
            self.selectionUIView.selectionUIIViewNewExamMedicalDelegate = self
            self.selectionUIView.emailButtonDelegate = self
            self.infoUIView.infoUIViewPatientDelegate = self
            self.infoUIView.addPatientModeButton()
            self.addQuestionnaireUIView()
            self.setUpDiagnosticsUIView(user: user)
            self.setUpNotesUIView(user: user)
            self.selectionUIView.addEmailButton()
            ServerService.shared.getCompletedExams(token: user.token, patient: user, completion: {(error, examResult) in
                if let examResult = examResult {
                    self.currentMedicalExam = MedicalExam(patient: user)
                    self.currentMedicalExam.examResult = examResult
                    var questionnaires = [Questionnaire]()
                    for (_, value) in examResult.listQuestionnaire.questionnaires {
                        questionnaires.append(value)
                    }
                    self.selectionUIView.reloadData(data: questionnaires)
                }
            })
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
     if let user = self.user as? Patient {
        ServerService.shared.getCompletedExams(token: user.token, patient: user, completion: {(error, examResult) in
            if let examResult = examResult {
                var questionnaires = [Questionnaire]()
                for (_, value) in examResult.listQuestionnaire.questionnaires {
                    questionnaires.append(value)
                }
                self.selectionUIView.reloadData(data: questionnaires)
            }
        })
        }
    }
    
    func addQuestionnaireUIView() {
        let height = BUTTON_ICON_HEIGHT + 4 * OUTTER_PADDING
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: width, height: height)
        questionnaireUIView = NewQuestionnaireUIView(frame: frame, patient: self.user as! Patient, patientHomeViewController: self)
        questionnaireUIView.newQuestionnaireDelegate = self
        self.scrollView.addSubview(questionnaireUIView)
        
        positionY += questionnaireUIView.frame.height + OUTTER_PADDING
    }
    
    func setUpDiagnosticsUIView(user: Patient) {
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: width, height: UIVIEW_HEIGHT)
        diagnosticView = DiagnosticsUIView(frame: frame, patient: user)
        self.scrollView.addSubview(diagnosticView)
        
        positionY += UIVIEW_HEIGHT + OUTTER_PADDING
        
    }
    
    func reloadAllData() {
        if let user = self.user as? Patient {
            ServerService.shared.getAllMedicalExamForPatient(token: user.token, patient: user,completion: {(error, MedicalExams) in
                if let medicalExams = MedicalExams {
                    self.user.medicalExams = medicalExams
                    for medicalExam in self.user.medicalExams! {
                        medicalExam.patient = user
                    }
                    self.selectionUIView.reloadData(data: self.user.medicalExams ?? [])
                }
            })
            ServerService.shared.getPatient(token: user.token, patientId: user.ID, completion: {(error, patient) in
                if let patient = patient {
                    self.notesView.reloadData(data: patient.notes ?? [])
                    self.user.notes = patient.notes
                }
            })
        }
    }
    
    func reloadNotes() {
        ServerService.shared.getPatient(token: user.token, patientId: user.ID, completion: {(error, patient) in
            if let patient = patient {
                self.notesView.reloadData(data: patient.notes ?? [])
            }
        })
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
        let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: height)
        authUserUIView = AuthentificationUserUIView(frame: frame, user: user!, authAction: .signOut)
        self.scrollView.addSubview(authUserUIView)
        authUserUIView.authConfirmDelegate = self
        self.scrollView.scrollToTop(animated: true)
    }
    
    func setUpNotesUIView(user: Patient) {
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: width, height: UIVIEW_HEIGHT)
        notesView = SelectionUIView()
        notesView.buildUI(frame: frame, title: "Notes du patient", options: [], data: [], dropDown: false, preLoadData: user.notes, user: user)
        self.scrollView.addSubview(notesView)
        notesView.selectionUIViewToVCDelegate = self
        notesView.genericTableUIView.selectedCellSegueProtocol = self
        
        positionY += UIVIEW_HEIGHT + OUTTER_PADDING
        scrollView.contentSize.height = positionY
    }
    
    override func deleteItem(objectID: String, user: ProfilAbstract?, questionnaire: Questionnaire?, medicalExam: MedicalExam?, note: MedicalNote?, clinic: Clinic?) {
        if (user != nil) {
             Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas suprimer ceci.", vc: self)
        }
        if (questionnaire != nil) {
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas suprimer ceci.", vc: self)
        }
        if (medicalExam != nil) {
            if let user = self.user as? Patient {
                for index in 0...user.medicalExams!.count-1 {
                    if (medicalExam!.medicalExamID == user.medicalExamsID![index]) {
                        user.medicalExamsID!.remove(at: index)
                        ServerService.shared.updatePatient(token: user.token, patient: user, completion: {(error, patient) in
                            if patient != nil {
                                ServerService.shared.getAllMedicalExamForPatient(token: user.token, patient: user, completion: {(error, MedicalExams) in
                                    if let medicalExams = MedicalExams {
                                        self.user.medicalExams = medicalExams
                                        for medicalExam in self.user.medicalExams! {
                                            medicalExam.patient = user
                                        }
                                        self.selectionUIView.reloadData(data: self.user.medicalExams ?? [])
                                        return
                                    }
                                })
                            }
                        })
                        break
                    }
                }
            }
        }
        if (note != nil) {
            if (self.user.notes != nil) {
                for index in 0...(self.user.notes!.count - 1) {
                    if (note!.title == self.user.notes![index].title) {
                        self.user.notes!.remove(at: index)
                        ServerService.shared.updatePatient(token: self.user.token, patient: self.user as! Patient, completion: {(error, patient) in
                            if let patient = patient {
                                self.notesView.reloadData(data: patient.notes ?? [])
                                return
                            }
                        })
                    break
                    }
                }
            }
        }
        if (clinic != nil) {
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas suprimer ceci.", vc: self)
        }
    }
    
    
    
    
    override func selectItem(objectID: String, user: ProfilAbstract?, questionnaire: Questionnaire?, medicalExam: MedicalExam?, note: MedicalNote?, clinic: Clinic?) {
        if (user != nil) {
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas selectionner ceci.", vc: self)
        }
        
        if let questionnaire = questionnaire {
            var VC: UIViewController?
            switch questionnaire.ID {
            case "OBC":
                VC = storyBoard.instantiateViewController(identifier: "OBCViewController")
                if let VC = VC as? OBCViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.setAnswers(exportedData: questionnaire.exportedData)
                }
            case "DD" :
                VC = storyBoard.instantiateViewController(identifier: "DepistageDouleurViewController")
                if let VC = VC as? DepistageDouleurViewController {
                    VC.canSubmit = true
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.setAnswers(exportedData: questionnaire.exportedData)
                }
                break
            case "QS":
                VC = storyBoard.instantiateViewController(identifier: "SymptomesViewController")
                if let VC = VC as? SymptomesViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.setAnswers(exportedData: questionnaire.exportedData)
                }
                break
            case "GAD7":
                VC = storyBoard.instantiateViewController(identifier: "GAD7ViewController")
                if let VC = VC as? GAD7ViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.setAnswers(exportedData: questionnaire.exportedData)
                }
                break
            case "PHQ4":
                VC = storyBoard.instantiateViewController(identifier: "PHQ4ViewController")
                if let VC = VC as? PHQ4ViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                    VC.setAnswers(exportedData: questionnaire.exportedData)
                }
                break
            case "PHQ9":
                VC = storyBoard.instantiateViewController(identifier: "PHQ9ViewController")
                if let VC = VC as? PHQ9ViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
                break
            case "MAN8":
                VC = storyBoard.instantiateViewController(identifier: "ELFMan8ViewController")
                if let VC = VC as? ELFMan8ViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
                break
            case "MAN20":
                VC = storyBoard.instantiateViewController(identifier: "ELFMan20ViewController")
                if let VC = VC as? ELFMan20ViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
                break
            case "GCPS":
                VC = storyBoard.instantiateViewController(identifier: "GCPSViewController")
                if let VC = VC as? GCPSViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
                break
            case "MORPHO":
                VC = storyBoard.instantiateViewController(identifier: "MorphologieDouleurViewController")
                if let VC = VC as? MorphologieDouleurViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
                break
            case"DEMO":
                VC = storyBoard.instantiateViewController(identifier: "DemographicsViewController")
                if let VC = VC as? DemographicsViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
                break
            case"IS":
                VC = storyBoard.instantiateViewController(identifier: "InsomniaViewController")
                if let VC = VC as? InsomniaViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
                break
            case"SS":
                VC = storyBoard.instantiateViewController(identifier: "SleepninessScallViewController")
                if let VC = VC as? SleepninessScallViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
                break
            case "FDI":
                VC = storyBoard.instantiateViewController(identifier: "FDI1ViewController")
                if let VC = VC as? FD1ViewController {
                    VC.rootViewController = self
                    VC.medicalExam = self.currentMedicalExam
                    VC.questionnaire = questionnaire
                }
            case .none:
                VC = nil
            case .some(_):
                VC = nil
            }
            
            
            if (VC != nil) {
                if let VC = VC as? QuestionnaireAbstractViewController {
                    VC.canSubmit = false
                    VC.patientMode = false
                    self.navigationController?.pushViewController(VC, animated: true)
                }
                else if let VC = VC as? FDIAbstract {
                    VC.canSubmit = false
                    self.navigationController?.pushViewController(VC, animated: true)
                }
            }
        }
        
        if (medicalExam != nil) {
            let medicalExamVC = MedicalExamViewController()
            medicalExamVC.medicalExam = medicalExam
            self.navigationController?.pushViewController(medicalExamVC, animated: true)
        }
        if (note != nil) {
            self.scrollView.addSubview(self.blackUIView)
            let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
            let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
            self.medicalNoteUIView = ShowNoteUIView(frame: frame, note: note!)
            self.scrollView.scrollToTop(animated: true)
            self.medicalNoteUIView.showNewUIViewDelegate = self
            self.navigationController?.navigationBar.isHidden = true
            UIView.animate(withDuration: 0.5, animations: {
                self.scrollView.addSubview(self.medicalNoteUIView)
            })
        }
        if (clinic != nil) {
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas suprimer ceci.", vc: self)
        }
    }
}


extension PatientHomeViewController: InfoUIViewPatientDelegate {
    func allQuestionnaires() {
        let VC = storyBoard.instantiateViewController(identifier: "DemographicsViewController")
        if let VC = VC as? DemographicsViewController {
            if let patient = self.user as? Patient {
                VC.canSubmit = false
                VC.medicalExam = MedicalExam(patient: patient)
                self.navigationController?.pushViewController(VC, animated: true)
            }
        }
    }
    
    func noteToAdd() {
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
    
    func emailToSend() {
        let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
        self.scrollView.addSubview(self.blackUIView)
        self.emailToSendUIView = EmailSendUIView(frame: frame, isGeneric: true)
        self.emailToSendUIView.newEmailDelegate = self
        UIView.animate(withDuration: 0.5, animations: {
            self.navigationController?.navigationBar.isHidden = true
            self.scrollView.addSubview(self.emailToSendUIView)
            self.scrollView.scrollToTop(animated: true)
        })
    }
}

extension PatientHomeViewController: EmailButtonDelegate {
    func sendEmail() {
        let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
        self.scrollView.addSubview(self.blackUIView)
        self.emailToSendUIView = EmailSendUIView(frame: frame, isGeneric: false)
        self.emailToSendUIView.newEmailDelegate = self
        UIView.animate(withDuration: 0.5, animations: {
            self.navigationController?.navigationBar.isHidden = true
            self.scrollView.addSubview(self.emailToSendUIView)
            self.scrollView.scrollToTop(animated: true)
        })
    }
}

extension PatientHomeViewController: NewEmailDelegate {
    func sendEmail(email: String, isGeneric: Bool) {
        if (isGeneric) {
            ServerService.shared.sendGenericEmailRequest(token: self.user.token, email: email, completion: {(error) in
                UIView.animate(withDuration: 0.8 , animations: {
                    self.emailToSendUIView.removeFromSuperview()
                    self.emailToSendUIView = nil
                    self.blackUIView.removeFromSuperview()
                    self.navigationController?.navigationBar.isHidden = false
                    self.messageView = MessageView.viewFromNib(layout: .cardView)
                    self.messageView.configureDropShadow()
                    self.messageView.configureTheme(.success, iconStyle: .none)
                    self.messageView.accessibilityPrefix = "Success"
                    self.messageView.configureContent(title: "Envoyé !", body: "Le email a été envoyé.")
                    self.messageView.button?.removeFromSuperview()
                    var config = SwiftMessages.Config()
                    config.presentationContext = .window(windowLevel: .statusBar)
                    config.duration = .seconds(seconds: 3)
                    config.dimMode = .gray(interactive: true)
                    config.interactiveHide = true
                    SwiftMessages.show(config: config, view: self.messageView)
                })
            })
        }
        else {
            ServerService.shared.sendEmailRequest(token: self.user.token, patientID: self.user.ID, email: email, completion: { (error, succes) in
                UIView.animate(withDuration: 0.8 , animations: {
                    self.emailToSendUIView.removeFromSuperview()
                    self.emailToSendUIView = nil
                    self.blackUIView.removeFromSuperview()
                    self.navigationController?.navigationBar.isHidden = false
                    if let succes = succes {
                        if (succes) {
                            self.messageView = MessageView.viewFromNib(layout: .cardView)
                            self.messageView.configureDropShadow()
                            self.messageView.configureTheme(.success, iconStyle: .none)
                            self.messageView.accessibilityPrefix = "Success"
                            self.messageView.configureContent(title: "Envoyé !", body: "Le email a été envoyé.")
                            self.messageView.button?.removeFromSuperview()
                            var config = SwiftMessages.Config()
                            config.presentationContext = .window(windowLevel: .statusBar)
                            config.duration = .seconds(seconds: 3)
                            config.dimMode = .gray(interactive: true)
                            config.interactiveHide = true
                            SwiftMessages.show(config: config, view: self.messageView)
                        }
                        else {
                            Alert.showBasic(title: "Erreur", message: "Le courriel n'a pas été envoyé. SVP vérifiez votre connexion internet et essayez de nouveau.", vc: self)
                        }
                    }
                })
            })
        }
    }
    
    func dismissEmailUIView() {
        UIView.animate(withDuration: 0.8 , animations: {
            self.emailToSendUIView.removeFromSuperview()
            self.emailToSendUIView = nil
            self.blackUIView.removeFromSuperview()
            self.navigationController?.navigationBar.isHidden = false
        })
    }
}

extension PatientHomeViewController: NewNoteDelegate {
    func newNote(note: String) {
        if let user = self.user as? Patient {
            let date = Date()
            let note = MedicalNote(note: note, title: date)
            user.notes?.append(note)
            ServerService.shared.updatePatient(token: user.token, patient: user, completion: {(error, patient) in
                if let patient = patient {
                    self.user = patient 
                    self.notesView.reloadData(data: patient.notes ?? [])
                    self.dissmissNoteView()
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

extension PatientHomeViewController: ShowNewUIViewDelegate {
    func dismissNote() {
        self.medicalNoteUIView.removeFromSuperview()
        self.medicalNoteUIView = nil
        self.blackUIView.removeFromSuperview()
        UIView.animate(withDuration: 0.5, animations: {
            self.navigationController?.navigationBar.isHidden = false
        })
    }
}

extension PatientHomeViewController: SelectionUIIViewNewExamMedicalDelegate  {
    func addNewExamMedical() {
        if let user = user as? Patient {
            ServerService.shared.addMedicalExam(token: user.token, patientID: user.ID, praticienID: user.praticien!.ID, completion: {(error, medicalExam) in
                if let medicalExam = medicalExam {
                    if let user = self.user as? Patient {
                        UIView.animate(withDuration: 0.8, animations: {
                            user.medicalExams?.append(medicalExam)
                            user.medicalExamsID?.append(medicalExam.medicalExamID!)
                            self.selectionUIView.newDataButton.removeFromSuperview()
                            self.selectionUIView.newDataEntryLabel.removeFromSuperview()
                            let medicalExamVC = MedicalExamViewController()
                            medicalExamVC.medicalExam = medicalExam
                            medicalExam.patient = user
                            self.navigationController?.pushViewController(medicalExamVC, animated: true)
                        })
                    }
                }
            })
        }
    }
}

extension PatientHomeViewController: NewQuestionnaireDelegate {
   func dismissUiView() {
           self.navigationController?.navigationBar.isHidden = false
      }
      
      func setNewQuestionnaire(VC: QuestionnaireAbstractViewController) {
           self.navigationController?.pushViewController(VC, animated: true)
      }
      func setNewQuestionnaire(VC: FDIAbstract) {
           self.navigationController?.pushViewController(VC, animated: true)
      }
}
