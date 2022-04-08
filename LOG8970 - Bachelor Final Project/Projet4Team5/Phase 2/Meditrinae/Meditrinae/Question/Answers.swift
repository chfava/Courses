//
//  File.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-10-02.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class AnswerMultipleChoices{
    var answerCount: Int
    var possibleValues: Any
    var value: (Any)? = nil
    var segmentedControl : (Any)? = nil
    
    init(answerCount: Int, possibleValues: Any) {
        self.answerCount = answerCount
        self.possibleValues = possibleValues
    }
}

class AnswerInput{
    var answerCount: Int
    var type: Any
    var value: (Any)? = nil
    var textField : (Any)? = nil
    var placeHolder : String?
    
    init(answerCount: Int, type: Any, placeHolder:String? = nil) {
        self.answerCount = answerCount
        self.type = type
        self.placeHolder = placeHolder
    }
}

class AnswerRangeInt{
    var min: Int
    var max: Int
    var value: (Any)? = nil
    var segmentedControl : (Any)? = nil
    
    init(min: Int, max: Int) {
        self.min = min
        self.max = max
    }
}
