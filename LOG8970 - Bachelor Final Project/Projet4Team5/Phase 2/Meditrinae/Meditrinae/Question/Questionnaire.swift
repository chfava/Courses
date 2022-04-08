//
//  File.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-09-21.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class Questionnaire{
    var name : String!
    var questions : [Question]!
    var nbQuestion: Int!
    var description : String?
    var exportedData = [String:String]()
    var ID : String?
    var headPreName: String?
    var medicalExamID: String?
    var date: Date?
    var score: Int = 0
    var maxScore:Int!
    var heads: [Head]!

    
    init() {
        self.name = ""
        self.questions = []
    }
    
    init(name : String, ID : String? = nil, description: String? = nil, questions: [Question], headPreName: String? = nil, medicalExamID: String?=nil, maxScore: Int?=nil) {
        self.questions = questions
        self.name = name
        self.description = description
        self.ID = ID
        self.headPreName = headPreName
        self.medicalExamID = medicalExamID ?? nil
        self.nbQuestion = 0
        self.maxScore = maxScore ?? 1
    }
    
    func addQuestions(questionList: [Question]) {
        for question in questionList {
            self.questions.append(question)
        }
    }
    
    func calculateProgress() -> Float {
        return Float(self.exportedData.count) / Float(self.questions.count)
    }
}
