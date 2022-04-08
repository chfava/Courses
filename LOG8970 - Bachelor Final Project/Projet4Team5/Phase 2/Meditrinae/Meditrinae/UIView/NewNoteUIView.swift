//
//  NewNoteUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-17.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

protocol NewNoteDelegate {
    func newNote(note: String)
    func dissmissNoteView()
    func alertEmptyNote()
}


class NoteUIView: UIView {
    
    var newNoteDelegate: NewNoteDelegate!
    var noteTextField: UITextField!
    
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = WHITE
        self.layer.borderColor = LIGHT_GRAY.cgColor
        self.layer.borderWidth = SMALL_BORDER
        self.layer.cornerRadius = CORNER_RADIUS
        let x = OUTTER_PADDING
        var y = OUTTER_PADDING
       
        let width = self.frame.width - 2 * (SMALL_BORDER + OUTTER_PADDING)
        let height = (self.frame.height - 2 * (SMALL_BORDER + OUTTER_PADDING)) * 3/4
        noteTextField = UITextField()
        noteTextField.setUp(placeHolder: "Écrivez votre note ici...", position: CGPoint(x: x, y: y), width: width, height: height, keybord: .default)
        self.addSubview(noteTextField)
        
        y += noteTextField.frame.height + OUTTER_PADDING
        
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
    
    @objc func checkbuttonTapped(sender: UIButton) {
        if (noteTextField.text?.isEmpty ?? true) {
            self.newNoteDelegate.alertEmptyNote()
        }
        else {
            let note = noteTextField.text!
            self.newNoteDelegate.newNote(note: note)
        }
     }
    
     
     @objc func crossbuttonTapped(sender: UIButton) {
         self.newNoteDelegate.dissmissNoteView()
     }

}
