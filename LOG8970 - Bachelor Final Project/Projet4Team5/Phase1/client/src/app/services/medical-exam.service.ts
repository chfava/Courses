import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntityDataContainer } from "../models/entity-data-container.model";
import FormAnswers from "../models/form-answers.model";
import MedicalExamAnswers from "../models/medical-exam-answers.model";

import MedicalExam from "../models/medical-exam.model";
import { IFormAnswers, IMedicalExam, IMedicalExamCreation, IMedicalExamUpdate } from "../utils/requests-interfaces";
import { DataService } from "./data.service";
import { MeditrinaeApi } from "./meditrinae.api";

@Injectable({
    providedIn: "root"
})
export class MedicalExamService extends MeditrinaeApi {
    constructor(private httpClient: HttpClient, private dataService: DataService) {
        super("medical-exams");
    }

    public medicalExamWithId(medicalExamId: string): Promise<MedicalExam> {
        return new Promise((resolve, reject) => {
            let knownMedicalExam = this.dataService.medicalExamsContainer.elementWithId(medicalExamId);
            if (knownMedicalExam) {
                return resolve(knownMedicalExam);
            }

            this.loadMedicalExamWithId(medicalExamId)
                .then((medicalExam: MedicalExam) => {
                    resolve(medicalExam);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    public loadMedicalExamWithId(medicalExamId: string): Promise<MedicalExam> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get<IMedicalExam>(this.url(medicalExamId))
                .toPromise()
                .then((medicalExamDto: IMedicalExam) => {
                    let medicalExam = MedicalExam.fromDto(medicalExamDto);
                    this.dataService.medicalExamsContainer.register(medicalExam);
                    resolve(medicalExam);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public createMedicalExam(medicalExamCreation: IMedicalExamCreation): Promise<MedicalExam> {
        return new Promise(resolve => {
            this.httpClient
                .post<IMedicalExam>(this.url(), medicalExamCreation, {
                    headers: { "Content-Type": "application/json" }
                })
                .subscribe((medicalExamDTO: IMedicalExam) => {
                    let medicalExam = MedicalExam.fromDto(medicalExamDTO);
                    this.dataService.medicalExamsContainer.register(medicalExam);
                    this.loadAnswersOfMedicalExamWithId(medicalExam.Id).then(() => {
                        resolve(medicalExam);
                    });
                });
        });
    }

    public loadAnswersOfMedicalExamWithId(medicalExamId: string): Promise<MedicalExamAnswers> {
        return new Promise(resolve => {
            this.httpClient.get<IFormAnswers[]>(this.url(`${medicalExamId}/forms-results`)).subscribe((formsAnswersDto: IFormAnswers[]) => {
                let container = new EntityDataContainer<FormAnswers>();

                for (let formAnswersDto of formsAnswersDto) {
                    let formAnswers = FormAnswers.fromDto(formAnswersDto);
                    container.register(formAnswers);
                }
                let medicalExamAnswers = new MedicalExamAnswers(medicalExamId, container);
                this.dataService.medicalExamsAnswersContainer.register(medicalExamAnswers);

                resolve(medicalExamAnswers);
            });
        });
    }

    public updateMedicalExam(medicalExamUpdate: IMedicalExamUpdate): Promise<MedicalExam> {
        return new Promise(resolve => {
            this.httpClient
                .put<IMedicalExam>(this.url(), medicalExamUpdate, {
                    headers: { "Content-Type": "application/json" }
                })
                .subscribe((medicalExamDTO: IMedicalExam) => {
                    let medicalExam = MedicalExam.fromDto(medicalExamDTO);
                    this.dataService.medicalExamsContainer.register(medicalExam);
                    this.dataService.medicalExamsAnswersContainer.reset();
                    resolve(medicalExam);
                });
        });
    }

    public sortMedicalExamsIfNeeded(medicalExams: MedicalExam[]): MedicalExam[] {
        if (medicalExams.length > 1) {
            medicalExams.sort((a: MedicalExam, b: MedicalExam) => {
                return b.DateCreated.getTime() - a.DateCreated.getTime();
            });
        }

        return medicalExams;
    }
}
