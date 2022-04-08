//
//  Preferences.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-24.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

var TITLE_FONT = UIFont.systemFont(ofSize: 45, weight: UIFont.Weight.regular)
var SUBTITLE_FONT = UIFont.systemFont(ofSize: 25, weight: UIFont.Weight.light)
var REG_FONT = UIFont.systemFont(ofSize: 18, weight: UIFont.Weight.light)
var PLACEHOLDER_FONT = UIFont.systemFont(ofSize: MIN_FONT_SIZE, weight: UIFont.Weight.light)
var SMALL_FONT = UIFont.systemFont(ofSize: MIN_FONT_SIZE, weight: UIFont.Weight.light)
var LARGE_FONT = UIFont.systemFont(ofSize: MAX_FONT_SIZE, weight: UIFont.Weight.regular)
var MIN_FONT_SIZE: CGFloat = 14
var MAX_FONT_SIZE: CGFloat = 18

var DROP_DOWN_HIEGHT_SIZE: CGFloat = 44
var TEXT_FIELD_INPUT_HEIGHT: CGFloat = 44
var TEXT_FIELD_INPUT_WIDTH: CGFloat = 200
var DATE_PICKER_WIDTH: CGFloat = 300
var DATE_PICKER_HEIGHT: CGFloat = 54

var LAYER = { () -> CALayer in
    let layer = CALayer()
    layer.borderWidth = BORDER_SIZE
    layer.borderColor = LIGHT_GRAY.cgColor
    layer.cornerRadius = CORNER_RADIUS
    return layer
}()

var PADDING: CGFloat = 10
var OUTTER_PADDING: CGFloat = 25
var BORDER_SIZE: CGFloat = 6
var SMALL_BORDER: CGFloat = 3
var BOX_HEIGHT: CGFloat = 400
var BUTTON_HEIGHT: CGFloat = 45
var BUTTON_ICON_HEIGHT: CGFloat = 40
var BUTTON_SIZE_HEIGHT: CGFloat = 50

var UIVIEW_HEIGHT:CGFloat = 600

var TEXT_FIELD_WIDTH_SMALL: CGFloat = 80
var TEXT_FIELD_HEIGHT: CGFloat = 35
var TEXT_FIELD_WIDTH_LARGE: CGFloat = 250
var SEGMENTED_CONTROL_HEIGHT: CGFloat = 35


var PRE_ORANGE = UIColor(hex: 0xFFB593)
var PRE_RED = UIColor(hex: 0xFFB593)

var RED = UIColor(hex: 0xFF0000)
var ORANGE = UIColor(hex: 0xFF8300)
var BLUE = UIColor(hex: 0x0042FF)
var YELLOW = UIColor(hex: 0xFFF700)
var PINK = UIColor(hex: 0xFF66CC)
var WHITE = UIColor.white
var LIGHT_GRAY = UIColor(hex: 0xD8D8D8)
var CORNER_RADIUS: CGFloat = 10
var DARK_GRAY = UIColor(hex:0x808080)
var GREEN = UIColor(hex: 0x13D500)
var CIRCLE_HIEGHT: CGFloat = 75




