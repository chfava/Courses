//
//  ProfilAbstract.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

enum ProfilType {
    case Patient
    case Praticien
    case SuperAdmin
    case Admin
    case Secretaire
}

enum Gender {
    case men
    case woman
    case other
}

func stringToGender(genderString: String) -> Gender {
    var gender = Gender.men
    if (genderString == "Homme") {
        gender = Gender.men
    }
    else if (genderString == "Femme") {
        gender = Gender.woman
       
    }
    else if (genderString == "Autre") {
        gender = Gender.other
    }
    return gender
}


class ProfilAbstract {
    var token: String
    var firstname: String
    var lastname: String
    var clinicID: String
    var ID: String
    var dateCreated: Date
    var dateModified: Date
    var clinic: Clinic!
    var type: ProfilType!
    
    
    var email: String?
    var addresse: String?
    var gender: Gender?
    var dateOfBirth: Date?
    var medicalExams: [MedicalExam]?
    var notes: [MedicalNote]?
    
    var phone: String?
    
    init() {
        self.firstname = ""
        self.lastname = ""
        self.token = ""
        self.dateModified = Date()
        self.dateCreated = Date()
        self.ID = ""
        self.clinicID = ""
    }
    
    init(firstName: String, lastName: String, token: String, dateCreated: Date, dateModified: Date, id: String, clinicID: String, type: ProfilType, email: String?=nil, addresse: String?=nil, phone: String?=nil, gender: Gender?=nil, dateOfBirth: Date?=nil, note: [MedicalNote]?=nil, medExams: [MedicalExam]?=nil) {
        self.firstname = firstName
        self.lastname = lastName
        self.clinicID = clinicID
        self.token = token
        self.dateCreated = dateCreated
        self.dateModified = dateModified
        self.ID = id
        self.type = type
        self.email = email ?? nil
        self.addresse = addresse ?? nil
        self.phone = phone ?? nil
        self.gender = gender ?? nil
        self.dateOfBirth = dateOfBirth ?? Date()
        self.notes = note ?? nil
        self.medicalExams = medExams ?? nil
    }
    
    
    func resetUser() {
        self.firstname = ""
        self.lastname = ""
        self.token = ""
        self.dateModified = Date()
        self.dateCreated = Date()
        self.ID = ""
        self.clinicID = ""
    }
    
    func getProfilTypeName() -> String {
        switch self.type {
        case .Patient:
            return "Patient"
        case .Admin:
            return "Administrateur"
        case .Praticien:
            return "Praticien"
        case .SuperAdmin:
            return "Super Admin"
        case .Secretaire:
            return "Secretaire"
        case .none:
            return ""
        }
    }
    
    func setClinic(completion:@escaping (Error?, Bool?) -> Void) {
        ServerService.shared.getClinic(token: self.token, clinicId: self.clinicID, completion: {(Error, Clinic) in
            if let clinic = Clinic {
                self.clinic = clinic
                self.clinic.getPatients(token: self.token,  completion: {(error, succes) in
                   if let succes = succes {
                        if (succes) {
                            completion(nil, true)
                        }
                    }
                })
                self.clinic.getPracticiens(token: self.token, completion: {(error, succes) in
                    if let succes = succes {
                        if (succes) {
                            completion(nil, true)
                        }
                    }
                })
            }
        })
    }
    
    func genderToString()-> String {
        switch self.gender {
        case .men:
            return "Homme"
        case .woman:
            return "Femme"
        case .other:
            return "Autre"
        case .none:
            return ""
        }
    }
    
    func stringToGender(genderString: String) -> Gender {
        var gender = Gender.men
        if (genderString == "Homme") {
            gender = Gender.men
        }
        else if (genderString == "Femme") {
            gender = Gender.woman
           
        }
        else if (genderString == "Autre") {
            gender = Gender.other
        }
        return gender
    }
    
    func getMedicalExams(completion:@escaping (Error?) -> Void) {
        if (self.type == ProfilType.Patient) {
            ServerService.shared.getPatientExams(token: self.token, patientId: self.ID, completion: {(error, medicalExams) in
                if let medicalExams = medicalExams {
                    self.medicalExams = medicalExams
                }
                completion(nil)
            })
        }
        completion(nil)
    }
    
    func deleteQuestionnaire(completion:@escaping (Error?, [MedicalExam]?) -> Void) {
        if (self.type == ProfilType.Patient) {
            print("delete questionnaire")
        }
    }
    
    func trainAISystemcompletion(completion:@escaping (Error?) -> Void) {
        ServerService.shared.trainAISystem(token: self.token, completion: {(error) in
            completion(nil)
        })
    }
}


extension ProfilAbstract: Comparable {
    static func < (lhs: ProfilAbstract, rhs: ProfilAbstract) -> Bool {
        return lhs.lastname < rhs.lastname
    }
    

    static func == (lhs: ProfilAbstract, rhs: ProfilAbstract) -> Bool {
        return lhs.ID == rhs.ID
    }
}
