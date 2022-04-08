//
//  HeadSubView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-24.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

protocol MalTeteDelegate {
    func malDeTeteChanged(value: Bool)
    func changeMuscleColor(pain: Pain, doul: Bool)
}

protocol AreaDelegate {
    func noZoneSelected()
}

class HeadSubView: UIView {
    
    var malTeteLabel: UILabel!
    var musclesLabel: UILabel!
    var zoneTouched: UILabel!
    var douleurLabel: UILabel!
    var douleurHabLabel: UILabel!
    var doulSwitch: UISwitch!
    var doulHabSwitch: UISwitch!
    var sideLabel: UILabel!
    var malTeteSwitch: UISwitch!
    var doulRefLabel: UILabel!
    var doulRefSwitch: UISwitch!
    
    var areaDelegate: AreaDelegate!
    var malDeTeteDelegate: MalTeteDelegate!
    weak var head: Head!
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func builUIView(startPoint: CGPoint, width: CGFloat, height: CGFloat, head: Head, isDoulRef: Bool) {
        
        self.frame = CGRect(x: startPoint.x, y: startPoint.y, width: width , height: height)
        self.layer.cornerRadius = 10
        self.backgroundColor = LIGHT_GRAY
        
        let firstRowY: CGFloat = (2 * PADDING)
        var secondRowY: CGFloat = self.frame.height/2 + PADDING
        
        let firstColX: CGFloat = PADDING
        var secondColX: CGFloat = self.frame.width/6 + (3 * PADDING)
        var thirdColX = self.frame.width * 2/6 + (3 * PADDING)
        let fourthColX: CGFloat = self.frame.width * 3/6 + (7/2 * PADDING)
        var fifthColX: CGFloat = self.frame.width * 5/6 - PADDING
        
        var muscleLabelX = firstColX
        var muscleLabelY = firstRowY
        
        var zoneTouchX = firstColX
        var zoneTouchY = secondRowY
        
        var doulX = secondColX
        var doulHabX = thirdColX
        
        if (!isDoulRef) {
            secondColX = self.frame.width/4 +  2 *  PADDING
            doulX = secondColX
            thirdColX = self.frame.width/2 + PADDING
            doulHabX = thirdColX
            fifthColX = fifthColX - (1 * PADDING)
        }
        else {
            secondRowY = self.frame.height/3 + PADDING
            
            doulX = (5 * PADDING)
            muscleLabelX = (5 * PADDING)
            
            muscleLabelY = self.frame.height * 2/3 + PADDING
            zoneTouchY = self.frame.height * 2/3 + PADDING
            
            zoneTouchX = self.frame.width/4 + 7/2 * PADDING
            doulHabX = self.frame.width/4 + 7/2 * PADDING
           
        }
       
        musclesLabel = UILabel()
        self.addSubview(musclesLabel)
        musclesLabel.setUp(text: "Muscle:", origin: CGPoint(x: muscleLabelX, y: muscleLabelY), font: REG_FONT)
        
        zoneTouched = UILabel()
        self.addSubview(zoneTouched)
        zoneTouched.setUp(text: "Muscle", origin: CGPoint(x: zoneTouchX, y: zoneTouchY), font: REG_FONT, width: 150)
        
        douleurLabel = UILabel()
        self.addSubview(douleurLabel)
        douleurLabel.setUp(text: "Douleur:", origin: CGPoint(x: doulX, y: firstRowY), font: REG_FONT)
        
        doulSwitch = UISwitch()
        self.addSubview(doulSwitch)
        doulSwitch.setUp(offsetH: doulX, offsetV: secondRowY, mode: false)
        self.doulSwitch.isUserInteractionEnabled = false
        doulSwitch.addTarget(self, action: #selector(doulTapped), for: .touchUpInside)
        
        douleurHabLabel = UILabel()
        self.addSubview(douleurHabLabel)
        douleurHabLabel.setUp(text: "Douleur Habituelle:", origin: CGPoint(x: doulHabX, y: firstRowY - PADDING), font: REG_FONT, width: 100, height: 50, nbOfLines: 2)
        
        
        doulHabSwitch = UISwitch()
        self.addSubview(doulHabSwitch)
        doulHabSwitch.setUp(offsetH: doulHabX, offsetV: secondRowY, mode: false)
        doulHabSwitch.addTarget(self, action: #selector(doulHabTapped), for: .touchUpInside)
        
        doulRefLabel = UILabel()
        self.addSubview(doulRefLabel)
        doulRefLabel.setUp(text: "Douleur Référée:", origin: CGPoint(x: fourthColX, y: firstRowY - PADDING), font: REG_FONT, width: 100, height: 50, nbOfLines: 2)
        doulRefLabel.numberOfLines = 2
        
        doulRefSwitch = UISwitch()
        self.addSubview(doulRefSwitch)
        doulRefSwitch.setUp(offsetH: fourthColX, offsetV: secondRowY, mode: false)
        doulRefSwitch.addTarget(self, action: #selector(doulRefTapped), for: .touchUpInside)
        
        malTeteLabel = UILabel()
        self.addSubview(malTeteLabel)
        malTeteLabel.setUp(text: "Mal de tête:", origin: CGPoint(x: fifthColX - (2 * PADDING), y: firstRowY), font: REG_FONT)
    
        sideLabel = UILabel()
        self.addSubview(sideLabel)
        sideLabel.setUp(text: "D:", origin: CGPoint(x: fifthColX - (2 * PADDING), y: secondRowY), font: REG_FONT)
        
        malTeteSwitch = UISwitch()
        self.addSubview(malTeteSwitch)
        malTeteSwitch.setUp(offsetH: fifthColX, offsetV: secondRowY, mode: false)
        malTeteSwitch.addTarget(self, action: #selector(malTeteDTapped), for: .touchUpInside)
        
        self.hideMalTeteUIView(mode: true, droit: false)
       
        if (!isDoulRef) {
            doHideDoulRef()
        }
        self.head = head
        self.head.muscleDelegate = self
    }
    
    func setPainMode(pain: Pain) {
        switch pain.pain {
        case .douleur:
            UIView.animate(withDuration: 0.5) {
                self.doulSwitch.isOn = true
                self.doulHabSwitch.isOn = false
                self.doulRefSwitch.isOn = false
            }
        case .douleurHabituelle:
            UIView.animate(withDuration: 0.5) {
                self.doulSwitch.isOn = true
                self.doulRefSwitch.isOn = false
            }
        case .douleurRefere:
            UIView.animate(withDuration: 0.5) {
                self.doulSwitch.isOn = true
                self.doulHabSwitch.isOn = false
            }
        case .none:
            UIView.animate(withDuration: 0.5) {
                self.doulSwitch.isOn = false
                self.doulHabSwitch.isOn = false
                self.doulRefSwitch.isOn = false
            }
        default:
            break
        }
    }
        
    func hideMalTeteUIView(mode: Bool, droit: Bool) {
        UIView.animate(withDuration: 0.5) {
            self.setLabelD(droit: droit)
            self.malTeteLabel.isHidden = mode
            self.sideLabel.isHidden = mode
            self.malTeteSwitch.isHidden = mode
        }
    }
    
    func setLabelD(droit: Bool) {
           if (droit) {
               self.sideLabel.text = "D"
           }
           else {
               self.sideLabel.text = "G"
           }
    }
    
    func doHideDoulRef() {
        self.doulRefLabel.removeFromSuperview()
        self.doulRefSwitch.removeFromSuperview()
    }
    
   
    
    func didTapZone(zoneName: String) {
        if (!zoneName.isEmpty) {
            zoneTouched.text = zoneName
        }
    }
    
    @objc func doulTapped(sender: UISwitch!) {
        if (head.isSelectedArea!) {
            malDeTeteDelegate.changeMuscleColor(pain: Pain(pain: .douleur), doul: doulSwitch.isOn)
            self.doulHabSwitch.isOn = false
            self.doulRefSwitch.isOn = false
        }
        else {
            doulSwitch.isOn = false
            areaDelegate.noZoneSelected()
        }
    }
    
    @objc func doulHabTapped(sender: UISwitch!) {
        if (head.isSelectedArea!) {
            if (self.doulRefSwitch.isOn && self.doulHabSwitch.isOn) {
                malDeTeteDelegate.changeMuscleColor(pain: Pain(pain: .allPain), doul: true)
            }
            else if (self.doulRefSwitch.isOn) {
                 malDeTeteDelegate.changeMuscleColor(pain: Pain(pain: .douleurRefere), doul: true)
            }
            else {
                malDeTeteDelegate.changeMuscleColor(pain: Pain(pain: .douleurHabituelle), doul: doulHabSwitch.isOn)
            }
        }
        else {
            doulHabSwitch.isOn = false
            areaDelegate.noZoneSelected()
        }
    }
    
    @objc func doulRefTapped(sender: UISwitch!) {
        if (head.isSelectedArea!) {
            if (self.doulRefSwitch.isOn && self.doulHabSwitch.isOn) {
                malDeTeteDelegate.changeMuscleColor(pain: Pain(pain: .allPain), doul: true)
            }
            else if (self.doulHabSwitch.isOn) {
                 malDeTeteDelegate.changeMuscleColor(pain: Pain(pain: .douleurHabituelle), doul: true)
            }
            else {
                malDeTeteDelegate.changeMuscleColor(pain: Pain(pain: .douleurRefere), doul: doulRefSwitch.isOn)
            }
        }
        else {
            doulRefSwitch.isOn = false
            areaDelegate.noZoneSelected()
        }
    }
    
    @objc func malTeteDTapped(sender: UISwitch!) {
        malDeTeteDelegate.malDeTeteChanged(value: malTeteSwitch.isOn)
    }
}

extension HeadSubView: MuscleSelectionDelegate {
    func muscleSelected(area: Area, pain: Pain) {
        var name = area.name
        var malTeteHidden = true
        var droit = false
        if (area.isTemporal()) {
            if (head.doComplete) {
                name = "Temporal"
            }
            malTeteHidden = false
            
            droit = area.isSideDroit()
        }
        if (area.isMasseter() && head.doComplete) {
            name = "Masseter"
        }
        self.didTapZone(zoneName: name)
        self.setPainMode(pain: pain)
        self.hideMalTeteUIView(mode: malTeteHidden, droit: droit)
        self.malTeteSwitch.isOn = false
      }
    
    func resetMuscle() {
        setPainMode(pain: Pain(pain: .none))
        self.didTapZone(zoneName: "No Muscle")
        self.hideMalTeteUIView(mode: true, droit: false)
    }
}

