//
//  LogInViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-09.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import Lottie
import Network
import Alamofire

class LogInViewController: UIViewController, TransitionToHomeDelegate {
    
    var userNameTextField: UITextField!
    var passwordTextField: UITextField!
    
    let wifiMonitor = NWPathMonitor(requiredInterfaceType: .wifi)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setUp()
        ServerService.shared.delegateToHome = self
        connectionHanddlerSetUP()
        self.navigationController?.initRootViewController(vc: self)
        
        
        let tap = UITapGestureRecognizer(target: self.view, action: #selector(self.view.endEditing(_:)))
        tap.cancelsTouchesInView = false
        self.view.addGestureRecognizer(tap)
        
    }
    
    func setUp() {
        self.view.backgroundColor = UIColor.white
        let width = self.view.frame.width - 2 * OUTTER_PADDING
        let heigt = self.view.frame.height - 2 * OUTTER_PADDING
        
        let textFieldWidth = self.view.frame.width - 4 * OUTTER_PADDING
        
        var x = OUTTER_PADDING
        var y = 2 * OUTTER_PADDING
        
        if let appNameImage = UIImage(named: "appName") {
            let frame = CGRect(x: x, y: y, width: width, height: heigt/4)
            let imageView = UIImageView(frame: frame)
            imageView.image = appNameImage
            imageView.contentMode = .scaleAspectFit
            self.view.addSubview(imageView)
            
            y += imageView.frame.height + OUTTER_PADDING
        }
        
        x = 2 * OUTTER_PADDING
        
        userNameTextField = UITextField()
        self.view.addSubview(userNameTextField)
        userNameTextField.setUp(placeHolder: "Nom d'utilisateur", position: CGPoint(x: x, y: y), width: textFieldWidth, height: 2 * TEXT_FIELD_INPUT_HEIGHT)
        userNameTextField.layer.borderWidth = SMALL_BORDER
        userNameTextField.layer.borderColor = LIGHT_GRAY.cgColor
        userNameTextField.layer.cornerRadius = CORNER_RADIUS
        userNameTextField.autocapitalizationType = .none
        
        
        y += userNameTextField.frame.height + OUTTER_PADDING
        
        passwordTextField = UITextField()
        self.view.addSubview(passwordTextField)
        passwordTextField.setUp(placeHolder: "Mot de passe", position: CGPoint(x: x, y: y), width: textFieldWidth, height: 2 * TEXT_FIELD_INPUT_HEIGHT)
        passwordTextField.layer.borderWidth = SMALL_BORDER
        passwordTextField.layer.borderColor = LIGHT_GRAY.cgColor
        passwordTextField.layer.cornerRadius = CORNER_RADIUS
        passwordTextField.autocapitalizationType = .none
        
        y += passwordTextField.frame.height + OUTTER_PADDING

        let posX = self.view.center.x - 200
        if let image = UIImage(named: "start")  {
            let startButton = UIButton()
            self.view.addSubview(startButton)
            startButton.setUp(position: CGPoint(x: posX, y: y), image: image, width: 400, height: 200)
            startButton.addTarget(self, action: #selector(logInTapped), for: .touchUpInside)
            y += startButton.frame.height
        }
        let newUserButtonFrame = CGRect(x: posX, y: y, width: 400, height: 50)
        let newUserButton = UIButton(frame: newUserButtonFrame)
        newUserButton.setTitle("Pas de compte? Sign up.", for: .normal)
        newUserButton.setTitleColor(LIGHT_GRAY, for: .normal)
        newUserButton.setTitleColor(BLUE, for: .highlighted)
        newUserButton.addTarget(self, action: #selector(newUserTapped), for: .touchUpInside)
        self.view.addSubview(newUserButton)
        
    }
    
    @objc func newUserTapped(_ sender: UIButton) {
        
    }
    
    @objc func logInTapped(_ sender: Any) {
        if (sendToServer) {
            if let username = userNameTextField.text {
                if let password = passwordTextField.text {
                    ServerService.shared.LogIn(username: username, password: password, completion: {(error, abstractProfil, SA)  in
                        if let _ = error {
                            Alert.showBasic(title: "Erreur lors de l'authentication", message: "SVP entrer un nom d'utilsiateur et un mot de passe valide", vc: self)
                        }
                        else {
                            if let superAdmin = SA {
                                let superAdminVC = SuperAdminHomeViewController()
                                superAdminVC.superAdmin = superAdmin
                                self.navigationController?.pushViewController(superAdminVC, animated: true)
                                self.navigationController?.initRootViewController(vc: superAdminVC)
                            }
                            else {
                            switch abstractProfil?.type {
                            case .Admin:
                                let adminVC = AdminHomeViewController()
                                adminVC.user = Admin(abtractProfil: abstractProfil!)
                                self.navigationController?.pushViewController(adminVC, animated: true)
                                self.navigationController?.initRootViewController(vc: adminVC)
                                break
                            case .Praticien:
                                let praticienVC = PraticienHomeViewController()
                                praticienVC.user = Praticien(abtractProfil: abstractProfil!)
                                self.navigationController?.pushViewController(praticienVC, animated: true)
                                self.navigationController?.initRootViewController(vc: praticienVC)
                                break
                            case .SuperAdmin:
                                break
                            case .Secretaire:
                                let secreteryVC = SecretaireHomeViewController()
                                secreteryVC.user = Secretary(abtractProfil: abstractProfil!)
                                self.navigationController?.pushViewController(secreteryVC, animated: true)
                                 self.navigationController?.initRootViewController(vc: secreteryVC)
                                break
                            case .none:
                                break
                            case .Patient:
                                Alert.showBasic(title: "Erreur", message: "Un Patient ne peut pas se connecter soi-même.", vc: self)
                                break
                            }
                        }
                        }
                    })
                }
                else {
                     Alert.showBasic(title: "Erreur", message: "SVP entrer votre mot de passe", vc: self)
                }
            }
            else {
                Alert.showBasic(title: "Erreur", message: "SVP entrer un nom d'utilsiateur", vc: self)
            }
        }
    }
    func connectionHanddlerSetUP() {
        wifiMonitor.pathUpdateHandler = { path in
            if path.status == .satisfied {
               // print("We're connected!")
            } else {
                //print("No connection.")
            }
            //print(path.isExpensive)
        }
        let queue = DispatchQueue(label: "Monitor")
        wifiMonitor.start(queue: queue)
    }
    
    func showHome() {
        self.performSegue(withIdentifier: "fromLogIntoHome", sender: self)
    }
    
    func clearInput() {
        self.passwordTextField.text = ""
        self.userNameTextField.text = ""
    }
}
