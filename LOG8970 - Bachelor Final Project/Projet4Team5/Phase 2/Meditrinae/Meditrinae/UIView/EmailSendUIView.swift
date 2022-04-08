//
//  EmailSendUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-18.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit


protocol NewEmailDelegate {
    func sendEmail(email: String, isGeneric: Bool)
    func dismissEmailUIView()
}



class EmailSendUIView: UIView {
    
    
    var emailTextField: UITextField!
    var notEmailLabel: UILabel!
    var newEmailDelegate: NewEmailDelegate!
    
    var isGeneric: Bool!
    
    init(frame: CGRect, isGeneric: Bool) {
        super.init(frame: frame)
        self.isGeneric = isGeneric
        self.backgroundColor = WHITE
        self.layer.borderColor = LIGHT_GRAY.cgColor
        self.layer.borderWidth = SMALL_BORDER
        self.layer.cornerRadius = CORNER_RADIUS
        let x = 2 * OUTTER_PADDING
        var y = 2 * OUTTER_PADDING
        let width: CGFloat = self.frame.width - 4 * OUTTER_PADDING
        
        
        let newEmailLabel = UILabel()
        newEmailLabel.setUp(text: "SVP entrer le email d'envoit. ", origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT, width: width, nbOfLines: 2)
        self.addSubview(newEmailLabel)
        y += newEmailLabel.frame.height + PADDING
        
        y += newEmailLabel.frame.height + 2 * OUTTER_PADDING
        
        emailTextField = UITextField()
        emailTextField.setUp(placeHolder: "Email", position: CGPoint(x: x, y: y), width: width, height: TEXT_FIELD_HEIGHT, keybord: .emailAddress)
        self.addSubview(emailTextField)
        emailTextField.autocapitalizationType = .none
        emailTextField.keyboardType = .emailAddress
        emailTextField.addTarget(self, action: #selector(emailTextFieldDidChange), for: .editingChanged)
        
        y += emailTextField.frame.height + 2 * OUTTER_PADDING
        
        notEmailLabel = UILabel()
        notEmailLabel.setUp(text: "SVP entrer un email valide.", origin: CGPoint(x: x, y: y), font: SMALL_FONT, width: width, textAlignment: .center)
        notEmailLabel.layer.borderWidth = 0
        notEmailLabel.textColor = RED
        
        y += notEmailLabel.frame.height + PADDING
        
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
    
    func isValidEmail(email: String) -> Bool {
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailPred = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        
        return emailPred.evaluate(with: email)
    }
    
    @objc func emailTextFieldDidChange(textField: UITextField) {
        self.addSubview(notEmailLabel)
        if (isValidEmail(email: emailTextField.text!)) {
            notEmailLabel.removeFromSuperview()
        }
    }
    
    @objc func crossbuttonTapped(sender: UIButton) {
        newEmailDelegate.dismissEmailUIView()
    }
    
    @objc func checkbuttonTapped(sender: UIButton) {
        if (isValidEmail(email: emailTextField.text!)) {
            newEmailDelegate.sendEmail(email: emailTextField.text!, isGeneric: self.isGeneric)
        }
    }

}
