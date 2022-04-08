//
//  Head.swift
//  Meditrinae
//
//  Created by Hakim Kasimi on 2019-10-10.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation
import SceneKit

struct muscles {
    var temporal : Bool = false
    var atm : Bool = false
    var masseter : Bool = false
    var pterigoidienMedial : Bool = false
    var digastriquePos : Bool = false
    var muscMass : Bool = false
}

enum side {
    case front
    case left
    case right
}

let materials : Set<String>! = ["g_Temporal", "d_Temporal", "g_ATM", "d_ATM", "d_Masseter", "g_Masseter", "g_pterigoidienMedial", "d_pterigoidienMedial", "d_digastriquePos", "g_digastriquePos", "d_muscMass", "g_muscMass"]

class Head {
    
    var questionnaire: Questionnaire!
    var left : muscles = muscles()
    var right : muscles = muscles()
    
    var scene = SCNScene()
    var sceneView : SCNView = SCNView()
    
    var idPreFix: String = ""
    
    var initCameraPosition : SCNVector3!
    var initCameraOrientation : SCNQuaternion!
   
    init() {
        self.questionnaire = Questionnaire()
    }
    func setId(ID: String) {
        self.idPreFix = ID
    }
    func setQuestionnaire(questionnaire: Questionnaire) {
        self.questionnaire = questionnaire
    }
    
    func loadHead() {
        scene = SCNScene(named: "Head_light.obj")!
        let cameraNode = SCNNode()
        cameraNode.camera = SCNCamera()
        cameraNode.position = SCNVector3(x: 0, y: 13.5, z: 2.5)
        sceneView.pointOfView = cameraNode
        
        for mat in (self.scene.rootNode.childNodes.first?.geometry?.materials)! {
            mat.lightingModel = SCNMaterial.LightingModel.phong
            if(mat.diffuse.contents as! UIColor == UIColor.red){
                mat.diffuse.contents = UIColor.blue
                mat.ambient.contents = UIColor.blue
            }
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
                
                self.sceneView.gestureRecognizers = gestureRecognizer
                self.sceneView.scene = self.scene
            }
            
        }
        
        initCameraPosition = sceneView.pointOfView?.worldPosition
        initCameraOrientation = sceneView.pointOfView?.worldOrientation
    }
    
    func setCamera(side: side) {
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
        
//        print("Tap detected")
        let sceneView = gestureRecon.view as! SCNView
        let pos = gestureRecon.location(in :sceneView)
//        print(pos)
        let hitResults = sceneView.hitTest(pos, options: nil)
        if hitResults.count > 0 {
            let geometryIndex = hitResults.first!.geometryIndex
            if materials.contains(hitResults.first!.node.geometry!.materials[geometryIndex].name!) {
                if updateData(materialName: hitResults.first!.node.geometry!.materials[geometryIndex].name!) {
                            //                    print("RED")
                        sceneView.scene!.rootNode.childNodes.first!.geometry!.materials[geometryIndex].diffuse.contents = UIColor.red
                        sceneView.scene!.rootNode.childNodes.first!.geometry!.materials[geometryIndex].diffuse.contents = UIColor.red
                    } else {
                            //                    print("WHITE")
                        sceneView.scene!.rootNode.childNodes.first!.geometry!.materials[geometryIndex].diffuse.contents = UIColor.white
                        sceneView.scene!.rootNode.childNodes.first!.geometry!.materials[geometryIndex].diffuse.contents = UIColor.white
                }
            }
        }
    }
    
    func loadMuscles(){
        if (right.atm){
            changeColorMuscle(material: "d_ATM")
        }
        if (right.temporal){
            changeColorMuscle(material: "d_Temporal")
        }
        if (right.masseter){
            changeColorMuscle(material: "d_Masseter")
        }
        if (right.digastriquePos){
            changeColorMuscle(material: "d_digastriquePos")
        }
        if (right.pterigoidienMedial){
            changeColorMuscle(material: "d_pterigoidienMedial")
        }
        if (right.muscMass){
            changeColorMuscle(material: "d_muscMass")
        }
        if (left.atm){
            changeColorMuscle(material: "g_ATM")
        }
        if (left.temporal){
            changeColorMuscle(material: "g_Temporal")
        }
        if (left.masseter){
            changeColorMuscle(material: "g_Masseter")
        }
        if (left.digastriquePos){
            changeColorMuscle(material: "g_digastriquePos")
        }
        if (left.pterigoidienMedial){
            changeColorMuscle(material: "g_pterigoidienMedial")
        }
        if (left.muscMass){
            changeColorMuscle(material: "g_muscMass")
        }
    }
    
    func changeColorMuscle(material: String) {
        if material.contains(material) {
            sceneView.scene!.rootNode.childNodes.first!.geometry!.material(named: material)?.diffuse.contents = UIColor.blue
        }
    }
    
    func setBaseLineData() {
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_Temporal")] = String( self.left.temporal)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_ATM")] = String( self.left.atm)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_Masseter")] = String( self.left.masseter)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_pterigoidienMedial")] = String( self.left.pterigoidienMedial)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_digastriquePos")] = String( self.left.digastriquePos)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_muscMass")] = String( self.left.muscMass)
        
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_Temporal")] = String( self.right.temporal)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_ATM")] = String( self.right.atm)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_Masseter")] = String(self.right.masseter)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_pterigoidienMedial")] = String( self.right.pterigoidienMedial)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_digastriquePos")] = String( self.right.digastriquePos)
        self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_muscMass")] = String( self.right.muscMass)
    }
    
    func setHeadFromHead(head:Head) {
        self.right = head.right
        self.left = head.left
        self.loadMuscles()
    }
    
    func updateData(materialName : String) -> Bool {
                  switch materialName {
                  case "g_Temporal":
                      self.left.temporal =  !self.left.temporal
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_Temporal")] = String( self.left.temporal)
                      return self.left.temporal
                      
                  case "g_ATM":
                      self.left.atm =  !self.left.atm
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_ATM")] = String(  self.left.atm)
                      return self.left.atm
                      
                  case "g_Masseter":
                      self.left.masseter =  !self.left.masseter
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_Masseter")] = String( self.left.masseter)
                      return self.left.masseter
                      
                  case "g_pterigoidienMedial":
                      self.left.pterigoidienMedial =  !self.left.pterigoidienMedial
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_pterigoidienMedial")] = String( self.left.pterigoidienMedial)
                      return self.left.pterigoidienMedial
                      
                  case "g_digastriquePos":
                      self.left.digastriquePos =  !self.left.digastriquePos
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_digastriquePos")] = String( self.left.digastriquePos)
                      return self.left.digastriquePos

                    case "g_muscMass":
                      self.left.muscMass =  !self.left.muscMass
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "g_muscMass")] = String( self.left.muscMass)
                      return self.left.muscMass
                      
                  case "d_Temporal":
                      self.right.temporal =  !self.right.temporal
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_Temporal")] = String( self.right.temporal)
                      return self.right.temporal
                      
                  case "d_ATM":
                      self.right.atm =  !self.right.atm
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_ATM")] = String( self.right.atm)
                      return self.right.atm
                      
                  case "d_Masseter":
                      self.right.masseter =  !self.right.masseter
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_Masseter")] = String(self.right.masseter)
                      return self.right.masseter
                      
                  case "d_pterigoidienMedial":
                      self.right.pterigoidienMedial =  !self.right.pterigoidienMedial
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_pterigoidienMedial")] = String( self.right.pterigoidienMedial)
                      return self.right.pterigoidienMedial
                      
                  case "d_digastriquePos":
                      self.right.digastriquePos =  !self.right.digastriquePos
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_digastriquePos")] = String( self.right.digastriquePos)
                      return self.right.digastriquePos

                 case "d_muscMass":
                      self.right.muscMass =  !self.right.muscMass
                      self.questionnaire.exportedData[self.makeCodeMuscle(name: "d_muscMass")] = String( self.right.muscMass)
                      return self.right.muscMass
                      
                  default:
                      return false
                  }
              }
    
    func makeCodeMuscle(name: String)-> String {
        let name = (self.questionnaire.headPreName! + "_" + self.idPreFix + "_" + name)
        return (name.uppercased())
    }
    
    func getExportData() -> [String:String]{
        return self.questionnaire.exportedData
    }
}

