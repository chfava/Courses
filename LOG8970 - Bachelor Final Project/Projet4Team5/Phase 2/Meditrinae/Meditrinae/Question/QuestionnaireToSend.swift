//
//  QuestionnaireToSend.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-10-06.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

struct QuestionnaireToSend: Codable {
    var name : String
    var questions : String
    var patient: String
    var practician: String
    
    init(name : String, questions : String, patientID: String, practicienID: String){
        self.name = name
        self.questions = questions
        self.patient = patientID
        self.practician = practicienID
    }
}


