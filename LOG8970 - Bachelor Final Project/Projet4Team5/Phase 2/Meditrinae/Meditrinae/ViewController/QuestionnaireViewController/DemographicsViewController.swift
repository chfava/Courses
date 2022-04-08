//
//  DemographicsViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-03.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class DemographicsViewController: QuestionnaireAbstractViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "DEMO"
        self.nextQuestionnaireID = "DD"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["DEMO"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["DEMO"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
            if(self.patientMode) {
                self.addBackButton()
            }
        }
    }
}



