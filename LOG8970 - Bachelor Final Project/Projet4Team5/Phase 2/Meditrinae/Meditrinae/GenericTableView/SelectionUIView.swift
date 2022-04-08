//
//  TraitementSelectionUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit
import iOSDropDown
import TinyConstraints


struct optionsID {
    var ids: [Int]
    var strings: [String]
}

protocol CantSelectOptionDelegate {
    func printError(message: String)
}

protocol SelectionUIViewAddNewDelegate {
    func addNewUser(userType: ProfilType)
}

protocol SelectionUIViewAddClinicDelegate {
    func addNewClinic()
}

protocol SelectionUIIViewNewExamMedicalDelegate {
     func addNewExamMedical()
}

protocol SelectionNewQuestionnaireDelegate {
    func addNewQuestionnaire()
}

protocol EmailButtonDelegate {
    func sendEmail()
}

class SelectionUIView: UIView {
    
    var options: [DropDown]!
    var data: [Any]!
    var preLoadData: [Any]!
   
    var cantSelectOptionDelegate: CantSelectOptionDelegate!
    var selectionUIViewToVCDelegate: SelectionUIViewAddNewDelegate!
    var selectionNewQuestionnaireDelegate: SelectionNewQuestionnaireDelegate!
    var selectionUIViewAddClinicDelegate : SelectionUIViewAddClinicDelegate!
    var selectionUIIViewNewExamMedicalDelegate: SelectionUIIViewNewExamMedicalDelegate!
    var emailButtonDelegate: EmailButtonDelegate!
    
    
    var genericTableUIView: GenericTableUIView!
    
    var titleLabel: UILabel!
    var title: String!
    
    var addButton: UIButton!
    var newDataButton: UIButton!
    var newMedicalExamLabel: UILabel!
    var addLabel: UILabel!
    var newDataEntryLabel: UILabel!
    var alphaButton: UIButton!
    var emailButton: UIButton!
    
    var santeBlockedMessage: String = "Vous ne pouvez plus entrer de disgnostic puisque le patient est en santé."
    var isAllReadyThereMessage: String = "Vous ne pouvez pas insérer deux fois le même diagnostic."
    
    var blocked: Bool = false
    
    var user: ProfilAbstract!
    var medicalExam: MedicalExam?
    
    override init(frame: CGRect) {
         super.init(frame: frame)
     }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func buildUI(frame: CGRect, title: String, options: [optionsID], data: [Any]!, dropDown:Bool, preLoadData: [Any]? = nil, user: ProfilAbstract? = nil, medicalExam: MedicalExam?=nil, addSearchBar: Bool?=nil) {
        self.frame = frame
        self.data = data
        self.user = user ?? ProfilAbstract()
        self.medicalExam = medicalExam ?? nil
        let width = self.frame.width - 2 * (OUTTER_PADDING + BORDER_SIZE)
        self.layer.borderWidth = BORDER_SIZE
        self.layer.borderColor = DARK_GRAY.cgColor
        self.layer.cornerRadius = CORNER_RADIUS
        self.title = title
        var positionY: CGFloat = OUTTER_PADDING
        let positionX = OUTTER_PADDING
        
        titleLabel = UILabel()
        self.addSubview(titleLabel)
        titleLabel.setUp(text: self.title, origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT, width: width, textAlignment: .center)
        
        positionY += titleLabel.frame.height + PADDING
        
        let height = self.frame.height * 4/5 - OUTTER_PADDING - BORDER_SIZE - titleLabel.frame.height - PADDING - BORDER_SIZE - PADDING - OUTTER_PADDING
        
        let frameUIView = CGRect(x: positionX, y: positionY, width: width, height: height)
        let searchBar = addSearchBar ?? true
        genericTableUIView = GenericTableUIView(frame: frameUIView, search: searchBar)
        self.addSubview(genericTableUIView)
        
        positionY += height + PADDING
        
        addLabel = UILabel()
        if (self.user.type != .Patient) {
            addLabel.setUp(text: "Add", origin: CGPoint(x: positionX, y: positionY), font: SMALL_FONT)
            self.addSubview(addLabel)
        }
        
        var positionXCol2: CGFloat! = width - addLabel.frame.width - PADDING
        positionY += addLabel.frame.height + PADDING
        
        if (dropDown) {
            self.addDropDown(positionY: positionY, positionX: positionX, width: width, height: height, options: options)
        }
        else {
            if (self.user.type != .Patient) {
                addButton = UIButton()
                if let plusImage = UIImage(named: "plus") {
                    addButton.setUp(position: CGPoint(x: positionX, y: positionY), image: plusImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
                    addButton.addTarget(self, action: #selector(addButtonTapped), for: .touchUpInside)
                    self.addSubview(addButton)
                }
                positionXCol2 = width - BUTTON_HEIGHT - PADDING
                alphaButton = UIButton()
                if let plusImage = UIImage(named: "alpha") {
                    alphaButton.setUp(position: CGPoint(x: positionXCol2, y: positionY), image: plusImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
                    alphaButton.addTarget(self, action: #selector(alphaTapped), for: .touchUpInside)
                }
            }
            positionXCol2 = width - BUTTON_HEIGHT - PADDING
            emailButton = UIButton()
            if let emailImage = UIImage(named: "email") {
                emailButton.setUp(position: CGPoint(x: positionXCol2, y: positionY), image: emailImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
                emailButton.addTarget(self, action: #selector(emailTapped), for: .touchUpInside)
            }
        }
        
        
        if let preLoadData = preLoadData {
            self.preLoadData = preLoadData
            self.addData()
        }
    }
    
    func addSortButton() {
        self.addSubview(alphaButton)
    }
    func addEmailButton() {
         self.addSubview(emailButton)
    }
    
    @objc func alphaTapped(sender: UIButton) {
        self.genericTableUIView.alphaOrder()
    }
    @objc func emailTapped(sender: UIButton) {
        self.emailButtonDelegate.sendEmail()
    }
    
    @objc func addButtonTapped(sender: UIButton) {
        if (self.medicalExam != nil) {
            self.selectionNewQuestionnaireDelegate.addNewQuestionnaire()
        }
        else {
            switch self.user.type {
            case .SuperAdmin:
                selectionUIViewAddClinicDelegate.addNewClinic()
                break
            case .Admin:
                selectionUIViewToVCDelegate.addNewUser(userType: ProfilType.Praticien)
                break
            case .Praticien:
                selectionUIViewToVCDelegate.addNewUser(userType: ProfilType.Patient)
                break
            case .Secretaire:
                selectionUIViewToVCDelegate.addNewUser(userType: ProfilType.Patient)
                break
            case .Patient:
                break
            default:
                break
            }
        }
        
    }
    
    @objc func newDataButtonTapped(sender: UIButton) {
        selectionUIIViewNewExamMedicalDelegate.addNewExamMedical()
    }
    
    
    func addDropDown(positionY: CGFloat, positionX: CGFloat, width: CGFloat, height: CGFloat, options: [optionsID]) {
        var frame = CGRect(x: positionX, y: positionY, width: width, height: DROP_DOWN_HIEGHT_SIZE)
         
        let mainDropDown = DropDown()
        mainDropDown.buildDropDown(frame: frame, strings: options[0].strings, ids: options[0].ids)
         self.addSubview(mainDropDown)
         
         var newFrame: CGRect!
         var frame1: CGRect!
         var positionX2: CGFloat!
         var frame2: CGRect!
         var positionX3: CGFloat!
         var frame3: CGRect!
         var newDropDown1 = DropDown()
         var newDropDown2 = DropDown()
         let tempFrame = CGRect(x: positionX, y: positionY, width: width/2 - PADDING, height: DROP_DOWN_HIEGHT_SIZE)
         
         if (options.count >= 3 ) {
            newDropDown1 = DropDown()
            newDropDown1.buildDropDown(frame: tempFrame, strings: options[1].strings, ids: options[1].ids)
            newDropDown2 = DropDown()
            newDropDown2.buildDropDown(frame: tempFrame, strings: options[2].strings, ids: options[2].ids)
         }
         
         let positionX1 = OUTTER_PADDING + width / 2 + PADDING
        
         mainDropDown.didSelect{(selectedText , index ,id) in
             var ID = String(id)
             if (selectedText == "Myalgie" || selectedText == "Douleur Myofasciale Réf."){
                 if (options.count >= 3) {
                     
                     frame = CGRect(x: OUTTER_PADDING, y: positionY, width: width/2 - PADDING, height: DROP_DOWN_HIEGHT_SIZE)
                     newFrame = CGRect(x: positionX1, y: positionY, width: width/2 - PADDING, height: DROP_DOWN_HIEGHT_SIZE)
                     
                     UIView.animate(withDuration: 0.5) {
                         mainDropDown.frame = frame
                         newDropDown1.frame = newFrame
                         if (newDropDown1.superview == nil) {
                             self.addSubview(newDropDown1)
                         }
                     }
                     
                     newDropDown1.didSelect{(selectedText1 , index1 ,id1) in
                         
                         frame1 = CGRect(x: OUTTER_PADDING, y: positionY, width: width/3 - PADDING, height: DROP_DOWN_HIEGHT_SIZE)
                         
                         positionX2 = OUTTER_PADDING + width/3 + PADDING
                         frame2 = CGRect(x: positionX2, y: positionY, width: width/3 - PADDING, height: DROP_DOWN_HIEGHT_SIZE)
                         
                         positionX3 = OUTTER_PADDING + width * 2/3 + 2 * PADDING
                         frame3 = CGRect(x: positionX3, y: positionY, width: width/3 - PADDING, height: DROP_DOWN_HIEGHT_SIZE)
                         
                         UIView.animate(withDuration: 0.5) {
                             mainDropDown.frame = frame1
                             newDropDown1.frame = frame2
                             newDropDown2.frame = frame3
                             if (newDropDown2.superview == nil) {
                                 self.addSubview(newDropDown2)
                             }
                         }
                         
                         newDropDown2.didSelect{(selectedText2 , index2 ,id2) in
                              ID = String(id) + String(id1) + String(id2)
                              if let item = self.getItemFromData(id: ID) {
                                 if (!self.checkInserted(id: Int(ID)!)) {
                                     if (self.checkSante()) {
                                         self.cantSelectOptionDelegate.printError(message: self.santeBlockedMessage)
                                     }
                                     else {
                                        self.genericTableUIView.addToTableView(item: item)
                                     }
                                 }
                                 else {
                                     self.cantSelectOptionDelegate.printError(message: self.isAllReadyThereMessage)
                                 }
                                 newDropDown1.removeFromSuperview()
                                 newDropDown2.removeFromSuperview()
                                 newDropDown1 = DropDown()
                                 newDropDown1.buildDropDown(frame: tempFrame, strings: options[1].strings, ids: options[1].ids)
                                 newDropDown2 = DropDown()
                                 newDropDown2.buildDropDown(frame: tempFrame, strings: options[2].strings, ids: options[2].ids)
                                 mainDropDown.selectedIndex = 0
                                 mainDropDown.selectedRowColor = LIGHT_GRAY
                                 UIView.animate(withDuration: 0.5) {
                                     mainDropDown.frame = CGRect(x: positionX, y: positionY, width: width - PADDING, height: DROP_DOWN_HIEGHT_SIZE)
                                 }
                             }
                         }
                     }
                 }
             }
             else {
                 if let item = self.getItemFromData(id: ID) {
                     if (!self.checkInserted(id: Int(ID)!)) {
                         if (self.checkSante()) {
                             self.cantSelectOptionDelegate.printError(message: self.santeBlockedMessage)
                         } else {
                            self.genericTableUIView.addToTableView(item: item)
                         }
                     }
                     else {
                         self.cantSelectOptionDelegate.printError(message: self.isAllReadyThereMessage)
                     }
                     mainDropDown.selectedIndex = 0
                     mainDropDown.selectedRowColor = LIGHT_GRAY
                 }
                 if (options.count >= 3) {
                     newDropDown1.removeFromSuperview()
                     newDropDown2.removeFromSuperview()
                     newDropDown1 = DropDown()
                     newDropDown1.buildDropDown(frame: tempFrame, strings: options[1].strings, ids: options[1].ids)
                     newDropDown2 = DropDown()
                     newDropDown2.buildDropDown(frame: tempFrame, strings: options[2].strings, ids: options[2].ids)
                 }
                 mainDropDown.frame = CGRect(x: positionX, y: positionY, width: width, height: DROP_DOWN_HIEGHT_SIZE)
             }
         }
    }
    
    func checkSante() -> Bool {
        checkInserted(id: 1)
    }
    
    func checkInserted(id: Int) -> Bool {
        for item in self.genericTableUIView.items {
            if (String(id) == item.ID) {
                return true
            }
        }
        return false
    }
    
    func getItemFromData(id: String)-> TableItem? {
        for item in data {
            if let item = item as? Questionnaire {
                if (item.ID == id) {
                    let tableItem = TableItem(name: item.name, ID: item.ID! , active: true, questionnaire: item)
                    return tableItem
                }
            }
            if let item = item as? Question {
                let itemID = String(item.intID!)
                if (itemID == id) {
                    let tableItem = TableItem(name: item.text, ID: itemID, active: true, question: item)
                    return tableItem
                }
            }
            if let item = item as? Patient {
                if (item.ID == id) {
                    let tableItem = TableItem(name: item.firstname + " " + item.lastname, ID: item.ID, active: true, user: item)
                    return tableItem
                }
            }
        }
        return nil
    }
    
    func addData() {
        if let items = self.preLoadData as? [ProfilAbstract] {
            for item in items {
                let tableItem = TableItem(name: (item.firstname + " " + item.lastname), ID: item.ID, active: true, user: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        if let items = self.preLoadData as? [Clinic] {
            for item in items {
                let tableItem = TableItem(name: (item.name!), ID: item.id!, active: true, clinic: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        else if let items = self.preLoadData as? [Questionnaire] {
            for item in items {
                let active = (item.medicalExamID != nil)
                let tableItem = TableItem(name: item.name, ID: item.ID!, active: active, questionnaire: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        else if let items = self.preLoadData as? [MedicalExam] {
            for item in items {
                let tableItem = TableItem(name: "Examen medical: " + item.dateCreated.print(), ID: item.medicalExamID ?? "",active: true, medicalExam: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        else if let items = self.preLoadData as? [MedicalNote] {
            for item in items {
                let tableItem = TableItem(name: item.title.print(), ID: "",active: true, note: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        else if let items = self.preLoadData as? [ExamResult] {
            for item in items {
                for (key, value) in item.listQuestionnaire.questionnaires {
                    let active = (value.medicalExamID != nil)
                    let tableItem = TableItem(name: key, ID: value.ID!, active: active, questionnaire: value)
                    self.genericTableUIView.addToTableView(item: tableItem)
                }
            }
        }
    }
    
    
    func reloadData(data: [Any]) {
        self.preLoadData = data
        self.genericTableUIView.deleteAllItems()
        if let items = self.preLoadData as? [ProfilAbstract] {
            for item in items {
                let tableItem = TableItem(name: (item.firstname + " " + item.lastname), ID: item.ID, active: true, user: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        if let items = self.preLoadData as? [Clinic] {
            for item in items {
                let tableItem = TableItem(name: (item.name!), ID: item.id!, active: true, clinic: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        else if let items = self.preLoadData as? [Questionnaire] {
            for item in items {
                let active = (item.medicalExamID != nil)
                let tableItem = TableItem(name: item.name, ID: item.ID!, active: active, questionnaire: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        else if let items = self.preLoadData as? [MedicalExam] {
            for item in items {
                let tableItem = TableItem(name: "Examen medical: " + item.dateCreated.print(), ID: item.medicalExamID ?? "",active: true, medicalExam: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        else if let items = self.preLoadData as? [MedicalNote] {
            for item in items {
                let tableItem = TableItem(name: item.title.print(), ID: "", active: true, note: item)
                self.genericTableUIView.addToTableView(item: tableItem)
            }
        }
        else if let items = self.preLoadData as? [ExamResult] {
            for item in items {
                for (key, value) in item.listQuestionnaire.questionnaires {
                    let active = (value.medicalExamID != nil)
                    let tableItem = TableItem(name: key, ID: value.ID!, active: active, questionnaire: value)
                    self.genericTableUIView.addToTableView(item: tableItem)
                }
            }
        }
    }
    
    func exportData()-> [Question] {
        if let data = data as? [Question] {
            return data
        }
        return []
    }
}
