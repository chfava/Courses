//
//  MorphologieDouleurViewController.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-10-04.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import SceneKit


class MorphologieDouleurViewController: QuestionnaireAbstractViewController {
    
    var head: Head!
    var sideLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "MORPHO"
        self.nextQuestionnaireID = "GCPS"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["MORPHO"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["MORPHO"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            self.setUpHead()
            self.setUpProgressBar()
        }
    }
    
    func setUpHead() {
        let view = UIView(frame: CGRect(x: OUTTER_PADDING, y: self.position.y + PADDING, width: self.view.frame.width - 2 * OUTTER_PADDING, height: self.view.frame.height * 2/5))
        self.contentView.addSubview(view)
        buildHead(view: view)
        
        self.position.y += self.head.sceneView.frame.height + 2 * OUTTER_PADDING
        sideLabel = UILabel()
        sideLabel.setUp(text: "Côté", origin: CGPoint(x: 3 * OUTTER_PADDING, y: self.position.y), font: SUBTITLE_FONT, width: self.contentView.frame.width - 6 * OUTTER_PADDING, height: TEXT_FIELD_HEIGHT, textAlignment: .center)
        sideLabel.layer.borderColor = LIGHT_GRAY.cgColor
        sideLabel.layer.borderWidth = SMALL_BORDER
        sideLabel.layer.cornerRadius = CORNER_RADIUS
        self.contentView.addSubview(sideLabel)
        self.view.setNeedsDisplay()
    }
    
    func buildHead(view: UIView) {
        view.layer.cornerRadius = CORNER_RADIUS
        view.layer.borderColor = LIGHT_GRAY.cgColor
        view.layer.borderWidth = BORDER_SIZE
           
        heads[0].setHead(headID: "MOR", doComplete: true, questionnaire: self.questionnaire, questionID: "MD")
        self.head = heads[0]
        self.head.sceneView.frame = CGRect(x: 0, y: 0, width: view.frame.width, height: view.frame.height)
        view.addSubview(self.head.sceneView)
        self.head.muscleSideDelegate = self
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(true)
        queue.async {
            heads[0].loadHead()
        }
    }
    
    override func nextButtonTapped(sender: UIButton!) {
        if (checkAllInput) {
            if(checkNext()){
                ServerService.shared.postResults(token: self.medicalExam.patient?.token ?? "", patientID: self.medicalExam.patientID, practicienID: self.medicalExam.praticienID, questionnaire: self.questionnaire, completion: {(error, succes) in
                    if let succes = succes {
                        if (succes) {
                            self.medicalExam.patient?.morphoHead = heads[0].muscles.areas
                            self.performSegue(withIdentifier: self.nextQuestionnaireID, sender: self)
                        }
                        else {
                            Alert.showBasic(title: "Erreur", message: "Il est impossible de soummettre le document.", vc: self)
                        }
                    }
                })
            }
            else {
                Alert.showBasic(title: "Erreur", message: "SVP répondre à toutes les questions", vc: self)
            }
        }
    }
    
    @IBAction func trashCanTapped(_ sender: Any) {
        head.clearMuscles()
    }
}


extension MorphologieDouleurViewController: MuscleSideDelegate {
    func sideSelected(side: Side) {
        sideLabel.text = side.getSideName()
    }
}
