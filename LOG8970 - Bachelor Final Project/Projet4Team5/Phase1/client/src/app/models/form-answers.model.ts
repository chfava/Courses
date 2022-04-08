import { IFormAnswers, IFormAnswersUpdate } from "../utils/requests-interfaces";
import { mapToObject, objectToMap, parseQuestionId } from "../utils/utils";
import Entity from "./abstract-entity.model";

export default class FormAnswers extends Entity {
    public constructor(id: string, private serverId: string = null, private data: Map<string, any> = new Map()) {
        super(id);
    }

    public static fromDto(dto: IFormAnswers): FormAnswers {
        return new FormAnswers(dto.formConfig, dto._id, dto.result ? objectToMap(dto.result) : new Map());
    }

    public get ServerId(): string {
        return this.serverId;
    }

    public get Data(): Map<string, Map<string, any>> {
        return this.data;
    }

    public getAnswerOfQuestionWithId(questionId: string): any {
        const ids = parseQuestionId(questionId);

        let map = this.data;
        let index = 0;
        for (const id of ids) {
            if (map.has(id)) {
                if (index === ids.length - 1) {
                    return map.get(id);
                }
                map = map.get(id);
            } else {
                return null;
            }
            index++;
        }

        return null;
    }

    public updateAnswerOfQuestionWithId(questionId: string, answer: any) {
        let ids = parseQuestionId(questionId);

        let map = this.data;

        ids.forEach((id: string, index: number) => {
            if (index === ids.length - 1) {
                map.set(id, answer);
            } else if (!map.has(id)) {
                map.set(id, new Map<string, any>());
                map = map.get(id);
            } else {
                map = map.get(id);
            }
        });
    }

    public toIFormAnswersUpdate(): IFormAnswersUpdate {
        return {
            id: this.ServerId,
            formConfig: this.Id,
            result: mapToObject(this.data)
        };
    }
}
