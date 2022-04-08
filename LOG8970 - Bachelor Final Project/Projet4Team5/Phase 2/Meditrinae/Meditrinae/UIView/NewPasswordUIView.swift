//
//  NewPasswordUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-14.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

protocol NewPasswordDelegate {
    func changePassWord(newPassword: String, oldPassword: String)
    func dismissNewPassword()
}

class NewPasswordUIView: UIView {
    
    var passwordTextField: UITextField!
    var oldPasswordTextField: UITextField!
    var passwordConfirmationTextfield: UITextField!
    var newPasswordDelegate: NewPasswordDelegate!
    var notMatchingLabel: UILabel!
    var passWordNotLongEnoughLabel: UILabel!

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = WHITE
        self.layer.borderColor = LIGHT_GRAY.cgColor
        self.layer.borderWidth = SMALL_BORDER
        self.layer.cornerRadius = CORNER_RADIUS
        let x = 2 * OUTTER_PADDING
        var y = 2 * OUTTER_PADDING
        let width: CGFloat = self.frame.width - 4 * OUTTER_PADDING
        
        
        let tap = UITapGestureRecognizer(target: self, action: #selector(self.endEditing(_:)))
        tap.cancelsTouchesInView = false
        self.addGestureRecognizer(tap)
        
        
        let newPasswordLabel = UILabel()
        newPasswordLabel.setUp(text: "SVP entrer votre nouveau mot de passe.", origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT, width: width, nbOfLines: 2)
        self.addSubview(newPasswordLabel)
        y += newPasswordLabel.frame.height + PADDING
        
        let newPasswordDirectionsLabel = UILabel()
        newPasswordDirectionsLabel.setUp(text: "Assurez-vous d'avoir un minimum de 8 caractères.", origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT, width: width, nbOfLines: 2)
        self.addSubview(newPasswordDirectionsLabel)
    
        
        y += newPasswordDirectionsLabel.frame.height + 2 * OUTTER_PADDING
        
        oldPasswordTextField = UITextField()
        oldPasswordTextField.setUp(placeHolder: "Ancien mot de passe", position: CGPoint(x: x, y: y), width: width, height: TEXT_FIELD_HEIGHT)
        self.addSubview(oldPasswordTextField)
        oldPasswordTextField.autocapitalizationType = .none
        oldPasswordTextField.delegate = self
        
        y += oldPasswordTextField.frame.height + 2 * OUTTER_PADDING
        
        passwordTextField = UITextField()
        passwordTextField.setUp(placeHolder: "Nouveau mot de passe", position: CGPoint(x: x, y: y), width: width, height: TEXT_FIELD_HEIGHT)
        self.addSubview(passwordTextField)
        passwordTextField.addTarget(self, action: #selector(passwordTextFieldDidChange), for: .editingChanged)
        passwordTextField.autocapitalizationType = .none
        
        y += passwordTextField.frame.height + 2 * OUTTER_PADDING
        
        passwordConfirmationTextfield = UITextField()
        passwordConfirmationTextfield.setUp(placeHolder: "Confirmation du mot de passe", position: CGPoint(x: x, y: y), width: width, height: TEXT_FIELD_HEIGHT)
        self.addSubview(passwordConfirmationTextfield)
        passwordConfirmationTextfield.addTarget(self, action: #selector(confirmPWDTextFieldDidChange), for: .editingChanged)
        passwordConfirmationTextfield.autocapitalizationType = .none
        
        y += passwordConfirmationTextfield.frame.height + 2 * OUTTER_PADDING
        
        notMatchingLabel = UILabel()
        notMatchingLabel.setUp(text: "Les mots de passe se sont pas pareils", origin: CGPoint(x: x, y: y), font: SMALL_FONT, width: width, textAlignment: .center)
        notMatchingLabel.layer.borderWidth = 0
        notMatchingLabel.textColor = RED
        
        y += notMatchingLabel.frame.height + PADDING
        
        passWordNotLongEnoughLabel = UILabel()
        passWordNotLongEnoughLabel.setUp(text: "Le mot de passe doit avoir au moins 8 charactères", origin: CGPoint(x: x, y: y), font: SMALL_FONT, width: width, textAlignment: .center)
        passWordNotLongEnoughLabel.layer.borderWidth = 0
        passWordNotLongEnoughLabel.textColor = RED
        
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
            dismissButton.setUp(position: CGPoint(x: x, y: y), image: crossImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
            dismissButton.addTarget(self, action: #selector(crossbuttonTapped), for: .touchUpInside)
        }
        
        dismissButton.translatesAutoresizingMaskIntoConstraints = false
        dismissButton.rightAnchor.constraint(equalTo: safeArea.rightAnchor, constant: -OUTTER_PADDING).isActive = true
        dismissButton.bottomAnchor.constraint(equalTo: safeArea.bottomAnchor, constant: -OUTTER_PADDING).isActive = true
        dismissButton.heightAnchor.constraint(equalToConstant: 60 ).isActive = true
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc func crossbuttonTapped(sender: UIButton) {
        newPasswordDelegate.dismissNewPassword()
    }
    
    @objc func checkbuttonTapped(sender: UIButton) {
        newPasswordDelegate.changePassWord(newPassword: passwordConfirmationTextfield.text!, oldPassword: oldPasswordTextField.text!)
    }
    
    
    @objc func confirmPWDTextFieldDidChange(textField: UITextField){
        self.addSubview(notMatchingLabel)
        if (textField.text == passwordTextField.text) {
            notMatchingLabel.removeFromSuperview()
        }
    }
    
    @objc func passwordTextFieldDidChange(textField: UITextField) {
        self.addSubview(passWordNotLongEnoughLabel)
        if (textField.text!.count > 7) {
            passWordNotLongEnoughLabel.removeFromSuperview()
        }
    }
}

extension NewPasswordUIView: UITextFieldDelegate {
    
    private func textFieldShouldReturn(textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
