//
//  ServerService.swift
//  Meditrinae
//
//  Created by Charles-Olivier Favreau on 2019-10-04.
//  Copyright © 2019 Team5. All rights reserved.
//

import Foundation

import Alamofire
import JWTDecode

enum error: Error {
    case WrongCredentials
    case ErrorInValue
    case ErrorURL
}

let PREDICTIONS = [0: "DOULEUR MAL TETE", 1: "MYALGIE", 2: "MYALGIE LOCALE", 3: "DOULEUR MYOFASCIALE AVEC REF", 4: "DOULEUR MYOFASCIALE", 5: "ARTHRALGIE", 6: "DEPLACEMENT DISQUE AVEC REDUCTION", 7: "DEPLACEMENT DISQUE AVEC REDUCTION ET BLOCAGE", 8: "DEPLACEMENT DISQUE SANS REDUCTION AVEC OUVER LIMITE", 9: "MYALGIE LOCALE", 10: "DOULEUR MYOFASCIALE AVEC REF",  11: "DOULEUR MYOFASCIALE", 12: "ARTHRALGIE", 13: "DEPLACEMENT DISQUE AVEC REDUCTION", 14: "DEPLACEMENT DISQUE AVEC REDUCTION ET BLOCAGE", 15: "DEPLACEMENT DISQUE SANS REDUCTION AVEC OUVER LIMITE",  16: "DEPLACEMENT DISQUE SANS REDUCTION SANS OUVER LIMITE", 17: "MALADIE ARTICULAIRE DEGENERATIVE", 18: "SUBLUXATION"]


            

class ServerService{
    
    static let shared = ServerService()
    
    var delegateToHome:TransitionToHomeDelegate?
    var delegateToQuestionnaire:TransitionToQuestionnaireDelegate?
    
       // MARK: -LogIn
    func LogIn(username : String, password : String ,completion:@escaping (Error?, ProfilAbstract?, SuperAdmin?) -> Void) {
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            urlComponents.path = "/auth/token"
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    completion(error.ErrorURL, nil, nil)
                    return
            }
        
            Alamofire.request(url,
                              method: .post,
                              parameters: ["username" :username, "password": password])
                .validate()
                .responseJSON {response in
                    guard response.result.isSuccess else {
                        completion(response.result.error, nil, nil)
                        return
                    }
                    guard let value = response.result.value as? [String: Any] else {
                            completion(error.ErrorInValue, nil, nil)
                            print("Error in response")
                            return
                    }
                    if let token = value["accessToken"] as? String {
                        do {
                            var phoneNum = ""
                            var email = ""
                            var address = ""
                            var userProfil: ProfilAbstract!
                            let result = try decode(jwt: token)
                            
                            print(result)
                            let user = result.body["user"]! as? [String: Any]
                            let role = user!["role"]! as? [String: Any]
                            let roleName = role!["name"]! as! String
                           
                            if (roleName == "super-admin") {
                                let id = user!["_id"] as! String
                                let name = role!["name"] as! String
                                let superAdmin = SuperAdmin(name: name, token: token, id: id)
                                completion(nil, nil, superAdmin)
                            }
                            else {
                                let objectUser = result.body[roleName]! as? [String: Any]
                                let id = objectUser!["_id"] as! String
                                let firstName = objectUser!["firstName"] as! String
                                let lastName = objectUser!["lastName"] as! String
                                let clinicID = objectUser!["clinic"] as! String
                                let dateCreated = objectUser!["dateCreated"] as! String
                                let dateModified = objectUser!["dateModified"] as! String
                                if let phone = objectUser!["phone"] as? String {
                                    phoneNum = phone
                                }
                                if let emailItem = objectUser!["email"] as? String {
                                    email = emailItem
                                }
                                if let addressItem = objectUser!["address"] as? String {
                                    address = addressItem
                                }
                                let profilType: ProfilType!
                                print(roleName)
                                switch roleName {
                                case "admin":
                                    profilType = ProfilType.Admin
                                case "practician":
                                    profilType = ProfilType.Praticien
                                case "secretary":
                                    profilType = ProfilType.Secretaire
                                default:
                                    profilType = ProfilType.Admin
                                }
                                
                                userProfil = ProfilAbstract(firstName: firstName, lastName: lastName, token: token, dateCreated: dateCreated.iso8601!, dateModified: dateModified.iso8601!, id: id, clinicID: clinicID, type: profilType, email: email, addresse: address, phone: phoneNum)
                                completion(nil, userProfil, nil)
                            }
                       } catch {
                            print("Error while decoding jwt token")
                            completion(nil, nil, nil)
                        }
                    }
            }
            completion(nil, nil, nil)
        }
    
    func checkValidAuth(username : String, password : String ,completion:@escaping (Error?, Bool?) -> Void) {
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/auth/token"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                completion(error.ErrorURL, false)
                return
        }
    
        Alamofire.request(url,
                        method: .post,
                        parameters: ["username" :username, "password": password])
        .validate()
        .responseJSON {response in
            guard response.result.isSuccess else {
                completion(response.result.error, false)
                return
            }
            guard let value = response.result.value as? [String: Any] else {
                    completion(error.ErrorInValue, false)
                    print("Error in response")
                    return
            }
            if (value["accessToken"] as? String) != nil {
                completion(nil, true)
            }
        }
    }
    
       // MARK: -Post Results
    func postResults(token: String, patientID: String, practicienID: String, questionnaire: Questionnaire, completion:@escaping (Error?, Bool?) -> Void) {
        let encoder = JSONEncoder()
        
        for data in questionnaire.exportedData {
            print(data.key + " : " + data.value)
        }
        
        var jsonQuestions : Data? = nil
        do {
            jsonQuestions = try JSONSerialization.data(withJSONObject: questionnaire.exportedData, options: .prettyPrinted)
        
        } catch {
            print(error.localizedDescription)
        }
        let objecToSend = QuestionnaireToSend(name: questionnaire.ID ?? "", questions: String(data: jsonQuestions!, encoding: String.Encoding.utf8)!, patientID: patientID, practicienID: practicienID)
        
        let jsonToSend : Data = try! encoder.encode(objecToSend)
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/exam-results"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization") 
        
        request.httpBody = jsonToSend
        
        Alamofire.request(request).responseJSON(completionHandler: {(response) in
            guard response.result.isSuccess
                else {
                    print("Error catched")
                    completion(response.result.error, false)
                    return
            }
            guard let value = response.result.value as? [String: Any]
                else {
                    print("Error in response")
                    completion(nil, false)
                    return
            }
            print(value)
            if let examResultID = value["_id"] as? String {
                let examResult = ExamResult()
                examResult.examResultID = examResultID
            }
            if (value["error"] as? String) != nil {
                completion(error.ErrorInValue, false)
            }
            if (value["message"] as? String) != nil {
                completion(error.ErrorInValue, false)
            }
            if (value["statusCode"] as? String) != nil {
                completion(error.ErrorInValue, false)
            }
            completion(nil, true)
        })
    }
    
    // MARK: -Exam Results
    
    func getExamResults(token: String, examResultID: String, completion:@escaping (Error?, ExamResult?) -> Void) {
            
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/exam-results/" + examResultID
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         
         Alamofire.request(request).responseJSON { (response) in
            guard response.result.isSuccess else {
            print("Error catched")
            completion(response.result.error, nil)
                return
            }
            print(response)
            guard let value = response.result.value as? [String: Any] else {
            print("Error in response")
            completion(error.ErrorInValue, nil)
                return
            }
            let examResult = ExamResult()
            if let id = value["_id"] as? String {
                examResult.examResultID = id
            }
            if let medicalExamID = value["medicalExamID"] as? String {
                examResult.medicalExamID = medicalExamID
            }
            if let answers = value["questions"] as? [String: String] {
                examResult.mappedExamResultsToQuestionnaires(dict: answers)
                examResult.calculateAllScores()
                completion(nil, examResult)
            }
           completion(nil, nil)
        }
    }
    
    func updateExamResult(token: String, examResult: ExamResult, completion:@escaping (Error?, Bool?) -> Void) {
        var answers = [String: String]()
        for (_, questionnaire) in examResult.listQuestionnaire.questionnaires {
            for (key, value) in questionnaire.exportedData {
                answers[key] = value
            }
        }
        let dict = ["questions": answers, "medicalExamID": examResult.medicalExamID!] as [String : Any]
        print(dict)
        let jsonData = try? JSONSerialization.data(withJSONObject: dict , options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/exam-results"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        var request = URLRequest(url: url)
        print(url)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        request.httpBody = jsonData
        
        Alamofire.request(request).responseJSON { (response) in
            guard response.result.isSuccess else {
            print("Error catched")
            completion(response.result.error, false)
                return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, false)
                return
            }
            if let error = value["error"] as? String {
                print(error)
                completion(nil, false)
                    return
            } else {
                completion(nil, true)
                return
            }
        }
    }
    
    func addMedicalExam(token :String, patientID: String, praticienID: String, completion:@escaping (Error?, MedicalExam?) -> Void) {
    
        let dict = ["patient": patientID, "practician": praticienID]
        let jsonData = try? JSONSerialization.data(withJSONObject: dict , options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/medical-exams"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
    
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        request.httpBody = jsonData
        
        Alamofire.request(request).responseJSON { (response) in
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, nil)
                return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, nil)
                return
            }
            print(value)
            var id = ""
            if let idItem = value["_id"] as? String {
                id = idItem
            }
            var dateCreated: Date!
            if let dateCreateItem = value["dateCreate"] as? String {
                dateCreated = dateCreateItem.iso8601 ?? Date()
            }
            var dateModified: Date!
            if let dateModifiedItem = value["dateModified"] as? String {
                dateModified = dateModifiedItem.iso8601 ?? Date()
            }
            var practicienID = ""
            if let practicienIDItem = value["practicienID"] as? String {
                practicienID = practicienIDItem
            }
            var patientID = ""
            if let patientIDItem = value["patientID"] as? String {
                patientID = patientIDItem
            }
            var examResultID = ""
            if let examResultIDItem = value["examResultID"] as? String {
                examResultID = examResultIDItem
            }
            let examResult = ExamResult()
            let newMedicalExam = MedicalExam(dateCreated: dateCreated ?? Date(), dateModified: dateModified ?? Date(), medicalExamID: id, praticienID: practicienID, patientID: patientID, examResultID: examResultID, examResult: examResult)
            completion(nil, newMedicalExam)
        }
            
    }
    
    
    func updateMedicalExam(token: String, medicalExam: MedicalExam, completion:@escaping (Error?, Bool?) -> Void) {
        let dict = ["examResultID": medicalExam.examResultID, "patient": medicalExam.patientID, "id": medicalExam.medicalExamID,
                    "practician": medicalExam.medicalExamID] as? [String : String]
        let jsonData = try? JSONSerialization.data(withJSONObject: dict ?? [:], options: [])
        
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/medical-exams"
         guard let url = urlComponents.url else {
            print("Could not create URL from components")
            return
         }
        
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.put.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         request.httpBody = jsonData
         
         Alamofire.request(request).responseJSON { (response) in
             print(response)
             guard response.result.isSuccess else {
                 print("Error catched")
                 completion(response.result.error, false)
                     return
             }
             guard let value = response.result.value as? [String: Any] else {
                 print("Error in response")
                 completion(error.ErrorInValue, false)
                     return
             }
             if let error = value["error"] as? String {
                 print(error)
                 completion(nil, false)
                     return
             } else {
                 completion(nil, true)
                 return
             }
         }
     }
    
//    func getMedicalExamResults(token: String, medicalExam: MedicalExam, completion:@escaping (Error?, [String: String]?) -> Void) {
//
//         var urlComponents = URLComponents()
//         urlComponents.scheme = "https"
//         urlComponents.host = "api.meditrinae.com"
//         urlComponents.path = "/medical-exams/" + medicalExam.medicalExamID! + "/exam-results"
//         guard let url = urlComponents.url
//             else {
//                 print("Could not create URL from components")
//                 return
//         }
//
//         var request = URLRequest(url: url)
//         request.httpMethod = HTTPMethod.get.rawValue
//         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
//         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
//
//
//         Alamofire.request(request).responseJSON { (response) in
//             guard response.result.isSuccess
//                else {
//                print("Error catched")
//                completion(response.result.error, nil)
//                return
//            }
//            guard let value = response.result.value as? [[String: Any]]
//                else {
//                    print("Error in response")
//                    completion(nil, nil)
//                    return
//            }
//            print(value)
//            let items = value
//            var examResults = [String: String]()
//            for item in items {
//                if let examResultsItems = item["questions"] as? [String: String] {
//                    examResults = examResultsItems
//                    completion(nil, examResults)
//                }
//            }
//        }
//    }
    
    func getAllMedicalExamForPatient(token: String, patient: Patient, completion:@escaping (Error?, [MedicalExam]?) -> Void) {
   // GET https://api.meditrinae.com/patients/$id/medical-exams
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/patients/" + patient.ID + "/medical-exams"
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         print(url)
         
         Alamofire.request(request).responseJSON { (response) in
             guard response.result.isSuccess
                else {
                print("Error catched")
                completion(response.result.error, nil)
                return
            }
            guard let value = response.result.value as? [[String: Any]]
                else {
                    print("Error in response")
                    completion(nil, nil)
                    return
            }
            print(value)
            var medicalExams = [MedicalExam]()
            for item in value {
                var id = ""
                if let idItem = item["_id"]! as? String {
                    id = idItem
                }
                var dateCreated = ""
                if let dateCreatedItem = item["dateCreated"] as? String {
                    dateCreated = dateCreatedItem
                }
                var dateModified = ""
                if let dateModifiedItem = item["dateModified"] as? String {
                    dateModified = dateModifiedItem
                }
                var patientID = ""
                if let patientIDItem = item["patient"] as? String {
                    patientID = patientIDItem
                }
                var practicienID = ""
                if let practicienIDItem = item["practician"] as? String {
                    practicienID = practicienIDItem
                }
                var examResultID = ""
                if let examResultIDItem = item["examResultID"] as? String {
                    examResultID = examResultIDItem
                }
                let examResult = ExamResult()
                let medicalExam = MedicalExam(dateCreated: dateCreated.iso8601 ?? Date(), dateModified: dateModified.iso8601 ?? Date(),  medicalExamID: id, praticienID: practicienID, patientID: patientID, examResultID: examResultID, examResult: examResult)
                medicalExams.append(medicalExam)
            }
          completion(nil, medicalExams)
        }
    }
    
    
    // MARK: -Patient
    
    func getPatientByClinic(token: String, clinicID: String, completion:@escaping (Error?, [Patient]?) -> Void) {
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/patients/clinics/" + clinicID
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.get.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        Alamofire.request(request).validate().responseJSON {response in
               guard response.result.isSuccess else {
                      print("Error catched")
                      completion(response.result.error, nil)
                      return
                  }
               guard let value = response.result.value as? [[String: Any]]
                   else {
                       print("Error in response")
                       completion(nil, nil)
                       return
               }
               let items = value
               var patients = [Patient]()
               for item in items {
                    var id = ""
                    if let idItem = item["_id"]! as? String {
                        id = idItem
                    }
                    var clinicID = ""
                    if let clinicIDitem = item["clinic"] as? String {
                        clinicID = clinicIDitem
                    }
                    var dateCreated = ""
                    if let dateCreatedItem = item["dateCreated"] as? String {
                        dateCreated = dateCreatedItem
                    }
                    var dateModified = ""
                    if let dateModifiedItem = item["dateModified"] as? String {
                        dateModified = dateModifiedItem
                    }
                    var dateOfBirth = ""
                    if let dateOfBirthItem = item["dateOfBirth"] as? String {
                        dateOfBirth = dateOfBirthItem
                    }
                    var firstName = ""
                    if let firstNameItem = item["firstName"] as? String {
                        firstName = firstNameItem
                    }
                    var lastName = ""
                    if let lastNameItem = item["lastName"] as? String {
                        lastName = lastNameItem
                    }
                    var address = ""
                    if let addressItem = item["address"] as? String {
                        address = addressItem
                    }
                    var genderString = ""
                    if let genderItem = item["gender"] as? String {
                    genderString = genderItem
                    }
                    var dictNote = [MedicalNote]()
                    if let notesItem = item["notes"] as? [String: String] {
                        for (key, value) in notesItem{
                            let newMedicalNote = MedicalNote(note: value, title: key.iso8601 ?? Date())
                            dictNote.append(newMedicalNote)
                        }
                    }
                    var dictTreatment = [Treatment]()
                    if let treatmentItem = item["treatment"] as? [String: String] {
                        for (key, value) in treatmentItem{
                            let newTreat = Treatment(name: key, prob: Double(value) ?? 0.00)
                            dictTreatment.append(newTreat)
                        }
                    }
                    var dictDiagnostic = [Diagnostic]()
                    if let diagnosticItem = item["diagnostic"] as? [String: String] {
                        for (key, value) in diagnosticItem {
                            let newDiagnostic = Diagnostic(name: key, prob: Double(value) ?? 0.00)
                            dictDiagnostic.append(newDiagnostic)
                        }
                    }
                    var dictTreatmentPraticient = [Treatment]()
                    if let treatmentPraticienItem = item["treatment"] as? [String: String] {
                        for (key, value) in treatmentPraticienItem{
                            let newTreatPraticien = Treatment(name: key, prob: Double(value) ?? 0.00)
                            dictTreatmentPraticient.append(newTreatPraticien)
                        }
                    }
                    var dictDiagnosticPraticien = [Diagnostic]()
                    if let diagnosticPraticienItem = item["treatment"] as? [String: String] {
                        for (key, value) in diagnosticPraticienItem {
                            let newDiagnosticPraticien = Diagnostic(name: key, prob: Double(value) ?? 0.00)
                            dictDiagnosticPraticien.append(newDiagnosticPraticien)
                        }
                    }
                    var email = ""
                    if let emailItem = item["note"] as? String {
                        email = emailItem
                    }
                    var medicalExamsID = [String]()
                        if let medicalExams = item["medicalExams"] as? [String] {
                            for examID in medicalExams {
                                medicalExamsID.append(examID)
                            }
                        }
                    let gender = stringToGender(genderString: genderString)
                    let newPatient = Patient(firstName: firstName, lastName: lastName, gender: gender, token: token, dateOfBirth: dateOfBirth.iso8601 ??        Date(), clinicID: clinicID, dateCreated: dateCreated.iso8601 ?? Date(), dateModified: dateModified.iso8601 ?? Date(), id: id, address: address, note: dictNote, email: email, medicalExams: [], medicalExamID: medicalExamsID, diagnostics: dictDiagnostic, treatments: dictTreatment, diagnosticsPraticient: dictDiagnosticPraticien, treatmentsPraticient: dictTreatmentPraticient )
                    patients.append(newPatient)
           
            }
        completion(nil, patients)
       }
    }
    
    func getPatientExams(token: String, patientId: String, completion:@escaping (Error?, [MedicalExam]?) -> Void) {
    
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/patients/" + patientId + "/medical-exams"
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         
         
         Alamofire.request(request).responseJSON { (response) in
              guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil)
                    return
                }
    
                guard let value = response.result.value as? [[String: Any]]
                    else {
                        print("Error in response")
                        completion(nil, nil)
                        return
                }
                print(value)
                let items = value
                var medicalExams = [MedicalExam]()
                for item in items {
                    var id = ""
                    if let idItem = item["_id"]! as? String {
                        id = idItem
                    }
                    var dateCreated = ""
                    if let dateCreatedItem = item["dateCreated"] as? String {
                        dateCreated = dateCreatedItem
                    }
                    var dateModified = ""
                    if let dateModifiedItem = item["dateModified"] as? String {
                        dateModified = dateModifiedItem
                    }
                    var patientID = ""
                    if let patientIDItem = item["patient"] as? String {
                        patientID = patientIDItem
                    }
                    var practicienID = ""
                    if let practicienIDItem = item["practician"] as? String {
                        practicienID = practicienIDItem
                    }
                    var examResultsID = ""
                    if let examResultsIDItem = item["examResultID"] as? String {
                        examResultsID = examResultsIDItem
                    }
                    let examResult = ExamResult()
                    let newMedicalExam = MedicalExam(dateCreated: dateCreated.iso8601!, dateModified: dateModified.iso8601!, medicalExamID: id,praticienID: practicienID, patientID: patientID, examResultID: examResultsID, examResult: examResult)
                    medicalExams.append(newMedicalExam)
                }
            completion(nil, medicalExams)
        }
     }
    
    func getMedicalExam(token: String, medicalExamId: String, completion:@escaping (Error?, MedicalExam?) -> Void) {
    
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/medical-exams/" + medicalExamId
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         
         
         Alamofire.request(request).responseJSON { (response) in
              guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil)
                    return
                }
    
                guard let value = response.result.value as? [String: Any]
                    else {
                        print("Error in response")
                        completion(nil, nil)
                        return
                }
                print(value)
                let item = value
                var id = ""
                if let idItem = item["_id"]! as? String {
                    id = idItem
                }
                var dateCreated = ""
                if let dateCreatedItem = item["dateCreated"] as? String {
                    dateCreated = dateCreatedItem
                }
                var dateModified = ""
                if let dateModifiedItem = item["dateModified"] as? String {
                    dateModified = dateModifiedItem
                }
                var patientID = ""
                if let patientIDItem = item["patient"] as? String {
                    patientID = patientIDItem
                }
                var practicienID = ""
                if let practicienIDItem = item["practician"] as? String {
                    practicienID = practicienIDItem
                }
                var examResultID = ""
                if let examResultIDItem = item["examResultID"] as? String {
                    examResultID = examResultIDItem
                }
                let examResult = ExamResult()
                let medicalExam = MedicalExam(dateCreated: dateCreated.iso8601 ?? Date(), dateModified: dateModified.iso8601 ?? Date(), medicalExamID: id, praticienID: practicienID, patientID: patientID, examResultID: examResultID, examResult: examResult)
                completion(nil, medicalExam)
        }
     }
    
    func getPatient(token: String, patientId:String, completion:@escaping (Error?, Patient?) -> Void) {
    
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/patients/" + patientId
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         
         
         Alamofire.request(request).responseJSON { (response) in
            guard response.result.isSuccess else {
                //Alert.showBasic(title: "Error", message: "Error signing up, please check your internet conection", vc: self)
                print("Error catched")
                completion(response.result.error, nil)
                return
            }
            guard let value = response.result.value as? [String: Any]
                else {
                    print("Error in response")
                    completion(error.ErrorInValue, nil)
                    return
            }
            print(value)
             var id = ""
             if let idItem = value["id"] as? String {
                 id = idItem
             }
             var clinicID = ""
             if let clinicIDitem = value["clinic"] as? String {
                 clinicID = clinicIDitem
             }
             var dateCreated = ""
             if let dateCreatedItem = value["dateCreated"] as? String {
                 dateCreated = dateCreatedItem
             }
             var dateModified = ""
             if let dateModifiedItem = value["dateModified"] as? String {
                 dateModified = dateModifiedItem
             }
             var dateOfBirth = ""
             if let dateOfBirthItem = value["dateOfBirth"] as? String {
                 dateOfBirth = dateOfBirthItem
             }
             var firstName = ""
             if let firstNameItem = value["firstName"] as? String {
                 firstName = firstNameItem
             }
             var lastName = ""
             if let lastNameItem = value["lastName"] as? String {
                 lastName = lastNameItem
             }
             var address = ""
             if let addressItem = value["address"] as? String {
                 address = addressItem
             }
             var genderString = ""
             if let genderItem = value["gender"] as? String {
             genderString = genderItem
             }
             var dictNote = [MedicalNote]()
             if let notesItem = value["notes"] as? [String: String] {
                 for (key, value) in notesItem{
                    let newMedicalNote = MedicalNote(note: value, title: key.iso8601 ?? Date())
                     dictNote.append(newMedicalNote)
                 }
             }
            var dictTreatment = [Treatment]()
            if let treatmentItem = value["treatment"] as? [String: String] {
                for (key, value) in treatmentItem{
                    let newTreat = Treatment(name: key, prob: Double(value) ?? 0.00)
                    dictTreatment.append(newTreat)
                }
            }
            var dictDiagnostic = [Diagnostic]()
            if let diagnosticItem = value["diagnostic"] as? [String: String] {
                for (key, value) in diagnosticItem {
                    let newDiagnostic = Diagnostic(name: key, prob: Double(value) ?? 0.00)
                    dictDiagnostic.append(newDiagnostic)
                }
            }
            var dictTreatmentPraticient = [Treatment]()
            if let treatmentPraticienItem = value["treatment"] as? [String: String] {
                for (key, value) in treatmentPraticienItem{
                    let newTreatPraticien = Treatment(name: key, prob: Double(value) ?? 0.00)
                    dictTreatmentPraticient.append(newTreatPraticien)
                }
            }
            var dictDiagnosticPraticien = [Diagnostic]()
            if let diagnosticPraticienItem = value["treatment"] as? [String: String] {
                for (key, value) in diagnosticPraticienItem {
                    let newDiagnosticPraticien = Diagnostic(name: key, prob: Double(value) ?? 0.00)
                    dictDiagnosticPraticien.append(newDiagnosticPraticien)
                }
            }
             var email = ""
             if let emailItem = value["note"] as? String {
                 email = emailItem
             }
             var medicalExamsID = [String]()
                 if let medicalExams = value["medicalExams"] as? [String] {
                     for examID in medicalExams {
                         medicalExamsID.append(examID)
                     }
                 }
             let gender = stringToGender(genderString: genderString)
              let newPatient = Patient(firstName: firstName, lastName: lastName, gender: gender, token: token, dateOfBirth: dateOfBirth.iso8601 ??        Date(), clinicID: clinicID, dateCreated: dateCreated.iso8601 ?? Date(), dateModified: dateModified.iso8601 ?? Date(), id: id, address: address, note: dictNote, email: email, medicalExams: [], medicalExamID: medicalExamsID, diagnostics: dictDiagnostic, treatments: dictTreatment, diagnosticsPraticient: dictDiagnosticPraticien, treatmentsPraticient: dictTreatmentPraticient )
            
            completion(nil, newPatient)
         }
     }
    
    func addPatient(token: String, patient: Patient, completion:@escaping (Error?) -> Void) {
        
        var dictNote = [String: String]()
        if (patient.notes != nil) {
            for note in patient.notes! {
                dictNote[note.title.iso8601 ] = note.note
            }
        }
        var dictTraitment = [String: String]()
        if (!patient.treatments.isEmpty) {
            for treatment in patient.treatments {
                dictTraitment[treatment.name ] = String(format:"%f", treatment.prob ?? 0.00)
            }
        }
        var dictDiagnostics = [String: String]()
        if (!patient.diagnostics.isEmpty) {
            for diagnotic in patient.diagnostics {
                dictDiagnostics[diagnotic.name ] = String(format:"%f", diagnotic.prob ?? 0.00)
            }
        }
        var dictTraitmentPracitient = [String: String]()
            if (!patient.treatmentsPraticient.isEmpty) {
                for treatment in patient.treatmentsPraticient {
                    dictTraitmentPracitient[treatment.name] = String(format:"%f", treatment.prob ?? 1.00)
                }
        }
        var dictDiagnosticsPraticien = [String: String]()
        if (!patient.diagnosticsPraticient.isEmpty) {
            for diagnotic in patient.diagnosticsPraticient {
                dictDiagnosticsPraticien[diagnotic.name ] = String(format:"%f", diagnotic.prob ?? 1.00)
            }
        }
        
        let dict = ["address": patient.addresse ?? "", "clinic": patient.clinicID, "dateCreated": patient.dateCreated.iso8601 , "dateModified": patient.dateModified.iso8601 ,
                    "dateOfBirth": patient.dateOfBirth?.iso8601 ?? "", "email": patient.email ?? "", "firstName": patient.firstname, "gender": patient.genderToString() , "lastName" : patient.lastname, "medicalexams": [], "note": dictNote, "treatment": dictTraitment, "diagnostic": dictDiagnostics, "diagnostic_practician": dictDiagnosticsPraticien, "treatmentc_pratician": dictTraitmentPracitient] as [String : Any]
        
        let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/patients"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        request.httpBody = jsonData
        
        Alamofire.request(request).responseJSON { (response) in
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error)
                return
            }
            guard let value = response.result.value as? [String: Any]
                else {
                    print("Error in response")
                    completion(nil)
                    return
            }
            
            if let id = value["_id"] as? String {
                patient.ID = id
            }
            completion(nil)
        }
    }
    
    func deletePatient(token: String, patientId: String, username: String, password: String, completion:@escaping (Error?, Bool?) -> Void) {
        
        let dict = ["username": username, "password": password]
        let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/patients/" + patientId
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.delete.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        request.httpBody = jsonData
        
        Alamofire.request(request).responseJSON { (response) in
            print(response)
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, false)
                    return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, false)
                    return
            }
            if let error = value["error"] as? String {
                print(error)
                completion(nil, false)
                    return
            } else {
                completion(nil, true)
                return
            }
        }
    }
    
    func updatePatient(token: String, patient: Patient, completion:@escaping (Error?, Patient?) -> Void) {
           
        var dictNote = [String: String]()
        if (patient.notes != nil) {
            for note in patient.notes! {
                dictNote[note.title.iso8601] = note.note
            }
        }
        
        var dictTraitment = [String: String]()
        if (!patient.treatments.isEmpty) {
            for treatment in patient.treatments {
                dictTraitment[treatment.name ] = String(format:"%f", treatment.prob ?? 0.00)
            }
        }
        var dictDiagnostics = [String: String]()
        if (!patient.diagnostics.isEmpty) {
            for diagnotic in patient.diagnostics {
                dictDiagnostics[diagnotic.name ] = String(format:"%f", diagnotic.prob ?? 0.00)
            }
        }
        var dictTraitmentPracitient = [String: String]()
            if (!patient.treatmentsPraticient.isEmpty) {
                for treatment in patient.treatmentsPraticient {
                    dictTraitmentPracitient[treatment.name] = String(format:"%f", treatment.prob ?? 1.00)
                }
        }
        var dictDiagnosticsPraticien = [String: String]()
        if (!patient.diagnosticsPraticient.isEmpty) {
            for diagnotic in patient.diagnosticsPraticient {
                dictDiagnosticsPraticien[diagnotic.name ] = String(format:"%f", diagnotic.prob ?? 1.00)
            }
        }
          
        let medicalExamIDs = patient.medicalExamsID ?? []
              
        let dict = ["id": patient.ID, "address": patient.addresse ?? "" ,"clinic": patient.clinicID, "dateCreated": patient.dateCreated.iso8601, "dateModified": patient.dateModified.iso8601, "dateOfBirth": patient.dateOfBirth?.iso8601 ?? "" , "email": patient.email ?? "" ,"firstName": patient.firstname , "gender": patient.genderToString() , "lastName": patient.lastname , "notes": dictNote, "medicalExams": medicalExamIDs, "treatment": dictTraitment, "diagnostic": dictDiagnostics, "diagnostic_practician": dictDiagnosticsPraticien, "treatmentc_pratician": dictTraitmentPracitient] as [String : Any]
        
        
        let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: [])
        //let theJSONText = String(data: jsonData ?? Data(), encoding: .ascii)
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/patients"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                completion(nil, nil)
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.put.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        request.httpBody = jsonData
        
           Alamofire.request(request).responseJSON { (response) in
               print(response)
               guard response.result.isSuccess else {
                   print("Error catched")
                   completion(response.result.error, nil)
                       return
               }
            guard let value = response.result.value as? [String: Any] else {
                   print("Error in response")
                   completion(error.ErrorInValue, nil)
                       return
               }
               if let error = value["error"] as? String {
                   print(error)
                   completion(nil, nil)
                       return
               } else {
                    var id = ""
                    if let idItem = value["id"] as? String {
                        id = idItem
                    }
                    var clinicID = ""
                    if let clinicIDitem = value["clinic"] as? String {
                        clinicID = clinicIDitem
                    }
                    var dateCreated = ""
                    if let dateCreatedItem = value["dateCreated"] as? String {
                        dateCreated = dateCreatedItem
                    }
                    var dateModified = ""
                    if let dateModifiedItem = value["dateModified"] as? String {
                        dateModified = dateModifiedItem
                    }
                    var dateOfBirth = ""
                    if let dateOfBirthItem = value["dateOfBirth"] as? String {
                        dateOfBirth = dateOfBirthItem
                    }
                    var firstName = ""
                    if let firstNameItem = value["firstName"] as? String {
                        firstName = firstNameItem
                    }
                    var lastName = ""
                    if let lastNameItem = value["lastName"] as? String {
                        lastName = lastNameItem
                    }
                    var address = ""
                    if let addressItem = value["address"] as? String {
                        address = addressItem
                    }
                    var genderString = ""
                    if let genderItem = value["gender"] as? String {
                    genderString = genderItem
                    }
                    var dictNote = [MedicalNote]()
                    if let notesItem = value["notes"] as? [String: String] {
                        for (key, value) in notesItem{
                            let newMedicalNote = MedicalNote(note: value, title: key.iso8601 ?? Date())
                            dictNote.append(newMedicalNote)
                        }
                    }
                    var email = ""
                    if let emailItem = value["note"] as? String {
                        email = emailItem
                    }
                
                    var dictTreatment = [Treatment]()
                    if let treatmentItem = value["treatment"] as? [String: String] {
                        for (key, value) in treatmentItem{
                            let newTreat = Treatment(name: key, prob: Double(value) ?? 0.00)
                            dictTreatment.append(newTreat)
                        }
                    }
                    var dictDiagnostic = [Diagnostic]()
                    if let diagnosticItem = value["diagnostic"] as? [String: String] {
                        for (key, value) in diagnosticItem {
                            let newDiagnostic = Diagnostic(name: key, prob: Double(value) ?? 0.00)
                            dictDiagnostic.append(newDiagnostic)
                        }
                    }
                    var dictTreatmentPraticient = [Treatment]()
                    if let treatmentPraticienItem = value["treatment"] as? [String: String] {
                        for (key, value) in treatmentPraticienItem{
                            let newTreatPraticien = Treatment(name: key, prob: Double(value) ?? 0.00)
                            dictTreatmentPraticient.append(newTreatPraticien)
                        }
                    }
                    var dictDiagnosticPraticien = [Diagnostic]()
                    if let diagnosticPraticienItem = value["treatment"] as? [String: String] {
                        for (key, value) in diagnosticPraticienItem {
                            let newDiagnosticPraticien = Diagnostic(name: key, prob: Double(value) ?? 0.00)
                            dictDiagnosticPraticien.append(newDiagnosticPraticien)
                        }
                    }
                    var medicalExamsID = [String]()
                        if let medicalExams = value["medicalExams"] as? [String] {
                            for examID in medicalExams {
                                medicalExamsID.append(examID)
                            }
                        }
                    let gender = stringToGender(genderString: genderString)
                    let newPatient = Patient(firstName: firstName, lastName: lastName, gender: gender, token: token, dateOfBirth: dateOfBirth.iso8601 ?? Date(), clinicID: clinicID, dateCreated: dateCreated.iso8601 ?? Date(), dateModified: dateModified.iso8601 ?? Date(), id: id, address: address, note: dictNote, email: email, medicalExams: [], medicalExamID: medicalExamsID, diagnostics: dictDiagnostic, treatments: dictTreatment, diagnosticsPraticient: dictDiagnosticPraticien, treatmentsPraticient: dictTreatmentPraticient )
                   completion(nil, newPatient)
                   return
               }
           }
       }
    
    // MARK: -Admin
    func addAdmin(token: String,admin: Admin, completion:@escaping (Error?, Bool?) -> Void) {
        
        let dict = ["clinic": admin.clinicID, "firstName": admin.firstname, "lastName" : admin.lastname, "dateCreated": admin.dateCreated, "dateModified": admin.dateModified] as! [String: String]
        let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/admins"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        request.httpBody = jsonData
        
        Alamofire.request(request).responseJSON { (response) in
            print(response)
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, false)
                    return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, false)
                    return
            }
            if let error = value["error"] as? String {
                print(error)
                completion(nil, false)
                    return
            } else {
                completion(nil, true)
                return
            }
        }
    }
    
    func getAllAdmins(token: String, completion:@escaping (Error?, [Admin]?) -> Void) {
    
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/admins"
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         
         
         Alamofire.request(request).responseJSON { (response) in
             guard response.result.isSuccess else {
                //Alert.showBasic(title: "Error", message: "Error signing up, please check your internet conection", vc: self)
                print("Error catched")
                completion(response.result.error, nil)
                return
            }
            guard let value = response.result.value as? [[String: Any]]
                else {
                    print("Error in response")
                    completion(error.ErrorInValue, nil)
                    return
            }
            var admins = [Admin]()
            let items = value
            for item in items {
                var id = ""
                if let idItem = item["_id"] as? String {
                    id = idItem
                }
                var dateCreated: Date!
                if let dateCreatedItem = item["dateCreated"] as? String {
                    dateCreated = dateCreatedItem.iso8601 ?? Date()
                }
                var dateModified: Date!
                if let dateModifiedItem = item["dateModified"] as? String {
                    dateModified = dateModifiedItem.iso8601 ?? Date()
                }
                var firstname = ""
                if let firstnameItem = item["firstName"] as? String {
                    firstname = firstnameItem
                }
                var lastname = ""
                if let lastnameItem = item["last_name"] as? String {
                    lastname = lastnameItem
                }
                var clinicID = ""
                if let clinicIDItem = item["last_name"] as? String {
                    clinicID = clinicIDItem
                }
                let newAdmin = Admin(firstName: firstname, lastName: lastname, clinicID: clinicID, token: "", dateCreated: dateCreated, dateModified: dateModified, id: id)
               
                admins.append(newAdmin)
            }
            completion(nil, admins)
         }
     }
    
    func getAdmin(token: String, adminId : String, completion:@escaping (Error?, Admin?) -> Void) {
    
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/admins/" + token
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + adminId, forHTTPHeaderField: "Authorization")
         
         
         Alamofire.request(request).responseJSON { (response) in
            
            guard response.result.isSuccess else {
                //Alert.showBasic(title: "Error", message: "Error signing up, please check your internet conection", vc: self)
                print("Error catched")
                completion(response.result.error, nil)
                return
            }
            guard let value = response.result.value as? [String: Any]
                else {
                    print("Error in response")
                    completion(nil, nil)
                    return
            }
            
            let admin = Admin()
            if let token = value["_id"] as? String {
                admin.token = token
            }
            if let dateCreated = value["dateCreated"] as? String {
                admin.dateCreated = dateCreated.iso8601 ?? Date()
            }
            if let dateModified = value["dateModified"] as? String {
                admin.dateModified = dateModified.iso8601 ?? Date()
            }
            if let firstname = value["firstName"] as? String {
                admin.firstname = firstname
            }
            if let lastname = value["last_name"] as? String {
                admin.lastname = lastname
            }
            
            completion(nil, admin)
         }
     }
    
    func updateAdmin(token: String, admin: Admin ,completion:@escaping (Error?, Bool?) -> Void) {
        let date = Date()
        let dict = ["id": admin.ID, "clinic": admin.clinicID, "firstName": admin.firstname, "lastName" : admin.lastname, "dateCreated": admin.dateCreated.iso8601, "dateModified" : date.iso8601]
        let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/admins"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.put.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        request.httpBody = jsonData
        
       Alamofire.request(request).responseJSON { (response) in
            print(response)
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, false)
                    return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, false)
                    return
            }
            if let error = value["error"] as? String {
                print(error)
                completion(nil, false)
                    return
            } else {
                completion(nil, true)
                return
            }
        }
    }
    
    func deleteAdmin(token: String,adminId: String, username: String, password: String, completion:@escaping (Error?, Bool?) -> Void) {
        
        let dict = ["username": username, "password":password]
        let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/admins/" + adminId
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.delete.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        request.httpBody = jsonData
        
        Alamofire.request(request).responseJSON { (response) in
            print(response)
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, false)
                    return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, false)
                    return
            }
            if let error = value["error"] as? String {
                print(error)
                completion(nil, false)
                    return
            } else {
                completion(nil, true)
                return
            }
        }
    }
    
     // MARK: -Clinic
    
    func addClinic(token: String, clinic: Clinic, completion:@escaping (Error?) -> Void) {
        
        let dict = ["address": clinic.address!, "email": clinic.email, "name" : clinic.name, "phone": clinic.phone, "id": clinic.id]
        let jsonData = try? JSONSerialization.data(withJSONObject: dict, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/clinics"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        request.httpBody = jsonData
        
        Alamofire.request(request).responseJSON { (response) in
            print("ADD CLINIC RESPONSE :")
            print(response)
        }
    }
    
    func getAllClinics(token: String, completion:@escaping (Error?, [Clinic]?) -> Void) {
   
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/clinics"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.get.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        
         Alamofire.request(request).responseJSON { (response) in
            print(response)
            guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil)
                    return
                }
                guard let value = response.result.value as? [[String: Any]]
                    else {
                        print("Error in response")
                        completion(nil, nil)
                        return
                }
                let items = value
                var clinics = [Clinic]()
                for item in items {
                    var id = ""
                    if let idItem = item["_id"]! as? String {
                        id = idItem
                    }
                    var name = ""
                    if let nameItem = item["name"] as? String {
                        name = nameItem
                    }
                    var phone = ""
                    if let phoneItem = item["phone"] as? String {
                        phone = phoneItem
                    }
                    var email = ""
                    if let emailItem = item["email"] as? String {
                        email = emailItem
                    }
                    var address = ""
                    if let addressItem = item["address"] as? String {
                        address = addressItem
                    }
                    let newClinic = Clinic(name: name, id: id, address: address, email: email, phone: phone)
                    clinics.append(newClinic)
                }
            completion(nil, clinics)
        }
    }
    
    func getClinic(token: String, clinicId : String, completion:@escaping (Error?, Clinic?) -> Void) {
       
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            urlComponents.path = "/clinics/" + clinicId
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    return
            }
            
            var request = URLRequest(url: url)
            request.httpMethod = HTTPMethod.get.rawValue
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
            
            Alamofire.request(request).responseJSON { (response) in
                guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil)
                    return
                }
                guard let value = response.result.value as? [String: Any]
                    else {
                        print("Error in response")
                        completion(nil, nil)
                        return
                }
                let clinic = Clinic()
                if let id = value["_id"] as? String {
                    clinic.id = id
                }
                if let name = value["name"] as? String {
                    clinic.name = name
                }
                if let address = value["address"] as? String {
                    clinic.address = address
                }
                if let email = value["email"] as? String {
                    clinic.email = email
                }
                if let phone = value["phone"] as? String {
                    clinic.phone = phone
                }
                completion(nil, clinic)
            }
        }
    
    func getClinicSecretaries(token: String, clinicId: String, completion:@escaping (Error?, [Secretary]?) -> Void) {
       
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            urlComponents.path = "/clinics/" + clinicId + "/secretaries"
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    return
            }
            
            var request = URLRequest(url: url)
            request.httpMethod = HTTPMethod.get.rawValue
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
        
            Alamofire.request(request).responseJSON { (response) in
               guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil)
                    return
                }
                guard let value = response.result.value as? [[String: Any]]
                    else {
                        print("Error in response")
                        completion(nil, nil)
                        return
                }
                let items = value
                var secretaries = [Secretary]()
                for item in items {
                    var id = ""
                    if let idItem = item["_id"]! as? String {
                        id = idItem
                    }
                    var clinicID = ""
                    if let clinicIDitem = item["clinic"] as? String {
                        clinicID = clinicIDitem
                    }
                    var dateCreated = ""
                    if let dateCreatedItem = item["dateCreated"] as? String {
                        dateCreated = dateCreatedItem
                    }
                    var dateModified = ""
                    if let dateModifiedItem = item["dateModified"] as? String {
                        dateModified = dateModifiedItem
                    }
                    var firstName = ""
                    if let firstNameItem = item["firstName"] as? String {
                        firstName = firstNameItem
                    }
                    var lastName = ""
                    if let lastNameItem = item["lastName"] as? String {
                        lastName = lastNameItem
                    }
                    let newSecretary = Secretary(firstName: firstName, lastName: lastName, clinicID: clinicID, token: "", dateCreated:dateCreated.iso8601!,dateModified: dateModified.iso8601!, id: id)
                    secretaries.append(newSecretary)
                }
                completion(nil, secretaries)
            }
        }
    
    func getClinicPracticians(token: String, clinicId: String, completion:@escaping (Error?, [Praticien]?) -> Void) {
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            urlComponents.path = "/clinics/" + clinicId + "/practicians"
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    return
            }
            
            var request = URLRequest(url: url)
            request.httpMethod = HTTPMethod.get.rawValue
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
        
            Alamofire.request(request).responseJSON { (response) in
               guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil)
                    return
                }
                guard let value = response.result.value as? [[String: Any]]
                    else {
                        print("Error in response")
                        completion(nil, nil)
                        return
                }
                print(value)
                let items = value
                var practiciens = [Praticien]()
                for item in items {
                    var id = ""
                    if let idItem = item["_id"]! as? String {
                        id = idItem
                    }
                    var clinicID = ""
                    if let clinicIDitem = item["clinic"] as? String {
                        clinicID = clinicIDitem
                    }
                    var dateCreated = ""
                    if let dateCreatedItem = item["dateCreated"] as? String {
                        dateCreated = dateCreatedItem
                    }
                    var dateModified = ""
                    if let dateModifiedItem = item["dateModified"] as? String {
                        dateModified = dateModifiedItem
                    }
                    var firstName = ""
                    if let firstNameItem = item["firstName"] as? String {
                        firstName = firstNameItem
                    }
                    var lastName = ""
                    if let lastNameItem = item["lastName"] as? String {
                        lastName = lastNameItem
                    }
                    var phone = ""
                    if let phoneItem = item["phone"] as? String {
                        phone = phoneItem
                    }
                    var email = ""
                    if let emailItem = item["email"] as? String {
                        email = emailItem
                    }
                    var address = ""
                    if let addressItem = item["address"] as? String {
                        address = addressItem
                    }
                    let newPatient = Praticien(firstName: firstName, lastName: lastName, clinicID: clinicID, token: "", dateCreated: dateCreated.iso8601 ?? Date(),dateModified: dateModified.iso8601 ?? Date(), id: id, phone: phone, email: email, addresse: address)
                    practiciens.append(newPatient)
                }
            completion(nil, practiciens)
        }
    }
    
    func getClinicAdmins(userToken:String,clinicId: String, completion:@escaping (Error?) -> Void) {
       
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            urlComponents.path = "/clinics/" + clinicId + "/admins"
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    return
            }
            
            var request = URLRequest(url: url)
            request.httpMethod = HTTPMethod.get.rawValue
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer " + userToken, forHTTPHeaderField: "Authorization")
            
            
            
            Alamofire.request(request).responseJSON { (response) in
                print("GET CLINIC ADMINS RESPONSE :")
                print(response)
            }
        }
    
    func updateClinic(token: String, clinic: Clinic, completion:@escaping (Error?, Bool?) -> Void) {
       
        let data = ["id": clinic.id, "address": clinic.address, "email": clinic.email, "name" : clinic.name , "phone": clinic.phone ?? ""]
        let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
    
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/clinics"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.put.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        request.httpBody = jsonData
        
       Alamofire.request(request).responseJSON { (response) in
            print(response)
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, false)
                    return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, false)
                    return
            }
            if let error = value["error"] as? String {
                print(error)
                completion(nil, false)
                    return
            } else {
                completion(nil, true)
                return
            }
        }
    }
    
    // MARK: -Praticien
    
    func updatePractician(token: String, praticien: Praticien, completion:@escaping (Error?, Bool?) -> Void) {
        let date = Date()
        let data = ["id": praticien.ID, "clinic": praticien.clinicID, "firstName": praticien.firstname, "lastName": praticien.lastname, "phone": praticien.phone, "email" : praticien.email ?? "", "dateCreated": praticien.dateCreated.iso8601, "dateModified": date.iso8601, "address": praticien.addresse ?? ""]
        let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        
        urlComponents.path = "/practicians"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
            
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.put.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
        request.httpBody = jsonData
            
        Alamofire.request(request).responseJSON { (response) in
            print(response)
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, false)
                    return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, false)
                    return
            }
            if let error = value["error"] as? String {
                print(error)
                completion(nil, false)
                    return
            } else {
                completion(nil, true)
                return
            }
        }
    }
    
    func addPractician(token: String, praticien: Praticien, completion:@escaping (Error?) -> Void) {
        let data = ["clinic": praticien.clinicID, "firstName": praticien.firstname, "lastName": praticien.lastname, "phone": praticien.phone ?? ""]
        let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/practicians"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
            
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.post.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
        request.httpBody = jsonData
            
        Alamofire.request(request).responseJSON { (response) in
            
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error)
                return
            }
            guard let value = response.result.value as? [String: Any]
            else {
                print("Error in response")
                completion(error.ErrorInValue)
                return
            }
            print(value)
            completion(nil)
        }
    }
    
    func getAllPracticians(token: String, completion:@escaping (Error?, [Praticien]?) -> Void) {
    
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/practicians"
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         
         Alamofire.request(request).responseJSON { (response) in
                guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil)
                    return
                }
                guard let value = response.result.value as? [[String: Any]]
                    else {
                        print("Error in response")
                        completion(nil, nil)
                        return
                }
                let items = value
                var practiciens = [Praticien]()
                for item in items {
                    var id = ""
                    if let idItem = item["_id"]! as? String {
                        id = idItem
                    }
                    var clinicID = ""
                    if let clinicIDitem = item["clinic"] as? String {
                        clinicID = clinicIDitem
                    }
                    var dateCreated = ""
                    if let dateCreatedItem = item["dateCreated"] as? String {
                        dateCreated = dateCreatedItem
                    }
                    var dateModified = ""
                    if let dateModifiedItem = item["dateModified"] as? String {
                        dateModified = dateModifiedItem
                    }
                    var firstName = ""
                    if let firstNameItem = item["firstName"] as? String {
                        firstName = firstNameItem
                    }
                    var lastName = ""
                    if let lastNameItem = item["lastName"] as? String {
                        lastName = lastNameItem
                    }
                    var phone = ""
                    if let phoneItem = item["phone"] as? String {
                        phone = phoneItem
                    }
                    var email = ""
                    if let emailItem = item["email"] as? String {
                        email = emailItem
                    }
                    var address = ""
                    if let addressItem = item["address"] as? String {
                        address = addressItem
                    }
                    let newPatient = Praticien(firstName: firstName, lastName: lastName, clinicID: clinicID, token: "", dateCreated:dateCreated.iso8601!,dateModified:dateModified.iso8601!, id: id, phone: phone, email: email, addresse: address)
                    practiciens.append(newPatient)
                }
            completion(nil, practiciens)
        }
    }
    
    func getPractician(token: String, practicianId: String, completion:@escaping (Error?, Praticien?) -> Void) {
    
         var urlComponents = URLComponents()
         urlComponents.scheme = "https"
         urlComponents.host = "api.meditrinae.com"
         urlComponents.path = "/practicians/" + practicianId
         guard let url = urlComponents.url
             else {
                 print("Could not create URL from components")
                 return
         }
         
         var request = URLRequest(url: url)
         request.httpMethod = HTTPMethod.get.rawValue
         request.setValue("application/json", forHTTPHeaderField: "Content-Type")
         request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
         
       Alamofire.request(request)
        .validate()
        .responseJSON {response in
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, nil)
                return
            }
             guard let value = response.result.value as? [String: Any]
                else {
                    print("Error in response")
                    completion(nil, nil)
                    return
            }
            var id = ""
            if let idItem = value["_id"]! as? String {
                id = idItem
            }
            var clinicID = ""
            if let clinicIDitem = value["clinic"] as? String {
                clinicID = clinicIDitem
            }
            var dateCreated = ""
            if let dateCreatedItem = value["dateCreated"] as? String {
                dateCreated = dateCreatedItem
            }
            var dateModified = ""
            if let dateModifiedItem = value["dateModified"] as? String {
                dateModified = dateModifiedItem
            }
            var firstName = ""
            if let firstNameItem = value["firstName"] as? String {
                firstName = firstNameItem
            }
            var lastName = ""
            if let lastNameItem = value["lastName"] as? String {
                lastName = lastNameItem
            }
            var phone = ""
            if let phoneItem = value["phone"] as? String {
                phone = phoneItem
            }
            var email = ""
            if let emailItem = value["email"] as? String {
                email = emailItem
            }
            var address = ""
            if let addressItem = value["address"] as? String {
                address = addressItem
            }
            let newPatient = Praticien(firstName: firstName, lastName: lastName, clinicID: clinicID, token: "", dateCreated:dateCreated.iso8601!,dateModified:dateModified.iso8601!, id: id, phone: phone, email: email, addresse: address)
        completion(nil, newPatient)
        }
    }

    
    func deletePractician(token: String, id: String, username: String, password: String, completion:@escaping (Error?, Bool?) -> Void) {
        let data = ["username": username, "password": password]
        let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/practicians/" + id
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
            
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.delete.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
        request.httpBody = jsonData
            
       Alamofire.request(request).responseJSON { (response) in
            print(response)
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, false)
                    return
            }
            guard let value = response.result.value as? [String: Any] else {
                print("Error in response")
                completion(error.ErrorInValue, false)
                    return
            }
            if let error = value["error"] as? String {
                print(error)
                completion(nil, false)
                    return
            } else {
                completion(nil, true)
                return
            }
        }
     }
    
    // MARK: -Passwords
    
    func updateMyPassword(token: String, oldPwd:String, newPwd:String, completion:@escaping (Error?, Bool?) -> Void) {
        let data = ["actualPassword": oldPwd,"newPassword": newPwd]
        let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
       
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/users/password"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
           
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.put.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
           
        request.httpBody = jsonData
           
        Alamofire.request(request).responseJSON { (response) in
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error, false)
                return
            }
            guard let value = response.result.value as? [String: Any]
                else {
                    print("Error in response")
                    completion(error.ErrorInValue, false)
                    return
            }
            print(value)
            completion(nil, true)
        }
    }
    
    func updateUserPassword(userToken: String, userId:String, newPwd: String, completion:@escaping (Error?) -> Void) {
        let data = ["newPassword": newPwd]
       let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
       
       var urlComponents = URLComponents()
       urlComponents.scheme = "https"
       urlComponents.host = "api.meditrinae.com"
       urlComponents.path = "/users/password/" + userId
       guard let url = urlComponents.url
           else {
               print("Could not create URL from components")
               return
       }
           
       var request = URLRequest(url: url)
       request.httpMethod = HTTPMethod.put.rawValue
       request.setValue("application/json", forHTTPHeaderField: "Content-Type")
       request.setValue("Bearer " + userToken, forHTTPHeaderField: "Authorization")
           
       request.httpBody = jsonData
           
       Alamofire.request(request).responseJSON { (response) in
           guard response.result.isSuccess else {
               print("Error catched")
               completion(response.result.error)
               return
           }
           guard let value = response.result.value as? [String: Any]
               else {
                   print("Error in response")
                   completion(nil)
                   return
           }
           print(value)
           completion(nil)
       }
    }
    
    // MARK: -Secretary
    
    func addSecretary(token: String, secretery: Secretary, completion:@escaping (Error?, Bool?) -> Void) {
            let data = ["clinic": secretery.clinicID,"firstName":  secretery.firstname, "lastName": secretery.lastname]
            let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
            
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            
            urlComponents.path = "/secretaries"
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    return
            }
            
            var request = URLRequest(url: url)
            request.httpMethod = HTTPMethod.post.rawValue
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
            request.httpBody = jsonData
            
            Alamofire.request(request).responseJSON { (response) in
                print(response)
                guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, false)
                        return
                }
                guard let value = response.result.value as? [String: Any] else {
                    print("Error in response")
                    completion(error.ErrorInValue, false)
                        return
                }
                if let error = value["error"] as? String {
                    print(error)
                    completion(nil, false)
                        return
                } else {
                    completion(nil, true)
                    return
                }
            }
    }
    
    func getAllSecretaries(token: String, completion:@escaping (Error?, [Secretary]?) -> Void) {
        
             var urlComponents = URLComponents()
             urlComponents.scheme = "https"
             urlComponents.host = "api.meditrinae.com"
             urlComponents.path = "/secretaries"
             guard let url = urlComponents.url
                 else {
                     print("Could not create URL from components")
                     return
             }
             
             var request = URLRequest(url: url)
             request.httpMethod = HTTPMethod.get.rawValue
             request.setValue("application/json", forHTTPHeaderField: "Content-Type")
             request.setValue("Bearer " + token , forHTTPHeaderField: "Authorization")
             
             Alamofire.request(request).responseJSON { (response) in
                guard response.result.isSuccess else {
                        print("Error catched")
                        completion(response.result.error, nil)
                        return
                    }
                    guard let value = response.result.value as? [[String: Any]]
                        else {
                            print("Error in response")
                            completion(nil, nil)
                            return
                    }
                    let items = value
                    var secretaries = [Secretary]()
                    for item in items {
                        var id = ""
                        if let idItem = item["_id"]! as? String {
                            id = idItem
                        }
                        var clinicID = ""
                        if let clinicIDitem = item["clinic"] as? String {
                            clinicID = clinicIDitem
                        }
                        var dateCreated = ""
                        if let dateCreatedItem = item["dateCreated"] as? String {
                            dateCreated = dateCreatedItem
                        }
                        var dateModified = ""
                        if let dateModifiedItem = item["dateModified"] as? String {
                            dateModified = dateModifiedItem
                        }
                        var firstName = ""
                        if let firstNameItem = item["firstName"] as? String {
                            firstName = firstNameItem
                        }
                        var lastName = ""
                        if let lastNameItem = item["lastName"] as? String {
                            lastName = lastNameItem
                        }
                        let newSecretary = Secretary(firstName: firstName, lastName: lastName, clinicID: clinicID, token: "", dateCreated: dateCreated.iso8601!,dateModified: dateModified.iso8601!, id: id)
                        secretaries.append(newSecretary)
                    }
                completion(nil, secretaries)
             }
         }
        
    func getSecretary(token: String, secretaryId: String, completion:@escaping (Error?, Secretary?) -> Void) {
    
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            urlComponents.path = "/secretaries/" + secretaryId
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    return
            }
            
            var request = URLRequest(url: url)
            request.httpMethod = HTTPMethod.get.rawValue
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
            Alamofire.request(request).responseJSON { (response) in
                print("GET ONE SECRETARY RESPONSE :")
                print(response)
            
                guard response.result.isSuccess else {
                            //Alert.showBasic(title: "Error", message: "Error signing up, please check your internet conection", vc: self)
                            print("Error catched")
                completion(response.result.error!, nil)
                    return
                }
                guard let value = response.result.value as? [String: Any]
                    else {
                        print("Error in response")
                        completion(nil, nil)
                        return
                }
                
                var id = ""
                if let idItem = value["_id"]! as? String {
                    id = idItem
                }
                var clinicID = ""
                if let clinicIDitem = value["clinic"] as? String {
                    clinicID = clinicIDitem
                }
                var dateCreated = ""
                if let dateCreatedItem = value["dateCreated"] as? String {
                    dateCreated = dateCreatedItem
                }
                var dateModified = ""
                if let dateModifiedItem = value["dateModified"] as? String {
                    dateModified = dateModifiedItem
                }
                var firstName = ""
                if let firstNameItem = value["firstName"] as? String {
                    firstName = firstNameItem
                }
                var lastName = ""
                if let lastNameItem = value["lastName"] as? String {
                    lastName = lastNameItem
                }
                let newSecretary = Secretary(firstName: firstName, lastName: lastName, clinicID: clinicID, token: "", dateCreated: dateCreated.iso8601!,dateModified: dateModified.iso8601!, id: id)
                completion(nil, newSecretary)
            }
        }
        
    func deleteSecretary(token :String, secretaryId: String, username: String, password: String, completion:@escaping (Error?, Bool?) -> Void) {
            let data = ["username": username,"password": password]
            let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
            
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            urlComponents.path = "/secretaries/" + secretaryId
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    return
            }
                
            var request = URLRequest(url: url)
            request.httpMethod = HTTPMethod.delete.rawValue
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
                
            request.httpBody = jsonData
                
            Alamofire.request(request).responseJSON { (response) in
                print(response)
                guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, false)
                        return
                }
                guard let value = response.result.value as? [String: Any] else {
                    print("Error in response")
                    completion(error.ErrorInValue, false)
                        return
                }
                if let error = value["error"] as? String {
                    print(error)
                    completion(nil, false)
                        return
                } else {
                    completion(nil, true)
                    return
                }
            }
         }
    
    func updateSecretary(token: String, secretary: Secretary, completion:@escaping (Error?, Bool?) -> Void) {
        let date = Date()
        let data = ["id": secretary.ID,"clinic": secretary.clinicID, "firstName": secretary.firstname, "lastName": secretary.lastname, "dateModified" : date.iso8601, "dateCreated": secretary.dateCreated.iso8601]
        let jsonData = try? JSONSerialization.data(withJSONObject: data, options: [])
        
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        
        urlComponents.path = "/secretaries"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
            
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.put.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
        request.httpBody = jsonData
            
        Alamofire.request(request).responseJSON { (response) in
                print(response)
                guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, false)
                        return
                }
                guard let value = response.result.value as? [String: Any] else {
                    print("Error in response")
                    completion(error.ErrorInValue, false)
                        return
                }
                if let error = value["error"] as? String {
                    print(error)
                    completion(nil, false)
                        return
                } else {
                    completion(nil, true)
                    return
                }
        }
    }

    // MARK: -Email

    func sendEmailRequest(token: String, patientID: String, email: String, completion:@escaping (Error?, Bool?) -> Void) {
          var urlComponents = URLComponents()
          urlComponents.scheme = "https"
          urlComponents.host = "api.meditrinae.com"
          urlComponents.path = "/exam-results/patient/" + patientID + "/" + email
          guard let url = urlComponents.url
              else {
                  print("Could not create URL from components")
                  return
          }
             
          var request = URLRequest(url: url)
          request.httpMethod = HTTPMethod.get.rawValue
          request.setValue("application/json", forHTTPHeaderField: "Content-Type")
          request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
             
          Alamofire.request(request).responseJSON { (response) in
              guard response.result.isSuccess else {
                  print("Error catched")
                  completion(response.result.error, false)
                  return
              }
              guard let value = response.result.value as? [String: Any]
                  else {
                      print("Error in response")
                      completion(nil, false)
                      return
              }
            if (value["error"] as? String) != nil {
                completion(error.ErrorInValue, false)
            }
            if (value["message"] as? String) != nil {
                completion(error.ErrorInValue, false)
            }
            if (value["statusCode"] as? String) != nil {
                completion(error.ErrorInValue, false)
            }
            completion(nil, true)
          }
    }
    
    func sendGenericEmailRequest(token: String, email: String, completion:@escaping (Error?) -> Void) {
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/patients/info/" + email
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
           
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.get.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
           
        Alamofire.request(request).responseJSON { (response) in
            guard response.result.isSuccess else {
                print("Error catched")
                completion(response.result.error)
                return
            }
            guard let value = response.result.value as? [String: Any]
                else {
                    print("Error in response")
                    completion(nil)
                    return
            }
          print(value)
          completion(nil)
        }
    }

    // MARK: -AI prediction/Traitement

    func trainAISystem(token: String, completion:@escaping (Error?) -> Void) {
            var urlComponents = URLComponents()
            urlComponents.scheme = "https"
            urlComponents.host = "api.meditrinae.com"
            urlComponents.path = "/ai/train"
            guard let url = urlComponents.url
                else {
                    print("Could not create URL from components")
                    return
            }
                
            var request = URLRequest(url: url)
            request.httpMethod = HTTPMethod.get.rawValue
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
                
            Alamofire.request(request).responseJSON { (response) in
                guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error)
                    return
                }
                guard let value = response.result.value as? [String: Any]
                    else {
                        print("Error in response")
                        completion(nil)
                        return
                }
                print(value)
                completion(nil)
        }
    }
    
    func getAIDiagnosticPatient(token: String, patientID: String, completion:@escaping (Error?, [Diagnostic]?, [Treatment]?) -> Void) {
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path =  "/ai/predict/" + patientID //5ddda448e182b84f47d3d7aa
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
        print(url)
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.get.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
        Alamofire.request(request).responseJSON { (response) in
            guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil, nil)
                    return
            }
            guard let value = response.result.value as? [String:Any]
                    else {
                    print("Error in response")
                    completion(nil, nil, nil)
                    return
            }
            var diagnostics = [Diagnostic]()
            if let diagnosticDict = value["Diagnostics"] as? [String: Any]{
                if let mass_droit = diagnosticDict["MASSETER_DROIT"] as? [Any] {
                    var confs = [Double]()
                    
                    if let confsTable = mass_droit[1] as? [[Double]] {
                        for conf in confsTable[0] {
                            confs.append(conf)
                        }
                    }
                    if let predicts = mass_droit[0] as? [[Float]] {
                        var counter = 0
                        for predict in predicts[0] {
                            if (predict == 1) {
                                let newDiagnostic = Diagnostic(name: "MASSETER DROIT " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                                diagnostics.append(newDiagnostic)
                            }
                            counter += 1
                        }
                    }
                
            
                 if let mass_droit = diagnosticDict["MASSETER_GAUCHE"] as? [Any] {
                  var confs = [Double]()
                  if let confsTable = mass_droit[1] as? [[Double]] {
                      for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = mass_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "MASSETER GAUCHE " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let temp_droit = diagnosticDict["TEMPORAL_DROIT"] as? [Any] {
                var confs = [Double]()
                if let confsTable = temp_droit[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = temp_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "TEMPORAL DROIT " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let temp_gauche = diagnosticDict["TEMPORAL_GAUCHE"] as? [Any] {
                var confs = [Double]()
                if let confsTable = temp_gauche[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = temp_gauche[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "TEMPORAL GAUCHE " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let digas_droit = diagnosticDict["DIGASTRIQUE_DROIT"] as? [Any] {
                var confs = [Double]()
                if let confsTable = digas_droit[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = digas_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "DIGASTRIQUE DROIT " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let digas_gauche = diagnosticDict["DIGASTRIQUE_GAUCHE"] as? [Any] {
                var confs = [Double]()
                if let confsTable = digas_gauche[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = digas_gauche[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "DIGASTRIQUE GAUCHE  " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let man_droit = diagnosticDict["SOUS_MANDIBULAIRE_DROIT"] as? [Any] {
                var confs = [Double]()
                if let confsTable = man_droit[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = man_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "SOUS MANDIBULAIRE DROIT " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let man_gauche = diagnosticDict["SOUS_MANDIBULAIRE_GAUCHE"] as? [Any] {
                var confs = [Double]()
                if let confsTable = man_gauche[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = man_gauche[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "SOUS MANDIBULAIRE GAUCHE " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let atm_droit = diagnosticDict["ATM_DROIT"] as? [Any] {
                var confs = [Double]()
                if let confsTable = atm_droit[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = atm_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "ATM DROIT " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let atm_gauche = diagnosticDict["ATM_GAUCHE"] as? [Any] {
                var confs = [Double]()
                if let confsTable = atm_gauche[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = atm_gauche[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "ATM GAUCHE " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let temp_droit = diagnosticDict["TENDON_TEMPORAL_DROIT"] as? [Any] {
                var confs = [Double]()
                if let confsTable = temp_droit[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = temp_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "TENDON TEMPORAL DROIT " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let temp_droit = diagnosticDict["TENDON_TEMPORAL_GAUCHE"] as? [Any] {
                var confs = [Double]()
                if let confsTable = temp_droit[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = temp_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "TENDON TEMPORAL GAUCHE " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let temp_droit = diagnosticDict["PTERIGOIDIEN_DROIT"] as? [Any] {
                var confs = [Double]()
                if let confsTable = temp_droit[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = temp_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "PTERIGOIDIEN DROIT " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                    }
                }
            }
            
            if let temp_droit = diagnosticDict["PTERIGOIDIEN_GAUCHE"] as? [Any] {
                var confs = [Double]()
                if let confsTable = temp_droit[1] as? [[Double]] {
                    for conf in confsTable[0] {
                        confs.append(conf)
                    }
                }
                if let predicts = temp_droit[0] as? [[Float]] {
                    var counter = 0
                    for predict in predicts[0] {
                        if (predict == 1) {
                            let newDiagnostic = Diagnostic(name: "PTERIGOIDIEN GAUCHE " + (PREDICTIONS[counter] ?? ""), prob: confs[counter])
                            diagnostics.append(newDiagnostic)
                        }
                        counter += 1
                        }
                    }
                        }
                }
               
            }
            var traitements = [Treatment]()
            if let traitement = value["Treatment"] as? [[String: Any]] {
                print(traitement)
                let traitmentDict = traitement[0]
                if let pred = traitmentDict["E13_pred"] as? [Any] {
                        if let prob = pred[1] as? Double {
                            let traitement = Treatment(name: "Pas de traitement", prob: prob)
                            traitements.append(traitement)
                        }
                    }
                    if let predTCC = traitmentDict["E13_TCC_pred"] as? [Any] {
                        if let prob = predTCC[1] as? Double {
                            let traitement = Treatment(name: "Thérapies cognitives et comportementales (TCC)", prob: prob)
                            traitements.append(traitement)
                        }
                    }
                    if let predPSY = traitmentDict["E13_PSY_pred"] as? [Any] {
                        if let prob = predPSY[1] as? Double {
                            let traitement = Treatment(name: "Physchothérapie", prob: prob)
                            traitements.append(traitement)
                        }
                    }
                    if let predHYP = traitmentDict["E13_HYP_PRED"] as? [Any] {
                        if let prob = predHYP[1] as? Double {
                            let traitement = Treatment(name: "Hypnose", prob: prob)
                            traitements.append(traitement)
                        }
                    }
                    if let predTP = traitmentDict["E13_TP_PRED"] as? [Any] {
                        if let prob = predTP[1] as? Double {
                            let traitement = Treatment(name: "Traitement pharmocologique", prob: prob)
                            traitements.append(traitement)
                        }
                    }
                    if let predET = traitmentDict["E13_ET_PRED"] as? [Any] {
                       if let prob = predET[1] as? Double {
                            let traitement = Treatment(name: "Education thérapeutique", prob: prob)
                            traitements.append(traitement)
                        }
                    }
                    if let predOO = traitmentDict["E13_OO_PRED"] as? [Any] {
                        if let prob = predOO[1] as? Double {
                            let traitement = Treatment(name: "Orthèse occlusale", prob: prob)
                            traitements.append(traitement)
                        }
                    }
                    if let predKIN = traitmentDict["E13_KIN_PRED"] as? [Any] {
                        if let prob = predKIN[1] as? Double {
                            let traitement = Treatment(name: "Kinésithérapie (physiothérapie)", prob: prob)
                            traitements.append(traitement)
                        }
                    }
                }
            completion(nil, diagnostics, traitements)
        }
    }

    func getCompletedExams(token: String, patient: Patient, completion:@escaping (Error?, ExamResult?) -> Void) {
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = "api.meditrinae.com"
        urlComponents.path = "/exam-results/patient/" + patient.ID + "/completed"
        guard let url = urlComponents.url
            else {
                print("Could not create URL from components")
                return
        }
            
        var request = URLRequest(url: url)
        request.httpMethod = HTTPMethod.get.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer " + token, forHTTPHeaderField: "Authorization")
            
        Alamofire.request(request).responseJSON { (response) in
             guard response.result.isSuccess else {
                    print("Error catched")
                    completion(response.result.error, nil)
                    return
                }
            guard let value = response.result.value as? [String:[String: String]]
                    else {
                        print("Error in response")
                        completion(error.ErrorInValue, nil)
                        return
            }
            print(value)
            let examResult = ExamResult()
            for (_, answer) in value {
                examResult.mappedExamResultsToQuestionnaires(dict: answer)
                examResult.calculateAllScores()
            }
            completion(nil, examResult)
        }
    }
}



protocol TransitionToHomeDelegate {
    func showHome()
}

protocol TransitionToQuestionnaireDelegate {
    func showQuestionnaire()
}


