//
//  AdminHomeViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-09.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class AdminHomeViewController: HomeViewAbstractViewController {
    
    var admin: Admin!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let user = self.user as? Admin {
            self.admin = user
            self.admin.setClinic(completion: {(error, succes)  in
                if let succes = succes {
                    if (succes) {
                        if let clinic = self.admin.clinic {
                            self.setUpUI(title: "Practiciens", data: clinic.praticiens, options: [], user: self.admin, dropDown: false, dataToAdd: clinic.praticiens)
                        }
                    }
                    else {
                        Alert.showBasic(title: "Erreur", message: "Erreur avec la communication au serveur. ", vc: self)
                }
            }
        })
        //self.questionsUIView.genericTableUIView.selectedCellSegueProtocol = self
        }
        else {
            Alert.showBasic(title: "Error lors de l'authentificaiton", message: "SVP essayer d'authentifier à nouveau.", vc: self)
        }
    }
    
    override func logOut() {
        self.admin.resetUser()
        self.admin = nil
    }
}
