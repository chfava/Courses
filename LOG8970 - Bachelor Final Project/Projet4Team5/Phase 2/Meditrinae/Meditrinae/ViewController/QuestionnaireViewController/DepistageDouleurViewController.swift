//
//  DepistageDouleur.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-09-21.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class DepistageDouleurViewController: QuestionnaireAbstractViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID = "DD"
        self.nextQuestionnaireID = "QS"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["DD"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["DD"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
        }
    }
    override func viewDidLayoutSubviews() {
        self.scrollView.translatesAutoresizingMaskIntoConstraints = true
        
    }
}
