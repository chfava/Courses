//
//  Secretaire.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-24.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class Secretary: ProfilAbstract {
    
    override init() {
           super.init()
    }
    
    init(firstName: String, lastName: String, clinicID: String, token: String, dateCreated: Date, dateModified: Date, id: String) {
        super.init(firstName: firstName, lastName: lastName, token: token, dateCreated: dateCreated, dateModified: dateModified, id: id, clinicID: clinicID, type: .Secretaire)
    }
    
     init(abtractProfil: ProfilAbstract) {
           super.init(firstName: abtractProfil.firstname, lastName: abtractProfil.lastname, token: abtractProfil.token, dateCreated: abtractProfil.dateCreated, dateModified: abtractProfil.dateModified, id: abtractProfil.ID, clinicID: abtractProfil.clinicID, type: .Secretaire)
       }
}
