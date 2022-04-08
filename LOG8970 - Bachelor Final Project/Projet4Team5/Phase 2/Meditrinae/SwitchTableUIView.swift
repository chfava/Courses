//
//  SwitchTableUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import UIKit

class SwitchTableUI: UIView {
    
    var rows: [String]!
    var colums: [String]!
    var title: String!
    var titleLabel: UILabel!
    var switches = [UISwitch]()
    
    override init(frame: CGRect) {
           super.init(frame: frame)
       }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setUp(rows: [String], colums: [String], title: String, borderWidth: CGFloat? = nil) {
        self.rows = rows
        self.colums = colums
        self.title = title
        let borderWidth = borderWidth ?? SMALL_BORDER
        self.layer.borderWidth = borderWidth
        self.layer.borderColor = BLUE.cgColor
        self.layer.cornerRadius = CORNER_RADIUS
        self.backgroundColor = LIGHT_GRAY
        
        let height = self.frame.height - 2 * borderWidth
        let width = self.frame.width - 2 * borderWidth
        
        var positionY = PADDING
        let positionX = PADDING
        
        titleLabel = UILabel()
        self.addSubview(titleLabel)
        titleLabel.setUp(text: self.title, origin: CGPoint(x: positionX, y: positionY), font: SUBTITLE_FONT, width: width, textAlignment: .center)
        
        positionY += titleLabel.frame.height + PADDING
        
        let areaHeight = height - titleLabel.frame.height - 2 * PADDING
        
        let padding: CGFloat = 20
        let tempWidth = (width - 2 * padding) / CGFloat(integerLiteral: colums.count + 1 )
        let tempHeight = (areaHeight - 2 * padding) /  CGFloat(integerLiteral: rows.count + 1)
        let maxWidth: CGFloat = tempWidth - (2 * PADDING)
        let maxHeight: CGFloat = tempHeight - (2 * PADDING)
        
        
        let rowPositionX: CGFloat = positionX + padding
        var rowPositionY: CGFloat = positionY + maxHeight + padding
        for row in rows {
            let newRowLabel = UILabel()
            self.addSubview(newRowLabel)
            newRowLabel.setUp(text: row, origin: CGPoint(x: rowPositionX, y: rowPositionY), width: maxWidth, height: maxHeight, textAlignment: .left)
            newRowLabel.fitTextToBounds()
            rowPositionY += newRowLabel.frame.height + padding
        }
        
        var colPostionX: CGFloat = positionX + maxWidth + padding
        let colPostionY: CGFloat = positionY + padding
        for col in colums {
            let newColLabel = UILabel()
            self.addSubview(newColLabel)
            newColLabel.setUp(text: col, origin: CGPoint(x: colPostionX, y: colPostionY), width: maxWidth, height: maxHeight, textAlignment: .left)
            //newColLabel.fitTextToBounds()
            colPostionX += newColLabel.frame.width + padding
        }
        
        var colX:CGFloat = positionX + maxWidth + padding
        var colY:CGFloat = positionY + maxHeight + padding
        let switchHeight: CGFloat = 31
        let switchWidth: CGFloat = 51
        for _ in colums {
            for _ in rows {
                let frame = CGRect(x: colX, y: colY, width: switchWidth, height: switchHeight)
                let newUISitch = UISwitch(frame: frame)
                self.addSubview(newUISitch)
                colY += maxHeight + padding
            }
            colY = positionY + maxHeight + padding
            colX += maxWidth + padding
        }
    }
}
