//
//  MedicalExamViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-20.
//  Copyright © 2019 Team5. All rights reserved.
//




//DEPRECATED 

import UIKit

class MedicalExamViewController: UIViewController {

    var medicalExam: MedicalExam!
    var questionnairesSelectionUIView: SelectionUIView!
    var infoUIView: InfoUIView!
    var newQuestionnaireUIView: NewQuestionnaireUIView!
    var emailToSendUIView: EmailSendUIView!

    var width: CGFloat!
    var height: CGFloat!
    var positionY: CGFloat!
    var newNoteUIView: NoteUIView!

    var blackUIView: UIView!
    var scrollView: UIScrollView!

    let storyBoard = UIStoryboard(name: "Main", bundle: nil)


    override func viewDidLoad() {
        if (!(self.navigationController?.navigationBar.isHidden ?? true)) {
            if self.view.frame.origin.y == 0 {
                self.view.frame.origin.y = self.navigationController?.navigationBar.frame.height ?? 0  + OUTTER_PADDING
            }
        }
        self.view.backgroundColor = WHITE
        width = self.view.frame.width - 2 * OUTTER_PADDING - 2 * BORDER_SIZE
        height = self.view.frame.height - 2 * OUTTER_PADDING - 2 * BORDER_SIZE
        let blackFrame = CGRect(x: 0, y: 0, width: self.view.frame.width, height: self.view.frame.height)
        blackUIView = UIView(frame: blackFrame)
        blackUIView.backgroundColor = UIColor.black.withAlphaComponent(0.8)
        self.setUpUI()
    }

    override func viewWillAppear(_ animated: Bool) {
        reloadExamResults()
    }

    func setUpUI() {
        setUpNavigationCode()
        let positionX =  OUTTER_PADDING
        positionY = self.view.frame.origin.y + OUTTER_PADDING

        infoUIView = InfoUIView()
        infoUIView.frame = CGRect(x: positionX, y: positionY, width: width, height: height/3)
        infoUIView.buildUIView(medicalExam: medicalExam)
        infoUIView.infoUIViewPatientDelegate = self
        self.view.addSubview(infoUIView)

        positionY += infoUIView.frame.height + 2 * OUTTER_PADDING

        questionnairesSelectionUIView = SelectionUIView()
        let frame = CGRect(x: positionX, y: positionY, width: width, height: 500)
        self.questionnairesSelectionUIView.buildUI(frame: frame, title: "Questionnaires", options: [], data: [], dropDown: false, preLoadData: [], user: self.medicalExam.patient!, medicalExam: medicalExam)
        self.view.addSubview(questionnairesSelectionUIView)
        self.questionnairesSelectionUIView.selectionNewQuestionnaireDelegate = self
        questionnairesSelectionUIView.genericTableUIView.selectedCellSegueProtocol = self
    }

    func setUpNavigationCode() {
        let medicalExamDateLabel = UILabel()
        medicalExamDateLabel.setUp(text: self.medicalExam.dateCreated.print(), origin: CGPoint(x: 0, y: 0))
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

    func reloadExamResults() {
    }

    @objc func noteButtonTapped(sender: UIButton) {
        noteToAdd()
    }
}

extension MedicalExamViewController: NewNoteDelegate {

    func noteToAdd() {
           self.view.addSubview(self.blackUIView)
           let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
           let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
           self.newNoteUIView = NoteUIView(frame: frame)
           self.newNoteUIView.newNoteDelegate = self
           UIView.animate(withDuration: 0.5, animations: {
               self.navigationController?.navigationBar.isHidden = true
               self.view.addSubview(self.newNoteUIView)
           })
       }

       func dissmissNoteView() {
           UIView.animate(withDuration: 0.8 , animations: {
               self.newNoteUIView.removeFromSuperview()
               self.newNoteUIView = nil
               self.blackUIView.removeFromSuperview()
               self.navigationController?.navigationBar.isHidden = false
           })
       }

    func newNote(note: String) {
        if let user = self.medicalExam.patient {
            let date = Date()
            let note = MedicalNote(note: note, title: date)
            user.notes?.append(note)
            ServerService.shared.updatePatient(token: user.token, patient: user, completion: {(error, patient) in
                if patient != nil {
                    self.dissmissNoteView()
                }
            })
        }
    }

    func alertEmptyNote() {
        Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas ajouter un nouvelle note vide.", vc: self)
    }
}

extension MedicalExamViewController: SelectionNewQuestionnaireDelegate {
    func addNewQuestionnaire() {
        UIView.animate(withDuration: 0.5, animations: {
            self.view.addSubview(self.blackUIView)
            let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
            let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
            if self.medicalExam.patient != nil {
                //self.newQuestionnaireUIView = NewQuestionnaireUIView(frame: frame)
                self.view.addSubview(self.newQuestionnaireUIView)
                self.newQuestionnaireUIView.newQuestionnaireDelegate = self
                 self.navigationController?.navigationBar.isHidden = true
            }
        })
    }
}

extension MedicalExamViewController: SelectedCellProtocol {
    func selectItem(objectID: String, user: ProfilAbstract?, questionnaire: Questionnaire?, medicalExam: MedicalExam?, note: MedicalNote?, clinic: Clinic?) {
        if let questionnaire = questionnaire {
            var VC: UIViewController?
            switch questionnaire.ID {
            case "OBC":
                VC = storyBoard.instantiateViewController(identifier: "OBCViewController")
                if let VC = VC as? OBCViewController {
                    VC.medicalExam = self.medicalExam
                    VC.setAnswers(exportedData: questionnaire.exportedData)
                }
            case "DD" :
                VC = storyBoard.instantiateViewController(identifier: "DepistageDouleurViewController")
                if let VC = VC as? DepistageDouleurViewController {
                     VC.medicalExam = self.medicalExam
                     VC.setAnswers(exportedData: questionnaire.exportedData)
                }
                break
            case "QS":
                VC = storyBoard.instantiateViewController(identifier: "SymptomesViewController")
                if let VC = VC as? SymptomesViewController {
                        VC.medicalExam = self.medicalExam
                        VC.setAnswers(exportedData: questionnaire.exportedData)
                }
                break
            case "GAD7":
                VC = storyBoard.instantiateViewController(identifier: "GAD7ViewController")
                if let VC = VC as? GAD7ViewController {
                        VC.medicalExam = self.medicalExam
                        VC.setAnswers(exportedData: questionnaire.exportedData)
                }
                break
            case "PHQ4":
                VC = storyBoard.instantiateViewController(identifier: "PHQ4ViewController")
                if let VC = VC as? PHQ4ViewController {
                     VC.medicalExam = self.medicalExam
                     VC.questionnaire = questionnaire
                     VC.setAnswers(exportedData: questionnaire.exportedData)
                }
                break
            case "PHQ9":
                VC = storyBoard.instantiateViewController(identifier: "PHQ9ViewController")
                if let VC = VC as? PHQ9ViewController {
                        VC.medicalExam = self.medicalExam
                        VC.questionnaire = questionnaire
                }
                break
            case "MAN8":
                VC = storyBoard.instantiateViewController(identifier: "ELFMan8ViewController")
                if let VC = VC as? ELFMan8ViewController {
                        VC.medicalExam = self.medicalExam
                        VC.questionnaire = questionnaire
                }
                break
            case "MAN20":
                VC = storyBoard.instantiateViewController(identifier: "ELFMan20ViewController")
                if let VC = VC as? ELFMan20ViewController {
                        VC.medicalExam = self.medicalExam
                        VC.questionnaire = questionnaire
                }
                break
            case "GCPS":
                VC = storyBoard.instantiateViewController(identifier: "GCPSViewController")
                if let VC = VC as? GCPSViewController {
                        VC.medicalExam = self.medicalExam
                        VC.questionnaire = questionnaire
                }
                break
            case "MORPHO":
                VC = storyBoard.instantiateViewController(identifier: "MorphologieDouleurViewController")
                if let VC = VC as? MorphologieDouleurViewController {
                        VC.medicalExam = self.medicalExam
                        VC.questionnaire = questionnaire
                }
                break
            case"DEMO":
                VC = storyBoard.instantiateViewController(identifier: "DemographicsViewController")
                if let VC = VC as? DemographicsViewController {
                        VC.medicalExam = self.medicalExam
                        VC.questionnaire = questionnaire
                }
                break
            case "FDI":
                VC = storyBoard.instantiateViewController(identifier: "FDI1ViewController")
                if let VC = VC as? FD1ViewController {
                        VC.medicalExam = self.medicalExam
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
                    self.navigationController?.pushViewController(VC, animated: true)
                }
                else if let VC = VC as? FDIAbstract {
                    self.navigationController?.pushViewController(VC, animated: true)
                }
            }
        }
    }

    func deleteItem(objectID: String, user: ProfilAbstract?, questionnaire: Questionnaire?, medicalExam: MedicalExam?, note: MedicalNote?, clinic: Clinic?) {
        if questionnaire != nil {
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas supprimer seulement un quesitonnaire.", vc: self)
            self.reloadExamResults()
        }
    }
}

extension MedicalExamViewController: NewQuestionnaireDelegate {
    func dismissUiView() {
        UIView.animate(withDuration: 0.5, animations: {
            self.newQuestionnaireUIView.removeFromSuperview()
            self.newQuestionnaireUIView = nil
            self.blackUIView.removeFromSuperview()
        })
         self.navigationController?.navigationBar.isHidden = false
    }

    func setNewQuestionnaire(VC: QuestionnaireAbstractViewController) {
         self.navigationController?.pushViewController(VC, animated: true)
    }
    func setNewQuestionnaire(VC: FDIAbstract) {
         self.navigationController?.pushViewController(VC, animated: true)
    }
}

extension MedicalExamViewController: InfoUIViewPatientDelegate {
    func allQuestionnaires() {
        //nothing
    }

    func emailToSend() {
        let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
        let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
        self.view.addSubview(self.blackUIView)
        self.emailToSendUIView = EmailSendUIView(frame: frame, isGeneric: false)
        self.emailToSendUIView.newEmailDelegate = self
        UIView.animate(withDuration: 0.5, animations: {
            self.navigationController?.navigationBar.isHidden = true
            self.view.addSubview(self.emailToSendUIView)
        })
    }
}

extension MedicalExamViewController: NewEmailDelegate {
    func sendEmail(email: String, isGeneric: Bool) {
        if (self.medicalExam.patient != nil) {
//            ServerService.shared.sendEmailRequest(token: self.medicalExam.patient!.token, patientID: self.medicalExam.patient!.ID, email: email, completion: { (error) in
//                UIView.animate(withDuration: 0.8 , animations: {
//                    self.emailToSendUIView.removeFromSuperview()
//                    self.emailToSendUIView = nil
//                    self.blackUIView.removeFromSuperview()
//                    self.navigationController?.navigationBar.isHidden = false
//                })
//            })
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

