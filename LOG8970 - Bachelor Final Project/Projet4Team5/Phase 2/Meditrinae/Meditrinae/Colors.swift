//
//  Colors.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-24.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

var gradientMIX = [RED.cgColor, YELLOW.cgColor]
var gradientRED = [RED]
var gradientORANGE = [ORANGE]
var gradientYELLOW = [YELLOW]
var gradientWHITE = [UIColor.white]

var gradientLayerRED = CAGradientLayer()
var gradientLayerORANGE = CAGradientLayer()
var gradientLayerYellow = CAGradientLayer()
var gradientLayerMix = CAGradientLayer()
var gradientLayerWhite = CAGradientLayer()

extension UIColor {

    convenience init(hex: Int) {
        let components = (
            R: CGFloat((hex >> 16) & 0xff) / 255,
            G: CGFloat((hex >> 08) & 0xff) / 255,
            B: CGFloat((hex >> 00) & 0xff) / 255
        )
        self.init(red: components.R, green: components.G, blue: components.B, alpha: 1)
    }
    
    func getRED() -> CAGradientLayer {
        gradientLayerRED.colors = gradientRED
        return gradientLayerRED
    }
    
    func getOrange() -> CAGradientLayer {
        gradientLayerORANGE.colors = gradientORANGE
        return gradientLayerORANGE
    }
    
    func getYellow() -> CAGradientLayer {
        gradientLayerYellow.colors = gradientYELLOW
        return gradientLayerYellow
    }
    
    func getGradientMix() -> CAGradientLayer {
        gradientLayerMix.colors = gradientMIX
        return gradientLayerMix
    }
    func getWhite() -> CAGradientLayer {
        gradientLayerWhite.colors = gradientWHITE
        return gradientLayerWhite
    }
}
