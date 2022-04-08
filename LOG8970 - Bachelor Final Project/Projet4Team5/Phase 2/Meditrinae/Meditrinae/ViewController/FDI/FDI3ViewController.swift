//
//  FDI3ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-06.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import SceneKit



class FDI3ViewController: FDIAbstract {
    
    
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var heightValue: NSLayoutConstraint!
    
    var FDITitle: UILabel!
    var FDISubTitle: UILabel!
    var FDIexplications: UILabel!
    
    var latDroitExplications: UILabel!
    var latGaucheExplication: UILabel!
    var textProtExplications: UILabel!
    
    var negLabel: UILabel!
    var negSwitch: UISwitch!
    
    var headUIView1: HeadUIView!
    var headUIView2: HeadUIView!
    var headUIView3: HeadUIView!
    
    var positionX = OUTTER_PADDING + BORDER_SIZE
    var positionY: CGFloat = 2 * OUTTER_PADDING
  
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.nextQuestionnaireSegue = "FDI4ViewController"
        self.setUpUI()
        self.setUPNonEmptyObjects()
        self.setUpNextButton()
        self.view.bringSubviewToFront(nextButton)
        self.view.setNeedsDisplay()
    }
    
    func setUpUI() {
        
        let width: CGFloat = self.view.frame.width - 2 * OUTTER_PADDING
        let height: CGFloat = 300
        let centerX: CGFloat = width / 2
       
        
        FDITitle = UILabel()
        self.contentView.addSubview(FDITitle)
        FDITitle.setUp(text: "Formulaire Examen Clinique", origin: CGPoint(x: positionX, y: positionY) , font: TITLE_FONT)
        FDITitle.center = CGPoint(x: centerX, y: positionY)
            
        positionY += FDITitle.frame.height + OUTTER_PADDING
        
        FDISubTitle = UILabel()
        self.contentView.addSubview(FDISubTitle)
        FDISubTitle.setUp(text: "5. MOUVEMENTS LATÉRAUX ET PROTRUSION", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        positionY += FDISubTitle.frame.height + OUTTER_PADDING/2
        
        FDIexplications = UILabel()
        self.contentView.addSubview(FDIexplications)
        FDIexplications.setUp(text: "Faites déplacer la machoîre même si c'est douleux et sélectionnez les zones douloureuses.", origin: CGPoint(x: positionX, y: positionY), font: REG_FONT)
        
        positionY += FDIexplications.frame.height + 2 * OUTTER_PADDING
        
        latDroitExplications = UILabel()
        self.contentView.addSubview(latDroitExplications)
        latDroitExplications.setUp(text: "Latéral droit (Mouvements latéraux vers la droite)", origin: CGPoint(x: positionX, y: positionY), font: REG_FONT)
        
         positionY += latDroitExplications.frame.height + OUTTER_PADDING / 2
        
        self.headUIView1 = HeadUIView(frame: CGRect(x: positionX, y: positionY , width: width, height: height))
        self.headUIView1.builUIView(questionnaire: self.questionnaire, questionID: "E5", headID: "LD", doComplete: true, head: heads[0], doulRef: false, mouvementText: "Latéral droit: ", letter: "A")
        self.contentView.addSubview(self.headUIView1)
        headUIView1.noSelectedViewDelegate = self
        
        positionY += headUIView1.frame.height + OUTTER_PADDING
        
        latGaucheExplication = UILabel()
        self.contentView.addSubview(latGaucheExplication)
        latGaucheExplication.setUp(text: "Latéral gauche (Mouvements latéraux vers la gauche)", origin: CGPoint(x: positionX, y: positionY), font: REG_FONT)
               
        positionY += latGaucheExplication.frame.height + OUTTER_PADDING / 2
           
        self.headUIView2 = HeadUIView(frame: CGRect(x: positionX, y: positionY, width: width, height: height))
        self.headUIView2.builUIView(questionnaire: self.questionnaire, questionID: "E5", headID: "LG", doComplete: true, head: heads[3], doulRef: false, mouvementText: "Latéral Gauche: ", letter: "B")
        self.contentView.addSubview(self.headUIView2)
        headUIView2.noSelectedViewDelegate = self
        
        positionY += headUIView2.frame.height + OUTTER_PADDING
        
        textProtExplications = UILabel()
        self.contentView.addSubview(textProtExplications)
        textProtExplications.setUp(text: "Protrusion (Mouvemnents vers l'avant)", origin: CGPoint(x: positionX, y: positionY), font: REG_FONT)
               
        positionY += latGaucheExplication.frame.height + OUTTER_PADDING / 2
        
        self.headUIView3 = HeadUIView(frame: CGRect(x: positionX, y: positionY, width: width, height: height))
        self.headUIView3.builUIView(questionnaire: self.questionnaire, questionID: "E5", headID: "PI", doComplete: true, head: heads[4], doulRef: false, mouvementText: "Protrusion: ", letter: "C")
        self.contentView.addSubview(self.headUIView3)
        headUIView3.noSelectedViewDelegate = self
        
        positionY += headUIView3.frame.height + OUTTER_PADDING
        
        negLabel = UILabel()
        self.contentView.addSubview(negLabel)
        negLabel.setUp(text: "Negatif", origin: CGPoint(x: positionX, y: positionY), font: REG_FONT)
        let negLabelWidth = negLabel.frame.width

        positionX += negLabelWidth + PADDING

        negSwitch = UISwitch()
        self.contentView.addSubview(negSwitch)
        negSwitch.setUp(offsetH: positionX, offsetV: positionY, mode: false)

        positionY += 50
        
        self.heightValue.constant = positionY
        
    }
    
    func setUPNonEmptyObjects() {
          nonEmptyObject.append(headUIView1.mouvementsText)
          nonEmptyObject.append(headUIView2.mouvementsText)
          nonEmptyObject.append(headUIView3.mouvementsText)
        headUIView1.setData()
        
      }
    
    override func makeExport() {
        buildAnswers()
        if (!self.questionnaire.questions.isEmpty) {
            for question in questionnaire.questions {
                self.questionnaire.exportedData[question.ID!] = question.answer as? String
            }
        }
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(true)
        queue.async {
            heads[0].loadHead()
            heads[3].loadHead()
            heads[4].loadHead()
        }
        
        self.headUIView1.removeFromSuperview()
        self.headUIView2.removeFromSuperview()
        self.headUIView3.removeFromSuperview()
    }
}

extension FDI3ViewController: NoSelectedViewDelegate {
    func noSelectedView() {
        Alert.showBasic(title: "Erreur", message: "SVP sélectionner une zone avant d'appliquer une douleur", vc: self)
    }
}

