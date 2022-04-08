//
//  UIResponderExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-30.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

extension UIResponder {
    func removeUndoRedoOptions() {
        //Removes Undo, Redo, Copy & Paste options
        inputAssistantItem.leadingBarButtonGroups = []
        inputAssistantItem.trailingBarButtonGroups = []
    }
}
