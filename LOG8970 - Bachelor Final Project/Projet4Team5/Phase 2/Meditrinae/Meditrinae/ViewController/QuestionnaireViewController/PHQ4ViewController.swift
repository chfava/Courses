//
//  PHQ4ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-18.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class PHQ4ViewController: QuestionnaireAbstractViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "PHQ4"
        self.nextQuestionnaireID = "PHQ9"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["PHQ4"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["PHQ4"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
        }
    }
    
    func calculateScore()-> Bool{
        let passableScore = 3
        var counter = 0
        for question in self.questionnaire.questions {
            let answer = getAnswer(question: question)
            if (answer != "") {
                counter += Int(answer) ?? 0
            }
            else {
                Alert.showBasic(title: "Erreur", message: "SVP répondre à toutes les questions", vc: self)
                return false
            }
        }
        if (counter >= passableScore) {
            return true
        }
        return false
    }
    
    override func nextButtonTapped(sender: UIButton!) {
        if calculateScore() {
            self.nextQuestionnaireID = "ELFMAN8"
        }
        if (checkAllInput) {
            if(checkNext()){
              ServerService.shared.postResults(token: self.medicalExam.patient?.token ?? "", patientID: self.medicalExam.patientID, practicienID: self.medicalExam.praticienID, questionnaire: self.questionnaire, completion: {(error, succes) in
                    if let succes = succes {
                        if (succes) {
                          self.performSegue()
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
}

