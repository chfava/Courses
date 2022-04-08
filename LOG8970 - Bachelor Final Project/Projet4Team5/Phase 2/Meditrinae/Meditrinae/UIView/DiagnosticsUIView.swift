//
//  DiagnosticsView.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-31.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit

class DiagnosticsUIView: UIView {
    
    var patient: Patient!
    var shapeLayerDiagnostic: CAShapeLayer!
    var shapeLayerTraitement: CAShapeLayer!
    var AIDiagnosticLabel: UILabel!
    var AITraitement: UILabel!
    
    var centerPointDiagnostic: CGPoint!
    var centerPointTraitement: CGPoint!
    
    var scrollView: UIScrollView!
    var y: CGFloat!
    var x: CGFloat!
    
    var width: CGFloat!

    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    init(frame: CGRect, patient: Patient) {
        super.init(frame: frame)
        self.patient = patient
        self.buildUI()
        ServerService.shared.getAIDiagnosticPatient(token: self.patient.token, patientID: self.patient.ID, completion: {(error, diagnostics, treatments) in
            if let diagnostics = diagnostics {
                if (diagnostics.isEmpty) {
                    let label = UILabel()
                    label.setUp(text: "Pas de diagnostic de l'IA. SVP remplissez les questionnaires.", origin: CGPoint(x: OUTTER_PADDING, y: self.y), height: TEXT_FIELD_HEIGHT)
                    self.scrollView.addSubview(label)
                }
                else {
                    let sortedDiagnostics = diagnostics.sorted(by: {$0 > $1})
                    for diagnostic in sortedDiagnostics {
                        patient.diagnostics.append(diagnostic)
                        self.y += CIRCLE_HIEGHT + OUTTER_PADDING
                        self.centerPointDiagnostic = CGPoint(x: self.x, y: self.y)
                        self.setUpDiagnosticUI(centerPoint: self.centerPointDiagnostic)
                        self.loadScoreDiagnostic(score: (Float(diagnostic.prob ?? 0.00)), centerPoint: self.centerPointDiagnostic)
                        self.y += CIRCLE_HIEGHT + OUTTER_PADDING
                        self.x -= CIRCLE_HIEGHT
                        let label = UILabel()
                        label.setUp(text: diagnostic.name, origin: CGPoint(x: self.x, y: self.y), height: TEXT_FIELD_HEIGHT)
                        if (self.patient.diagnosticsPraticient.contains(diagnostic)) {
                            label.underline()
                            label.textColor = BLUE
                        }
                        self.scrollView.addSubview(label)
                        self.x += CIRCLE_HIEGHT
                        self.y += label.frame.height + OUTTER_PADDING
                        self.layoutIfNeeded()
                    }
                }
            }
           
            if let treatments = treatments {
                if (treatments.isEmpty) {
                    let label = UILabel()
                    label.setUp(text: "Pas de traitements de l'IA. SVP remplissez les questionnaires.", origin: CGPoint(x: OUTTER_PADDING, y: self.y), height: TEXT_FIELD_HEIGHT)
                    self.scrollView.addSubview(label)
                }
                else {
                    let sortedTreatments = treatments.sorted(by: {$0 < $1})
                    self.y += OUTTER_PADDING * 4
                    let AIDLabel = UILabel()
                    AIDLabel.setUp(text: "Traitements de l'IA ", origin: CGPoint(x: OUTTER_PADDING + BORDER_SIZE, y: self.y), font: SUBTITLE_FONT, width: self.width, textAlignment: .center)
                    self.scrollView.addSubview(AIDLabel)
                    self.y += AIDLabel.frame.height + OUTTER_PADDING
                    for treatment in sortedTreatments {
                        patient.treatments.append(treatment)
                        self.y += CIRCLE_HIEGHT + OUTTER_PADDING
                        self.centerPointDiagnostic = CGPoint(x: self.x, y: self.y)
                        self.setUpDiagnosticUI(centerPoint: self.centerPointDiagnostic)
                        self.loadScoreDiagnostic(score: (Float(treatment.prob ?? 0.00)), centerPoint: self.centerPointDiagnostic)
                        self.y += CIRCLE_HIEGHT + OUTTER_PADDING
                        self.x -= CIRCLE_HIEGHT
                        let label = UILabel()
                        label.setUp(text: treatment.name, origin: CGPoint(x: self.x, y: self.y))
                        if (self.patient.treatmentsPraticient.contains(treatment)) {
                            label.underline()
                            label.textColor = BLUE
                        }
                        self.scrollView.addSubview(label)
                        self.x += CIRCLE_HIEGHT
                        self.y += label.frame.height + OUTTER_PADDING
                        self.layoutIfNeeded()
                    }
                }
            }
            self.scrollView.contentSize.height = self.y
            self.layoutIfNeeded()
        })
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func reloadDiagnosticView() {
        ServerService.shared.getAIDiagnosticPatient(token: self.patient.token, patientID: self.patient.ID, completion: {(error, diagnostics, treatments) in
            if let diagnostics = diagnostics {
                let sortedDiagnostics = diagnostics.sorted(by: {$0 > $1})
                for diagnostic in sortedDiagnostics {
                    self.patient.diagnostics.append(diagnostic)
                    self.y += CIRCLE_HIEGHT + OUTTER_PADDING
                    self.centerPointDiagnostic = CGPoint(x: self.x, y: self.y)
                    self.setUpDiagnosticUI(centerPoint: self.centerPointDiagnostic)
                    self.loadScoreDiagnostic(score: (Float(diagnostic.prob ?? 0.00)), centerPoint: self.centerPointDiagnostic)
                    self.y += CIRCLE_HIEGHT + OUTTER_PADDING
                    self.x -= CIRCLE_HIEGHT
                    let label = UILabel()
                    label.setUp(text: diagnostic.name, origin: CGPoint(x: self.x, y: self.y), height: TEXT_FIELD_HEIGHT)
                    if (self.patient.diagnosticsPraticient.contains(diagnostic)) {
                        label.underline()
                    }
                    self.scrollView.addSubview(label)
                    self.x += CIRCLE_HIEGHT
                    self.y += label.frame.height + OUTTER_PADDING
                    self.layoutIfNeeded()
                }
            }
           
            if let treatments = treatments {
                let sortedTreatments = treatments.sorted(by: {$0 < $1})
                self.y += OUTTER_PADDING * 4
                let AIDLabel = UILabel()
                AIDLabel.setUp(text: "Traitement de l'IA ", origin: CGPoint(x: OUTTER_PADDING + BORDER_SIZE, y: self.y), font: SUBTITLE_FONT, width: self.width, textAlignment: .center)
                self.scrollView.addSubview(AIDLabel)
                self.y += AIDLabel.frame.height + OUTTER_PADDING
                for treatment in sortedTreatments {
                    self.patient.treatments.append(treatment)
                    self.y += CIRCLE_HIEGHT + OUTTER_PADDING
                    self.centerPointDiagnostic = CGPoint(x: self.x, y: self.y)
                    self.setUpDiagnosticUI(centerPoint: self.centerPointDiagnostic)
                    self.loadScoreDiagnostic(score: (Float(treatment.prob ?? 0.00)), centerPoint: self.centerPointDiagnostic)
                    self.y += CIRCLE_HIEGHT + OUTTER_PADDING
                    self.x -= CIRCLE_HIEGHT
                    let label = UILabel()
                    label.setUp(text: treatment.name, origin: CGPoint(x: self.x, y: self.y))
                    if (self.patient.treatmentsPraticient.contains(treatment)) {
                        label.underline()
                    }
                    self.scrollView.addSubview(label)
                    self.x += CIRCLE_HIEGHT
                    self.y += label.frame.height + OUTTER_PADDING
                    self.layoutIfNeeded()
                    
                }
            }
            self.scrollView.contentSize.height = self.y
            self.layoutIfNeeded()
        })
    }
    
    func buildUI() {
        setUpScollView()
        self.layer.borderWidth = BORDER_SIZE
        self.layer.cornerRadius = CORNER_RADIUS
        self.layer.borderColor = DARK_GRAY.cgColor
        
        width = self.frame.width - 2 * BORDER_SIZE - 2 * OUTTER_PADDING
        
        x = OUTTER_PADDING + BORDER_SIZE
        y = OUTTER_PADDING + BORDER_SIZE
        
        let titleLabel = UILabel()
        self.scrollView.addSubview(titleLabel)
        titleLabel.setUp(text: "Diagnostics et Traitements", origin: CGPoint(x: x, y: y), font: TITLE_FONT, width: width, textAlignment: .center)
        
        y += titleLabel.frame.height + PADDING
        
        let AIDLabel = UILabel()
        AIDLabel.setUp(text: "Diagnostics de l'IA ", origin: CGPoint(x: x, y: y), font: SUBTITLE_FONT, width: width, textAlignment: .center)
        self.scrollView.addSubview(AIDLabel)
        
        y += AIDLabel.frame.height + OUTTER_PADDING
        x += CIRCLE_HIEGHT + OUTTER_PADDING
    }
    
    func setUpScollView() {
        scrollView = UIScrollView()
        self.addSubview(scrollView)
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        scrollView.backgroundColor = WHITE
        scrollView.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        scrollView.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
        scrollView.leftAnchor.constraint(equalTo: self.leftAnchor).isActive = true
        scrollView.rightAnchor.constraint(equalTo: self.rightAnchor).isActive = true
        scrollView.layoutIfNeeded()
        scrollView.isScrollEnabled = true
        scrollView.contentSize = CGSize(width: self.frame.width, height: scrollView.frame.size.height)
    }
    
    func setUpDiagnosticUI(centerPoint: CGPoint) {
        let circularFullPath = UIBezierPath(arcCenter: centerPoint, radius: CIRCLE_HIEGHT, startAngle: -CGFloat.pi/2 , endAngle: 2 * CGFloat.pi, clockwise: true)
        let trackLayer = CAShapeLayer()
        trackLayer.path = circularFullPath.cgPath
        trackLayer.strokeEnd = 0
        trackLayer.strokeColor = LIGHT_GRAY.cgColor
        trackLayer.lineWidth = 10
        trackLayer.fillColor = UIColor.clear.cgColor
        trackLayer.lineCap = .round
        self.scrollView.layer.addSublayer(trackLayer)
        
        shapeLayerDiagnostic = CAShapeLayer()
        shapeLayerDiagnostic.path = circularFullPath.cgPath
        shapeLayerDiagnostic.strokeEnd = 0
        shapeLayerDiagnostic.lineWidth = 10
        shapeLayerDiagnostic.fillColor = UIColor.clear.cgColor
        shapeLayerDiagnostic.lineCap = .round
        self.scrollView.layer.addSublayer(shapeLayerDiagnostic)

    }
    
    func loadScoreDiagnostic(score: Float, centerPoint: CGPoint) {
        print(CGFloat(score))
        let circularPath = UIBezierPath(arcCenter: centerPoint, radius: CIRCLE_HIEGHT, startAngle: -CGFloat.pi/2 , endAngle: 2 * CGFloat.pi * CGFloat(score), clockwise: true)
        shapeLayerDiagnostic.path = circularPath.cgPath
        if (score < 0.35) {
            shapeLayerDiagnostic.strokeColor = RED.cgColor
           
        }
        else if ((0.35 < score) && (score < 0.75)) {
            shapeLayerDiagnostic.strokeColor = ORANGE.cgColor
        }
        else if (score > 0.75) {
            shapeLayerDiagnostic.strokeColor = GREEN.cgColor
        }
        let basicAnimation = CABasicAnimation(keyPath: "strokeEnd")
        basicAnimation.toValue = score
        basicAnimation.duration = 2
        basicAnimation.fillMode = .forwards
        basicAnimation.isRemovedOnCompletion = false
        shapeLayerDiagnostic.add(basicAnimation, forKey: "diagnostic")
        
        let scoreLabel = UILabel()
        let scoreString = String(Int(score * 100)) + "%"
        scoreLabel.setUp(text: scoreString, origin: CGPoint(x: centerPoint.x - PADDING, y: centerPoint.y + CIRCLE_HIEGHT/2 - 2 * OUTTER_PADDING))
        self.scrollView.addSubview(scoreLabel)
    }
    
    func setUpTraitementUI(centerPoint: CGPoint) {
        let trackLayer = CAShapeLayer()
        let circularFullPath = UIBezierPath(arcCenter: centerPoint, radius: CIRCLE_HIEGHT, startAngle: -CGFloat.pi/2 , endAngle: 2 * CGFloat.pi, clockwise: true)
        trackLayer.path = circularFullPath.cgPath
        trackLayer.strokeEnd = 0
        trackLayer.strokeColor = LIGHT_GRAY.cgColor
        trackLayer.lineWidth = 10
        trackLayer.fillColor = UIColor.clear.cgColor
        trackLayer.lineCap = .round
        self.layer.addSublayer(trackLayer)
        
        
        shapeLayerTraitement = CAShapeLayer()
        shapeLayerTraitement.path = circularFullPath.cgPath
        shapeLayerTraitement.strokeEnd = 0
        shapeLayerTraitement.lineWidth = 10
        shapeLayerTraitement.fillColor = UIColor.clear.cgColor
        shapeLayerTraitement.lineCap = .round
        self.layer.addSublayer(shapeLayerTraitement)
    }
    
    
    
    func loadScoreTraitement(score: Int, centerPoint: CGPoint) {
        let circularFullPath = UIBezierPath(arcCenter: centerPoint, radius: CIRCLE_HIEGHT, startAngle: -CGFloat.pi/2 , endAngle: 2 * CGFloat.pi, clockwise: true)
        let circularThirdPath = UIBezierPath(arcCenter: centerPoint, radius: CIRCLE_HIEGHT, startAngle: -CGFloat.pi/2 , endAngle: CGFloat.pi / 3, clockwise: true)
        let circularTwoThirdsPath = UIBezierPath(arcCenter: centerPoint, radius: CIRCLE_HIEGHT, startAngle: -CGFloat.pi/2 , endAngle: CGFloat.pi, clockwise: true)
        if (score < 35) {
            shapeLayerTraitement.strokeColor = RED.cgColor
            shapeLayerTraitement.path = circularThirdPath.cgPath
        }
        else if ((35 < score) && (score < 75)) {
            shapeLayerTraitement.strokeColor = ORANGE.cgColor
            shapeLayerTraitement.path = circularTwoThirdsPath.cgPath
        }
        else if (score > 75) {
            shapeLayerTraitement.strokeColor = GREEN.cgColor
            shapeLayerTraitement.path = circularFullPath.cgPath
        }
        let basicAnimation = CABasicAnimation(keyPath: "strokeEnd")
        basicAnimation.toValue = 1
        basicAnimation.duration = 2
        basicAnimation.fillMode = .forwards
        basicAnimation.isRemovedOnCompletion = false
        shapeLayerTraitement.add(basicAnimation, forKey: "diagnostic")
    }
}



