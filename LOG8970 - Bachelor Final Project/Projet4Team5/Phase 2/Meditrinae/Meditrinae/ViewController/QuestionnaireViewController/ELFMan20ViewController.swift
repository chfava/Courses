//
//  ELFMan20ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-09-18.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class ELFMan20ViewController: QuestionnaireAbstractViewController {
    

    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "ELFMAN20"
        self.nextQuestionnaireID = "GAD7"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["ELFMAN20"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["ELFMAN20"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
        }
    }
}
