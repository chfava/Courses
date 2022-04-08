//
//  FDI4ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-06.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class FDI4ViewController: FDIAbstract {

    @IBOutlet weak var DCraqueOSwitch: UISwitch!
    @IBOutlet weak var DCraqueFSwitch: UISwitch!
    @IBOutlet weak var DCraquePSwitch: UISwitch!
    @IBOutlet weak var DCraqueDCSwitch: UISwitch!
    @IBOutlet weak var DCraqueHSwitch: UISwitch!
    
    @IBOutlet weak var DCrepitOSwitch: UISwitch!
    @IBOutlet weak var DCrepitFSwitch: UISwitch!
    @IBOutlet weak var DCrepitPSwitch: UISwitch!
    @IBOutlet weak var DCrepitDCSwitch: UISwitch!
    @IBOutlet weak var DCrepitHSwitch: UISwitch!
    
    @IBOutlet weak var GCraqueOSwitch: UISwitch!
    @IBOutlet weak var GCraqueFSwitch: UISwitch!
    @IBOutlet weak var GCraquePSwitch: UISwitch!
    @IBOutlet weak var GCraqueDCSwitch: UISwitch!
    @IBOutlet weak var GCraqueHSwitch: UISwitch!
    
    @IBOutlet weak var GCrepitOSwitch: UISwitch!
    @IBOutlet weak var GCrepitFSwitch: UISwitch!
    @IBOutlet weak var GCrepitPSwitch: UISwitch!
    @IBOutlet weak var GCrepitDCSwitch: UISwitch!
    @IBOutlet weak var GCrepitHSwitch: UISwitch!
    
    @IBOutlet weak var DCraquementOSwitch: UISwitch!
    @IBOutlet weak var DCraquementFSwitch: UISwitch!
    @IBOutlet weak var DCraquementPSwitch: UISwitch!
    @IBOutlet weak var DCraquementDCSwitch: UISwitch!
    @IBOutlet weak var DCraquementHSwitch: UISwitch!
    
    @IBOutlet weak var DCrepitementOSwitch: UISwitch!
    @IBOutlet weak var DCrepitementFSwitch: UISwitch!
    @IBOutlet weak var DCrepitementPSwitch: UISwitch!
    @IBOutlet weak var DCrepitementDCSwitch: UISwitch!
    @IBOutlet weak var DCrepitementHSwitch: UISwitch!
    
    @IBOutlet weak var GCraquementOSwitch: UISwitch!
    @IBOutlet weak var GCraquementFSwitch: UISwitch!
    @IBOutlet weak var GCraquementPSwitch: UISwitch!
    @IBOutlet weak var GCraquementDCSwitch: UISwitch!
    @IBOutlet weak var GCraquementHSwitch: UISwitch!
    
    @IBOutlet weak var GCrepitementOSwitch: UISwitch!
    @IBOutlet weak var GCrepitementFSwitch: UISwitch!
    @IBOutlet weak var GCrepitementPSwitch: UISwitch!
    @IBOutlet weak var GCrepitementDCSwitch: UISwitch!
    @IBOutlet weak var GCrepitementHSwitch: UISwitch!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.setUpSwitchs()
        self.setUpNextButton()
        self.nextQuestionnaireSegue = "FDI5ViewController"
    }
    
    func setUpSwitchs() {
        DCraqueOSwitch.isOn = false
        DCraqueFSwitch.isOn = false
        DCraquePSwitch.isOn = false
        DCraqueDCSwitch.isOn = false
        DCraqueHSwitch.isOn = false
        
        DCrepitOSwitch.isOn = false
        DCrepitFSwitch.isOn = false
        DCrepitPSwitch.isOn = false
        DCrepitDCSwitch.isOn = false
        DCrepitHSwitch.isOn = false
        
        GCraqueOSwitch.isOn = false
        GCraqueFSwitch.isOn = false
        GCraquePSwitch.isOn = false
        GCraqueDCSwitch.isOn = false
        GCraqueHSwitch.isOn = false
        
        GCrepitOSwitch.isOn = false
        GCrepitFSwitch.isOn = false
        GCrepitPSwitch.isOn = false
        GCrepitDCSwitch.isOn = false
        GCrepitHSwitch.isOn = false
        
        DCraquementOSwitch.isOn = false
        DCraquementFSwitch.isOn = false
        DCraquementPSwitch.isOn = false
        DCraquementDCSwitch.isOn = false
        DCraquementHSwitch.isOn = false
        
        DCrepitementOSwitch.isOn = false
        DCrepitementFSwitch.isOn = false
        DCrepitementPSwitch.isOn = false
        DCrepitementDCSwitch.isOn = false
        DCrepitementHSwitch.isOn = false
        
        GCraquementOSwitch.isOn = false
        GCraquementFSwitch.isOn = false
        GCraquementPSwitch.isOn = false
        GCraquementDCSwitch.isOn = false
        GCraquementHSwitch.isOn = false
        
        GCrepitementOSwitch.isOn = false
        GCrepitementFSwitch.isOn = false
        GCrepitementPSwitch.isOn = false
        GCrepitementDCSwitch.isOn = false
        GCrepitementHSwitch.isOn = false
        
        DCraqueDCSwitch.isHidden = true
        DCraqueHSwitch.isHidden = true
        DCrepitDCSwitch.isHidden = true
        DCrepitHSwitch.isHidden = true
        
        GCraqueDCSwitch.isHidden = true
        GCraqueHSwitch.isHidden = true
        GCrepitDCSwitch.isHidden = true
        GCrepitHSwitch.isHidden = true
        
        
        DCraquementDCSwitch.isHidden = true
        DCraquementHSwitch.isHidden = true
        DCrepitementDCSwitch.isHidden = true
        DCrepitementHSwitch.isHidden = true
        
        GCraquementDCSwitch.isHidden = true
        GCraquementHSwitch.isHidden = true
        GCrepitementDCSwitch.isHidden = true
        GCrepitementHSwitch.isHidden = true
    }
    
    override func buildAnswers() {
        self.questionnaire.exportedData["E6_CRAQ_OUV_D"] = getSwitchValue(input:DCraqueOSwitch)
        self.questionnaire.exportedData["E6_CRAQ_FERM_D"] = getSwitchValue(input:DCraqueFSwitch)
        self.questionnaire.exportedData["E6_CRAQ_PAT_D"] = getSwitchValue(input:DCraquePSwitch)
        self.questionnaire.exportedData["E6_CRAQ_DOUL_D"] = getSwitchValue(input:DCraqueDCSwitch)
        self.questionnaire.exportedData["E6_CRAQ_DOUL_HAB_D"] = getSwitchValue(input:DCraqueHSwitch)
        
        self.questionnaire.exportedData["E6_CREP_OUV_D"] = getSwitchValue(input:DCrepitOSwitch)
        self.questionnaire.exportedData["E6_CREP_FERM_D"] = getSwitchValue(input:DCrepitFSwitch)
        self.questionnaire.exportedData["E6_CREP_PAT_D"] = getSwitchValue(input:DCrepitPSwitch)
        self.questionnaire.exportedData["E6_CREP_DOUL_D"] = getSwitchValue(input:DCrepitDCSwitch)
        self.questionnaire.exportedData["E6_CREP_DOU_HAB_D"] = getSwitchValue(input:DCrepitHSwitch)
        
        self.questionnaire.exportedData["E6_CRAQ_OUV_G"] = getSwitchValue(input:GCraqueOSwitch)
        self.questionnaire.exportedData["E6_CRAQ_FERM_G"] = getSwitchValue(input:GCraqueFSwitch)
        self.questionnaire.exportedData["E6_CRAQ_PAT_G"] = getSwitchValue(input:GCraquePSwitch)
        self.questionnaire.exportedData["E6_CRAQ_DOUL_G"] = getSwitchValue(input:GCraqueDCSwitch)
        self.questionnaire.exportedData["E6_CRAQ_DOUL_HAB_G"] = getSwitchValue(input:GCraqueHSwitch)
        
        self.questionnaire.exportedData["E6_CREP_OUV_G"] = getSwitchValue(input:GCrepitOSwitch)
        self.questionnaire.exportedData["E6_CREP_FERM_G"] = getSwitchValue(input:GCrepitFSwitch)
        self.questionnaire.exportedData["E6_CREP_PAT_G"] = getSwitchValue(input:GCrepitPSwitch)
        self.questionnaire.exportedData["E6_CREP_DOUL_G"] = getSwitchValue(input:GCrepitDCSwitch)
        self.questionnaire.exportedData["E6_CREP_DOUL_HAB_G"] = getSwitchValue(input:GCrepitHSwitch)
        
        self.questionnaire.exportedData["E7_CRAQ_OUV_D"] = getSwitchValue(input:DCraquementOSwitch)
        self.questionnaire.exportedData["E7_CRAQ_FERM_D"] = getSwitchValue(input:DCraquementFSwitch)
        self.questionnaire.exportedData["E7_CRAQ_PAT_D"] = getSwitchValue(input:DCraquementPSwitch)
        self.questionnaire.exportedData["E7_CRAQ_DOUL_D"] = getSwitchValue(input:DCraquementDCSwitch)
        self.questionnaire.exportedData["E7_CRAQ_DOUL_HAB_D"] = getSwitchValue(input:DCraquementHSwitch)
        
        self.questionnaire.exportedData["E7_CREP_OUV_D"] = getSwitchValue(input:DCrepitementOSwitch)
        self.questionnaire.exportedData["E7_CREP_FERM_D"] = getSwitchValue(input:DCrepitementFSwitch)
        self.questionnaire.exportedData["E7_CREP_PAT_D"] = getSwitchValue(input:DCrepitementPSwitch)
        self.questionnaire.exportedData["E7_CREP_DOUL_D"] = getSwitchValue(input:DCrepitementDCSwitch)
        self.questionnaire.exportedData["E7_CREP_DOUL_HAB_D"] = getSwitchValue(input:DCrepitementHSwitch)
        
        self.questionnaire.exportedData["E7_CRAQ_OUV_G"] = getSwitchValue(input:GCraquementOSwitch)
        self.questionnaire.exportedData["E7_CRAQ_FERM_G"] = getSwitchValue(input:GCraquementFSwitch)
        self.questionnaire.exportedData["E7_CRAQ_PAT_G"] = getSwitchValue(input:GCraquementPSwitch)
        self.questionnaire.exportedData["E7_CRAQ_DOUL_G"] = getSwitchValue(input:GCraquementDCSwitch)
        self.questionnaire.exportedData["E7_CRAQ_DOUL_HAB_G"] = getSwitchValue(input:GCraquementHSwitch)
        
        self.questionnaire.exportedData["E7_CREP_OUV_G"] = getSwitchValue(input:GCrepitementOSwitch)
        self.questionnaire.exportedData["E7_CREP_FERM_G"] = getSwitchValue(input:GCrepitementFSwitch)
        self.questionnaire.exportedData["E7_CREP_PAT_G"] = getSwitchValue(input:GCrepitementPSwitch)
        self.questionnaire.exportedData["E7_CREP_DOUL_G"] = getSwitchValue(input:GCrepitementDCSwitch)
        self.questionnaire.exportedData["E7_CREP_DOUL_HAB_G"] = getSwitchValue(input:GCrepitementHSwitch)
        
    }
    
    @IBAction func DcraqPatTapped(_ sender: Any) {
        if (self.DCraquePSwitch.isOn) {
            UIView.animate(withDuration: 0.5, animations: {
                self.DCraqueDCSwitch.isHidden = false
                self.DCraqueHSwitch.isHidden = false

            })
        }
        else {
            UIView.animate(withDuration: 0.5, animations: {
                self.DCraqueDCSwitch.isHidden = true
                self.DCraqueHSwitch.isHidden = true
                self.DCraqueDCSwitch.isOn = false
                self.DCraqueHSwitch.isOn = false
            })
            
        }
    }
    
    @IBAction func DcrepPatTapped(_ sender: Any) {
        if (self.DCrepitPSwitch.isOn) {
            UIView.animate(withDuration: 0.5, animations: {
                self.DCrepitDCSwitch.isHidden = false
                self.DCrepitHSwitch.isHidden = false
            })
        }
        else {
            UIView.animate(withDuration: 0.5, animations: {
                self.DCrepitDCSwitch.isHidden = true
                self.DCrepitHSwitch.isHidden = true
                self.DCrepitDCSwitch.isOn = false
                self.DCrepitHSwitch.isOn = false
            })
            
        }
    }
    
    
    @IBAction func GcraqPatTapped(_ sender: Any) {
        if (self.GCraquePSwitch.isOn) {
            UIView.animate(withDuration: 0.5, animations: {
                self.GCraqueDCSwitch.isHidden = false
                self.GCraqueHSwitch.isHidden = false

            })
        }
        else {
            UIView.animate(withDuration: 0.5, animations: {
                self.GCraqueDCSwitch.isHidden = true
                self.GCraqueHSwitch.isHidden = true
                self.GCraqueDCSwitch.isOn = false
                self.GCraqueHSwitch.isOn = false
            })
            
        }
    }
    
    @IBAction func GcrepPatTapped(_ sender: Any) {
        if (self.GCrepitPSwitch.isOn) {
            UIView.animate(withDuration: 0.5, animations: {
                self.GCrepitDCSwitch.isHidden = false
                self.GCrepitHSwitch.isHidden = false
            })
        }
        else {
            UIView.animate(withDuration: 0.5, animations: {
                self.GCrepitDCSwitch.isHidden = true
                self.GCrepitHSwitch.isHidden = true
                self.GCrepitDCSwitch.isOn = false
                self.GCrepitHSwitch.isOn = false
            })
            
        }
    }
    
    @IBAction func DcraquementPatTapped(_ sender: Any) {
        if (self.DCraquementPSwitch.isOn) {
                UIView.animate(withDuration: 0.5, animations: {
                    self.DCraquementDCSwitch.isHidden = false
                    self.DCraquementHSwitch.isHidden = false
                })
            }
            else {
                UIView.animate(withDuration: 0.5, animations: {
                    self.DCraquementDCSwitch.isHidden = true
                    self.DCraquementHSwitch.isHidden = true
                    self.DCraquementDCSwitch.isOn = false
                    self.DCraquementHSwitch.isOn = false
                })
                
            }
    }
    
    @IBAction func DcrepitementPatTapped(_ sender: Any) {
        if (self.DCrepitementPSwitch.isOn) {
            UIView.animate(withDuration: 0.5, animations: {
                self.DCrepitementDCSwitch.isHidden = false
                self.DCrepitementHSwitch.isHidden = false
            })
        }
        else {
            UIView.animate(withDuration: 0.5, animations: {
                self.DCrepitementDCSwitch.isHidden = true
                self.DCrepitementHSwitch.isHidden = true
                self.DCrepitementDCSwitch.isOn = false
                self.DCrepitementHSwitch.isOn = false
            })
        }
    }
    
    @IBAction func GcraquementPatTapped(_ sender: Any) {
        if (self.GCraquementPSwitch.isOn) {
            UIView.animate(withDuration: 0.5, animations: {
                self.GCraquementDCSwitch.isHidden = false
                self.GCraquementHSwitch.isHidden = false
            })
        }
        else {
            UIView.animate(withDuration: 0.5, animations: {
                self.GCraquementDCSwitch.isHidden = true
                self.GCraquementHSwitch.isHidden = true
                self.GCraquementDCSwitch.isOn = false
                self.GCraquementHSwitch.isOn = false
            })
            
        }
    }
    
    
    @IBAction func GcrepitementPatTapped(_ sender: Any) {
        if (self.GCrepitementPSwitch.isOn) {
            UIView.animate(withDuration: 0.5, animations: {
                self.GCrepitementDCSwitch.isHidden = false
                self.GCrepitementHSwitch.isHidden = false
            })
        }
        else {
            UIView.animate(withDuration: 0.5, animations: {
                self.GCrepitementDCSwitch.isHidden = true
                self.GCrepitementHSwitch.isHidden = true
                self.GCrepitementDCSwitch.isOn = false
                self.GCrepitementHSwitch.isOn = false
            })
        }
    }
    
}
