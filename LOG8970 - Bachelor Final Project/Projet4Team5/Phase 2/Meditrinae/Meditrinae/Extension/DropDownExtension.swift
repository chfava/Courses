//
//  DropDownExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-15.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import iOSDropDown

extension DropDown {
    func buildDropDown(frame: CGRect, strings: [String], ids: [Int]) {
        self.frame = frame
        //self.borderWidth = SMALL_BORDER
        //self.borderColor = LIGHT_GRAY
        self.textAlignment = NSTextAlignment.center
        self.handleKeyboard = false
        self.optionIds = ids
        self.optionArray = strings
        self.textAlignment = .center
    }
}
