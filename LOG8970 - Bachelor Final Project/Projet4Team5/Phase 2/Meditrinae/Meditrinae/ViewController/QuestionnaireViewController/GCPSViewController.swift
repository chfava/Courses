//
//  GCPSViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-18.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class GCPSViewController: QuestionnaireAbstractViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "GCPS"
        self.nextQuestionnaireID = "PHQ4"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["GCPS"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["GCPS"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
        }
    }
}



