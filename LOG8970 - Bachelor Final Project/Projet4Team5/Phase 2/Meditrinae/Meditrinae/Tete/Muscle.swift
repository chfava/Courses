//
//  Muscle.swift
//  Meditrinae
//
//  Created by Hakim Kasimi on 2019-10-26.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import SceneKit

class Muscles {
    
    var areas = [Area]()
    var questionnaire: Questionnaire!
    
    var headID: String! = ""
    var questionID: String! = ""

    init(headID: String, questionID: String, questionnaire: Questionnaire) {
        self.headID = headID
        self.questionID = questionID
        self.questionnaire = questionnaire
        // Cote gauche
        areas.append(Area(name: "Temporal Posterieur Gauche",  materialName: "g_Temporal_Posterior", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        areas.append(Area(name: "Temporal Anterieur Gauche",  materialName: "g_Temporal_Anterior", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        areas.append(Area(name: "Temporal Milieu Gauche",  materialName: "g_Temporal_Middle", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        areas.append(Area(name: "ATM Gauche",  materialName: "g_ATM", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        areas.append(Area(name: "Masseter Body Gauche",  materialName: "g_Masseter_Body", painType: Pain.init(pain: painType.none) , inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        areas.append(Area(name: "Masseter Origin Gauche",  materialName: "g_Masseter_Origin", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        areas.append(Area(name: "Masseter Insertion Gauche",  materialName: "g_Masseter_Insertion", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        areas.append(Area(name: "Pterigoidien Medial Gauche",  materialName: "g_pterigoidienMedial", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        areas.append(Area(name: "Digastrique Gauche",  materialName: "g_digastriquePos", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .left), headID: headID, questionID: questionID))
        
        
        
        // Cote droit
        areas.append(Area(name: "Temporal Posterieur Droit",  materialName: "d_Temporal_Posterior", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        areas.append(Area(name: "Temporal Anterieur Droit",  materialName: "d_Temporal_Anterior", painType:Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        areas.append(Area(name: "Temporal Milieu Droit",  materialName: "d_Temporal_Middle", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        areas.append(Area(name: "ATM Droit",  materialName: "d_ATM", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        areas.append(Area(name: "Masseter Body Droit",  materialName: "d_Masseter_Body", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        areas.append(Area(name: "Masseter Origin Droit", materialName: "d_Masseter_Origin", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        areas.append(Area(name: "Masseter Insertion Droit", materialName: "d_Masseter_Insertion", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        areas.append(Area(name: "Pterigoidien Medial Droit", materialName: "d_pterigoidienMedial", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        areas.append(Area(name: "Digastrique Droit",  materialName: "d_digastriquePos", painType: Pain.init(pain: painType.none), inPain: false, side: Side(side: .right), headID: headID, questionID: questionID))
        
         self.setBaseLineData()
    }
    
    func getMuscleByName(name : String) -> Area? {
        for index in 0...self.areas.count-1 {
            if (areas[index].name == name) {
                return areas[index]
            }
        }
        return nil
    }
        
    func getMuscleByMaterialName(matName : String) -> Area? {
        for index in 0...self.areas.count-1 {
            if (areas[index].materialName == matName) {
                return areas[index]
            }
        }
        return nil
    }
    
    func switchMusclePain(area: Area, pain: Pain) -> Bool {
        if (area.painType.pain == pain.pain) {
            area.inPain = false
            area.painType = Pain(pain: .none)
            self.questionnaire.exportedData[self.makeCodeMuscle(area: area)] = area.painType.getPainID()
            return false
        }
        else if (area.painType.pain == Pain(pain: .oldPain).pain) {
            area.inPain = true
            area.painType = pain
            self.questionnaire.exportedData[self.makeCodeMuscle(area: area)] = area.painType.getPainID()
            return true
        }
        else {
            switch pain.pain {
            case .douleur:
                area.inPain = true
                area.painType = Pain(pain: .douleur)
                self.questionnaire.exportedData[self.makeCodeMuscle(area: area) ] = area.painType.getPainID()
                return true
            case .douleurHabituelle:
                area.inPain = true
                area.painType = Pain(pain: .douleurHabituelle)
                self.questionnaire.exportedData[self.makeCodeMuscle(area: area) ] = area.painType.getPainID()
                return true
            case .douleurRefere:
                area.inPain = true
                area.painType = Pain(pain: .douleurRefere)
                self.questionnaire.exportedData[self.makeCodeMuscle(area: area) ] = area.painType.getPainID()
                return true
            case .allPain:
                area.inPain = true
                area.painType = pain
                self.questionnaire.exportedData[self.makeCodeMuscle(area: area) ] = area.painType.getPainID()
                return true
            case .oldPain:
                area.inPain = true
                area.painType = pain
                self.questionnaire.exportedData[self.makeCodeMuscle(area: area) ] = area.painType.getPainID()
                return true
            case .none:
                area.inPain = false
                area.painType = Pain(pain: .none)
                self.questionnaire.exportedData[self.makeCodeMuscle(area: area) ] = area.painType.getPainID()
                return false
            }
        }
    }
    
    func ChangeMusclesColor(sceneView : SCNView) {
        for area in self.areas {
            if area.inPain {
                sceneView.scene!.rootNode.childNodes.first!.geometry!.material(named: area.materialName)?.diffuse.contents = area.painType.getPainColor()
            } else {
                sceneView.scene!.rootNode.childNodes.first!.geometry!.material(named: area.materialName)?.diffuse.contents = UIColor.white
            }
        }
    }
    
    func changeMuscle(area: Area, sceneView : SCNView, pain: Pain) {
        for index in 0...self.areas.count-1 {
            if (area.materialName == self.areas[index].materialName) {
                sceneView.scene!.rootNode.childNodes.first!.geometry!.material(named: self.areas[index].materialName)?.diffuse.contents = pain.getPainColor()
            }
        }
    }
    
    func resetMuscles()  {
        for index in 0...self.areas.count-1 {
            areas[index].inPain = false
            areas[index].painType.setPain(pain: .none)
        }
        setBaseLineData()
    }
    
    func CopyDataFrom(areas: [Area]) {
        for index in 0...self.areas.count-1 {
            self.areas[index] = areas[index]
            self.areas[index].setOldPain()
        }
    }
    
    func getMasseterMusclesSide(droit: Bool) -> [Area] {
        var areas = [Area]()
        for index in 0...self.areas.count-1 {
            if (self.areas[index].isMasseter() && (droit == self.areas[index].isSideDroit())) {
                areas.append(self.areas[index])
            }
        }
        return areas
    }
    
    func getTemporalMusclesSide(droit: Bool) -> [Area] {
        var areas = [Area]()
        for index in 0...self.areas.count-1 {
            if (self.areas[index].isTemporal() && (droit == self.areas[index].isSideDroit())) {
                areas.append(self.areas[index])
            }
        }
         return areas
    }
    
    func setBaseLineData() {
        for index in 0...self.areas.count-1 {
            self.questionnaire.exportedData[self.makeCodeMuscle(area: self.areas[index])] = self.areas[index].painType.getPainID()
        }
    }
    
    func makeCodeMuscle(area: Area)-> String {
        area.makeExportCode()
    }
    
    func getExportData() -> [String:String]{
        return self.questionnaire.exportedData
    }
}

