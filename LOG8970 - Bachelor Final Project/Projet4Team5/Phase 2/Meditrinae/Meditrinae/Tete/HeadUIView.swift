//
//  HeadUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-28.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import SceneKit

protocol NoSelectedViewDelegate {
    func noSelectedView()
}

class HeadUIView: UIView {

    var questionnaire: Questionnaire!
    var originPoint: CGPoint!
    weak var head: Head!
    var headSubView: HeadSubView! = HeadSubView()
    var trashButton: UIButton!
    var letter: String!
    
    var mouvementsLabel: UILabel!
    var mouvementsText: UITextField!
    
    var doulRef: Bool!
    var noSelectedViewDelegate: NoSelectedViewDelegate!
    
    var nonEmptyObject = [AnyObject]()
    
   override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    func builUIView(questionnaire: Questionnaire, questionID: String, headID: String, doComplete: Bool, head: Head, doulRef: Bool, mouvementText: String? = nil, letter: String? = nil) {
        self.letter = letter ?? nil
        self.doulRef = doulRef
        self.questionnaire = questionnaire
        self.layer.borderWidth = BORDER_SIZE
        self.layer.cornerRadius = CORNER_RADIUS
        self.layer.borderColor = DARK_GRAY.cgColor
        
        let width = self.frame.width - 2 * BORDER_SIZE
        let height = self.frame.height - 2 * BORDER_SIZE
        
        var x: CGFloat = PADDING
        var y: CGFloat = PADDING
        
        head.setHead(headID: headID, doComplete: doComplete, questionnaire: self.questionnaire, questionID: questionID)
        self.head = head
        self.addSubview(self.head.sceneView)
        self.head.sceneView.frame = CGRect(x: x, y: y, width: width/3 - PADDING,  height: height - 2 * PADDING)
        
        headSubView = HeadSubView()
        addSubview(headSubView)
        x += self.frame.width * 1/3 + PADDING
        y += PADDING
        headSubView.builUIView(startPoint: CGPoint(x: x, y: y), width: width * 2/3 - 3*PADDING, height: self.frame.height * 2/3 , head: head, isDoulRef: doulRef)
        
        head.setHeadSubView(headSubView: headSubView)
        
        y += self.frame.height * 2/3 + PADDING
        trashButton = UIButton()
        self.addSubview(trashButton)
        let trashImage = UIImage(named: "trash")
        trashButton.setUp(position: CGPoint(x: x, y: y), image: trashImage!, width: 44, height: 44)
        trashButton.addTarget(self, action: #selector(trashButtonTapped), for: .touchUpInside)
        
        if (!doulRef) {
            x += 44 + 2 * PADDING
            mouvementsLabel = UILabel()
            self.addSubview(mouvementsLabel)
            mouvementsLabel.setUp(text: mouvementText ?? "", origin: CGPoint(x: x, y: y + PADDING), font: REG_FONT)
            
            x += width / 4
            mouvementsText = UITextField()
            self.addSubview(mouvementsText)
            let position = CGPoint(x: x + 6 * PADDING, y: y + PADDING/2)
            mouvementsText.setUp(placeHolder: "mm", position: position, width: 50, height: 30, font: PLACEHOLDER_FONT, keybord: UIKeyboardType.numberPad)
            mouvementsText.delegate=self
            mouvementsText.keyboardType = UIKeyboardType.numbersAndPunctuation
        }
        headSubView.areaDelegate = self
    }
    
    @objc func trashButtonTapped(sender: UISwitch!) {
        head.clearMuscles()
    }
       
    func setData() {
        self.questionnaire.exportedData[self.head.muscles.questionID + self.letter!] = self.mouvementsText.text
    }
       
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
extension HeadUIView: AreaDelegate {
    func noZoneSelected() {
        noSelectedViewDelegate.noSelectedView()
    }
}
extension HeadUIView: UITextFieldDelegate {
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool
    {
            var allowedCharacters = CharacterSet.decimalDigits
            allowedCharacters.insert(charactersIn: "/")
            let characterSet = CharacterSet(charactersIn: string)
            return allowedCharacters.isSuperset(of: characterSet)
    }
}
