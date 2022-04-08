//
//  InfoView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

protocol InfoUIViewDelegate {
    func changePassword()
    func updateUser()
}

protocol InfoUIViewPatientDelegate {
    func emailToSend()
    func noteToAdd()
    func allQuestionnaires()
}

class InfoUIView: UIView {
    
    var firstNameLabel: UILabel!
    var lastNameLabel: UILabel!
    var ageLabel: UILabel!
    var newUserUIView: UIView!
    var lastVisitDateUILabel: UILabel!
    var nextVisistDateUILabel: Date!
    var emailButton: UIButton!
    var clinicLabel: UILabel!
    
    var user: ProfilAbstract!
    
    var infoUIViewDelegate: InfoUIViewDelegate!
    var infoUIViewPatientDelegate: InfoUIViewPatientDelegate!
    
    override init(frame: CGRect) {
          super.init(frame: frame)
      }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func builUIView(user: ProfilAbstract) {
        self.user = user
        self.layer.borderWidth = BORDER_SIZE
        self.layer.cornerRadius = CORNER_RADIUS
        self.layer.borderColor = DARK_GRAY.cgColor
        
        let width = self.frame.width - 2 * OUTTER_PADDING - 2 * BORDER_SIZE
        
        var x: CGFloat = OUTTER_PADDING + BORDER_SIZE
        var y: CGFloat = OUTTER_PADDING + BORDER_SIZE
        
        let titleLabel = UILabel()
        self.addSubview(titleLabel)
        titleLabel.setUp(text: user.getProfilTypeName(), origin: CGPoint(x: x, y: y), font: TITLE_FONT)
        
        y += titleLabel.frame.height + OUTTER_PADDING
        
        
        firstNameLabel = UILabel()
        self.addSubview(firstNameLabel)
        firstNameLabel.setUp(text: user.firstname, origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT, width: width)
        
        y += firstNameLabel.frame.height + PADDING
        
        lastNameLabel = UILabel()
        self.addSubview(lastNameLabel)
        lastNameLabel.setUp(text: user.lastname, origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT, width: width)
        
        y += lastNameLabel.frame.height + PADDING
        x = OUTTER_PADDING + BORDER_SIZE
        
        if (user.type == ProfilType.Patient) {
            if let birthDate = user.dateOfBirth {
                let birthDateLabel = UILabel()
                self.addSubview(birthDateLabel)
                let components = birthDate.calculateAge()
                let ageYears = components.year
                let ageMonths = components.month
                let ageDays = components.day
                let ageText = "\(ageYears!) years, \(ageMonths!) months, \(ageDays!) days"
                birthDateLabel.setUp(text: "Age: " + ageText , origin: CGPoint(x: x, y: y))
                y += birthDateLabel.frame.height + PADDING
            }
        }
        
        var clinicName = "Sans nom"
        if (user.clinic != nil) {
            clinicName = user.clinic.name ?? "Sans nom"
        }
        
        clinicLabel = UILabel()
        self.addSubview(clinicLabel)
        clinicLabel.setUp(text: "Clinic: " + clinicName, origin: CGPoint(x: x, y: y), width: width)
        
        y += clinicLabel.frame.height + PADDING
        
        if user.gender != nil {
            let genderLabel = UILabel()
            self.addSubview(genderLabel)
            genderLabel.setUp(text: user.genderToString(), origin: CGPoint(x: x, y: y))
            y += genderLabel.frame.height + PADDING
        }
        
        let updateUserButton = UIButton()
        if let updateImage = UIImage(named: "settings") {
            self.addSubview(updateUserButton)
            updateUserButton.setUp(position: CGPoint(x: x, y: y), image: updateImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
            updateUserButton.addTarget(self, action: #selector(updateUserButtonTapped), for: .touchUpInside)
        }
        
        x += updateUserButton.frame.width + PADDING
        
        if (user.type != ProfilType.Patient) {
            let changePasswordButton = UIButton()
            if let checkImage = UIImage(named: "passwordChange") {
                self.addSubview(changePasswordButton)
                changePasswordButton.setUp(position: CGPoint(x: x, y: y), image: checkImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
                changePasswordButton.addTarget(self, action: #selector(changePasswordButtonTapped), for: .touchUpInside)
            }
        }
        else {
            emailButton = UIButton()
            if let emailImage = UIImage(named: "email") {
                emailButton.setUp(position: CGPoint(x: x, y: y), image: emailImage, width: BUTTON_HEIGHT, height: BUTTON_HEIGHT)
                emailButton.addTarget(self, action: #selector(emailButtonTapped), for: .touchUpInside)
                self.addSubview(emailButton)
                x += emailButton.frame.width + OUTTER_PADDING
            }
            let noteButton = UIButton()
            if let noteImage = UIImage(named: "note") {
                self.addSubview(noteButton)
                noteButton.setUp(position: CGPoint(x: x, y: y), image: noteImage, width: BUTTON_HEIGHT, height: BUTTON_HEIGHT)
                noteButton.addTarget(self, action: #selector(noteButtonTapped), for: .touchUpInside)
            }
        }
    }
    
    func buildUIView(medicalExam: MedicalExam) {
        self.layer.borderWidth = BORDER_SIZE
        self.layer.cornerRadius = CORNER_RADIUS
        self.layer.borderColor = DARK_GRAY.cgColor
        
        
        var x: CGFloat = OUTTER_PADDING + BORDER_SIZE
        var y: CGFloat = OUTTER_PADDING + BORDER_SIZE
        
        let titleLabel = UILabel()
        self.addSubview(titleLabel)
        titleLabel.setUp(text: "Examen medical: " + medicalExam.dateCreated.print(), origin: CGPoint(x: x, y: y), font: TITLE_FONT)
        
        y += titleLabel.frame.height + OUTTER_PADDING
        
        firstNameLabel = UILabel()
        self.addSubview(firstNameLabel)
        firstNameLabel.setUp(text: medicalExam.patient?.firstname ?? "", origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT)
        
        x += firstNameLabel.frame.width + PADDING
        
        lastNameLabel = UILabel()
        self.addSubview(lastNameLabel)
        lastNameLabel.setUp(text: medicalExam.patient?.lastname ?? "", origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT)
        
        y += firstNameLabel.frame.height + OUTTER_PADDING
        x = OUTTER_PADDING + BORDER_SIZE
        
        emailButton = UIButton()
        if let emailImage = UIImage(named: "email") {
            emailButton.setUp(position: CGPoint(x: x, y: y), image: emailImage, width: BUTTON_HEIGHT, height: BUTTON_HEIGHT)
            emailButton.addTarget(self, action: #selector(emailButtonTapped), for: .touchUpInside)
            self.addSubview(emailButton)
            x += emailButton.frame.width + OUTTER_PADDING
        }
    }
    
    func addPatientModeButton() {
        let safeArea = self.layoutMarginsGuide
        let allQuestionnairesButton = UIButton()
        self.addSubview(allQuestionnairesButton)
        if let allDocsImage = UIImage(named: "docs") {
            allQuestionnairesButton.setUp(position: CGPoint(x: 0, y: 0), image: allDocsImage, width: BUTTON_HEIGHT, height: BUTTON_HEIGHT)
            allQuestionnairesButton.addTarget(self, action: #selector(allQuestionnaireTapped), for: .touchUpInside)
        }
        allQuestionnairesButton.translatesAutoresizingMaskIntoConstraints = false
        allQuestionnairesButton.rightAnchor.constraint(equalTo: safeArea.rightAnchor, constant: -OUTTER_PADDING).isActive = true
        allQuestionnairesButton.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor, constant: -OUTTER_PADDING).isActive = true
        allQuestionnairesButton.heightAnchor.constraint(equalToConstant: BUTTON_HEIGHT).isActive = true
    }
    
    
    @objc func allQuestionnaireTapped(sender: UIButton) {
        infoUIViewPatientDelegate.allQuestionnaires()
    }
    
    func reloadUser(user: ProfilAbstract) {
        firstNameLabel.text = user.firstname
        lastNameLabel.text = user.lastname
        clinicLabel.text = user.clinic?.name ?? ""
        self.layoutIfNeeded()
    }

    @objc func changePasswordButtonTapped(sender: UIButton) {
        infoUIViewDelegate.changePassword()
    }
    @objc func updateUserButtonTapped(sender: UIButton) {
        infoUIViewDelegate.updateUser()
    }
    @objc func emailButtonTapped(sender: UIButton) {
        infoUIViewPatientDelegate.emailToSend()
    }
    @objc func noteButtonTapped(sender: UIButton) {
        infoUIViewPatientDelegate.noteToAdd()
    }
    
}
