//
//  Head.swift
//  Meditrinae
//
//  Created by Hakim Kasimi on 2019-10-10.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import SceneKit

protocol MuscleSelectionDelegate {
    func muscleSelected(area: Area, pain: Pain)
        func resetMuscle()
  }

protocol MuscleSideDelegate {
    func sideSelected(side: Side)
}

class Head {
    
    var angleRotation_X: Float = 0.0
    var angleRotation_Y: Float = 0.0
    
    var muscles : Muscles!
    var scene = SCNScene()
    var sceneView : SCNView = SCNView()
    var initCameraPosition : SCNVector3!
    var initCameraOrientation : SCNQuaternion!
    
    
    var doComplete: Bool!
    var selectedMuscle: [Area]
    var isSelectedArea: Bool?
    var muscleDelegate: MuscleSelectionDelegate!
    var muscleSideDelegate: MuscleSideDelegate!
    weak var headSubView: HeadSubView!
    
    init() {
        self.muscles = Muscles(headID: "", questionID: "", questionnaire: Questionnaire())
        self.doComplete = true
        self.selectedMuscle = []
        self.isSelectedArea = false
    }
    
    func setHead(headID: String, doComplete:Bool, questionnaire: Questionnaire, questionID: String) {
        self.muscles = Muscles(headID: headID, questionID: questionID, questionnaire: questionnaire)
        self.doComplete = doComplete
        self.resetSelected()
    }
    
    func setHeadSubView(headSubView: HeadSubView) {
        self.headSubView = headSubView
        headSubView.malDeTeteDelegate = self
    }
    
    func setHeadFromMuscles(areas: [Area]) {
           self.muscles.CopyDataFrom(areas: areas)
           self.muscles.ChangeMusclesColor(sceneView: self.sceneView)
    }
    
    func loadHead() {
           scene = SCNScene(named: "head_Model.obj")!
           let cameraNode = SCNNode()
           cameraNode.camera = SCNCamera()
           cameraNode.position = SCNVector3(x: 0, y: 13.5, z: 2.5)
           sceneView.pointOfView = cameraNode
           sceneView.defaultCameraController.maximumVerticalAngle = 40
           sceneView.defaultCameraController.minimumVerticalAngle = -30
           sceneView.defaultCameraController.maximumHorizontalAngle = 90
           sceneView.defaultCameraController.minimumHorizontalAngle = -90
           for mat in (self.scene.rootNode.childNodes.first?.geometry?.materials)! {
               mat.lightingModel = SCNMaterial.LightingModel.phong
           }
           sceneView.autoenablesDefaultLighting = true
           sceneView.allowsCameraControl = true
           sceneView.backgroundColor = UIColor.white
           sceneView.cameraControlConfiguration.allowsTranslation = false
           let tapGesture = UITapGestureRecognizer(target: self, action: #selector(Head.handleTap))
           var gestureRecognizer = Array<UIGestureRecognizer>()
           gestureRecognizer.append(tapGesture)
           DispatchQueue.main.async {
               if let existingGestureRecon = self.sceneView.gestureRecognizers {
                   gestureRecognizer.append(contentsOf: existingGestureRecon)
                   let gesturePan = gestureRecognizer[2] as? UIPanGestureRecognizer
                   if gesturePan != nil{
                       gesturePan!.maximumNumberOfTouches = 1
                   }
               }
               self.sceneView.gestureRecognizers = gestureRecognizer
               self.sceneView.scene = self.scene
           }
        initCameraPosition = sceneView.pointOfView?.worldPosition
        initCameraOrientation = sceneView.pointOfView?.worldOrientation
       }
    
    func setCamera(side: sideType) {
         switch side {
         case.front:
             if (!(sceneView.scene?.rootNode.childNodes.isEmpty)!) {
                 sceneView.scene!.rootNode.childNodes[0].position = SCNVector3(x: 0, y: 0, z: 0)
             }
             break
         case.right:
             if (!(sceneView.scene?.rootNode.childNodes.isEmpty)!) {
                 
                 sceneView.scene!.rootNode.childNodes[0].position = SCNVector3(x: 0.1, y: 0, z: 0)
                 sceneView.scene!.rootNode.childNodes[0].look(at: SCNVector3(x: -1, y: 0, z: 0))
                 //sceneView.scene?.rootNode.runAction(SCNAction.rotateBy(x: 0, y: 0, z: -0.1, duration: 0.0))
                 
                 
             }
             break
         case.left:
             if (!(sceneView.scene?.rootNode.childNodes.isEmpty)!) {
                 sceneView.scene!.rootNode.childNodes[0].position = SCNVector3(x: -0.1, y: 0, z: 0)
                 sceneView.scene!.rootNode.childNodes[0].look(at: SCNVector3(x: 1, y: 0, z: 0))
             }
             break
         }
     }
    
    @objc func handleTap(gestureRecon : UIGestureRecognizer) {
        let sceneView = gestureRecon.view as! SCNView
        let pos = gestureRecon.location(in :sceneView)
        let hitResults = sceneView.hitTest(pos, options: nil)
        if hitResults.count > 0 {
            let geometryIndex = hitResults.first!.geometryIndex
            let area = self.muscles.getMuscleByMaterialName(matName: sceneView.scene!.rootNode.childNodes.first!.geometry!.materials[geometryIndex].name!)
            if (area != nil) {
                if (muscleSideDelegate != nil) {
                    muscleSideDelegate.sideSelected(side: area!.side)
                }
                isSelectedArea = true
                selectedMuscle = doCheckComplete(area: area!)
                changeMuscleSelected(muscles: selectedMuscle, pain: Pain(pain: .douleur), tapped: true)
            }
        }
    }
    
    func changeMuscleSelected(muscles: [Area], pain: Pain, tapped: Bool){
        for muscle in muscles {
            if (self.muscles.switchMusclePain(area: muscle, pain: pain)) {
                self.muscles.changeMuscle(area: muscle, sceneView: self.sceneView, pain: pain)
                if (muscleDelegate != nil && tapped) {
                    muscleDelegate.muscleSelected(area: selectedMuscle[0], pain: selectedMuscle[0].painType)
                }
            }
            else {
                self.muscles.changeMuscle(area: muscle, sceneView: self.sceneView, pain: Pain(pain: .none))
                if (muscleDelegate != nil && tapped) {
                    resetSelected()
                }
            }
        }
    }

    
    func doCheckComplete(area: Area) -> [Area] {
        var areas = [Area]()
        let droit = area.isSideDroit()
        if (doComplete) {
            if (area.isTemporal()) {
                areas = self.muscles.getTemporalMusclesSide(droit: droit)
                return areas
            }
            else if(area.isMasseter()) {
                areas = self.muscles.getMasseterMusclesSide(droit: droit)
                return areas
            }
            return [area]
        }
        return [area]
    }
    
    func clearMuscles() {
        self.muscles.resetMuscles()
        self.resetSelected()
        self.muscles.ChangeMusclesColor(sceneView: self.sceneView)
        if (self.muscleDelegate != nil) {
            self.muscleDelegate.resetMuscle()
        }
    }
    
    func resetSelected() {
        isSelectedArea = false
        selectedMuscle = []
        if (self.muscleDelegate != nil){
            self.muscleDelegate.resetMuscle()
        }
    }
}

extension Head: MalTeteDelegate {
    func changeMuscleColor(pain: Pain, doul: Bool) {
        if (isSelectedArea!) {
            if (doul) {
                changeMuscleSelected(muscles: selectedMuscle, pain: pain, tapped: false)
            }
            else {
                changeMuscleSelected(muscles: selectedMuscle, pain: Pain(pain: .douleur), tapped: false)

            }
        }
    }
    
    func malDeTeteChanged(value: Bool) {
        for area in selectedMuscle {
             self.muscles.questionnaire.exportedData[area.makeExportCodeMT()] = String(value)
        }
    }
}

