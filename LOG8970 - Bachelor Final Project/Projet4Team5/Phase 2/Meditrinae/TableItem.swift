//
//  TableItem.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-22.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class TableItem {
    var name: String!
    var ID: String!
    var active: Bool = true
    var user: ProfilAbstract?
    var questionnaire: Questionnaire?
    var medicalExam: MedicalExam?
    var note: MedicalNote?
    var question: Question?
    var clinic: Clinic?
    
    init(name: String, ID: String, active: Bool, user: ProfilAbstract?=nil, questionnaire: Questionnaire?=nil, medicalExam: MedicalExam?=nil, note: MedicalNote?=nil, question: Question?=nil, clinic: Clinic?=nil) {
        self.name = name
        self.ID = ID
        self.active = active
        self.user = user ?? nil
        self.questionnaire = questionnaire ?? nil
        self.medicalExam = medicalExam ?? nil
        self.note = note ?? nil
        self.question = question ?? nil
        self.clinic = clinic ?? nil
    }
}
