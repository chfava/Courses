//
//  PracticienHomeViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-09.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit


class PraticienHomeViewController: HomeViewAbstractViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let user = self.user as? Praticien {
            self.user = user
            self.setUpUI(title: "Patients", data: [], options: [], user: self.user, dropDown: false, dataToAdd: [])
            self.selectionUIView.addSortButton()
            user.setClinic(completion: {(error, succes) in
                if succes != nil {
                    if let clinic = user.clinic {
                        self.user = user
                        self.selectionUIView.reloadData(data: clinic.patients)
                        self.infoUIView.reloadUser(user: user)
                        self.view.layoutSubviews()
                    }
                }
            })
        }
        else {
            Alert.showBasic(title: "Error lors de l'authentificaiton", message: "SVP essayer d'authentifier à nouveau.", vc: self)
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        reloadPraticien()
        self.view.layoutSubviews()
    }
    
    func reloadPatients() {
        if let user = self.user as? Praticien {
            self.user = user
            self.setUpUI(title: "Patients", data: [], options: [], user: self.user, dropDown: false, dataToAdd: [])
            self.selectionUIView.addSortButton()
            user.setClinic(completion: {(error, succes) in
                if succes != nil {
                    if let clinic = user.clinic {
                        self.selectionUIView.reloadData(data: clinic.patients)
                        self.infoUIView.reloadUser(user: user)
                        self.view.layoutSubviews()
                    }
                }
            })
        }
    }
    
    func reloadPraticien() {
        ServerService.shared.getPractician(token: self.user.token, practicianId: self.user.ID, completion: {(error, practicien) in
            if let practicien = practicien {
                let token = self.user.token
                self.user = practicien
                self.user.token = token
            }
            if let error = error {
                print(error.localizedDescription)
                Alert.showBasic(title: "Erreur", message: "Erreur dans l'authentification. Il est impossible d'aller chercher le praticien. SVP vérifiez votre connexion internet et recommencez.", vc: self)
                let logInVC = LogInViewController()
                self.navigationController?.pushViewController(logInVC, animated: true)
                self.logOut()
            }
        })
    }
    
    override func logOut() {
        self.user.resetUser()
        self.user = nil
    }
}

