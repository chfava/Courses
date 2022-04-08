//
//  GAD7ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-18.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class GAD7ViewController: QuestionnaireAbstractViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "GAD7"
        self.nextQuestionnaireID = "OBC"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["GAD7"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["GAD7"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
        }
    }
}
