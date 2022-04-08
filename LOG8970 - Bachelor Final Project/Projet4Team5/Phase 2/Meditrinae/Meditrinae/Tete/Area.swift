//
//  Area.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-27.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class Area {
    var name : String = ""
    var materialName : String
    var painType : Pain
    var inPain : Bool
    var side: Side
    var questionID: String!
    var headID: String!
    
    init() {
        self.name = ""
        self.materialName = ""
        self.painType = Pain.init(pain: .none)
        self.inPain = false
        self.side = Side(side: .front)
        self.questionID = ""
        self.headID = ""
    }
    
    init(name: String, materialName: String, painType: Pain, inPain: Bool, side: Side, headID: String, questionID: String) {
        self.name = name
        self.materialName = materialName
        self.painType = painType
        self.inPain = inPain
        self.side = side
        self.headID = headID
        self.questionID = questionID
    }
    
    func makeExportCode()-> String {
        let name = (self.questionID + "_" + self.headID)
        let nameN = (name + "_" + self.materialName)
        
        return (nameN.uppercased())
    }
    
    func makeExportCodeMT() -> String {
        let nameReturn = (self.questionID + "_" + self.headID + "_MT_")
        let nameRReturn = (nameReturn + self.materialName)
             
        return (nameRReturn.uppercased())
    }
    
    func setOldPain() {
        if (self.inPain) {
            self.painType = Pain(pain: .oldPain)
        }
    }
    
    func isSideDroit() -> Bool {
        switch self.side.side {
        case .right:
            return true
        default:
            return false
        }
    }
    
    func isTemporal()-> Bool {
        if (self.name.contains("Temporal")) {
            return true
        }
        return false
    }
    
    func isMasseter() -> Bool {
        if (self.materialName.contains("Masseter")) {
            return true
        }
        return false
    }
}

