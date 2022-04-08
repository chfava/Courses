//
//  LeaveDataEntryUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-14.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

protocol LeaveDataEntryDelegate {
    func leaveDataEntry(submit: Bool)
}

class LeaveDataEntryUIView: UIView {
    
    var leaveDataEntryDelegate: LeaveDataEntryDelegate!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = WHITE
        self.layer.borderColor = LIGHT_GRAY.cgColor
        self.layer.borderWidth = SMALL_BORDER
        self.layer.cornerRadius = CORNER_RADIUS
        let x = OUTTER_PADDING
        var y = OUTTER_PADDING
        let warningLabel = UILabel()
        warningLabel.setUp(text: "Êtes-vous certain que vous voulez quitter l'entrée de données ?", origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT)
        self.addSubview(warningLabel)
        
        y += warningLabel.frame.height + PADDING
        
        let warningExplanationLabel = UILabel()
        warningExplanationLabel.setUp(text: "Tous les changements seront perdus.", origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT)
        self.addSubview(warningExplanationLabel)
        
        y += warningExplanationLabel.frame.height + OUTTER_PADDING
        
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
    
    @objc func checkbuttonTapped(sender: UIButton) {
        self.leaveDataEntryDelegate.leaveDataEntry(submit: true)
       }
      
       
       @objc func crossbuttonTapped(sender: UIButton) {
           self.leaveDataEntryDelegate.leaveDataEntry(submit: false)
       }
            
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
