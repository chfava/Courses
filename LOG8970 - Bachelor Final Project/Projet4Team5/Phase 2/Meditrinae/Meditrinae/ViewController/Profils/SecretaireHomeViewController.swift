//
//  SecretaireHomeViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-11.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

class SecretaireHomeViewController : HomeViewAbstractViewController {
    
    var secretary: Secretary!

    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let user = self.user as? Secretary {
            self.secretary = user
            self.setUpUI(title: "Patients", data: [], options: [], user: self.secretary, dropDown: false, dataToAdd: [])
            self.selectionUIView.addSortButton()
            self.secretary.setClinic(completion: {(error, succes)  in
                if let succes = succes {
                    if (succes) {
                        if let clinic = self.secretary.clinic {
                            self.selectionUIView.reloadData(data: clinic.patients)
                        }
                    }
                }
            })
        }
        else {
            Alert.showBasic(title: "Error lors de l'authentificaiton", message: "SVP essayer d'authentifier à nouveau.", vc: self)
        }
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
           reloadPatient()
           self.view.layoutSubviews()
       }
       
    
    func reloadPatient() {
        ServerService.shared.getSecretary(token: self.user.token, secretaryId: self.user.ID, completion: {(error, secretary) in
            if let secretary = secretary {
                let token = self.user.token
                self.user = secretary
                self.user.token = token
            }
            if let error = error {
                print(error.localizedDescription)
                Alert.showBasic(title: "Erreur", message: "Erreur dans l'authentification. Il est impossible d'aller chercher le secretaire. SVP vérifiez votre connexion internet et recommencez.", vc: self)
                let logInVC = LogInViewController()
                self.navigationController?.pushViewController(logInVC, animated: true)
                self.logOut()
            }
        })
    }
    
    override func logOut() {
        self.secretary.resetUser()
        self.secretary = nil
      }
}


