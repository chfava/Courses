import { Inject, Injectable } from "@nestjs/common";
import * as mongoose from "mongoose";
import { CreateExamResultDto } from "./dto/create-exam-result.dto";
import { UpsertExamResultDto } from "./dto/upsert-exam-result.dto";
import { ExamResultInterface } from "./exam-result.interface";
import { LIST } from "./dto/result-field-list"
import { PatientInterface } from "../patient/patient.interface";
import { MedicalExamInterface } from "../medical-exam/medical-exam.interface";


import { dc } from '../../utils/pdf/dc'
import { fdi } from '../../utils/pdf/fdi'
import { gad7 } from '../../utils/pdf/gad7'
import { jlfs8 } from '../../utils/pdf/jlfs8'
import { jlfs20 } from '../../utils/pdf/jlfs20'
import { obc } from '../../utils/pdf/obc'
import { pdf } from '../../utils/pdf/pdf'
import { phq4 } from '../../utils/pdf/phq4'
import { phq9 } from '../../utils/pdf/phq9'
import { ess } from '../../utils/pdf/ess'
import { isi } from '../../utils/pdf/isi'
import { info } from '../../utils/pdf/info'
import { CreateMedicalExamDto } from "../medical-exam/dto/create-medical-exam.dto";
import { medicalExamProviders } from "../medical-exam/medical-exam.providers";
import { examResultProviders } from "./exam-result.providers";
import { examResultSchema } from "./exam-result.schema";

const nodemailer = require("nodemailer")
const rimraf = require("rimraf")
const fs = require("fs")

const senderEmail = "occluso.meditrinae@gmail.com"
const pw = "xzpKsR5JaD8tYb9"
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: senderEmail,
    pass: pw
  }
})

@Injectable()
export class ExamResultService {
  constructor(
    @Inject("ExamResultModelToken")
    private readonly examResultModel: mongoose.Model<ExamResultInterface>,
    @Inject("PatientModelToken")
    private readonly patientModel: mongoose.Model<PatientInterface>,
    @Inject("MedicalExamModelToken")
    private readonly medicalExamModel: mongoose.Model<MedicalExamInterface>
  ) {}

  async create(
    createExamResultDto: CreateExamResultDto | CreateExamResultDto[]
  ): Promise<ExamResultInterface | ExamResultInterface[]> {

    let createMedicalExamDto: CreateMedicalExamDto = {
      patient: createExamResultDto["patient"],
      practician: createExamResultDto["practician"]
    }

    let medicalExam = await this.medicalExamModel.create(createMedicalExamDto)


    let result = await this.examResultModel.findOne({"medicalExamID": medicalExam["_id"]});
    let combinedResults = {}
    createExamResultDto["questions"] = JSON.parse(createExamResultDto["questions"])
    for (let question in LIST) {
        if (createExamResultDto["questions"][LIST[question]]){
          combinedResults[LIST[question]] = createExamResultDto["questions"][LIST[question]]
        } else if (result && result["questions"][LIST[question]]) {
          combinedResults[LIST[question]] = result["questions"][LIST[question]]
        } else {
        }
    }
    
    createExamResultDto["questions"] = combinedResults
    let examResult = await this.examResultModel.findOneAndUpdate({"medicalExamID": medicalExam["_id"]}, createExamResultDto, {upsert:true});
    let er = await this.examResultModel.findOne({"medicalExamID": medicalExam["_id"]})
    await this.medicalExamModel.findOneAndUpdate({"_id":medicalExam["_id"]}, {
      practician: medicalExam["practician"],
      patient: medicalExam["patient"],
      examResultID: er["_id"]
    })
    return er
  }

  
  async findById(examResultId: string) {
    return await this.examResultModel
      .findById(examResultId)
      .exec();
  }

  async exportFormsByEmail(patientID: string, email: string) {
    const completed = await this.findCompletedByPatientId(patientID);
    const patient = await this.patientModel.findById(patientID);
    (new info).info(patient)

    for (let form in completed) {
      if (completed[form]["date"] != undefined) {
        if (form == "OBC") {
          (new obc).obc(completed[form])
        }
        if (form == "PHQ9") {
          (new phq9).phq9(completed[form])
        }
        if (form == "PHQ4") {
          (new phq4).phq4(completed[form])
        }
        if (form == "ELFMan20") {
          (new jlfs20).jlfs20(completed[form])
        }
        if (form == "ELFMan8") {
          (new jlfs8).jlfs8(completed[form])
        }
        if (form == "GCPS") {
          (new dc).dc(completed[form])
        }
        if (form == "FDI") {
          (new fdi).fdi(completed[form])
        }
        if (form == "Demographics") {
          (new pdf).demo(completed[form])
        }
        if (form == "DD") {
          (new pdf).dd(completed[form])
        }
        if (form == "QS") {
          (new pdf).qs(completed[form])
        }
        if (form == "GAD7") {
          (new gad7).gad7(completed[form])
        }
        if (form == "ISI") {
          (new isi).isi(completed[form])
        }
        if (form == "ESS") {
          (new ess).ess(completed[form])
        }
      }

      
    }

    let paths = []

    fs.readdir("/root/temp/", (err, files) => {
      files.forEach(file => {
        paths.push({"path":"/root/temp/" + file})
      });
      let message = {
        from: senderEmail,
        to: email,
        subject: "Formulaires d'examen ATM",
        text: "Bonjour,\nVous trouverez en pièces jointes vos questionnaires les plus récemment remplis.",
        attachments: paths
      }

      let success = true
      transporter.sendMail(message, (err) => {
        if (err) {
          success = false
          console.log("Failed to send email")
        }
        rimraf("/root/temp/*" , (err) => {
          if (err) {
            console.log("Failed to remove files")
          }})
      })
    });
    
  }

  async findCompletedByPatientId(patientID: string) {
    let query = await this.medicalExamModel.find({patient: patientID});
    
    let results = {
      "OBC": {},
      "PHQ9": {},
      "PHQ4":{},
      "ELFMan20":{},
      "ELFMan8":{},
      "GCPS":{},
      "FDI":{},
      "Morphologie":{},
      "Demographics":{},
      "DD":{},
      "QS":{},
      "GAD7":{},
      "ISI":{},
      "ESS":{}
    }

    
    query = query.sort((a, b) => (a["dateCreated"] < b["dateCreated"] ? 1 : -1))

    for (const medicalExam of query) {
      await this.examResultModel.findById(medicalExam["examResultID"]).then((exam) => {
        if (exam != undefined && exam["questions"] != undefined) {
          exam["questions"]["OBC1"] != undefined ? results["OBC"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["PHQ91"] != undefined ? results["PHQ9"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["PHQ41"] != undefined ? results["PHQ4"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["FM201"] != undefined ? results["ELFMan20"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["FM81"] != undefined ? results["ELFMan8"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["DC1"] != undefined ? results["GCPS"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["MD_MOR_D_ATM"] != undefined ? results["Morphologie"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["E13_ET"] != undefined ? results["FDI"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["DEMO1"] != undefined ? results["Demographics"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["DD1"] != undefined ? results["DD"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["QS1"] != undefined ? results["QS"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["GAD1"] != undefined ? results["GAD7"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["SS1"] != undefined ? results["ESS"]["date"] = medicalExam["dateModified"] : null
          exam["questions"]["IS1"] != undefined ? results["ISI"]["date"] = medicalExam["dateModified"] : null

          exam["questions"]["OBC1"] != undefined ? results["OBC"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["PHQ91"] != undefined ? results["PHQ9"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["PHQ41"] != undefined ? results["PHQ4"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["FM201"] != undefined ? results["ELFMan20"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["FM81"] != undefined ? results["ELFMan8"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["DC1"] != undefined ? results["GCPS"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["MD_MOR_D_ATM"] != undefined ? results["Morphologie"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["E13_ET"] != undefined ? results["FDI"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["DEMO1"] != undefined ? results["Demographics"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["DD1"] != undefined ? results["DD"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["QS1"] != undefined ? results["QS"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["GAD1"] != undefined ? results["GAD7"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["SS1"] != undefined ? results["ESS"]["medicalExamID"] = medicalExam["_id"] : null
          exam["questions"]["IS1"] != undefined ? results["ISI"]["medicalExamID"] = medicalExam["_id"] : null

          for (let question in exam["questions"]) {
            if (question.includes("OBC") && exam["questions"][question] != undefined) {
              results["OBC"][question] = exam["questions"][question]
            } else if (question.includes("PHQ9") && exam["questions"][question] != undefined) {
              results["PHQ9"][question] = exam["questions"][question]
            } else if (question.includes("PHQ4") && exam["questions"][question] != undefined) {
              results["PHQ4"][question] = exam["questions"][question]
            } else if (question.includes("FM20") && exam["questions"][question] != undefined) {
              results["ELFMan20"][question] = exam["questions"][question]
            } else if (question.includes("FM8") && exam["questions"][question] != undefined) {
              results["ELFMan8"][question] = exam["questions"][question]
            } else if (question.includes("DC") && exam["questions"][question] != undefined) {
              results["GCPS"][question] = exam["questions"][question]
            } else if (question.includes("MD_MOR") && exam["questions"][question] != undefined) {
              results["Morphologie"][question] = exam["questions"][question]
            } else if (question[0].includes("E") && exam["questions"][question] != undefined) {
              results["FDI"][question] = exam["questions"][question]
            } else if (question.includes("DEMO") && exam["questions"][question] != undefined) {
              results["Demographics"][question] = exam["questions"][question]
            } else if (question[1].includes("D") && exam["questions"][question] != undefined) {
              results["DD"][question] = exam["questions"][question]
            } else if (question.includes("QS") && exam["questions"][question] != undefined) {
              results["QS"][question] = exam["questions"][question]
            } else if (question.includes("GAD") && exam["questions"][question] != undefined) {
              results["GAD7"][question] = exam["questions"][question]
            } else if (question.includes("IS") && exam["questions"][question] != undefined) {
              results["ISI"][question] = exam["questions"][question]
            } else if (question.includes("SS") && !(question.includes("ASSE")) && exam["questions"][question] != undefined) {
              results["ESS"][question] = exam["questions"][question]
            }
          }
          
        }
      })
    }
    return results
    
  }

  
  async findCompleted() {
    let counts: number = await this.examResultModel.find().count();
    let newCounts: number = await this.examResultModel.find({"questions.E13_TB":{"$exists":true}}).count();
    


    let results: Array<ExamResultInterface> = await this.examResultModel
      .find()
      .exec();
    let people = Array<Array<String>>()
    people.push(["TOTAL", counts.toString(), "NOUVEAUX", newCounts.toString()])
    for (let i = 0; i < results.length; i++) {
      people.push(
        [
          results[i].questions["FIRST_NAME"]? results[i].questions["FIRST_NAME"] : "nul",
          results[i].questions["LAST_NAME"]?  results[i].questions["LAST_NAME"] : "nul",
          results[i].questions["AGE"]? results[i].questions["AGE"] : "nul",
          results[i].questions["SEXE"]? results[i].questions["SEXE"] : "nul",
        ]
        
      )
    }
    return people


  }

  async upsertMany(upsertExamsResultsDto: UpsertExamResultDto[]) {
    if (upsertExamsResultsDto.length === 0) {
      return { upsertedIds: {} };
    }

    const bulkOps = upsertExamsResultsDto.map(upsertExamResultDto => {
      let objectId: mongoose.Types.ObjectId;
      if (upsertExamResultDto.id) {
        objectId = new mongoose.Types.ObjectId(upsertExamResultDto.id);
      } else {
        objectId = mongoose.Types.ObjectId();
      }

      return {
        updateOne: {
          filter: { _id: objectId },
          update: {
            $set: {
              medicalExamID: upsertExamResultDto.id,
              questions: upsertExamResultDto.questions
            }
          },
          upsert: true
        }
      };
    });

    return this.examResultModel.collection.bulkWrite(bulkOps);
  }

  async find(options?: any) {
    return await this.examResultModel
      .find(options)
      .exec();
  }

  async findOne(options?: any) {
    return await this.examResultModel.findOne(options).exec();
  }

  async export() {
    let resultArray = []
    resultArray.push(LIST)
    let results = await this.examResultModel
      .find(); 
    for (let i = 0; i < results.length;i++){
      resultArray.push(results[i]["questions"])
    }
    return resultArray
  }

  async generatemedicalExamID(): Promise<{}> {
    return {
      "medicalExamID": mongoose.Types.ObjectId()
    };
  }

  async getPatientId() {
    return mongoose.Types.ObjectId();
  }
}
