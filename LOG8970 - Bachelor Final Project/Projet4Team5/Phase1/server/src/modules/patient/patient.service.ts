import { Inject, Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { FilterPatientsForClinic } from "./dto/filter-patients-for-clinic";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { PatientInterface } from "./patient.interface";
import { info } from "../../utils/pdf/info"
import { ExamResultInterface } from "src/utils/pdf/exam-result";
import { MedicalExamInterface } from "../medical-exam/medical-exam.interface";

const nodemailer = require("nodemailer")
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

const ACTIVE_PATIENT_LIST_SIZE = 20;
const ACTIVE_PATIENT_LIST_EXPIRATION_TIME = 1000 * 60 * 60 * 12; // 12 hours (millis * sec * min * hours)

@Injectable()
export class PatientService {
  // Map of one clinic id to many patient id, when creating a medical exam for a patient, we should add the patients id
  // to this map. Each list has a maximum capacity and items are popped from it when full.
  private activePatientsByClinic: {
    [key: string]: Array<[number, string]>;
  } = {};

  constructor(
    @Inject("PatientModelToken")
    private readonly patientModel: Model<PatientInterface>,
    @Inject("ExamResultModelToken")
    private readonly examResultModel: Model<ExamResultInterface>,
    @Inject("MedicalExamModelToken")
    private readonly medicalExamModel: Model<MedicalExamInterface>
  ) {}

  public addActivePatientForClinic(clinicId: string, patientId: string) {
    const patientList = this.getActivePatientsForClinic(clinicId);
    patientList.unshift([Date.now(), patientId]);
    this.activePatientsByClinic[clinicId] = patientList;
  }

  public getActivePatientsForClinic(clinicId: string) {
    // Filter out old active patients.
    let patientList = (this.activePatientsByClinic[clinicId] || []).filter(
      dateIdTuple => Date.now() - dateIdTuple[0] <= ACTIVE_PATIENT_LIST_EXPIRATION_TIME
    );

    if (patientList.length >= ACTIVE_PATIENT_LIST_SIZE) {
      patientList = patientList.slice(0, ACTIVE_PATIENT_LIST_SIZE);
    }

    this.activePatientsByClinic[clinicId] = patientList;
    return patientList;
  }

  public async findAllActivePatientsForClinic(clinicId: string) {
    const activePatientIds = this.activePatientsByClinic[clinicId] || [];
    return await this.patientModel.find({
      _id: { $in: activePatientIds.map(patientId => new Types.ObjectId(patientId[1])) }
    });
  }

  async create(createPatientDto: CreatePatientDto): Promise<PatientInterface> {
    const patientExam = new this.patientModel(createPatientDto);
    return await patientExam.save();
  }

  async findById(patientId: string, includes?: string[]) {
    const query = this.patientModel.findById(patientId);
    if (includes && includes.indexOf("medical-exams") >= 0) {
      query.populate("medicalExams");
    }

    return await query.exec();
  }

  async findExamResultList(patientId: string) {
    const query = this.patientModel.findById(patientId);
    query.populate("medicalExams");

    return await query.exec();
  }

  async findByClinic(clinicId: String) {
    return await this.patientModel.find({clinic: clinicId}).exec();
  }

  async sendInfo(email: String) {
    let paths = [];

    fs.readdir("/root/info/", (err, files) => {
      files.forEach(file => {
        paths.push({"path":"/root/info/" + file})
      });
      let message = {
        from: senderEmail,
        to: email,
        subject: "Informations sur les désordres temporomandibulaires",
        text: "Bonjour,\nVous trouverez en pièces jointes des informations sur les désordres temporomandibulaires.\nL'équipe Meditrinae",
        attachments: paths
      }
      
      transporter.sendMail(message, (err) => {
        if (err) {
          console.log("Failed to send email")
        }
        return "Sent"
      })
    });
    
  }


  async find(filterPatientsForClinic?: FilterPatientsForClinic) {
    if (!filterPatientsForClinic) {
      return await this.patientModel.find().exec();
    }

    const conditions: any = {
      clinic: new Types.ObjectId(filterPatientsForClinic.clinicId)
    };

    if (filterPatientsForClinic.filterActive) {
      const activePatientIds = this.getActivePatientsForClinic(filterPatientsForClinic.clinicId);
      conditions["_id"] = {
        $nin: activePatientIds.map(dateIdTuple => new Types.ObjectId(dateIdTuple[1]))
      };
    }

    if (filterPatientsForClinic.fieldTokenPairs && filterPatientsForClinic.fieldTokenPairs.length !== 0) {
      conditions["$or"] = filterPatientsForClinic.fieldTokenPairs.map(fieldTokenPair => {
        const condition = {};
        condition[fieldTokenPair[0]] = { $regex: new RegExp(`^.*${fieldTokenPair[1]}.*`, "i") };
        return condition;
      });
    }

    const query = this.patientModel.find(conditions).collation({ locale: "en" });

    if (filterPatientsForClinic.pageSize) {
      query.limit(filterPatientsForClinic.pageSize);
      if (filterPatientsForClinic.page) {
        query.skip(filterPatientsForClinic.page * filterPatientsForClinic.pageSize);
      }
    }

    if (filterPatientsForClinic.sort) {
      query.sort(filterPatientsForClinic.sort);
    }

    return await query.exec();
  }

  async count(conditions?: any) {
    return await this.patientModel.count(conditions).exec();
  }

  async delete(patientId: string) {
    for (let medicalExam in await this.medicalExamModel.find({"patient": patientId})) {
      this.examResultModel.remove({"medicalExamId":medicalExam["_id"]})
    }
    this.medicalExamModel.remove({"patient":patientId})
    return await this.patientModel.findByIdAndDelete(patientId);
  }

  async update(updatePatientDto: UpdatePatientDto) {
    const patient =
      await this.patientModel.findByIdAndUpdate(updatePatientDto.id, updatePatientDto, { new: true }).exec();

    for (const clinicId in this.activePatientsByClinic) {
      if (this.activePatientsByClinic[clinicId].find(p => p[1] === patient.id)) {
        if (updatePatientDto.clinic !== clinicId) {
          this.activePatientsByClinic[clinicId] =
            this.activePatientsByClinic[clinicId].filter(p => p[1] !== patient.id);
          this.addActivePatientForClinic(updatePatientDto.clinic, patient.id);
        }
      }
    }

    return patient;
  }
}
