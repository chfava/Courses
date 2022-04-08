//
//  Admin.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-09.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class Admin: ProfilAbstract {
    
    static var shared = Admin()
    
    override init() {
        super.init()
    }
    
    init(firstName: String, lastName: String, clinicID: String, token: String, dateCreated: Date, dateModified: Date, id: String) {
        super.init(firstName: firstName, lastName: lastName, token: token, dateCreated: dateCreated, dateModified: dateModified, id: id, clinicID: clinicID, type: .Admin)
    }
    
    init(abtractProfil: ProfilAbstract) {
        super.init(firstName: abtractProfil.firstname, lastName: abtractProfil.lastname, token: abtractProfil.token, dateCreated: abtractProfil.dateCreated, dateModified: abtractProfil.dateModified, id: abtractProfil.ID, clinicID: abtractProfil.clinicID, type: .Admin)
    }
}
