//
//  newUserGenericUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-13.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit
import iOSDropDown
import PhoneNumberKit

protocol NewUserDelegate {
    func sendNewUser(newUser: ProfilAbstract)
    func updateUser(user: ProfilAbstract)
    func dissmissNewUser(newUser: ProfilAbstract?, update: Bool)
}

class NewUserUIView: UIView {
    
    var firstNameTextField: UITextField!
    var lastNameTextField: UITextField!
    var titleDropDown: DropDown!
    var emailTextField: UITextField!
    var birthDatePicker: UIDatePicker!
    var user: ProfilAbstract!
    var newUserDelegate: NewUserDelegate!
    var gender: Gender?
    var genreDropDown: DropDown!
    var genreLabel: UILabel!
    
    var addressTextField: UITextField!
    var countryDropDown: DropDown!
    var phoneTextField: PhoneNumberTextField!
    var clinicNameLabel: UILabel!
    var update: Bool!
    var title: String!
    
    var birthDateLabel:UILabel!
    
    var clinics: [Clinic]!
    var clinicNames = [String]()
    var clinicsID = [Int]()
    var clinicDropDown: DropDown!
    var clinicIDselected: String!
    var pageTitleLabel: UILabel!
    
    var userType: ProfilType!
    var newUser: ProfilAbstract!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
       
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func buildUI(frame: CGRect, user: ProfilAbstract, update: Bool?=nil, userType: ProfilType) {
        self.user = user
        self.update = update ?? false
        self.frame = frame
        self.layer.cornerRadius = CORNER_RADIUS
        self.layer.borderWidth = BORDER_SIZE
        self.layer.borderColor = DARK_GRAY.cgColor
        self.backgroundColor = WHITE
    
        let width = self.frame.width - 2 * OUTTER_PADDING
        var positionX =  OUTTER_PADDING
        var positionY = OUTTER_PADDING
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(self.endEditing(_:)))
        tap.cancelsTouchesInView = false
        self.addGestureRecognizer(tap)
        
        let textFieldWidth = width - 2 * OUTTER_PADDING
        if (self.update) {
            title = "Modification: "
        }
        else {
            title = "Nouveau: "
        }
        pageTitleLabel = UILabel()
        self.addSubview(pageTitleLabel)
        pageTitleLabel.setUp(text: title, origin: CGPoint(x: positionX, y: positionY), font: TITLE_FONT, width: width, textAlignment: .center)
        
        positionY += pageTitleLabel.frame.height + 2 * OUTTER_PADDING
        
        positionX = 2 * OUTTER_PADDING
        
        firstNameTextField = UITextField()
        self.addSubview(firstNameTextField)
        firstNameTextField.setUp(placeHolder: "Prénom", position: CGPoint(x: positionX, y: positionY), width: textFieldWidth, height:  TEXT_FIELD_INPUT_HEIGHT)
        
        positionY += firstNameTextField.frame.height + OUTTER_PADDING
        
        lastNameTextField = UITextField()
        self.addSubview(lastNameTextField)
        lastNameTextField.setUp(placeHolder: "Nom de famille", position: CGPoint(x: positionX, y: positionY), width: textFieldWidth, height:TEXT_FIELD_INPUT_HEIGHT)
        
        positionY += lastNameTextField.frame.height + OUTTER_PADDING
        
    
        emailTextField = UITextField()
        emailTextField.setUp(placeHolder: "Email", position: CGPoint(x: positionX, y: positionY), width: textFieldWidth, height:    TEXT_FIELD_INPUT_HEIGHT)
        emailTextField.keyboardType = .emailAddress
        emailTextField.autocapitalizationType = .none
        emailTextField.addTarget(self, action: #selector(emailTextFieldDidChange), for: .editingChanged)
        emailTextField.delegate = self
        
        positionY += emailTextField.frame.height + OUTTER_PADDING
            
        positionX = 2 * OUTTER_PADDING
        
        birthDateLabel = UILabel()
        birthDateLabel.setUp(text: "Date de naissance: ", origin: CGPoint(x: positionX, y: positionY + 2/3 * OUTTER_PADDING))
        
        positionX += birthDateLabel.frame.width + OUTTER_PADDING
        
        birthDatePicker = UIDatePicker()
        birthDatePicker.datePickerMode = UIDatePicker.Mode.date
        birthDatePicker.frame = CGRect(x: positionX, y: positionY, width: textFieldWidth -  birthDateLabel.frame.width -    OUTTER_PADDING,   height:DATE_PICKER_HEIGHT)
        birthDatePicker.timeZone = NSTimeZone.local
        birthDatePicker.backgroundColor = UIColor.white
        
        positionY += birthDatePicker.frame.height + OUTTER_PADDING
        positionX = 2 * OUTTER_PADDING
        
        
        addressTextField = UITextField()
        addressTextField.setUp(placeHolder: "Addresse:", position: CGPoint(x: positionX, y: positionY), width: textFieldWidth, height: TEXT_FIELD_INPUT_HEIGHT)
        addressTextField.keyboardType = .phonePad
        positionY += addressTextField.frame.height + OUTTER_PADDING
        
        phoneTextField = PhoneNumberTextField()
        phoneTextField.setUp(placeHolder: "Numero de téléphone", position: CGPoint(x: positionX, y: positionY), width: textFieldWidth, height: TEXT_FIELD_INPUT_HEIGHT, keybord: .numberPad)
        phoneTextField.delegate = self
        phoneTextField.addTarget(self, action: #selector(phoneNumberTextFieldDidChange), for: .editingChanged)
        phoneTextField.withFlag = true
        phoneTextField.withExamplePlaceholder = true
        
        positionY += phoneTextField.frame.height + OUTTER_PADDING
        
        genreLabel = UILabel()
        genreLabel.setUp(text: "Sexe: ", origin: CGPoint(x: positionX, y: positionY + 2/3 * OUTTER_PADDING))
        
        positionX += genreLabel.frame.width + OUTTER_PADDING
        
        genreDropDown = DropDown()
        let dropDownFrame = CGRect(x: positionX, y: positionY, width: textFieldWidth - genreLabel.frame.width - 2 * OUTTER_PADDING, height: DROP_DOWN_HIEGHT_SIZE)
        genreDropDown.buildDropDown(frame: dropDownFrame, strings: ["Homme", "Femme", "Autre"], ids: [1,2,3])
        genreDropDown.didSelect{(selectedText , index ,id) in
            let gender: Gender!
            switch id {
            case 1:
                gender = Gender.men
                break
            case 2:
                gender = Gender.woman
                break
            case 3:
                gender = Gender.other
                break
            default:
                gender = Gender.men
            }
            self.gender = gender
        }
        
        positionX = 2 * OUTTER_PADDING
        positionY += genreDropDown.frame.height + OUTTER_PADDING
      
        clinicNameLabel = UILabel()
        clinicNameLabel.setUp(text: "Clinique: ", origin: CGPoint(x: positionX, y: positionY + 2/3 * OUTTER_PADDING))
        
        positionX += clinicNameLabel.frame.width + OUTTER_PADDING
        
        let clinicFrame = CGRect(x: positionX, y: positionY, width: textFieldWidth - clinicNameLabel.frame.width - 2 * OUTTER_PADDING, height: DROP_DOWN_HIEGHT_SIZE)
        self.getAllClinics(completion: {(error) in
            self.clinicDropDown = DropDown()
            self.clinicDropDown.didSelect(completion: {(selectedText , index ,id) in
                self.clinicIDselected = self.clinics[index].id ?? ""
            })
            self.clinicDropDown.buildDropDown(frame: clinicFrame, strings: self.clinicNames, ids: self.clinicsID)
            
            if let update = update {
                if (update) {
                    if let clinic = self.user.clinic {
                        self.clinicDropDown.text = clinic.name ?? ""
                    }
                }
            }
            
            positionY += self.clinicDropDown.frame.height + 3 * OUTTER_PADDING
            positionX = 2 * OUTTER_PADDING
        })
        
        let checkButton = UIButton()
        self.addSubview(checkButton)
        if let checkImage = UIImage(named: "checkMark") {
            checkButton.setUp(position: CGPoint(x: 0, y: 0), image: checkImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
            checkButton.addTarget(self, action: #selector(checkbuttonTapped), for: .touchUpInside)
        }
        
        let safeArea = self.layoutMarginsGuide
        checkButton.translatesAutoresizingMaskIntoConstraints = false
        checkButton.leftAnchor.constraint(equalTo: safeArea.leftAnchor, constant: OUTTER_PADDING).isActive = true
        checkButton.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor, constant: -OUTTER_PADDING).isActive = true
        checkButton.heightAnchor.constraint(equalToConstant: 60 ).isActive = true
        
        let dismissButton = UIButton()
        self.addSubview(dismissButton)
        if let crossImage = UIImage(named: "cross") {
            dismissButton.setUp(position: CGPoint(x: 0, y: 0), image: crossImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
            dismissButton.addTarget(self, action: #selector(crossbuttonTapped), for: .touchUpInside)
        }
        
        dismissButton.translatesAutoresizingMaskIntoConstraints = false
        dismissButton.rightAnchor.constraint(equalTo: safeArea.rightAnchor, constant: -OUTTER_PADDING).isActive = true
        dismissButton.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor, constant: -OUTTER_PADDING).isActive = true
        dismissButton.heightAnchor.constraint(equalToConstant: 60 ).isActive = true
        
         if (self.update) {
            title = "Modification de l'utilisateur"
            self.userType = user.type
            setFields(profil: self.user.type)
        }
        else {
            setProfilType(profil: userType)
            self.userType = userType
        }
    }

    
    func setProfilType(profil: ProfilType) {
        var elements = [UIView]()
        switch profil {
        case .Admin:
            title = "Nouveau Admin: "
            self.addSubview(clinicNameLabel)
            elements.append(clinicNameLabel)
            self.addSubview(clinicDropDown)
            elements.append(clinicDropDown)
            break
        case .Praticien:
            title = "Nouveau Praticien: "
            self.addSubview(emailTextField)
            elements.append(emailTextField)
            self.addSubview(addressTextField)
            elements.append(addressTextField)
            self.addSubview(phoneTextField)
            elements.append(phoneTextField)
            break
        case .Secretaire:
            title = "Nouveau Secretaire: "
            self.addSubview(emailTextField)
            elements.append(emailTextField)
            self.addSubview(addressTextField)
            elements.append(addressTextField)
            self.addSubview(phoneTextField)
            elements.append(phoneTextField)
            break
        case .Patient:
            title = "Nouveau Patient: "
            self.addSubview(genreDropDown)
            self.addSubview(genreLabel)
            elements.append(genreDropDown)
             elements.append(genreLabel)
            self.addSubview(addressTextField)
            elements.append(addressTextField)
            self.addSubview(birthDateLabel)
            self.addSubview(birthDatePicker)
            elements.append(birthDateLabel)
            elements.append(birthDatePicker)
            break
        case .SuperAdmin:
            title = "Nouveau Super Administrateur"
            break
        }
        self.pageTitleLabel.text = title
    }
    
    func setUIElements(elements: [UIView]) {
        if !elements.isEmpty {
            let topElement = elements.first!
            topElement.translatesAutoresizingMaskIntoConstraints = false
            topElement.topAnchor.constraint(equalTo: lastNameTextField.bottomAnchor, constant: PADDING).isActive = true
            var previousElement: UIView = topElement
            for element in elements {
                element.translatesAutoresizingMaskIntoConstraints = false
                element.topAnchor.constraint(equalTo: previousElement.bottomAnchor, constant: PADDING).isActive = true
                previousElement = element
            }
        }
    }
    
    func setFields(profil: ProfilType) {
        UIView.animate(withDuration: 0.8, animations: {
            self.firstNameTextField.text! = self.user.firstname
            self.lastNameTextField.text! = self.user.lastname
            
            switch profil {
            case .Praticien:
                self.addSubview(self.emailTextField)
                self.emailTextField.text = self.user.email ?? ""
                self.addSubview(self.addressTextField)
                self.addressTextField.text = self.user.addresse ?? ""
                self.addSubview(self.phoneTextField)
                self.phoneTextField.text = self.user.phone ?? ""
                break
            case .Patient:
                self.addSubview(self.addressTextField)
                self.addressTextField.text = self.user.addresse ?? ""
                self.addSubview(self.birthDatePicker)
                self.addSubview(self.birthDateLabel)
                self.birthDatePicker.date = self.user.dateOfBirth ?? Date()
                break
            case .Admin:
                self.addSubview(self.clinicNameLabel)
                self.clinicNameLabel.text = self.user.clinic.name ?? ""
                break
            case .Secretaire:
                self.addSubview(self.emailTextField)
                self.emailTextField.text = self.user.email ?? ""
                self.addSubview(self.addressTextField)
                self.addressTextField.text = self.user.addresse ?? ""
                self.addSubview(self.phoneTextField)
                self.phoneTextField.text = self.user.phone ?? ""
                break
            case .SuperAdmin:
                break
            }
        })
    }
    
    func getAllClinics(completion:@escaping (Error?) -> Void)  {
        ServerService.shared.getAllClinics(token: self.user.token, completion: {(error, clinics) in
            if let clinics = clinics {
                self.clinics = clinics
                var counter = 1
                for clinic in self.clinics {
                    self.clinicNames.append(clinic.name ?? "")
                    self.clinicsID.append(counter)
                    counter += 1
                }
            completion(nil)
            }
        })
    }
    
    @objc func checkbuttonTapped(sender: UIButton) {
        let date = Date()
        if (update) {
            switch userType {
            case .Admin:
                newUser = Admin(firstName: firstNameTextField.text!, lastName: lastNameTextField.text!, clinicID: clinicIDselected ?? "", token: self.user.token, dateCreated: date, dateModified: date, id: self.user.ID)
                break
            case .Praticien:
                newUser = Praticien(firstName: firstNameTextField.text!, lastName: lastNameTextField.text!, clinicID: self.user.clinicID, token: self.user.token, dateCreated: date, dateModified: date, id: self.user.ID, phone: phoneTextField.text ?? "", email: self.emailTextField.text ?? "", addresse: self.addressTextField.text ?? "")
                break
            case .Secretaire:
                newUser = Secretary(firstName: firstNameTextField.text!, lastName: lastNameTextField.text!, clinicID: self.user.clinicID, token: self.user.token, dateCreated: date, dateModified: date, id: self.user.ID)
                break
            case .Patient:
                newUser = Patient(firstName: firstNameTextField.text!, lastName: lastNameTextField.text!, genderString: self.user.genderToString(), token: self.user.token, dateOfBirth: birthDatePicker.date, clinicID: self.user.clinicID, dateCreated: date, dateModified: date, id: self.user.ID, address: self.addressTextField.text!, note: [], email: emailTextField.text!, medicalExams: [])
                break
            default:
                break
            }
        }
        else {
            switch userType {
            case .Admin:
                newUser = Admin(firstName: firstNameTextField.text!, lastName: lastNameTextField.text!, clinicID: clinicIDselected ?? "", token: self.user.token, dateCreated: date, dateModified: date, id: "")
                break
            case .Praticien:
                newUser = Praticien(firstName: firstNameTextField.text!, lastName: lastNameTextField.text!, clinicID: self.user.clinicID, token: self.user.token, dateCreated: date, dateModified: date, id: "", phone: phoneTextField.text!, email: self.emailTextField.text ?? "", addresse: self.addressTextField.text ?? "")
                break
            case .Secretaire:
                 newUser = Secretary(firstName: firstNameTextField.text!, lastName: lastNameTextField.text!, clinicID: self.user.clinicID, token: self.user.token, dateCreated: date, dateModified: date, id: "")
                break
            case .Patient:
                 newUser = Patient(firstName: firstNameTextField.text!, lastName: lastNameTextField.text!, genderString: self.user.genderToString(), token: self.user.token, dateOfBirth: birthDatePicker.date, clinicID: self.user.clinicID, dateCreated: date, dateModified: date, id: "", address: self.addressTextField.text!, note: [], email: emailTextField.text!, medicalExams: [])
                break
            default:
                break
            }
        }
        
        if(update) {
            newUserDelegate.updateUser(user: newUser)
        }
        else {
            newUserDelegate.sendNewUser(newUser: newUser)
        }
        newUserDelegate.dissmissNewUser(newUser: newUser, update: self.update)
    }
    
    @objc func crossbuttonTapped(sender: UIButton) {
        self.newUserDelegate.dissmissNewUser(newUser: nil, update: self.update)
    }
    
    func isValidEmail(email: String) -> Bool {
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailPred = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        
        return emailPred.evaluate(with: email)
    }
    
    @objc func emailTextFieldDidChange(textField: UITextField) {
        emailTextField.layer.borderColor = RED.cgColor
        if (isValidEmail(email: emailTextField.text!)) {
            emailTextField.layer.borderColor = GREEN.cgColor
        }
    }
    
    @objc func phoneNumberTextFieldDidChange(textField: UITextField) {
        phoneTextField.layer.borderColor = GREEN.cgColor
        if (phoneTextField.isValidNumber) {
            phoneTextField.layer.borderColor = GREEN.cgColor
        }
    }
    
    func touchesBegan(touches: NSSet, withEvent event: UIEvent) {
            self.endEditing(true)
     }
}

extension NewUserUIView: UITextFieldDelegate {
  
    private func textFieldShouldReturn(textField: UITextField) -> Bool {
          textField.resignFirstResponder()
          return true
    }

    internal func textFieldDidEndEditing(_ textField: UITextField) {
        textField.layer.borderColor = LIGHT_GRAY.cgColor
    }
}
