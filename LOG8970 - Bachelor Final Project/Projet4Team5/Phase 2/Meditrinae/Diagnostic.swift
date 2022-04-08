//
//  Diagnostics.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-24.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class Diagnostic {
    
    var name: String
    var prob: Double?
    
    init(name: String, prob: Double) {
        self.name = name
        self.prob = prob
    }
}

extension Diagnostic: Comparable {
    static func < (lhs: Diagnostic, rhs: Diagnostic) -> Bool {
        return lhs.prob?.isLess(than: rhs.prob ?? 0.00) ?? false
    }
    

    static func == (lhs: Diagnostic, rhs: Diagnostic) -> Bool {
        return lhs.name == rhs.name
    }
}
