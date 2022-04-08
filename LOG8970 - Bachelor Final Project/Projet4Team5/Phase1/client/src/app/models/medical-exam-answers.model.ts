import { IFormAnswersUpdate, IMedicalExam } from "../utils/requests-interfaces";
import Entity from "./abstract-entity.model";
import { EntityDataContainer } from "./entity-data-container.model";
import FormAnswers from "./form-answers.model";

export default class MedicalExamAnswers extends Entity {
    public constructor(id: string, private container: EntityDataContainer<FormAnswers> = new EntityDataContainer()) {
        super(id);
    }

    public static fromDto(dto: IMedicalExam): MedicalExamAnswers {
        return new MedicalExamAnswers(dto._id);
    }

    public get Container(): EntityDataContainer<FormAnswers> {
        return this.container;
    }

    public getFormAnswersForId(formId: string): FormAnswers {
        if (!this.container.hasElementWithId(formId)) {
            this.container.register(new FormAnswers(formId));
        }

        return this.container.elementWithId(formId);
    }

    public hasFormAnswersForId(formId: string) {
        return this.container.hasElementWithId(formId);
    }

    public includeForm4IfUnanswered() {
        // This method is necessary for the ActiveMedicalExamResultsPage. Form 4 must exist in db.

        const formId = "4";
        let formAnswer = this.getFormAnswersForId(formId);

        if (!formAnswer) {
            this.container.register(new FormAnswers(formId));
        }

        for (let i = 1; i <= 3; ++i) {
            const questionId = "11/" + i;
            if (!formAnswer.getAnswerOfQuestionWithId(questionId)) {
                formAnswer.updateAnswerOfQuestionWithId(questionId, []);
            }
        }

        for (let i = 2; i <= 8; ++i) {
            const questionId = "12/" + i;
            if (!formAnswer.getAnswerOfQuestionWithId(questionId)) {
                formAnswer.updateAnswerOfQuestionWithId(questionId, []);
            }
        }
    }

    public toArray(): IFormAnswersUpdate[] {
        let array: IFormAnswersUpdate[] = [];

        this.container.Map.forEach((value: FormAnswers) => {
            array.push(value.toIFormAnswersUpdate());
        });

        return array;
    }

    public toFormAnswersArray(): FormAnswers[] {
        return this.container.toArray();
    }
}
