//
//  ConsentementUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-20.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit
import SwiftSignatureView

protocol ConsentementDelegate {
    func consent(signature: UIImage)
    func dismissConsent()
}

class ConsentementUIView: UIView {
    
    var consentementDelegate: ConsentementDelegate!
    var signatureUIView: SwiftSignatureView!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = WHITE
        self.layer.borderColor = LIGHT_GRAY.cgColor
        self.layer.borderWidth = SMALL_BORDER
        self.layer.cornerRadius = CORNER_RADIUS
        let x = 2 * OUTTER_PADDING
        var y = 2 * OUTTER_PADDING
        let width: CGFloat = self.frame.width - 4 * OUTTER_PADDING
        let height: CGFloat = self.frame.height - 2 * OUTTER_PADDING
        
        
        let instrcutionTextFieldFrame = CGRect(x: x, y: y, width: width, height: 200)
        let instructionTextField = UITextField(frame: instrcutionTextFieldFrame)
        self.addSubview(instructionTextField)
        instructionTextField.text = "SVP signer dans l'encadré ci-dessous pour donner votre consentement médical. Merci"
   
        instructionTextField.font = REG_FONT
        
        y += instructionTextField.frame.height + OUTTER_PADDING
    
        let signatureFrame = CGRect(x: x, y: y, width: width, height: height / 3)
        signatureUIView = SwiftSignatureView(frame: signatureFrame)
        signatureUIView.layer.borderWidth = SMALL_BORDER
        signatureUIView.layer.borderColor = LIGHT_GRAY.cgColor
        signatureUIView.layer.cornerRadius = CORNER_RADIUS
        signatureUIView.backgroundColor = WHITE
        self.addSubview(signatureUIView)
        
        y += signatureUIView.frame.height + OUTTER_PADDING
        
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
        consentementDelegate.dismissConsent()
    }
    
    @objc func checkbuttonTapped(sender: UIButton) {
        if (signatureUIView.signature != nil)  {
            consentementDelegate.consent(signature: signatureUIView.signature!)
        }
    }
}
