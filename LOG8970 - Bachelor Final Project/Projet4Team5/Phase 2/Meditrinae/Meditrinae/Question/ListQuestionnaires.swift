//
//  File.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-09-21.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class ListQuestionnaires{
    var questionnaires : [String:Questionnaire]!
    
    init() {
        self.questionnaires = [:]
    }
    
    init(questionnaires : [String:Questionnaire]) {
        self.questionnaires = questionnaires
    }
}
