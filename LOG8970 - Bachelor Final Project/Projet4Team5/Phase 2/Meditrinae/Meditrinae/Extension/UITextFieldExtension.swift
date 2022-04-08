//
//  UITextFieldExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-30.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

extension UITextField {
    func hideSuggestions() {
        autocorrectionType = .no
        //Removes Undo, Redo, Copy & Paste options
    }
    func setUp(placeHolder: String, position: CGPoint, width: CGFloat, height: CGFloat, font: UIFont? = nil, keybord: UIKeyboardType? = nil) {
        let newFrame = CGRect(origin: position, size: CGSize(width: width, height: height))
        self.frame = newFrame
        self.placeholder = placeHolder
        self.textAlignment = .center
        self.font = font ?? REG_FONT
        self.textColor = .black
        //self.borderStyle = .roundedRect
        self.layer.borderWidth = SMALL_BORDER
        self.layer.borderColor = LIGHT_GRAY.cgColor
        self.layer.cornerRadius = CORNER_RADIUS
        self.keyboardType = keybord ?? UIKeyboardType.default
    }
}
