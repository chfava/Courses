//
//  diagnosticTableViewCell.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit
import TinyConstraints

class GenereicTableViewCell: UITableViewCell {
    
    var nameLabel: UILabel = UILabel()
    var dateLabel: UILabel = UILabel()
    var shapeLayer: CAShapeLayer!
    var trackLayer: CAShapeLayer!
    var y: CGFloat!
    var x: CGFloat!
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setUpCell()
     }
    
     required init?(coder aDecoder: NSCoder) {
       super.init(coder: aDecoder)
    
    }
    
    func setUpCell() {
        let height = self.frame.height - 2 * PADDING
        let width = self.frame.width - 2 * PADDING
        y = PADDING
        x = PADDING
        self.addSubview(nameLabel)
        nameLabel.setUp(text: " ", origin: CGPoint(x: x, y: y), width: 2 * width - PADDING, height: height)
       
        y += nameLabel.frame.height + PADDING
        
        self.addSubview(dateLabel)
        dateLabel.setUp(text: " ", origin: CGPoint(x: x, y: y), width: 2 * width - PADDING, height: height)
        
        y = self.frame.height / 2 
        x = width * 2
    }
    
    func setCell(item: TableItem) {
        nameLabel.text = item.name
        if (!item.active) {
            nameLabel.textColor = LIGHT_GRAY
        }
        else {
            nameLabel.textColor = UIColor.black
        }
        if (item.questionnaire != nil) {
            dateLabel.text = item.questionnaire?.date?.print() ?? ""
            dateLabel.textColor = UIColor.black
            if let score = item.questionnaire?.score {
                var color = LIGHT_GRAY
                if (item.active) {
                    let nScore: Float = Float(score) / Float(item.questionnaire!.maxScore)
                    if (nScore < 0.35) {
                        color = GREEN
                    }
                    else if (nScore < 0.75) {
                        color = YELLOW
                    }
                    else {
                        color = RED
                    }
                }
                let checkView = UIView(frame: CGRect(x: x, y: y, width: 26, height: 26))
                checkView.backgroundColor = color
                checkView.layer.cornerRadius = 13
                self.addSubview(checkView)
            }
        }
    }
}
