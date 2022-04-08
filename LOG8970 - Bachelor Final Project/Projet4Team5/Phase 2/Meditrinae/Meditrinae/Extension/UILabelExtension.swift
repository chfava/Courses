//
//  UILabelExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-30.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

extension UILabel {
    func setUp(text: String, origin: CGPoint, font: UIFont? = nil, width: CGFloat? = nil, height: CGFloat? = nil, nbOfLines: Int? = nil, textAlignment: NSTextAlignment? = nil, minFontPointSize: CGFloat? = nil, maxFontPointSize: CGFloat? = nil) {
        self.frame = .zero
        self.textAlignment = textAlignment ?? .natural
        self.text = text
        self.font = font ?? REG_FONT
        self.textColor = .black
        self.lineBreakMode = .byWordWrapping
        self.numberOfLines = nbOfLines ?? 0
        let height = height ?? self.intrinsicContentSize.height
        let width = width ?? self.intrinsicContentSize.width
        self.frame = CGRect(x: origin.x, y: origin.y, width: width, height: height)
    }
    
    func fitTextToBounds() {
        guard let text = text, let currentFont = font else { return }
    
        let bestFittingFont = UIFont.bestFittingFont(for: text, in: bounds, fontDescriptor: currentFont.fontDescriptor, additionalAttributes: basicStringAttributes)
        font = bestFittingFont
    }
    
    private var basicStringAttributes: [NSAttributedString.Key: Any] {
        var attribs = [NSAttributedString.Key: Any]()
        
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = self.textAlignment
        paragraphStyle.lineBreakMode = self.lineBreakMode
        attribs[.paragraphStyle] = paragraphStyle
        
        return attribs
    }
    func underline() {
        if let textString = self.text {
        let attributedString = NSMutableAttributedString(string: textString)
            attributedString.addAttribute(NSAttributedString.Key.underlineStyle, value: NSUnderlineStyle.thick.rawValue, range: NSRange(location: 0, length: attributedString.length))
            attributedString.addAttribute(NSAttributedString.Key.underlineColor, value: UIColor.black, range: NSRange(location: 0, length: attributedString.length))
        attributedText = attributedString
        }
    }
}
