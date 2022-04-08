//
//  OBCViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-18.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class OBCViewController: QuestionnaireAbstractViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "OBC"
        self.nextQuestionnaireID = "IS"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["OBC"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["OBC"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
        }
    }
}
