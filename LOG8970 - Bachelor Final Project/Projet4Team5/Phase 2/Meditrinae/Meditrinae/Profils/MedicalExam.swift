//
//  MedicalExam.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-16.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class MedicalExam {
    var dateCreated: Date
    var dateModified: Date
    var patientID: String
    var praticienID: String
    var examResult: ExamResult
    
    var medicalExamID: String?
    var examResultID: String?
  
    
    var patient: Patient?
    var praticien: Praticien?
    
    init() {
        self.dateCreated = Date()
        self.dateModified = Date()
        self.medicalExamID = ""
        self.patientID = ""
        self.praticienID = ""
        self.examResultID = ""
        self.examResult = ExamResult()
    }
    
    init(patient: Patient) {
        self.dateCreated = Date()
        self.dateModified = Date()
        self.medicalExamID = ""
        self.patientID = patient.ID
        self.praticienID = patient.praticien?.ID ?? ""
        self.examResultID = ""
        self.examResult = ExamResult()
        self.patient = patient
    }
    
    init(dateCreated: Date, dateModified: Date, medicalExamID: String, praticienID: String, patientID: String, examResultID: String, examResult: ExamResult) {
        self.dateCreated = dateCreated
        self.dateModified = dateModified
        self.medicalExamID = medicalExamID
        self.praticienID = praticienID
        self.patientID = patientID
        self.examResultID = examResultID
        self.examResult = examResult
    }
}
