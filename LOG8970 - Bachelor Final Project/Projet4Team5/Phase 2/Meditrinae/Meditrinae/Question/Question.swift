//
//  File.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-09-21.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class Question{
    var text : String!
    var ID : String!
    var answer : Any
    var use3D: Bool!
    var isShown: Bool!
    var skip: [Question]?
    var skipValue: String!
    var intID: Int?
    
    init(text : String, answer : Any, ID :String? = nil, use3D : Bool! = false, isShown : Bool! = true, skip :[Question] = [], skipValue :String = "", intID: Int?=nil) {
        self.text = text
        self.answer = answer
        self.ID = ID
        self.use3D = use3D
        self.isShown = isShown
        self.skip = skip
        self.skipValue = skipValue
        self.intID = intID ?? 0
    }
}
