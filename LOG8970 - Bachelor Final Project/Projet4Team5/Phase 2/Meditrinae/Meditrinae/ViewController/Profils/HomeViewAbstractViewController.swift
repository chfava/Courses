//
//  HomeViewAbstractViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import iOSDropDown

class HomeViewAbstractViewController: UIViewController, SelectedCellProtocol {
    var selectionUIView: SelectionUIView!
    var infoUIView: InfoUIView!
    
    var options: [optionsID]!
    var data: [Any]!
    var dataToAdd: [Any]!
    var user: ProfilAbstract!
    
    var newQuestionnaireUIView: NewQuestionnaireUIView!
    var changePasswordUIView: NewPasswordUIView!
    var newClinicUIView: NewClinicUIView!
    var newUserUIView: NewUserUIView!
    var authUserUIView: AuthentificationUserUIView!
    var emailToSendUIView: EmailSendUIView!
    var newNoteUIView: NoteUIView!
    var medicalNoteUIView: ShowNoteUIView!
    var consentementUIView: ConsentementUIView!
    
    var authCounter = 0
    
    var logOutButton: UIButton!
    
    var width: CGFloat!
    var height: CGFloat!
    var positionY: CGFloat!
    
    var blackUIView: UIView!
    var scrollView: UIScrollView!
    
    var SCROLL_VIEW_HEIGHT: CGFloat = 3000
    
    let storyBoard = UIStoryboard(name: "Main", bundle: nil)


    override func viewDidLoad() {
        super.viewDidLoad()
        if (!(self.navigationController?.navigationBar.isHidden ?? true)) {
            if self.view.frame.origin.y == 0 {
                self.view.frame.origin.y = self.navigationController?.navigationBar.frame.height ?? 0  + OUTTER_PADDING
            }
        }
        let blackFrame = CGRect(x: 0, y: 0, width: self.view.frame.width, height: SCROLL_VIEW_HEIGHT)
        blackUIView = UIView(frame: blackFrame)
        blackUIView.backgroundColor = UIColor.black.withAlphaComponent(0.8)
        width = self.view.frame.width - 2 * OUTTER_PADDING - 2 * BORDER_SIZE
        height = self.view.frame.height - 2 * OUTTER_PADDING - 2 * BORDER_SIZE
        self.view.backgroundColor = WHITE
        setUpScollView()
    }
    
    func setUpScollView() {
        scrollView = UIScrollView()
        view.addSubview(scrollView)
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        scrollView.backgroundColor = WHITE
        scrollView.topAnchor.constraint(equalTo: self.view.topAnchor).isActive = true
        scrollView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor).isActive = true
        scrollView.leftAnchor.constraint(equalTo: self.view.leftAnchor).isActive = true
        scrollView.rightAnchor.constraint(equalTo: self.view.rightAnchor).isActive = true
        scrollView.layoutIfNeeded()
        scrollView.isScrollEnabled = true
        scrollView.contentSize = CGSize(width: self.view.frame.width, height: scrollView.frame.size.height)
    }
    
    
    func setUpUI(title: String, data: [Any], options: [optionsID], user: ProfilAbstract, dropDown: Bool, dataToAdd: [Any]) {
        self.data = data
        self.dataToAdd = dataToAdd
        self.options = options
        var positionX = self.view.frame.width - OUTTER_PADDING - BUTTON_HEIGHT
        positionY = OUTTER_PADDING
        if (user.type != ProfilType.Patient) {
            logOutButton = UIButton()
            scrollView.addSubview(logOutButton)
            if let outImage = UIImage(named: "out") {
                logOutButton.setUp(position: CGPoint(x: positionX, y: positionY), image: outImage, width: BUTTON_HEIGHT, height:  BUTTON_HEIGHT)
                logOutButton.addTarget(self, action: #selector(logOutTapped), for: .touchUpInside)
            }
            positionY += logOutButton.frame.height + OUTTER_PADDING
        }
        
        positionX = OUTTER_PADDING
        
        infoUIView = InfoUIView()
        infoUIView.frame = CGRect(x: positionX, y: positionY, width: width, height: height/3)
        infoUIView.builUIView(user: user)
        scrollView.addSubview(infoUIView)
        infoUIView.infoUIViewDelegate = self
        
        positionY += infoUIView.frame.height + OUTTER_PADDING
        
        selectionUIView = SelectionUIView()
        let frame = CGRect(x: positionX, y: positionY, width: width, height: 500)
        self.selectionUIView.buildUI(frame: frame, title: title, options: options, data: data, dropDown: dropDown, preLoadData: dataToAdd, user: user)
        scrollView.addSubview(selectionUIView)
        selectionUIView.selectionUIViewToVCDelegate = self
        selectionUIView.genericTableUIView.selectedCellSegueProtocol = self
        
        positionY += selectionUIView.frame.height + OUTTER_PADDING
    }
    
    
    @objc func logOutTapped(gestureRecon : UIGestureRecognizer) {
        let logInVC = LogInViewController()
        self.navigationController?.pushViewController(logInVC, animated: true)
        self.logOut()
    }
    
    func logOut() {
        self.user = nil
    }
    
    func checkAuth() {
        if (authCounter == 3) {
            let logInVC = LogInViewController()
            self.navigationController?.pushViewController(logInVC, animated: true)
            self.logOut()
        }
    }
    
    
    override func viewDidDisappear(_ animated: Bool) {
        //destroyer
    }
    
    func reloadQuestionnaires(completion:@escaping (Error?) -> Void) {
        if let patient = user as? Patient {
            patient.getMedicalExams(completion: {(error) in
                completion(nil)
            })
        }
        completion(nil)
    }
    
    func reloadPatients(completion:@escaping (Error?, Bool?) -> Void) {
        if let clinic = self.user.clinic {
            clinic.getPatients(token: self.user.token, completion: { (error, succes) in
                if let succes = succes {
                    if (succes) {
                        completion(nil, true)
                    }
                }
                if let error = error {
                    print(error.localizedDescription)
                    Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                }
            })
        }
        completion(nil, false)
    }
    
    func reloadPracticiens(completion:@escaping (Error?, Bool?) -> Void) {
        if let clinic = self.user.clinic {
            clinic.getPracticiens(token: self.user.token, completion: { (error, succes) in
                if let succes = succes {
                    if (succes) {
                        completion(nil, true)
                    }
                }
                if let error = error {
                    print(error.localizedDescription)
                    Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                }
            })
        }
        completion(nil, false)
    }
    
    func reloadAdmins(completion:@escaping (Error?, Bool?) -> Void) {
        if let clinic = self.user.clinic {
            clinic.getPracticiens(token: self.user.token, completion: { (error, succes) in
                if let succes = succes {
                    if (succes) {
                        completion(nil, true)
                    }
                }
                if let error = error {
                    print(error.localizedDescription)
                    Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                }
            })
        }
        completion(nil, false)
    }
    
    func selectItem(objectID: String, user: ProfilAbstract?, questionnaire: Questionnaire?, medicalExam: MedicalExam?, note: MedicalNote?, clinic: Clinic?) {
        if let user = user {
            switch user.type {
            case .Secretaire:
                let secretaryVC = SecretaireHomeViewController()
                secretaryVC.user = user as! Secretary
                self.navigationController?.pushViewController(secretaryVC, animated: true)
                break
            case .Praticien:
                let praticienVC = PraticienHomeViewController()
                praticienVC.user = user as! Praticien
                self.navigationController?.pushViewController(praticienVC, animated: true)
                break
            case .Admin:
                let adminVC = AdminHomeViewController()
                adminVC.user = user as! Admin
                self.navigationController?.pushViewController(adminVC, animated: true)
                break
            case .Patient:
                let patientVC = PatientHomeViewController()
                if let user = user as? Patient {
                    user.praticien = self.user as? Praticien
                    patientVC.user = user
                }
                self.navigationController?.pushViewController(patientVC, animated: true)
            case .none:
                break
            case .SuperAdmin:
                Alert.showBasic(title: "Erreur", message: "SVP quittez l'application.", vc: self)
                break
            }
        }
        else if (medicalExam != nil) {
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas accéder à ceci", vc: self)
        }
        else if (note != nil) {
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas accéder à ceci", vc: self)
        }
        else {
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas accéder à ceci", vc: self)
        }
    }
    
    func deleteItem(objectID: String, user: ProfilAbstract?, questionnaire: Questionnaire?, medicalExam: MedicalExam?, note : MedicalNote?, clinic: Clinic?) {
        if (user != nil) {
            self.scrollView.addSubview(self.blackUIView)
            let height = (self.view.frame.height - 2 * OUTTER_PADDING ) * 1/2
            let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
            let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: height)
            authUserUIView = AuthentificationUserUIView(frame: frame, user: user!, authAction: .delete)
            self.scrollView.addSubview(authUserUIView)
            authUserUIView.authConfirmDelegate = self
        }
        else if (questionnaire != nil){
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas suprimer ceci.", vc: self)
        }
        else if (medicalExam != nil){
            Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas suprimer ceci.", vc: self)
        }
        else if (note != nil) {
             Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas suprimer ceci.", vc: self)
        }
        else if (clinic != nil) {
             Alert.showBasic(title: "Erreur", message: "Vous ne pouvez pas suprimer ceci.", vc: self)
        }
    }
    
    func deleteUser(user: ProfilAbstract, username: String, password: String, completion:@escaping (Error?, Bool?) -> Void) {
        switch user.type {
            case .Admin:
                ServerService.shared.deleteAdmin(token: self.user.token, adminId: user.ID, username: username, password: password, completion:{(error, succes) in
                    if let succes = succes {
                        if (succes) {
                            self.reloadPatients(completion: {(error, succes) in
                                if let succes = succes {
                                    if (succes) {
                                        if (self.user.clinic != nil) {
                                            self.selectionUIView.reloadData(data: self.user.clinic.admins)
                                        }
                                        else if let user = user as? SuperAdmin {
                                            self.selectionUIView.reloadData(data: user.admins)
                                        }
                                    }
                                }
                                if let error = error {
                                    print(error.localizedDescription)
                                    Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                                }
                            })
                            completion(nil, true)
                        }
                        else {
                            completion(nil, false)
                        }
                    }
                })
            case .Praticien:
                ServerService.shared.deletePractician(token: self.user.token, id: user.ID, username: username, password: password,completion:{(error, succes) in
                    if let succes = succes {
                        if (succes) {
                            self.reloadPatients(completion: {(error, succes) in
                                if let succes = succes {
                                    if (succes) {
                                        if (self.user.clinic != nil) {
                                            self.selectionUIView.reloadData(data: self.user.clinic.praticiens)
                                        }
                                        else if let user = self.user as? SuperAdmin{
                                            self.selectionUIView.reloadData(data: user.practitiens)
                                        }
                                    }
                                    else {
                                        Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                                    }
                                }
                                if let error = error {
                                    print(error.localizedDescription)
                                    Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                                }
                            })
                            completion(nil, true)
                        }
                        else {
                            completion(nil, false)
                        }
                    }
                })
            case .Patient:
                ServerService.shared.deletePatient(token:  self.user.token, patientId: user.ID, username: username, password: password, completion:{ (error, succes) in
                    if let succes = succes {
                        if (succes) {
                            self.reloadPatients(completion: {(error, succes) in
                                if let succes = succes {
                                    if (succes) {
                                        self.selectionUIView.reloadData(data: self.user.clinic.patients)
                                    }
                                }
                                if let error = error {
                                    print(error.localizedDescription)
                                    Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                                }
                            })
                            completion(nil, true)
                        }
                        else {
                            completion(nil, false)
                        }
                    }
                })
            case .Secretaire:
                ServerService.shared.deleteSecretary(token: self.user.token, secretaryId: user.ID, username: username, password: password, completion:{ (error, succes) in
                   if let succes = succes {
                        if (succes) {
                            self.reloadPatients(completion: {(error, succes) in
                                if let succes = succes {
                                    if (succes) {
                                        if (self.user.clinic != nil) {
                                            self.selectionUIView.reloadData(data: self.user.clinic.secretaires)
                                        }
                                        else if let user = self.user as? SuperAdmin{
                                            self.selectionUIView.reloadData(data: user.secretaries)
                                        }
                                    }
                                    else {
                                        Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                                    }
                                }
                                if let error = error {
                                    print(error.localizedDescription)
                                    Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                                }
                            })
                            completion(nil, true)
                        }
                        else {
                            completion(nil, false)
                        }
                    }
                })
            case .none:
                completion(nil, true)
                break
            case .some(.SuperAdmin):
                completion(nil, true)
                break
            }
    }
}

extension HomeViewAbstractViewController: AuthConfirmedDelegate {
    func dismissAuth() {
        self.authCounter = 0
        UIView.animate(withDuration: 0.8 , animations: {
            self.authUserUIView.removeFromSuperview()
            self.authUserUIView = nil
            self.blackUIView.removeFromSuperview()
        })
    }
    
    
    func getUserNameAndPassword(username: String, password: String, userToDel: ProfilAbstract, authAction: AuthAction) {
        switch authAction {
        case .delete:
            self.deleteUser(user: userToDel, username: username, password: password, completion: {(error, succes) in
                if let succes = succes {
                    if (succes) {
                        self.dismissAuth()
                    }
                    else {
                        self.authCounter += 1
                        self.checkAuth()
                        self.authUserUIView.wrongPassword()
                    }
                }
                if let error = error {
                    print(error.localizedDescription)
                }
            })
            break
        case .signOut:
            ServerService.shared.checkValidAuth(username: username, password: password, completion: {(error, succes) in
                if let succes = succes {
                    if (succes) {
                        self.dismissAuth()
                        self.navigationController?.popToRootViewController(animated: true)
                        return
                    }
                    else {
                        self.authCounter += 1
                        self.checkAuth()
                        self.authUserUIView.wrongPassword()
                    }
                }
            })
            break
        }
    }
}

extension HomeViewAbstractViewController: SelectionUIViewAddNewDelegate  {
    
    func addNewUser(userType: ProfilType) {
        UIView.animate(withDuration: 0.5, animations: {
            self.scrollView.addSubview(self.blackUIView)
            let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/5
            let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 3/4)
            self.newUserUIView = NewUserUIView()
            self.scrollView.addSubview(self.newUserUIView)
            self.newUserUIView.buildUI(frame: frame, user: self.user, userType: userType)
            self.newUserUIView.newUserDelegate = self
        })
    }
}

extension HomeViewAbstractViewController: NewUserDelegate {
    func dissmissNewUser(newUser: ProfilAbstract?, update: Bool) {
        if let user = newUser {
            if (!update && user.type == ProfilType.Patient) {
                let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
                let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
                self.consentementUIView = ConsentementUIView(frame: frame)
                self.consentementUIView.consentementDelegate = self
                UIView.animate(withDuration: 0.5, animations: {
                    self.newUserUIView.removeFromSuperview()
                    self.navigationController?.navigationBar.isHidden = true
                    self.scrollView.addSubview(self.consentementUIView)
                    self.scrollView.scrollToTop(animated: true)
                    self.viewDidAppear(true)
                })
            }
            else {
                self.newUserUIView.removeFromSuperview()
                self.blackUIView.removeFromSuperview()
                self.navigationController?.navigationBar.isHidden = false
                self.scrollView.scrollToTop(animated: true)
                self.viewDidAppear(true)
            }
        }
        else {
            self.newUserUIView.removeFromSuperview()
            self.blackUIView.removeFromSuperview()
            self.navigationController?.navigationBar.isHidden = false
            self.scrollView.scrollToTop(animated: true)
            self.viewDidAppear(true)
        }
    }
    
    func sendNewUser(newUser: ProfilAbstract) {
         switch newUser.type {
                case .Admin:
                    ServerService.shared.addAdmin(token: self.user.token, admin: newUser as! Admin, completion: {(error, succes) in
                        if let succes = succes {
                            if succes {
                                self.reloadAdmins(completion: {(error, succes) in
                                    if let succes = succes {
                                        if (succes) {
                                            self.selectionUIView.reloadData(data: self.user.clinic.admins)
                                            return
                                        }
                                    }
                                    if let error = error {
                                        print(error.localizedDescription)
                                        Alert.showBasic(title: "Erreur", message: "Erreur dans la communication avec le serveur.", vc: self)
                                    }
                                })
                            }
                            else {
                                 Alert.showBasic(title: "Erreur", message: "Erreur dans la création de l'administrateur.", vc: self)
                            }
                        }
                    })
                    break
                case .Praticien:
                    ServerService.shared.addPractician(token: self.user.token, praticien: newUser as! Praticien, completion: {(error) in
                        self.reloadPracticiens(completion: {(error, succes) in
                            if let succes = succes {
                                if (succes) {
                                        self.selectionUIView.reloadData(data: self.user.clinic.praticiens)
                                }
                            }
                        })
                    })
                    break
                case .Patient:
                    ServerService.shared.addPatient(token: self.user.token, patient: newUser as! Patient, completion: {(error) in
                          self.reloadPatients(completion: {(error, succes) in
                            if let succes = succes {
                            if (succes) {
                                self.selectionUIView.reloadData(data: self.user.clinic.patients)
                                return
                                }
                            }
                          })
                    })
                    break
                case .Secretaire:
                    ServerService.shared.addSecretary(token: self.user.token, secretery: newUser as! Secretary, completion: {(error, succes) in
                        self.reloadPatients(completion: {(error, succes) in
                              self.selectionUIView.reloadData(data: self.user.clinic.secretaires)
                              return
                        })
                    })
                    break
                case .none:
                    break
                case .some(.SuperAdmin):
                    break
            }
    }
    
    func updateUser(user: ProfilAbstract) {
         switch user.type {
            case .Admin:
                ServerService.shared.updateAdmin(token: self.user.token, admin: user as! Admin,  completion: {(error, succes) in
                    if let succes = succes {
                        if (succes) {
                             let token = self.user.token
                             self.user = user
                             self.user.token = token
                             self.infoUIView.reloadUser(user: user)
                        }
                        else {
                            Alert.showBasic(title: "Erreur", message: "Erreur dans la modification de l'administrateur.", vc: self)
                        }
                    }
                    if let error = error {
                        print(error)
                        Alert.showBasic(title: "Erreur", message: "Erreur dans la modification de l'administrateur.", vc: self)
                    }
                })
                break
            case .Praticien:
                ServerService.shared.updatePractician(token: self.user.token, praticien: user as! Praticien, completion: {(error, succes) in
                    if let succes = succes {
                        if (succes) {
                            let token = self.user.token
                            self.user = user
                            self.user.token = token
                            self.infoUIView.reloadUser(user: user)
                            return
                        }
                        else {
                            Alert.showBasic(title: "Erreur", message: "Erreur dans la modification du praticien.", vc: self)
                        }
                    }
                    if let error = error {
                        print(error)
                        Alert.showBasic(title: "Erreur", message: "Erreur dans la modification du praticien.", vc: self)
                    }
                })
                break
            case .Patient:
                ServerService.shared.updatePatient(token: self.user.token, patient: user as! Patient, completion: {(error, patient) in
                    if let patient = patient {
                        let token = self.user.token
                        self.user = patient
                        self.user.token = token
                        self.infoUIView.reloadUser(user: user)
                    }
                    if let error = error {
                        print(error)
                        Alert.showBasic(title: "Erreur", message: "Erreur dans la modification du Patient.", vc: self)
                    }
                })
                break
            case .Secretaire:
                ServerService.shared.updateSecretary(token: self.user.token, secretary: user as! Secretary, completion: {(error, succes) in
                    if let succes = succes {
                        if (succes) {
                            let token = self.user.token
                            self.user = user
                            self.user.token = token
                            self.infoUIView.reloadUser(user: user)
                        }
                        else {
                            Alert.showBasic(title: "Erreur", message: "Erreur dans la modification du secrétaire.", vc: self)
                        }
                    }
                    if let error = error {
                        print(error)
                        Alert.showBasic(title: "Erreur", message: "Erreur dans la modification du secrétaire.", vc: self)
                    }
                })
                break
            case .none:
                break
            case .some(.SuperAdmin):
                break
        }
    }
}


extension HomeViewAbstractViewController: InfoUIViewDelegate {
    
    func updateUser() {
        UIView.animate(withDuration: 0.5, animations: {
            self.scrollView.addSubview(self.blackUIView)
            let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
            let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 3/4)
            self.newUserUIView = NewUserUIView()
            self.newUserUIView.buildUI(frame: frame, user: self.user, update: true, userType: self.user.type)
            self.scrollView.addSubview(self.newUserUIView)
            self.newUserUIView.newUserDelegate = self
            self.navigationController?.navigationBar.isHidden = true
        })
    }
    
    func changePassword() {
        UIView.animate(withDuration: 0.5, animations: {
            self.scrollView.addSubview(self.blackUIView)
            let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
            let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
            self.changePasswordUIView = NewPasswordUIView(frame: frame)
            self.scrollView.addSubview(self.changePasswordUIView)
            self.changePasswordUIView.newPasswordDelegate = self
            self.navigationController?.navigationBar.isHidden = true
            self.scrollView.scrollToTop(animated: true)
        })
    }
}

extension HomeViewAbstractViewController: NewPasswordDelegate {
    func dismissNewPassword() {
        UIView.animate(withDuration: 0.8 , animations: {
            self.changePasswordUIView.removeFromSuperview()
            self.changePasswordUIView = nil
            self.blackUIView.removeFromSuperview()
            self.navigationController?.navigationBar.isHidden = false
        })
    }
    
    func changePassWord(newPassword: String, oldPassword: String) {
        ServerService.shared.updateMyPassword(token: self.user.token, oldPwd: oldPassword, newPwd: newPassword, completion: {(error, succes) in
            if let succes = succes {
                if (succes) {
                    return
                }
                else {
                    Alert.showBasic(title: "Erreur", message: "Erreur lors de la suppression du mot de passe.", vc: self)
                }
            }
        })
    }
}

extension HomeViewAbstractViewController: NewClinicDelegate {
    func dissmissClinic() {
        //
    }
    
    func sendNewClinic(newClinic: Clinic, update: Bool) {
        if (update) {
            ServerService.shared.updateClinic(token: self.user.token, clinic: newClinic, completion: {(error, succes) in
                return
            })
        }
        else {
            ServerService.shared.addClinic(token: self.user.token, clinic: newClinic, completion: { (error) in
                return
            })
        }
    }
    
    func addNewClinic() {
        UIView.animate(withDuration: 0.5, animations: {
            self.scrollView.addSubview(self.blackUIView)
            let positionY = (self.view.frame.height - 2 * OUTTER_PADDING) * 1/4
            let frame = CGRect(x: OUTTER_PADDING, y: positionY, width: self.width, height: self.height * 2/3)
            self.newClinicUIView = NewClinicUIView(frame: frame, user: self.user)
            self.scrollView.addSubview(self.newClinicUIView)
            self.newClinicUIView.newClinicDelegate = self
            self.navigationController?.navigationBar.isHidden = true
            self.scrollView.scrollToTop(animated: true)
        })
    }
}

extension HomeViewAbstractViewController: ConsentementDelegate {
    func consent(signature: UIImage) {
        dismissConsent()
    }
    
    func dismissConsent() {
        self.consentementUIView.removeFromSuperview()
        self.consentementUIView = nil
        self.blackUIView.removeFromSuperview()
        UIView.animate(withDuration: 0.5, animations: {
            self.navigationController?.navigationBar.isHidden = false
        })
    }
}
