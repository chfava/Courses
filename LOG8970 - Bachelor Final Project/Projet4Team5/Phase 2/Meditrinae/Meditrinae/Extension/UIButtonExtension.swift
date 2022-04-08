//
//  UIButtonExtension.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-29.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

extension UIButton {
    func pulsate() {
        let pulse = CASpringAnimation(keyPath: "transform.scale")
        pulse.duration = 0.3
        pulse.fromValue = 0.95
        pulse.toValue = 1.0
        pulse.autoreverses = true
        pulse.repeatCount = 1
        pulse.initialVelocity = 0.5
        pulse.damping = 1.0
        
        layer.add(pulse, forKey: nil)
    }
    
    func setUp(position: CGPoint, image: UIImage, width: CGFloat, height: CGFloat) {
        let newFrame = CGRect(x: position.x, y: position.y, width: width, height: height)
        self.frame = newFrame
        self.setImage(image, for: .normal)
        self.imageView?.contentMode = .scaleAspectFit
        //self.contentMode = .scaleAspectFit
    }
    
    func alignContentVerticallyByCenter(offset:CGFloat = 10) {
        let buttonSize = frame.size

        if let titleLabel = titleLabel,
            let imageView = imageView {

            if let buttonTitle = titleLabel.text,
                let image = imageView.image {
                let titleString:NSString = NSString(string: buttonTitle)
                let titleSize = titleString.size(withAttributes: [
                    NSAttributedString.Key.font : titleLabel.font ?? SMALL_FONT
                    ])
                let buttonImageSize = image.size

                let topImageOffset = (buttonSize.height - (titleSize.height + buttonImageSize.height + offset)) / 2
                let leftImageOffset = (buttonSize.width - buttonImageSize.width) / 2
                imageEdgeInsets = UIEdgeInsets(top: topImageOffset,
                                               left: leftImageOffset,
                                               bottom: 0,right: 0)

                let titleTopOffset = topImageOffset + offset + buttonImageSize.height
                let leftTitleOffset = (buttonSize.width - titleSize.width) / 2 - image.size.width

                titleEdgeInsets = UIEdgeInsets(top: titleTopOffset,
                                               left: leftTitleOffset,
                                               bottom: 0,right: 0)
            }
        }
    }
}

