//
//  UITextViewExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-30.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

extension UITextView {
    func hideSuggestions() {
        autocorrectionType = .no
        //Removes Undo, Redo, Copy & Paste options
    }
}
