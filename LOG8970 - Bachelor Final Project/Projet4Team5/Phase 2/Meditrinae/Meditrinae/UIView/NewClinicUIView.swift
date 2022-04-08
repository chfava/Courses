//
//  NewClinicUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-16.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit
import iOSDropDown

protocol NewClinicDelegate {
    func sendNewClinic(newClinic: Clinic, update: Bool)
    func dissmissClinic()
}

class NewClinicUIView: UIView {
    var clinicName: UITextField!
    var emailTextField: UITextField!
    var phoneTextField: UITextField!
    var admin: Admin!
    
    var civicNumberTextField: UITextField!
    var addressTextField: UITextField!
    var postalCodeTextField: UITextField!
    var countryDropDown: DropDown!
    
    var update: Bool!
    var title: String!
    var user: ProfilAbstract!
    var newClinicDelegate: NewClinicDelegate!
    var clinic: Clinic!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
        
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    init(frame: CGRect, user: ProfilAbstract, update: Bool?=nil) {
        super.init(frame: frame)
        buildUI(frame: frame, user: user, update: update)
    }
    
    func buildUI(frame: CGRect, user: ProfilAbstract, update: Bool?=nil) {
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
        
        let textFieldWidth = width - 2 * OUTTER_PADDING
        
        if let update = update {
            if (update) {
                setTitle(update: update)
            }
        }
        else {
            title = "Nouvelle Clinic: "
        }
        
        let pageTitleLabel = UILabel()
        self.addSubview(pageTitleLabel)
        pageTitleLabel.setUp(text: title, origin: CGPoint(x: positionX, y: positionY), font: TITLE_FONT)
        
        positionY += pageTitleLabel.frame.height + 2 * OUTTER_PADDING
        
        positionX = 2 * OUTTER_PADDING
        
        clinicName = UITextField()
        self.addSubview(clinicName)
        clinicName.setUp(placeHolder: "Nom de la clinic", position: CGPoint(x: positionX, y: positionY), width: textFieldWidth, height:  TEXT_FIELD_INPUT_HEIGHT)
        
        positionY += clinicName.frame.height + OUTTER_PADDING
        
        
        emailTextField = UITextField()
        self.addSubview(emailTextField)
        emailTextField.setUp(placeHolder: "Email", position: CGPoint(x: positionX, y: positionY), width: textFieldWidth, height:    TEXT_FIELD_INPUT_HEIGHT)
        
        positionY += emailTextField.frame.height + OUTTER_PADDING
            
        positionX = 2 * OUTTER_PADDING
        
        let positionXCol1 = 2 * OUTTER_PADDING
        let widthCivicNb: CGFloat = 150
        
        let positionCol2 = 2 * OUTTER_PADDING + widthCivicNb + PADDING
        let widthAdress: CGFloat = textFieldWidth - 2 * (widthCivicNb + PADDING)
        
        let positionCol3 = positionCol2 + PADDING + widthAdress
        
        civicNumberTextField = UITextField()
        self.addSubview(civicNumberTextField)
        civicNumberTextField.setUp(placeHolder: "Num. Civic", position: CGPoint(x: positionXCol1, y: positionY), width:     widthCivicNb,   height:TEXT_FIELD_INPUT_HEIGHT)
        
        addressTextField = UITextField()
        self.addSubview(addressTextField)
        addressTextField.setUp(placeHolder: "Addresse", position: CGPoint(x: positionCol2, y: positionY), width: widthAdress,   height:   TEXT_FIELD_INPUT_HEIGHT)
        
        postalCodeTextField = UITextField()
        self.addSubview(postalCodeTextField)
        postalCodeTextField.setUp(placeHolder: "Code Postal", position: CGPoint(x: positionCol3, y: positionY), width: widthCivicNb,       height:TEXT_FIELD_INPUT_HEIGHT)
        
        
        positionY += addressTextField.frame.height + OUTTER_PADDING
        
        let genreLabel = UILabel()
        genreLabel.setUp(text: "Sexe: ", origin: CGPoint(x: positionX, y: positionY + 2/3 * OUTTER_PADDING))
        self.addSubview(genreLabel)
        
        positionX += genreLabel.frame.width + OUTTER_PADDING
            
        phoneTextField = UITextField()
        self.addSubview(phoneTextField)
        phoneTextField.setUp(placeHolder: "Numero de téléphone", position: CGPoint(x: positionX, y: positionY), width: textFieldWidth - genreLabel.frame.width - OUTTER_PADDING, height: TEXT_FIELD_INPUT_HEIGHT,keybord: .numberPad)
        
        positionY += phoneTextField.frame.height + 3 * OUTTER_PADDING
        
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
    }
    
    func setTitle(update: Bool) {
        if (update) {
            title = self.user.clinic.name
        }
        else {
            title = "Nouvelle Clinic: "
        }
    }


    @objc func checkbuttonTapped(sender: UIButton) {
        let address = self.civicNumberTextField.text! + "_" + self.addressTextField.text! + "_" +  self.postalCodeTextField.text!
        clinic = Clinic(name: clinicName.text!, id: "", address: address, email: emailTextField.text!, phone: phoneTextField.text!)
        self.newClinicDelegate.sendNewClinic(newClinic: clinic, update: update)
        self.newClinicDelegate.dissmissClinic()
    }
    
    @objc func crossbuttonTapped(sender: UIButton) {
        self.newClinicDelegate.dissmissClinic()
    }
}
