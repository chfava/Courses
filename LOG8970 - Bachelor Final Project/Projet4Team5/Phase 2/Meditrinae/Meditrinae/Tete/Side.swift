//
//  Side.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-27.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

enum sideType {
    case front
    case left
    case right
}


class Side {
    var side: sideType
    
    init() {
        self.side = .front
    }
    init(side: sideType) {
        self.side = side
    }
    
    func getSideName()-> String {
        switch self.side {
        case .front:
            return "Front"
        case .left:
            return "Droit"
        case .right:
            return "Gauche"
        }
    }
    
    func getSideID() -> String {
        switch self.side {
        case .front:
            return ""
        case .left:
            return "D"
        case .right:
            return "G"
        }
    }
}
