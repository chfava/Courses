import { Injectable } from "@angular/core";
import MedicalExamAnswers from "../models/medical-exam-answers.model";
import { parseQuestionId } from "../utils/utils";

import { DataService } from "./data.service";
import { MedicalExamService } from "./medical-exam.service";

@Injectable({
    providedIn: "root"
})
export class AnswersService {
    constructor(private dataService: DataService, private medicalExamService: MedicalExamService) {}

    public answersForMedicalExamWithId(medicalExamId: string): Promise<MedicalExamAnswers> {
        return new Promise((resolve, reject) => {
            let knownAnswers = this.dataService.medicalExamsAnswersContainer.elementWithId(medicalExamId);
            if (knownAnswers) {
                return resolve(knownAnswers);
            }

            this.medicalExamService
                .loadAnswersOfMedicalExamWithId(medicalExamId)
                .then((answers: MedicalExamAnswers) => {
                    if (answers == null) {
                        this.dataService.medicalExamsAnswersContainer.register(new MedicalExamAnswers(medicalExamId));
                    }
                    resolve(answers);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    public getAnswerForQuestionWithId(fullId: string): Promise<any> {
        return new Promise(resolve => {
            let ids = parseQuestionId(fullId);
            let medicalExamId = ids.shift();
            let formId = ids.shift();

            this.answersForMedicalExamWithId(medicalExamId).then((answers: MedicalExamAnswers) => {
                resolve(answers.getFormAnswersForId(formId).getAnswerOfQuestionWithId(ids.join("/")));
            });
        });
    }

    public updateAnswerForQuestionWithId(fullId: string, answer: any) {
        let ids = parseQuestionId(fullId);
        let medicalExamId = ids.shift();
        let formId = ids.shift();

        this.answersForMedicalExamWithId(medicalExamId).then((answers: MedicalExamAnswers) => {
            answers.getFormAnswersForId(formId).updateAnswerOfQuestionWithId(ids.join("/"), answer);
        });
    }
}
