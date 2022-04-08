//
//  UnderlinedLabel.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-12-02.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit


class UnderlinedLabel: UILabel {

override var text: String? {
    didSet {
        guard let text = text else { return }
        let textRange = NSMakeRange(0, text.count)
        let attributedText = NSMutableAttributedString(string: text)
        attributedText.addAttribute(NSAttributedString.Key.underlineStyle , value: NSUnderlineStyle.single.rawValue, range: textRange)
        self.attributedText = attributedText
        }
    }
}
