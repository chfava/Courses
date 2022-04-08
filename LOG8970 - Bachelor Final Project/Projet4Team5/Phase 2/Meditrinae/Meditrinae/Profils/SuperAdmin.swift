//
//  SuperAdmin.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-24.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class SuperAdmin: ProfilAbstract {
    
    var practitiens: [Praticien]!
    var clinics: [Clinic]!
    var secretaries: [Secretary]!
    var admins: [Admin]!
    var name: String!
    
    init(name: String, token: String, id: String) {
        super.init()
        self.name = name
        self.token = token
        self.ID = id
    }
    
    func getAllPracticiens(completion:@escaping (Error?) -> Void) {
        ServerService.shared.getAllPracticians(token: self.token, completion: {(error, practiciens) in
            if let practitiens = practiciens {
                self.practitiens = practitiens
                completion(nil)
            }
        })
    }
    
    func getAllClinics(completion:@escaping (Error?) -> Void) {
        ServerService.shared.getAllClinics(token: self.token, completion: {(error, clinics) in
            if let clinics = clinics {
                self.clinics = clinics
                completion(nil)
            }
        })
    }
    
    func getAllSecretaries(completion:@escaping (Error?) -> Void) {
        ServerService.shared.getAllSecretaries(token: self.token, completion: {(error, secretaries) in
            if let secretaries = secretaries {
                self.secretaries = secretaries
                completion(nil)
            }
        })
    }
    
    func getAllAdmins(completion:@escaping (Error?) -> Void) {
        ServerService.shared.getAllAdmins(token: self.token, completion: {(error, admins) in
            if let admins = admins {
                self.admins = admins
                completion(nil)
            }
        })
    }
}
