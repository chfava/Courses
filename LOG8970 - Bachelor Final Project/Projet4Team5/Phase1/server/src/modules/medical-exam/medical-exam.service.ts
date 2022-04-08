import { Inject, Injectable } from "@nestjs/common";
import * as mongoose from "mongoose";
import { FormResultInterface } from "../form-result/form-result.interface";
import { FormResultService } from "../form-result/form-result.service";
import { CreateMedicalExamDto } from "./dto/create-medical-exam.dto";
import { UpdateMedicalExamDto } from "./dto/update-medical-exam.dto";
import { MedicalExamInterface } from "./medical-exam.interface";
import { ExamResultInterface } from "../exam-result/exam-result.interface";

@Injectable()
export class MedicalExamService {
  constructor(
    @Inject("MedicalExamModelToken")
    private readonly medicalExamModel: mongoose.Model<MedicalExamInterface>,
    private readonly formService: FormResultService,
    @Inject("FormResultModelToken")
    private readonly formResultModel: mongoose.Model<FormResultInterface>,
    @Inject("ExamResultModelToken")
    private readonly examResultModel: mongoose.Model<ExamResultInterface>
  ) {}

  async create(createMedicalExamDto: CreateMedicalExamDto): Promise<MedicalExamInterface> {
    let medicalExam = await this.medicalExamModel.create(createMedicalExamDto);

    medicalExam = await medicalExam.populate("patient").execPopulate();
    if (typeof medicalExam.patient !== "string" && medicalExam.patient.medicalExams) {
      medicalExam.patient.medicalExams.push(medicalExam.id);
      await medicalExam.patient.save();
    }

    return medicalExam;
  }

  async update(updateMedicalExamDto: UpdateMedicalExamDto) {
    const medicalExam = await this.medicalExamModel.findById(updateMedicalExamDto.id).exec();
    if (updateMedicalExamDto.diagnosis) {
      medicalExam.diagnosis = updateMedicalExamDto.diagnosis;
    }
    if (updateMedicalExamDto.patient) {
      medicalExam.patient = updateMedicalExamDto.patient;
    }
    if (updateMedicalExamDto.practician) {
      medicalExam.practician = updateMedicalExamDto.practician;
    }
    if (updateMedicalExamDto.treatment) {
      medicalExam.treatment = updateMedicalExamDto.treatment;
    }
    if (updateMedicalExamDto.examResultID) {
      medicalExam.examResultID = updateMedicalExamDto.examResultID;
    }
    /*
    let res = await this.formService.upsertMany(updateMedicalExamDto.formsResults);
    for (const upsertedId in res.upsertedIds) {
      if (res.upsertedIds.hasOwnProperty(upsertedId)) {
        medicalExam.formsResults.push(res.upsertedIds[upsertedId]);
      }
    }

    //res = await this.examService.upsertMany(updateMedicalExamDto.examResults);
    for (const upsertedId in res.upsertedIds) {
      if (res.upsertedIds.hasOwnProperty(upsertedId)) {
        medicalExam.examResults.push(res.upsertedIds[upsertedId]);
      }
    } */

    return medicalExam.save();
  }

  async findById(medicalExamId: string, includes?: string[]) {
    const query = this.medicalExamModel.findById(medicalExamId);
    if (includes && includes.indexOf("forms-results") >= 0) {
      query.populate("formsResults");
    }
    if (includes && includes.indexOf("exam-results") >= 0) {
      query.populate("examResultID");
    }

    const medicalExam = await query.exec();

    return await medicalExam;
  }

  async getSpecificFormResultsForMedicalExamId(medicalExamId: string, formConfig: string) {
    const medicalExam = await this.medicalExamModel.findById(medicalExamId).exec();

    const form4 = await this.formService.findOne({
      _id: { $in: medicalExam.formsResults },
      formConfig // TODO à changer après la migration des forms au backend
    });
    return form4;
  }

  async getAllLastExamResultsByPatient() {
    // first, get all the latest form ids for each patient
    const query = this.medicalExamModel.aggregate([
      // sort by patient and date
      { $sort: { patient: 1, dateCreated: -1 } },
      {
        $group: {
          _id: "$patient",
          items: { $push: "$examResultID" }
        }
      },
      // slice to only keep latest date
      { $project: { examResultIds: { $slice: ["$items", 1] } } },
      {
        $unwind: "$examResultID"
      }
    ]);

    const allExamResultIdsByPatient = await query.exec();

    let allExamResultsIds = [];

    // only keep the form ids we need
    allExamResultIdsByPatient.forEach(patient => {
      allExamResultsIds = allExamResultsIds.concat(patient.examResultIds);
    });

    // get the results associated to each id
    const allExamResults = await this.examResultModel.find({ _id: { $in: allExamResultsIds } });
    const allExamResultsByPatient = [];

    // associate each formResult to its corresponding patient by id
    allExamResultIdsByPatient.forEach(patient => {
      const patientResults = [];
      patient.examResultIds.forEach(id => {
        allExamResults.forEach(result => {
          // if patient id matches a form result's patient's id, they go together
          if (String(id) === String(result._id)) {
            patientResults.push(result);
          }
        });
      });
      allExamResultsByPatient.push(patientResults);
    });
    return allExamResultsByPatient;
  }
}
