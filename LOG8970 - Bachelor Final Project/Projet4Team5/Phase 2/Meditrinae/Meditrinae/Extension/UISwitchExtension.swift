//
//  UISwitchExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-30.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

extension UISwitch {
    func setUp(offsetH: CGFloat, offsetV : CGFloat, mode: Bool) {
        let newFrame = CGRect(x: offsetH, y: offsetV, width: 0, height: 0 )
        self.frame = newFrame
        self.isOn = mode
    }
}
