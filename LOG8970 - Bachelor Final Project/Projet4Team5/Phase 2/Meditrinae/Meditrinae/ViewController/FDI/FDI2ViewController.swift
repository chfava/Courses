//
//  FDI2ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-05.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import SceneKit

class FDI2ViewController: FDIAbstract {
    
    var scrollView: UIScrollView!
    var headUIView1: HeadUIView!
    var headUIView2: HeadUIView!
    
    var ouvSDTextField: UITextField!
    var intSwitch: UISwitch!

    override func viewDidLoad() {
        super.viewDidLoad()
        self.setUpScollView()
        self.setUpUI()
        self.setUpNextButton()
        self.nextQuestionnaireSegue = "FDI3ViewController"
    }
    
    func setUpScollView() {
        scrollView = UIScrollView()
        view.addSubview(scrollView)
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        scrollView.contentSize.height = 1200
        scrollView.backgroundColor = WHITE
        scrollView.topAnchor.constraint(equalTo: self.view.topAnchor).isActive = true
        scrollView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor).isActive = true
        scrollView.leftAnchor.constraint(equalTo: self.view.leftAnchor).isActive = true
        scrollView.rightAnchor.constraint(equalTo: self.view.rightAnchor).isActive = true
    }
  
    func setUpUI() {
        let width: CGFloat = self.view.frame.width - 2 * OUTTER_PADDING
        let height: CGFloat = self.view.frame.height - 2 * OUTTER_PADDING
        var positionX = OUTTER_PADDING
        var positionY = 2 * OUTTER_PADDING
        
        let FDITitleLabel = UILabel()
        self.scrollView.addSubview(FDITitleLabel)
        FDITitleLabel.setUp(text: "Formulaire Examen Clinique", origin: CGPoint(x: positionX, y: positionY) , font: TITLE_FONT, width: width, textAlignment: .center)
        
        positionY += FDITitleLabel.frame.height + OUTTER_PADDING
        
        let question4Label = UILabel()
        self.scrollView.addSubview(question4Label)
        question4Label.setUp(text: "4.MOUVEMENTS OUVERTURE", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        positionY += question4Label.frame.height + PADDING
        
        let indicationQuestion4Label = UILabel()
        self.scrollView.addSubview(indicationQuestion4Label)
        indicationQuestion4Label.setUp(text: "Faites ouvrir la bouche au patient et sélectionner les zones douloureuses.", origin: CGPoint(x: positionX, y: positionY), font: SMALL_FONT)
        
        positionY += indicationQuestion4Label.frame.height + OUTTER_PADDING
        
        let ouvSDLabel = UILabel()
        self.scrollView.addSubview(ouvSDLabel)
        ouvSDLabel.setUp(text: "Ouverture sans douleur", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        let positionXCol1 = positionX + ouvSDLabel.frame.width + OUTTER_PADDING
        
        ouvSDTextField = UITextField()
        self.scrollView.addSubview(ouvSDTextField)
        ouvSDTextField.setUp(placeHolder: "mm", position: CGPoint(x: positionXCol1, y: positionY), width: TEXT_FIELD_WIDTH_SMALL, height: TEXT_FIELD_HEIGHT)
        ouvSDTextField.keyboardType = UIKeyboardType.numberPad
        ouvSDTextField.delegate=self
        nonEmptyObject.append(ouvSDTextField)
        
        positionY += ouvSDTextField.frame.height + OUTTER_PADDING
    
        
        self.headUIView1 = HeadUIView(frame: CGRect(x: OUTTER_PADDING, y: positionY, width: width - 2 * OUTTER_PADDING , height: height / 3 - OUTTER_PADDING ))
        self.headUIView1.builUIView(questionnaire: self.questionnaire, questionID: "E4", headID: "MA", doComplete: true, head: heads[1], doulRef: false, mouvementText: "Ouverture maxi. sans aide: ", letter: "B")
        self.scrollView.addSubview(self.headUIView1)
        
        headUIView1.noSelectedViewDelegate = self
        
        positionY += headUIView1.frame.height + OUTTER_PADDING
        
        self.headUIView2 = HeadUIView(frame: CGRect(x: OUTTER_PADDING, y: positionY, width: width -  2 * OUTTER_PADDING, height: height / 3 - 2 * OUTTER_PADDING ))
        self.headUIView2.builUIView(questionnaire: self.questionnaire, questionID: "E4", headID: "MS", doComplete: true, head: heads[2], doulRef: false, mouvementText: "Ouverture maxi. avec aide: ", letter: "C")
        self.scrollView.addSubview(self.headUIView2)
        
        headUIView2.noSelectedViewDelegate = self
        nonEmptyObject.append(headUIView1.mouvementsText)
        nonEmptyObject.append(headUIView2.mouvementsText)
        
        positionY += headUIView2.frame.height + OUTTER_PADDING
        
        let intLabel = UILabel()
        self.scrollView.addSubview(intLabel)
        intLabel.setUp(text: "L’examen a été interrompu avec la douleur", origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT)
        
        positionX += intLabel.frame.width + OUTTER_PADDING
         
        intSwitch = UISwitch()
        self.scrollView.addSubview(intSwitch)
        intSwitch.setUp(offsetH: positionX, offsetV: positionY, mode: false)
        
        setUpHeads()
        
        self.view.setNeedsDisplay()
    }
    
    func setUpHeads() {
        if let morphoHead = self.medicalExam.patient?.morphoHead {
            heads[0].setHeadFromMuscles(areas: morphoHead)
        }
        if let morphoHead = self.medicalExam.patient?.morphoHead {
            heads[1].setHeadFromMuscles(areas: morphoHead)
        }
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(true)
        queue.async {
            heads[1].loadHead()
            heads[2].loadHead()
        }
        self.headUIView1.removeFromSuperview()
        self.headUIView2.removeFromSuperview()
      }
}

extension FDI2ViewController: NoSelectedViewDelegate {
    func noSelectedView() {
        Alert.showBasic(title: "Erreur", message: "SVP sélectionner une zone avant d'appliquer une douleur", vc: self)
    }
}
