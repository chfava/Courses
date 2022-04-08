//
//  PHQ8ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-18.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class PHQ9ViewController: QuestionnaireAbstractViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "PHQ9"
        self.nextQuestionnaireID = "ELFMAN8"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["PHQ9"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["PHQ9"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
        }
    }
}
