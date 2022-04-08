//
//  FDI6ViewController.swift
//  Meditrinae
//
//  Created by Vincent Dandenault on 2019-10-06.
//  Copyright © 2019 Team5. All rights reserved.
//

import UIKit
import iOSDropDown
import SceneKit
import NotificationCenter

class FDI7ViewController: FDIAbstract {

    @IBOutlet weak var confirmationUIView: UIView!
    @IBOutlet weak var GmandiDSwitch: UISwitch!
    @IBOutlet weak var GSmandiDSwitch: UISwitch!
    @IBOutlet weak var GpteDSwitch: UISwitch!
    @IBOutlet weak var GtenDSwitch: UISwitch!
    
    @IBOutlet weak var GmandiDHSwitch: UISwitch!
    @IBOutlet weak var GSmandiDHSwitch: UISwitch!
    @IBOutlet weak var GpteDHSwitch: UISwitch!
    @IBOutlet weak var GtenDHSwitch: UISwitch!
    
    @IBOutlet weak var GmandiDRSwitch: UISwitch!
    @IBOutlet weak var GSmandiDRSwitch: UISwitch!
    @IBOutlet weak var GpteDRSwitch: UISwitch!
    @IBOutlet weak var GtenDRSwitch: UISwitch!
    
    @IBOutlet weak var DmandiDSwitch: UISwitch!
    @IBOutlet weak var DSmandiDSwitch: UISwitch!
    @IBOutlet weak var DpteDSwitch: UISwitch!
    @IBOutlet weak var DtenDSwitch: UISwitch!
    
    @IBOutlet weak var DmandiDHSwitch: UISwitch!
    @IBOutlet weak var DSmandiDHSwitch: UISwitch!
    @IBOutlet weak var DpteDHSwitch: UISwitch!
    @IBOutlet weak var DtenDHSwitch: UISwitch!
    
    @IBOutlet weak var DmandiDRSwitch: UISwitch!
    @IBOutlet weak var DSmandiDRSwitch: UISwitch!
    @IBOutlet weak var DpteDRSwitch: UISwitch!
    @IBOutlet weak var DtenDRSwitch: UISwitch!
    
    
    
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var heightValue: NSLayoutConstraint!
    
    var commentaireTextField: UITextField!
    var commentaireLabel: UILabel!
    
    
    let Q10RowsD = ["Région mandibulaire post", "Région sous-mandibulaire", "Région ptérygoidien latéral", "Tendon du temporal"]
    
    let Q10ColsG = ["Douleur", "Douleur habituelle", "Douleur référée"]
    
    let muscles = ["Masseter", "Temporal", "Pterigoidien Medial", "Digastrique"]
    let idsMucles = [7, 8, 9, 10]
    
    let DDdiagnostics =  ["Aucun (En santé)", "Myalgie", "Douleur Myofasciale Réf.", "Arthralgie droite", "Arthralgie gauche", "Maux de tête attribués à DTM"]
    let idsDDiagnostics = [1, 2, 3, 4, 5, 6]
    
    let ATM = ["Non", "Déplacement du disque avec réduction", "Déplacement du disque avec réduction et blocage interminent", "Sans réduction et avec ouverture limitée", "Sans réduction et sans ouverture limitée", "Maladie dégénérative articulaire", "Subluxation"]
    
    let ATMID = ["Non": "N", "Déplacement du disque avec réduction": "DEP_REDUC", "Déplacement du disque avec réduction et blocage interminent": "DEP_REDUC_BLOC", "Sans réduction et avec ouverture limitée": "S_REDUC_ET_OUV_LIM", "Sans réduction sans ouverture limitée": "S_REDUC_S_OUV", "Maladie dégénérative articulaire" : "MDA", "Subluxation": "SUB"]
    
    let traitements = ["Education thérapeutique", "Kinésithérapie (physiothérapie)", "Orthèse occlusale", "Thérapies cognitives et comportementales (TCC)",  "Hypnose", "Traitement pharmocologique", "Toxine Botulique", "Physchothérapie"]
    let idsTraitements = [7, 8, 9, 10, 11, 12, 13, 14]
       
    let sides = ["Droit", "Gauche"]
    let idsSides = [12, 13]
    
    
    
    var desorDoulSelectionUIView: SelectionUIView!
    var traitementSelectionUIView: SelectionUIView!
    
    var desordreATMDLabel: UILabel!
    var desordreATMDDropDown: DropDown!
    
    var desordreATMGLabel: UILabel!
    var desordreATMGDropDown: DropDown!
    
    override func viewDidLoad() {
        self.confirmationUIView.isHidden = true
        super.viewDidLoad()
        setUpUI()
        self.view.setNeedsDisplay()
        if (canSubmit) {
            self.setUpNextButton()
        }
    }
    
    deinit {
       NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    func setUpUI() {
        self.setUpSwitches()
        self.confirmationUIView.backgroundColor = LIGHT_GRAY
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: UIResponder.keyboardWillHideNotification, object: nil)
 
        let ddouloureuxID = optionsID(ids: idsDDiagnostics, strings: DDdiagnostics)
        let musclesID = optionsID(ids: idsMucles, strings: muscles)
        let sidesID = optionsID(ids: idsSides, strings: sides)
        
        let traitementsID = optionsID(ids: idsTraitements, strings: traitements)
        
        let height = self.contentView.frame.height - 2 * OUTTER_PADDING
        let width = self.contentView.frame.width - 2 * OUTTER_PADDING
        
        var positionY = height/3  + OUTTER_PADDING
        var positionX = OUTTER_PADDING
        
        desorDoulSelectionUIView = SelectionUIView(frame: .zero)
        var frame = CGRect(x: positionX, y: positionY, width: width, height: BOX_HEIGHT)
        desorDoulSelectionUIView.buildUI(frame: frame, title: "Désordres Douloureux", options: [ddouloureuxID, musclesID, sidesID], data: self.medicalExam.examResult.buildDataDiagnostic().questions, dropDown: true, preLoadData: [], addSearchBar: false)
        self.contentView.addSubview(desorDoulSelectionUIView)
        desorDoulSelectionUIView.cantSelectOptionDelegate = self
        
        positionY += desorDoulSelectionUIView.frame.height + OUTTER_PADDING + BORDER_SIZE
        
       
        let titlesPositionX = OUTTER_PADDING
        desordreATMDLabel = UILabel()
        desordreATMDLabel.setUp(text: "Désordre ATM Droit", origin: CGPoint(x: titlesPositionX, y: positionY + BORDER_SIZE), textAlignment: .left)
        self.contentView.addSubview(desordreATMDLabel)
        
        positionX += titlesPositionX + desordreATMDLabel.frame.width + OUTTER_PADDING
        
        let dropDownWidth: CGFloat = width - positionX - OUTTER_PADDING
        
        frame = CGRect(x: positionX, y: positionY, width: dropDownWidth, height: DROP_DOWN_HIEGHT_SIZE)
        desordreATMDDropDown = DropDown(frame: frame)
        desordreATMDDropDown.optionArray = ATM
        self.contentView.addSubview(desordreATMDDropDown)
        desordreATMDDropDown.layer.borderWidth = 3
        desordreATMDDropDown.layer.borderColor = LIGHT_GRAY.cgColor
        desordreATMDDropDown.textAlignment = NSTextAlignment.center
        
        positionX = OUTTER_PADDING
        positionY += desordreATMDDropDown.frame.height + OUTTER_PADDING
        
        
        desordreATMGLabel = UILabel()
        desordreATMGLabel.setUp(text: "Désordre ATM Gauche", origin: CGPoint(x: titlesPositionX, y: positionY + BORDER_SIZE), textAlignment: .left)
        self.contentView.addSubview(desordreATMGLabel)
        
        positionX += titlesPositionX + desordreATMDLabel.frame.width + OUTTER_PADDING
        frame = CGRect(x: positionX, y: positionY, width: dropDownWidth, height: DROP_DOWN_HIEGHT_SIZE)
        desordreATMGDropDown = DropDown(frame: frame)
        desordreATMGDropDown.optionArray = ATM
        self.contentView.addSubview(desordreATMGDropDown)
        desordreATMGDropDown.layer.borderWidth = 3
        desordreATMGDropDown.layer.borderColor = LIGHT_GRAY.cgColor
        desordreATMGDropDown.textAlignment = NSTextAlignment.center
        
        positionX = OUTTER_PADDING
        positionY += desordreATMGDropDown.frame.height + OUTTER_PADDING
        
        traitementSelectionUIView = SelectionUIView(frame: .zero)
        frame = CGRect(x: positionX, y: positionY, width: width, height: BOX_HEIGHT)
        traitementSelectionUIView.buildUI(frame: frame, title: "Traitement", options: [traitementsID] , data: medicalExam.examResult.buildDataTraitement().questions, dropDown: true, preLoadData: [], addSearchBar: false)
        self.contentView.addSubview(traitementSelectionUIView)
        traitementSelectionUIView.cantSelectOptionDelegate = self
            
        
        positionX = OUTTER_PADDING
        positionY += traitementSelectionUIView.frame.height + OUTTER_PADDING
    
        commentaireLabel = UILabel()
        self.contentView.addSubview(commentaireLabel)
        commentaireLabel.setUp(text: "Commentaires: ", origin: CGPoint(x: positionX, y: positionY))
       
        positionX += commentaireLabel.frame.width + PADDING
        
        commentaireTextField = UITextField()
        self.contentView.addSubview(commentaireTextField)
        commentaireTextField.setUp(placeHolder: "Écrire votre commentaire ici...", position: CGPoint(x: positionX, y: positionY - PADDING / 2), width: width - positionX - 58  - PADDING, height: commentaireLabel.frame.height + PADDING, font: REG_FONT, keybord: .default)
        commentaireTextField.keyboardType = .default
        commentaireTextField.autocorrectionType = .no
        
        self.heightValue.constant = positionY + commentaireTextField.frame.height + OUTTER_PADDING
    }
    
    func setUpSwitches() {
        GmandiDSwitch.isOn = false
        GSmandiDSwitch.isOn = false
        GpteDSwitch.isOn = false
        GtenDSwitch.isOn = false
        
        GmandiDHSwitch.isOn = false
        GSmandiDHSwitch.isOn = false
        GpteDHSwitch.isOn = false
        GtenDHSwitch.isOn = false
        
        GmandiDRSwitch.isOn = false
        GSmandiDRSwitch.isOn = false
        GpteDRSwitch.isOn = false
        GtenDRSwitch.isOn = false
        
        DmandiDSwitch.isOn = false
        DSmandiDSwitch.isOn = false
        DpteDSwitch.isOn = false
        DtenDSwitch.isOn = false
        
        DmandiDHSwitch.isOn = false
        DSmandiDHSwitch.isOn = false
        DpteDHSwitch.isOn = false
        DtenDHSwitch.isOn = false
        
        DmandiDRSwitch.isOn = false
        DSmandiDRSwitch.isOn = false
        DpteDRSwitch.isOn = false
        DtenDRSwitch.isOn = false
    }
    
    override func buildAnswers() {
        self.questionnaire.exportedData["E10_REG_MAND_DOUL_D"] = getSwitchValue(input: DmandiDSwitch)
        self.questionnaire.exportedData["E10_REG_MAND_DOUL_HAB_D"] = getSwitchValue(input: DmandiDHSwitch)
        self.questionnaire.exportedData["E10_REG_MAND_DOUL_REF_D"] = getSwitchValue(input: DmandiDRSwitch)
        
        self.questionnaire.exportedData["E10_REG_MAND_DOUL_G"] = getSwitchValue(input: GmandiDSwitch)
        self.questionnaire.exportedData["E10_REG_MAND_DOUL_HAB_G"] = getSwitchValue(input: GmandiDHSwitch)
        self.questionnaire.exportedData["E10_REG_MAND_DOUL_REF_G"] = getSwitchValue(input: GmandiDRSwitch)
        
        self.questionnaire.exportedData["E10_REG_SOUS_DOUL_D"] = getSwitchValue(input: DSmandiDSwitch)
        self.questionnaire.exportedData["E10_REG_SOUS_DOUL_HAB_D"] = getSwitchValue(input: DSmandiDHSwitch)
        self.questionnaire.exportedData["E10_REG_SOUS_DOUL_REF_D"] = getSwitchValue(input: DSmandiDRSwitch)
        
        self.questionnaire.exportedData["E10_REG_SOUS_DOUL_G"] = getSwitchValue(input: GSmandiDSwitch)
        self.questionnaire.exportedData["E10_REG_SOUS_DOUL_HAB_G"] = getSwitchValue(input: GSmandiDHSwitch)
        self.questionnaire.exportedData["E10_REG_SOUS_DOUL_REF_G"] = getSwitchValue(input: GSmandiDRSwitch)
        
        self.questionnaire.exportedData["E10_REG_PTER_DOUL_D"] = getSwitchValue(input: DpteDSwitch)
        self.questionnaire.exportedData["E10_REG_PTER_DOUL_HAB_D"] = getSwitchValue(input: DpteDHSwitch)
        self.questionnaire.exportedData["E10_REG_PTER_DOUL_REF_D"] = getSwitchValue(input: DpteDRSwitch)

        self.questionnaire.exportedData["E10_REG_PTER_DOUL_G"] = getSwitchValue(input: GpteDSwitch)
        self.questionnaire.exportedData["E10_REG_PTER_DOUL_HAB_G"] = getSwitchValue(input: GpteDHSwitch)
        self.questionnaire.exportedData["E10_REG_PTER_DOUL_REF_G"] = getSwitchValue(input: GpteDRSwitch)
        
        self.questionnaire.exportedData["E10_TEND_DOUL_D"] = getSwitchValue(input: DtenDSwitch)
        self.questionnaire.exportedData["E10_TEND_DOUL_HAB_D"] = getSwitchValue(input: DtenDHSwitch)
        self.questionnaire.exportedData["E10_TEND_DOUL_REF_D"] = getSwitchValue(input: DtenDRSwitch)
            
        self.questionnaire.exportedData["E10_TEND_DOUL_G"] = getSwitchValue(input: GtenDSwitch)
        self.questionnaire.exportedData["E10_TEND_DOUL_HAB_G"] = getSwitchValue(input: GtenDHSwitch)
        self.questionnaire.exportedData["E10_TEND_DOUL_REF_G"] = getSwitchValue(input: GtenDRSwitch)
        
        self.questionnaire.exportedData["E11_ATMD"] = ATMID[ getDropDownValue(dropDown: desordreATMDDropDown) ] ?? "NA"
        self.questionnaire.exportedData["E11_ATMG"] = ATMID[ getDropDownValue(dropDown: desordreATMGDropDown) ] ?? "NA"

        var diagnostics = [Diagnostic]()
        for question in self.desorDoulSelectionUIView.exportData() {
            self.questionnaire.exportedData[question.ID!] = question.answer as? String
            let diagnostic = Diagnostic(name: question.text, prob: 1.00)
            diagnostics.append(diagnostic)
        }
        self.medicalExam.patient?.diagnosticsPraticient = diagnostics
        var treatments = [Treatment]()
        for question in self.traitementSelectionUIView.exportData() {
            self.questionnaire.exportedData[question.ID!] = question.answer as? String
            let traitement = Treatment(name: question.text, prob: 1.00)
             treatments.append(traitement)
        }
        self.medicalExam.patient?.treatmentsPraticient = treatments
    }

    
    override func nextbuttonAction(sender: UIButton!) {
        buildAnswers()
        if checkAllInput {
            if (checkNext()) {
                if(sendToServer) {
                    ServerService.shared.postResults(token: self.medicalExam.patient?.token ?? "", patientID: self.medicalExam.patientID, practicienID: self.medicalExam.praticienID, questionnaire: self.questionnaire, completion: {(error, succes) in
                        if let succes = succes {
                            if (succes) {
                                ServerService.shared.updatePatient(token: self.medicalExam.patient?.token ?? "", patient: self.medicalExam.patient!, completion: {(error, patient) in
                                    if let patient = patient {
                                        UIView.animate(withDuration: 0.5) {
                                            self.confirmationUIView.isHidden = true
                                        }
                                        if (self.rootViewController != nil) {
                                            self.rootViewController.user = patient
                                            self.navigationController?.popToViewController(self.rootViewController, animated: true)
                                        }
                                        else {
                                            self.navigationController?.popToRootViewController(animated: true)
                                        }
                                    }
                                    else {
                                          Alert.showBasic(title: "Erreur", message: "SVP vérifiez votre connexion internet." , vc: self)
                                    }
                                })
                                
                            }
                            else {
                                Alert.showBasic(title: "Erreur", message: "SVP vérifiez votre connexion internet." , vc: self)
                            }
                        }
                    })
                }
            }
        }
    }
       
    
    @objc func keyboardWillShow(notification: NSNotification) {
          if let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameBeginUserInfoKey] as? NSValue)?.cgRectValue {
              if self.view.frame.origin.y == 0 {
                  self.view.frame.origin.y -= keyboardSize.height 
              }
          }
      }

      @objc func keyboardWillHide(notification: NSNotification) {
          if self.view.frame.origin.y != 0 {
              self.view.frame.origin.y = 0
          }
      }
    
    override func viewDidDisappear(_ animated: Bool) {
          super.viewDidDisappear(true)
        self.contentView.removeFromSuperview()
        self.view.removeFromSuperview()
        self.desorDoulSelectionUIView.removeFromSuperview()
        self.confirmationUIView.removeFromSuperview()
        self.scrollView.removeFromSuperview()
      }
}

extension FDI7ViewController: CantSelectOptionDelegate {
    func printError(message: String) {
        Alert.showBasic(title: "Erreur", message: message, vc: self)
    }
}
