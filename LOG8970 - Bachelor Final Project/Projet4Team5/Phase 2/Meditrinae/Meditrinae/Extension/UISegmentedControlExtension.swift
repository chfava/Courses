//
//  UISegmentedControlExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-21.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

extension UISegmentedControl {
    
    struct Holder {
        static var question = [String:Question]()
    }
    
    var property:Question {
        get {
            return Holder.question[self.debugDescription]!
        }
        set(newValue) {
            Holder.question[self.debugDescription] = newValue
        }
    }
    
}
