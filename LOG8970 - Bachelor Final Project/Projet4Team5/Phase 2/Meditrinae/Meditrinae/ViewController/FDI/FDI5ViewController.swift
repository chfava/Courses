//
//  FDI5ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-06.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import SceneKit

class FDI5ViewController: FDIAbstract {
    
    @IBOutlet weak var DEncouvrantBSwitch: UISwitch!
    @IBOutlet weak var DEncouvrantPSwitch: UISwitch!
    @IBOutlet weak var DEncouvrantESwitch: UISwitch!
    
    @IBOutlet weak var DPosBSwitch: UISwitch!
    @IBOutlet weak var DPosPSwitch: UISwitch!
    @IBOutlet weak var DPosESwitch: UISwitch!
    
    @IBOutlet weak var GEncouvrantBSwitch: UISwitch!
    @IBOutlet weak var GEncouvrantPSwitch: UISwitch!
    @IBOutlet weak var GEncouvrantESwitch: UISwitch!
    
    @IBOutlet weak var GPosBSwitch: UISwitch!
    @IBOutlet weak var GPosPSwitch: UISwitch!
    @IBOutlet weak var GPosESwitch: UISwitch!
    
    
    @IBOutlet weak var reductionTextField: UILabel!
    @IBOutlet weak var patientDTextField: UILabel!
    @IBOutlet weak var examineteurDTextField: UILabel!
    @IBOutlet weak var patientGTextField: UILabel!
    @IBOutlet weak var examinateurGTextField: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setUpSwitchs()
        self.setUpNextButton()
        self.nextQuestionnaireSegue = "FDI6ViewController"
    }
    
    func setUpSwitchs() {
        DEncouvrantBSwitch.isOn = false
        DEncouvrantPSwitch.isOn = false
        DEncouvrantESwitch.isOn = false
        
        DPosBSwitch.isOn = false
        DPosPSwitch.isOn = false
        DPosESwitch.isOn = false
        
        GEncouvrantBSwitch.isOn = false
        GEncouvrantPSwitch.isOn = false
        GEncouvrantESwitch.isOn = false
        
        GPosBSwitch.isOn = false
        GPosPSwitch.isOn = false
        GPosESwitch.isOn = false
        
        DEncouvrantPSwitch.isHidden = true
        DEncouvrantESwitch.isHidden = true
        DPosPSwitch.isHidden = true
        DPosESwitch.isHidden = true
        GEncouvrantPSwitch.isHidden = true
        GEncouvrantESwitch.isHidden = true
        GPosPSwitch.isHidden = true
        GPosESwitch.isHidden = true
        self.setTextFieldsD(mode: true)
        self.setTextFieldsD(mode: true)
        self.checkReduc()
    }
    
    @IBAction func ouvrantDblocTapped(_ sender: Any) {
        checkReduc()
        if (self.DEncouvrantBSwitch.isOn) {
            UIView.animate(withDuration: 0.5, animations: {
                self.DEncouvrantPSwitch.isHidden = false
                self.DEncouvrantESwitch.isHidden = false
                if (self.DEncouvrantBSwitch.isOn || self.DPosBSwitch.isOn) {
                    self.setTextFieldsD(mode: false)
                }
                else {
                    self.setTextFieldsD(mode: true)
                }
            })
       }
        else {
            UIView.animate(withDuration: 0.5, animations: {
                self.DEncouvrantPSwitch.isHidden = true
                self.DEncouvrantESwitch.isHidden = true
                self.DEncouvrantPSwitch.isOn = false
                self.DEncouvrantESwitch.isOn = false
                if (self.DEncouvrantBSwitch.isOn || self.DPosBSwitch.isOn) {
                    self.setTextFieldsD(mode: false)
                }
                else {
                    self.setTextFieldsD(mode: true)
                }
            })
            
        }
    }
    
    @IBAction func posDblocTapped(_ sender: Any) {
        checkReduc()
        if (self.DPosBSwitch.isOn) {
             UIView.animate(withDuration: 0.5, animations: {
                 self.DPosPSwitch.isHidden = false
                 self.DPosESwitch.isHidden = false
                if (self.DEncouvrantBSwitch.isOn || self.DPosBSwitch.isOn) {
                    self.setTextFieldsD(mode: false)
                }
                else {
                    self.setTextFieldsD(mode: true)
                }
             })
        }
         else {
             UIView.animate(withDuration: 0.5, animations: {
                self.DPosPSwitch.isHidden = true
                self.DPosESwitch.isHidden = true
                self.DPosPSwitch.isOn = false
                self.DPosESwitch.isOn = false
                if (self.DEncouvrantBSwitch.isOn || self.DPosBSwitch.isOn) {
                    self.setTextFieldsD(mode: false)
                }
                else {
                    self.setTextFieldsD(mode: true)
                }
             })
             
         }
    }
    
    @IBAction func ouvrantGblocTapped(_ sender: Any) {
        checkReduc()
        if (self.GEncouvrantBSwitch.isOn) {
             UIView.animate(withDuration: 0.5, animations: {
                self.GEncouvrantPSwitch.isHidden = false
                self.GEncouvrantESwitch.isHidden = false
                if (self.GEncouvrantBSwitch.isOn || self.GPosBSwitch.isOn) {
                    self.setTextFieldsG(mode: false)
                }
                else {
                    self.setTextFieldsG(mode: true)
                }
             })
        }
         else {
             UIView.animate(withDuration: 0.5, animations: {
                self.GEncouvrantPSwitch.isHidden = true
                self.GEncouvrantESwitch.isHidden = true
                self.GEncouvrantPSwitch.isOn = false
                self.GEncouvrantESwitch.isOn = false
                if (self.GEncouvrantBSwitch.isOn || self.GPosBSwitch.isOn) {
                    self.setTextFieldsG(mode: false)
                    }
                else {
                    self.setTextFieldsG(mode: true)
                }
             })
             
         }
    }
    
    @IBAction func posGblocTapped(_ sender: Any) {
        checkReduc()
        if (self.GPosBSwitch.isOn) {
             UIView.animate(withDuration: 0.5, animations: {
                self.GPosPSwitch.isHidden = false
                self.GPosESwitch.isHidden = false
                if (self.GEncouvrantBSwitch.isOn || self.GPosBSwitch.isOn) {
                    self.setTextFieldsG(mode: false)
                }
                else {
                    self.setTextFieldsG(mode: true)
                }
             })
        }
         else {
             UIView.animate(withDuration: 0.5, animations: {
                self.GPosPSwitch.isHidden = true
                self.GPosESwitch.isHidden = true
                self.GPosPSwitch.isOn = false
                self.GPosESwitch.isOn = false
                if (self.GEncouvrantBSwitch.isOn || self.GPosBSwitch.isOn) {
                    self.setTextFieldsG(mode: false)
                }
                else {
                    self.setTextFieldsG(mode: true)
                }
             })
         }
    }
    
    override func buildAnswers() {
        self.questionnaire.exportedData["E8_OUVRANT_BLOC_D"] = getSwitchValue(input:DEncouvrantBSwitch)
        self.questionnaire.exportedData["E8_OUVRANT_PAT_D"] = getSwitchValue(input:DEncouvrantPSwitch)
        self.questionnaire.exportedData["E8_OUVRANT_EXAM_D"] = getSwitchValue(input:DEncouvrantESwitch)
        
        self.questionnaire.exportedData["E8_OUVERT_BLOC_D"] = getSwitchValue(input:DPosBSwitch)
        self.questionnaire.exportedData["E8_OUVERT_PAT_D"] = getSwitchValue(input:DPosPSwitch)
        self.questionnaire.exportedData["E8_OUVERT_EXAM_D"] = getSwitchValue(input:DPosESwitch)
            
        self.questionnaire.exportedData["E8_OUVRANT_BLOC_G"] = getSwitchValue(input:GEncouvrantBSwitch)
        self.questionnaire.exportedData["E8_OUVRANT_PAT_G"] = getSwitchValue(input:GEncouvrantPSwitch)
        self.questionnaire.exportedData["E8_OUVRANT_EXAM_G"] = getSwitchValue(input:GEncouvrantESwitch)
        
        self.questionnaire.exportedData["E8_OUVERT_BLOC_G"] = getSwitchValue(input:GPosBSwitch)
        self.questionnaire.exportedData["E8_OUVERT_PAT_G"] = getSwitchValue(input:GPosPSwitch)
        self.questionnaire.exportedData["E8_OUVERT_EXAM_G"] = getSwitchValue(input:GPosESwitch)
    }
    
    func setTextFieldsD(mode: Bool) {
        examineteurDTextField.isHidden = mode
        patientDTextField.isHidden = mode
    }
    func setTextFieldsG(mode: Bool) {
        patientGTextField.isHidden = mode
        examinateurGTextField.isHidden = mode
    }
    func checkReduc() {
        if (DEncouvrantBSwitch.isOn || DPosBSwitch.isOn || GPosBSwitch.isOn || GEncouvrantBSwitch.isOn) {
            reductionTextField.isHidden = false
        }
        else {
             reductionTextField.isHidden = true
        }
    }
}
