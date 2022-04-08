//
//  Treatment.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-12-01.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class Treatment {
    
    var name: String
    var prob: Double?
    
    init(name: String, prob: Double) {
        self.name = name
        self.prob = prob
    }
}

extension Treatment: Comparable {
    static func < (lhs: Treatment, rhs: Treatment) -> Bool {
        return lhs.prob?.isLess(than: rhs.prob ?? 0.00) ?? false
    }
    

    static func == (lhs: Treatment, rhs: Treatment) -> Bool {
        return lhs.name == rhs.name
    }
}
