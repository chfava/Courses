//
//  FDIAbstract.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-14.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import iOSDropDown

class FDIAbstract: UIViewController {
    
    var nonEmptyObject = [AnyObject]()
    var questionnaire: Questionnaire!
    var nextButton: UIButton!
    var nextQuestionnaireSegue = ""
    var blackUIView: UIView!
    var medicalExam: MedicalExam!
    var rootViewController: PatientHomeViewController!
    var SCROLL_VIEW_HEIGHT: CGFloat = 3000
    var newNoteUIView: NoteUIView!
    
    var canSubmit: Bool = true
    
    let storyBoard = UIStoryboard(name: "Main", bundle: nil)
    
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
        setUpNavigationBar()
        self.questionnaire = self.medicalExam.examResult.listQuestionnaire!.questionnaires["FDI"]
    }
    
    func setUpNextButton() {
        if let nextImage = UIImage(named: "next") {
            let x = self.view.frame.width - 2 * OUTTER_PADDING - BUTTON_HEIGHT
            let y = self.view.frame.height - 4 * OUTTER_PADDING - BUTTON_HEIGHT
            nextButton = UIButton()
            nextButton.setUp(position: CGPoint(x: x, y: y), image: nextImage, width: BUTTON_HEIGHT, height: BUTTON_HEIGHT)
            nextButton.addTarget(self, action: #selector(nextbuttonAction), for: .touchUpInside)
            self.view.addSubview(nextButton)
            self.view.bringSubviewToFront(nextButton)
        }
    }
    
    func setUpNavigationBar() {
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
    
    @objc func noteButtonTapped(sender: UIButton) {
            self.view.addSubview(self.blackUIView)
            let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
            let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.view.frame.width - 2 * OUTTER_PADDING, height: self.view.frame.height * 2/3)
            self.newNoteUIView = NoteUIView(frame: frame)
            self.newNoteUIView.newNoteDelegate = self
            UIView.animate(withDuration: 0.5, animations: {
                self.navigationController?.navigationBar.isHidden = true
                self.view.addSubview(self.newNoteUIView)
                self.view.bringSubviewToFront(self.newNoteUIView)
           })
       }
    
    func getSwitchValue(input: UISwitch) -> String {
           if (input.isOn) {
               return "Y"
           }
           else {
               return "N"
           }
    }
       
    func getInputTextValue(input: UITextField) -> String{
           if ((input.text?.isEmpty)! == true) {
               return ""
           }
           else {
               return input.text!
           }
    }
    
    func getSegmentedControlValue(input: UISegmentedControl) -> String? {
        if (input.isSelected) {
            return input.titleForSegment(at: input.selectedSegmentIndex)!
        }
        return nil
    }
    
    func getDropDownValue(dropDown: DropDown) -> String{
        if (dropDown.text!.isEmpty) {
            return ""
        }
        else {
            return dropDown.text!
        }
    }
    func buildAnswers() {
        //nothing
    }
       
    func makeExport() {
        buildAnswers()
        if (!self.questionnaire.questions.isEmpty) {
            for question in questionnaire.questions {
                self.questionnaire.exportedData[question.ID!] = question.answer as? String
            }
        }
    }
    
  func checkNext() -> Bool {
        for item in self.nonEmptyObject {
            if let item = item as? UITextField {
                if (item.text!.isEmpty) {
                    return false
                }
            }
            if let item = item as? UISegmentedControl {
                print(item.selectedSegmentIndex)
                if (item.selectedSegmentIndex == -1) {
                          return false
                }
            }
          if let item = item as? DropDown {
              if (item.text!.isEmpty) {
                  return false
              }
          }
        }
        return true
    }
    
    @objc func nextbuttonAction(sender: UIButton!) {
        if checkNext() {
            self.buildAnswers()
            if let VC = self.storyBoard.instantiateViewController(identifier: self.nextQuestionnaireSegue) as? FDIAbstract {
                VC.medicalExam = self.medicalExam
                VC.rootViewController = self.rootViewController
                VC.canSubmit = self.canSubmit
                self.navigationController?.pushViewController(VC, animated: true)
            }
        }
        else {
            Alert.showBasic(title: "Erreur", message: "SVP répondre à toutes les questions.", vc: self)
        }
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(true)
        self.view.removeFromSuperview()
    }
}

extension FDIAbstract: UITextFieldDelegate {
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool
    {
            var allowedCharacters = CharacterSet.decimalDigits
            allowedCharacters.insert(charactersIn: "/")
            let characterSet = CharacterSet(charactersIn: string)
            return allowedCharacters.isSuperset(of: characterSet)
    }
}

extension FDIAbstract: NewNoteDelegate {
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

