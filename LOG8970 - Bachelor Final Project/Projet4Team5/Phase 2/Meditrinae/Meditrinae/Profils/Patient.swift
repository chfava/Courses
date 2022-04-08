//
//  Patient.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-18.
//  Copyright © 2019 Team5. All rights reserved.
//


import Foundation
import SceneKit


class MedicalNote {
    var title: Date
    var note: String
    
    init(note: String, title: Date) {
        self.note = note
        self.title = title
    }
}


class Patient: ProfilAbstract {
    
    var currentMedicalExam: MedicalExam!
    var medicalExamsID: [String]?
    var praticien: Praticien?
    
    var treatments: [Treatment]!
    var diagnostics: [Diagnostic]!
    
    var treatmentsPraticient: [Treatment]!
    var diagnosticsPraticient: [Diagnostic]!
    
    var morphoHead: [Area]!
        
    
    
    override init() {
        super.init()
    }
    
    init(firstName: String, lastName: String, gender: Gender, token: String, dateOfBirth: Date, clinicID: String, dateCreated: Date, dateModified: Date, id: String, address: String, note: [MedicalNote], email: String, medicalExams: [MedicalExam], medicalExamID: [String]?=nil, diagnostics: [Diagnostic]?=nil, treatments: [Treatment]?=nil, diagnosticsPraticient: [Diagnostic]?=nil, treatmentsPraticient: [Treatment]?=nil) {
        super.init(firstName: firstName, lastName: lastName, token: token, dateCreated: dateCreated, dateModified: dateModified, id: id, clinicID: clinicID, type: .Patient, email: email, addresse: address, note: note, medExams: medicalExams)
        self.medicalExamsID = medicalExamID ?? nil
        self.dateOfBirth = dateOfBirth
        self.treatments = treatments ?? []
        self.diagnostics = diagnostics ?? []
        self.diagnosticsPraticient = diagnosticsPraticient ?? []
        self.treatmentsPraticient = treatmentsPraticient  ?? []
    }
    
    init(firstName: String, lastName: String, genderString: String, token: String, dateOfBirth: Date, clinicID: String, dateCreated: Date, dateModified: Date, id: String, address: String, note: [MedicalNote], email: String, medicalExams: [MedicalExam],diagnostics: [Diagnostic]?=nil, treatments: [Treatment]?=nil, diagnosticsPraticient: [Diagnostic]?=nil, treatmentsPraticient: [Treatment]?=nil) {
        super.init(firstName: firstName, lastName: lastName, token: token, dateCreated: dateCreated, dateModified: dateModified, id: id, clinicID: clinicID, type: .Patient, email: email, addresse: address, note: note, medExams: medicalExams)
        self.gender = self.stringToGender(genderString: genderString)
        self.dateOfBirth = dateOfBirth
        self.treatments = treatments ?? []
        self.diagnostics = diagnostics ?? []
        self.diagnosticsPraticient = diagnosticsPraticient ?? []
        self.treatmentsPraticient = treatmentsPraticient ?? []
    }
    
    func getCurrentMedicalExamResults(completion:@escaping (Error?) -> Void) {
        ServerService.shared.getMedicalExam(token: self.token, medicalExamId: self.currentMedicalExam.medicalExamID!, completion: {(error, medicalExam) in
            if let medicalExam = medicalExam {
                self.currentMedicalExam = medicalExam
            }
            completion(nil)
        })
    }
}
