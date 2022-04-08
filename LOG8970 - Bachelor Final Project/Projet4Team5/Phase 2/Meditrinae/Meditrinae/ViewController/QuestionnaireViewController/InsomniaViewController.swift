//
//  InsomniaViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-26.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class InsomniaViewController: QuestionnaireAbstractViewController {
    
    override func viewDidLoad() {
           super.viewDidLoad()
           self.ID = "IS"
           self.nextQuestionnaireID = "SS"
           if medicalExam != nil {
               self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["IS"]
               self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["IS"]?.exportedData ?? [:])
               addQuestionnaireToView(questionnaire: self.questionnaire)
               self.heightValue.constant = self.position.y
               setUpProgressBar()
           }
       }
    
}

