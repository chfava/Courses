//
//  FDI51.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-08.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import SceneKit

class FDI6ViewController: FDIAbstract {
    
    
    @IBOutlet weak var PLatDDHSwitch: UISwitch!
    @IBOutlet weak var PLatDMTHSwitch: UISwitch!
    @IBOutlet weak var PLatDDRSwitch: UISwitch!
    
    @IBOutlet weak var ALatDDHSwitch: UISwitch!
    @IBOutlet weak var ALatDMTHSwitch: UISwitch!
    @IBOutlet weak var ALatDDRSwitch: UISwitch!
    
    @IBOutlet weak var PLatGDHSwitch: UISwitch!
    @IBOutlet weak var PLatGMTHSwitch: UISwitch!
    @IBOutlet weak var PLatGDRSwitch: UISwitch!
    
    @IBOutlet weak var ALatGDHSwitch: UISwitch!
    @IBOutlet weak var ALatGMTHSwitch: UISwitch!
    @IBOutlet weak var ALatGDRSwitch: UISwitch!
    
    
    var headUIView : HeadUIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setUpSwitchs()
        self.setUpHead()
    }
    
    func setUpSwitchs() {
         PLatDDHSwitch.isOn = false
         PLatDMTHSwitch.isOn = false
         PLatDDRSwitch.isOn = false
        
         ALatDDHSwitch.isOn = false
         ALatDMTHSwitch.isOn = false
         ALatDDRSwitch.isOn = false
        
         PLatGDHSwitch.isOn = false
         PLatGMTHSwitch.isOn = false
         PLatGDRSwitch.isOn = false
        
         ALatGDHSwitch.isOn = false
         ALatGMTHSwitch.isOn = false
         ALatGDRSwitch.isOn = false
     }
    
    func setUpHead() {
        let width: CGFloat = self.view.frame.width - 2 * OUTTER_PADDING
        let positionX = OUTTER_PADDING
        var positionY = 2 * OUTTER_PADDING
        
        let FDITitleLabel = UILabel()
        self.view.addSubview(FDITitleLabel)
        FDITitleLabel.setUp(text: "Formulaire Examen Clinique", origin: CGPoint(x: positionX, y: positionY) , font: TITLE_FONT, width: width, textAlignment: .center)
        
        positionY += FDITitleLabel.frame.height + OUTTER_PADDING
        
        let FDISubTitle = UILabel()
        self.view.addSubview(FDISubTitle)
        FDISubTitle.setUp(text: "9. DOULEUR PALPATION MUSCLES & ATM", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        positionY += FDISubTitle.frame.height + OUTTER_PADDING
        
        self.headUIView = HeadUIView(frame: CGRect(x: positionX, y: positionY, width: width, height: 400))
        self.headUIView.builUIView(questionnaire: self.questionnaire, questionID: "E9", headID: "PALP", doComplete: false, head: heads[1], doulRef: true)
        self.view.addSubview(self.headUIView)
        headUIView.noSelectedViewDelegate = self
        self.setUpNextButton()
        self.nextQuestionnaireSegue = "FDI7ViewController"
    }
    
    override func buildAnswers() {
        self.questionnaire.exportedData["E9_PL_DH_D"] = getSwitchValue(input: PLatDDHSwitch)
        self.questionnaire.exportedData["E9_PL_MTH_D"] = getSwitchValue(input: PLatDMTHSwitch)
        self.questionnaire.exportedData["E9_PL_DOU_REF_D"] = getSwitchValue(input: PLatDDRSwitch)
        self.questionnaire.exportedData["E9_AL_DH_D"] = getSwitchValue(input: ALatDDHSwitch)
        self.questionnaire.exportedData["E9_AL_MTH_D"] = getSwitchValue(input: ALatDMTHSwitch)
        self.questionnaire.exportedData["E9_AL_DOU_REF_D"] = getSwitchValue(input: ALatDDRSwitch)
        
        self.questionnaire.exportedData["E9_PL_DH_G"] = getSwitchValue(input: PLatGDHSwitch)
        self.questionnaire.exportedData["E9_PL_MTH_G"] = getSwitchValue(input: PLatGMTHSwitch)
        self.questionnaire.exportedData["E9_PL_DOU_REF_G"] = getSwitchValue(input: PLatGDRSwitch)
        self.questionnaire.exportedData["E9_AL_DH_G"] = getSwitchValue(input: ALatGDHSwitch)
        self.questionnaire.exportedData["E9_AL_MTH_G"] = getSwitchValue(input: ALatGMTHSwitch)
        self.questionnaire.exportedData["E9_AL_DOU_REF_D"] = getSwitchValue(input: ALatGDRSwitch)
        
    }
    
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(true)
        queue.async {
            heads[1].loadHead()
        }
        self.headUIView.removeFromSuperview()
    }
}

extension FDI6ViewController: NoSelectedViewDelegate {
    func noSelectedView() {
        Alert.showBasic(title: "Erreur", message: "SVP sélectionner une zone avant d'appliquer une douleur", vc: self)
    }
}
