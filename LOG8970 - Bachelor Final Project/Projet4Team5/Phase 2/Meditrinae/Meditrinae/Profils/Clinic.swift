//
//  Clinic.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

let CLINIC_DEV_ID = "5cb4c97f5d482858e590ce6f"

class Clinic  {
    
    var name: String?
    var id: String?
    var address: String?
    var email: String?
    var phone: String?

    var superAdmin: SuperAdmin?
    var patients = [Patient]()
    var praticiens = [Praticien]()
    var secretaires = [Secretary]()
    var admins = [Admin]()
    
    init() {
        self.name = ""
        self.id = ""
        self.address = ""
        self.email = ""
        self.phone = ""
    }
    
    init(name: String, id: String, address: String, email: String, phone: String) {
        self.name = name
        self.id = id
        self.address = address
        self.email = email
        self.phone = phone
    }
    
    func getPatients(token: String, completion:@escaping (Error?, Bool?) -> Void) {
        ServerService.shared.getPatientByClinic(token: token, clinicID: self.id!, completion: { (error, patients) in
            if let patients = patients {
                self.patients = patients
                completion(nil, true)
            }
        })
    }
    
    func getPracticiens(token: String, completion:@escaping (Error?, Bool?) -> Void) {
        ServerService.shared.getClinicPracticians(token: token, clinicId: self.id!, completion: {(error, praticiens) in
            if let praticiens = praticiens {
                self.praticiens = praticiens
                completion(nil, true)
            }
        })
    }
}
