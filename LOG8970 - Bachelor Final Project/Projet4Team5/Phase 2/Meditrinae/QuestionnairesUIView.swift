//
//  QuestionnairesUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class QuestionnaireUIView: UIView, UITableViewDataSource{
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell()
        return cell
    }
    
    var questionnaireTableView = UITableView()
    
    override init(frame: CGRect) {
           super.init(frame: frame)
    }
    
    func buildUI() {
        self.addSubview(questionnaireTableView)
        questionnaireTableView.translatesAutoresizingMaskIntoConstraints = false
        questionnaireTableView.topAnchor.constraint(equalTo:self.topAnchor).isActive = true
        questionnaireTableView.leftAnchor.constraint(equalTo:self.leftAnchor).isActive = true
        questionnaireTableView.rightAnchor.constraint(equalTo:self.rightAnchor).isActive = true
        questionnaireTableView.bottomAnchor.constraint(equalTo:self.bottomAnchor).isActive = true
    }
       
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
