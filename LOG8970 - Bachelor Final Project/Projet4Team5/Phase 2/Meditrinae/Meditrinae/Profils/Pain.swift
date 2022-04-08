//
//  File.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-27.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

enum painType {
    case douleur
    case douleurHabituelle
    case douleurRefere
    case allPain
    case oldPain
    case none
}

enum doulType {
    case douleur
    case douleurHabituelle
}

class Pain {
    var pain: painType
    
    init() {
        self.pain = .none
    }
    
    init(pain: painType) {
        self.pain = pain
    }
    
    func setPain(pain : painType) {
        self.pain = pain
    }
    
    func getPain() -> Pain {
        return self
    }
    
      func getPainName()-> String {
          switch self.pain {
          case .douleur:
              return "Douleur"
          case .douleurHabituelle:
              return "Douleur Habituelle"
          case .none:
            return "none"
          case .oldPain:
            return "Old Pain"
          case .douleurRefere:
            return "Douleur Refere"
          case .allPain:
            return "All Pain"
        }
      }
      
      func getPainID() -> String {
          switch self.pain {
          case .douleur:
              return "D"
          case .douleurHabituelle:
              return "DH"
          case .none:
            return "NA"
          case .oldPain:
            return "OP"
          case .douleurRefere:
            return "DR"
          case .allPain:
            return "AP"
        }
      }
    
    func getPainColor() -> UIColor {
        switch self.pain {
          case .douleur:
            return ORANGE
          case .douleurHabituelle:
            return RED
          case .none:
            return WHITE
          case .oldPain:
            return PRE_ORANGE
          case .douleurRefere:
            return YELLOW
          case .allPain:
            return PINK
        }
    }
    
    func checkPain()-> Bool {
        if (self.getPainName() == "none") {
            return false
        }
        return true
    }
    
    func isDoul()-> Bool {
        if self.pain == .douleur {
            return true
        }
       return false
    }
}
