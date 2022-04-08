//
//  SuperAdminHomeViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-11.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class SuperAdminHomeViewController: HomeViewAbstractViewController {
    
    var superAdmin: SuperAdmin!
    var positionX: CGFloat!
    
    var practicienUIView: SelectionUIView!
    var clinicsUIView: SelectionUIView!
    var secretariesUIView: SelectionUIView!
    var adminsUIView: SelectionUIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let SA = self.superAdmin {
            self.user = SA
            self.user.type = ProfilType.SuperAdmin
            setUpUISuperAdmin()
            self.superAdmin.getAllPracticiens(completion: {(error)  in
                self.practicienUIView.reloadData(data: self.superAdmin.practitiens)
            })
            self.superAdmin.getAllClinics(completion: {(error)  in
                self.clinicsUIView.reloadData(data: self.superAdmin.clinics)
            })
            self.superAdmin.getAllSecretaries(completion: {(error) in
                self.secretariesUIView.reloadData(data: self.superAdmin.secretaries)
            })
            self.superAdmin.getAllAdmins(completion: {(error) in
                self.adminsUIView.reloadData(data: self.superAdmin.admins)
            })
        }
    }
    
    override func logOut() {
        self.superAdmin.resetUser()
        self.superAdmin = nil
    }
    
    func setUpUISuperAdmin() {
        width = self.view.frame.width - 2 * OUTTER_PADDING - 2 * BORDER_SIZE
        positionY = self.view.frame.origin.y + OUTTER_PADDING
        positionX = self.view.frame.width - OUTTER_PADDING - BUTTON_HEIGHT
        logOutButton = UIButton()
        scrollView.addSubview(logOutButton)
        if let outImage = UIImage(named: "out") {
            logOutButton.setUp(position: CGPoint(x: positionX, y: positionY), image: outImage, width: BUTTON_HEIGHT,height:BUTTON_HEIGHT)
            logOutButton.addTarget(self, action: #selector(logOutTapped), for: .touchUpInside)
        }
        positionY += logOutButton.frame.height + OUTTER_PADDING
        positionX =  OUTTER_PADDING
        
        let infoUIView = InfoUIView()
        infoUIView.frame = CGRect(x: positionX, y: positionY, width: width, height: UIVIEW_HEIGHT)
        infoUIView.builUIView(user: self.superAdmin)
        scrollView.addSubview(infoUIView)
        infoUIView.infoUIViewDelegate = self
        positionY += infoUIView.frame.height + OUTTER_PADDING
        var frame = CGRect(x: positionX, y: positionY, width: width, height: UIVIEW_HEIGHT)
       
        
        practicienUIView = SelectionUIView()
        practicienUIView.buildUI(frame: frame, title: "Practiciens", options: [], data: [], dropDown: false, preLoadData: self.superAdmin.practitiens, user: self.superAdmin)
        scrollView.addSubview(practicienUIView)
        practicienUIView.selectionUIViewToVCDelegate = self
        practicienUIView.genericTableUIView.selectedCellSegueProtocol = self
        
        positionY += practicienUIView.frame.height + OUTTER_PADDING
        frame = CGRect(x: positionX, y: positionY, width: width, height: UIVIEW_HEIGHT)

        
        adminsUIView = SelectionUIView()
        adminsUIView.buildUI(frame: frame, title: "Admins", options: [], data: [], dropDown: false, preLoadData: self.superAdmin.admins, user: self.superAdmin)
        scrollView.addSubview(adminsUIView)
        adminsUIView.selectionUIViewToVCDelegate = self
        adminsUIView.genericTableUIView.selectedCellSegueProtocol = self
        positionY += adminsUIView.frame.height + OUTTER_PADDING
        frame = CGRect(x: positionX, y: positionY, width: width, height: UIVIEW_HEIGHT)

        
        clinicsUIView = SelectionUIView()
        clinicsUIView.buildUI(frame: frame, title: "Clinics", options: [], data: [], dropDown: false, preLoadData: self.superAdmin.clinics, user: self.superAdmin)
        scrollView.addSubview(clinicsUIView)
        clinicsUIView.selectionUIViewAddClinicDelegate = self
        clinicsUIView.genericTableUIView.selectedCellSegueProtocol = self
        positionY += clinicsUIView.frame.height + OUTTER_PADDING
        frame = CGRect(x: positionX, y: positionY, width: width, height: UIVIEW_HEIGHT)
        
        
        secretariesUIView = SelectionUIView()
        secretariesUIView.buildUI(frame: frame, title: "Secrétaires", options: [], data: [], dropDown: false, preLoadData: self.superAdmin.secretaries, user: self.superAdmin)
        scrollView.addSubview(secretariesUIView)
        secretariesUIView.selectionUIViewToVCDelegate = self
        secretariesUIView.genericTableUIView.selectedCellSegueProtocol = self
        positionY += secretariesUIView.frame.height + OUTTER_PADDING

        scrollView.contentSize.height = positionY
    }
}

extension SuperAdminHomeViewController: SelectionUIViewAddClinicDelegate {
    
}
