//
//  AuthentificaitonUserUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-13.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

protocol AuthConfirmedDelegate {
    func getUserNameAndPassword(username: String, password: String, userToDel: ProfilAbstract, authAction: AuthAction)
    func dismissAuth()
}

enum AuthAction {
    case delete
    case signOut
}

class AuthentificationUserUIView: UIView {
    var usernameTextField: UITextField!
    var passwordTextField: UITextField!
    var authConfirmDelegate: AuthConfirmedDelegate!
    var userToDel: ProfilAbstract!
    var wrongPasswordLabel: UILabel!
    var authAction: AuthAction!
    
    init(frame: CGRect, user: ProfilAbstract, authAction: AuthAction) {
        super.init(frame: frame)
        self.userToDel = user
        self.authAction = authAction
        buildUI(frame: frame)
    }
       
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func buildUI(frame: CGRect) {
        self.layer.cornerRadius = CORNER_RADIUS
        self.layer.borderColor = DARK_GRAY.cgColor
        self.layer.borderWidth = BORDER_SIZE
        self.backgroundColor = WHITE
        let width = self.frame.width - 2 * OUTTER_PADDING
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(self.endEditing(_:)))
        tap.cancelsTouchesInView = false
        self.addGestureRecognizer(tap)
        
        let positionXCol1 = OUTTER_PADDING
        let positionXCol2 =  1/2 *  self.frame.width - 2 * OUTTER_PADDING
        var positionY = 3 * OUTTER_PADDING
        
        let usernameLabel = UILabel()
        self.addSubview(usernameLabel)
        usernameLabel.setUp(text: "Nom d'utilisateur: ", origin: CGPoint(x: positionXCol1, y: positionY), font: SUBTITLE_FONT)
        
        usernameTextField = UITextField()
        usernameTextField.setUp(placeHolder: "nom d'utilsateur", position: CGPoint(x: positionXCol2, y: positionY), width: TEXT_FIELD_WIDTH_LARGE, height: TEXT_FIELD_HEIGHT)
        self.addSubview(usernameTextField)
        usernameTextField.autocapitalizationType = .none
        usernameTextField.delegate = self
      
        positionY += usernameTextField.frame.height + 2 * OUTTER_PADDING
        
        let passwordLabel = UILabel()
        self.addSubview(passwordLabel)
        passwordLabel.setUp(text: "Mot de passe: ", origin: CGPoint(x: positionXCol1, y: positionY), font: SUBTITLE_FONT)
        
        passwordTextField = UITextField()
        passwordTextField.setUp(placeHolder: "password", position: CGPoint(x: positionXCol2, y: positionY), width: TEXT_FIELD_WIDTH_LARGE, height: TEXT_FIELD_HEIGHT)
        self.addSubview(passwordTextField)
        passwordTextField.autocapitalizationType = .none
        passwordTextField.delegate = self
        
        positionY += passwordTextField.frame.height + 4 * OUTTER_PADDING
        
        wrongPasswordLabel = UILabel()
        wrongPasswordLabel.setUp(text: "Mauvaise authentification. Veillez essayer de nouveau.", origin: CGPoint(x: OUTTER_PADDING, y: positionY), font: SMALL_FONT, width: width, textAlignment: .center)
        wrongPasswordLabel.layer.borderWidth = 0
        wrongPasswordLabel.textColor = RED
        
        positionY += wrongPasswordLabel.frame.height + OUTTER_PADDING
        
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
    
    func wrongPassword() {
        self.usernameTextField.text = ""
        self.passwordTextField.text = ""
        if (wrongPasswordLabel.superview == nil) {
            self.addSubview(wrongPasswordLabel)
        }
    }
    
    
    @objc func checkbuttonTapped(sender: UIButton) {
        self.authConfirmDelegate.getUserNameAndPassword(username: usernameTextField.text!, password: passwordTextField.text!, userToDel: self.userToDel, authAction: self.authAction)
    }
   
    
    @objc func crossbuttonTapped(sender: UIButton) {
        self.authConfirmDelegate.dismissAuth()
    }
}

extension AuthentificationUserUIView: UITextFieldDelegate {
    
    private func textFieldShouldReturn(textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
