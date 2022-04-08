//
//  Diagnostic.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-02.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import iOSDropDown


class ObjectDropDown: DropDown {
    var name: String!
    var ID: Int!
    var questionnaire: Questionnaire?
    var answer: String?
    var IDAnwser: String!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.name = ""
        self.ID = 0
        self.answer = ""
    }
    
    init(frame: CGRect, name: String, ID: Int, questionnaire: Questionnaire? = nil, answer: String? = nil, IDAnwser: String) {
        super.init(frame: frame)
        self.name = name
        self.ID = ID
        self.IDAnwser = IDAnwser
        if let questionnaire = questionnaire {
            self.questionnaire = questionnaire
        }
        if let answer = answer {
            self.answer = answer
        }
    }
    
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
