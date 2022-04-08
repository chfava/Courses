//
//  QuestionnaireSymptomesViewController.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-09-29.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import Lottie

class SymptomesViewController: QuestionnaireAbstractViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        self.ID =  "QS"
        self.nextQuestionnaireID = "MORPHO"
        if medicalExam != nil {
            self.questionnaire = medicalExam.examResult.listQuestionnaire.questionnaires["QS"]
            self.setAnswers(exportedData: medicalExam.examResult.listQuestionnaire.questionnaires["QS"]?.exportedData ?? [:])
            addQuestionnaireToView(questionnaire: self.questionnaire)
            self.heightValue.constant = self.position.y
            setUpProgressBar()
            if (!patientMode) {
                self.addBackButton()
            }
        }
    }
    
    override func addBackButton() {
           let backButton = UIButton(type: .custom)
           backButton.setImage(UIImage(named: "BackButton"), for: .normal)
           backButton.setTitle("Back", for: .normal)
           backButton.setTitleColor(backButton.tintColor, for: .normal)
           backButton.addTarget(self, action: #selector(self.backAction(_:)), for: .touchUpInside)

           self.navigationItem.leftBarButtonItem = UIBarButtonItem(customView: backButton)
           self.navigationController?.navigationBar.isHidden = false
    }
    
    @objc override func backAction(_ sender: UIButton) {
        if self.rootViewController != nil {
            self.navigationController?.popToViewController(self.rootViewController, animated: true)
        }
        else {
            self.navigationController?.popToRootViewController(animated: true)
        }
    }
}




    
    
    
