//
//  ShowNoteUIView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-11-20.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

protocol ShowNewUIViewDelegate {
    func dismissNote()
}

class ShowNoteUIView: UIView {
    var note: MedicalNote!
    var showNewUIViewDelegate: ShowNewUIViewDelegate!
    
    init(frame: CGRect, note: MedicalNote) {
        super.init(frame: frame)
        self.note = note
        self.layer.borderWidth = BORDER_SIZE
        self.layer.cornerRadius = CORNER_RADIUS
        self.layer.borderColor = DARK_GRAY.cgColor
        self.backgroundColor = WHITE
        var x: CGFloat = OUTTER_PADDING + BORDER_SIZE
        var y: CGFloat = OUTTER_PADDING + BORDER_SIZE
        let width = self.frame.width - 2 * BORDER_SIZE - 2 * OUTTER_PADDING
        let height = self.frame.height - 2 * BORDER_SIZE - 2 * OUTTER_PADDING
        
        let titleLabel = UILabel()
        self.addSubview(titleLabel)
        titleLabel.setUp(text: "Note: " + note.title.print(), origin: CGPoint(x: x, y: y), font: TITLE_FONT)

        x = width - BUTTON_HEIGHT
        
        let dismissButton = UIButton()
        self.addSubview(dismissButton)
        if let crossImage = UIImage(named: "cross") {
            dismissButton.setUp(position: CGPoint(x: x, y: y), image: crossImage, width: BUTTON_HEIGHT , height: BUTTON_HEIGHT)
            dismissButton.addTarget(self, action: #selector(crossbuttonTapped), for: .touchUpInside)
        }
        
        x = OUTTER_PADDING + BORDER_SIZE
        y += titleLabel.frame.height + 2 * OUTTER_PADDING
        
        let textViewFrame = CGRect(x: x, y: y, width: width, height: 2/3 * height)
        let textView = UITextView(frame: textViewFrame)
        self.addSubview(textView)
        textView.text = note.note
        textView.font = SUBTITLE_FONT
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc func crossbuttonTapped(sender: UIButton) {
        showNewUIViewDelegate.dismissNote()
    }
}
