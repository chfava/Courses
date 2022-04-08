import { KeyValue } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

import { orderedFormQuestionsByKeyAsc } from "../../../utils/utils";
import { AnswersService } from "../../../services/answers.service";

@Component({
    selector: "complete-question",
    templateUrl: "./complete-question.component.html",
    styleUrls: ["./complete-question.component.scss"]
})
export class CompleteQuestionComponent implements OnInit {
    @Input() public id: string;
    @Input() public previousMedicalExamId: string;
    @Input() public question: any;
    @Input() public form2displayed: boolean;
    @Input() public form4displayed: boolean;
    public shouldDisplay: Map<string, boolean>;
    public isInitialized: boolean;

    private count = 0;
    private expectedCount = 0;

    constructor(private answersService: AnswersService) {}

    public ngOnInit(): void {
        this.isInitialized = false;
        this.shouldDisplay = new Map();

        if (this.question.subquestion && this.previousMedicalExamId) {
            // answers should already be loaded by form.page
            this.answersService.answersForMedicalExamWithId(this.previousMedicalExamId).then(() => {
                this.expectedCount = Object.keys(this.question.subquestion).length;

                if (this.expectedCount === 0) {
                    this.isInitialized = true;
                    return;
                }

                for (let key of Object.keys(this.question.subquestion)) {
                    const subquestion = this.question.subquestion[key];
                    if (subquestion) {
                        let observedQuestionId = subquestion.observedQuestionId;
                        if (observedQuestionId === undefined) {
                            this.setShouldDiplay(key, true);
                            continue;
                        }

                        let splitObservedQuestionId = observedQuestionId.split(".");
                        let baseQuestionId = splitObservedQuestionId[0];
                        let subQuestionId = splitObservedQuestionId[1];

                        // Answers are loaded.
                        this.answersService
                            .getAnswerForQuestionWithId(this.previousMedicalExamId + "/" + baseQuestionId)
                            .then((answer: any) => {
                                if (answer === "") {
                                    this.setShouldDiplay(key, false);
                                    return;
                                }

                                if (answer == null) {
                                    this.setShouldDiplay(key, false);
                                    return;
                                }

                                if (subQuestionId === undefined) {
                                    this.question.subquestion[key].question = answer;
                                    this.setShouldDiplay(key, true);
                                    return;
                                }

                                this.setShouldDiplay(key, answer.indexOf(parseInt(subQuestionId, 10)) > -1);
                            });
                    }
                }
            });
        } else {
            this.isInitialized = true;
        }
    }

    public orderedByKeyAsc(a: KeyValue<string, Object>, b: KeyValue<string, Object>): number {
        return orderedFormQuestionsByKeyAsc(a, b);
    }

    public displayQuestion(): boolean {
        if (this.question.subquestion && this.previousMedicalExamId) {
            if (this.expectedCount === 0) {
                return false;
            }

            for (let key of Object.keys(this.question.subquestion)) {
                if (this.displaySubquestion(key)) {
                    return true;
                }
            }

            return false;
        }
        return true;
    }

    public displaySubquestion(key: string): boolean {
        if (!this.shouldDisplay.has(key)) {
            return true;
        }

        return this.shouldDisplay.get(key);
    }

    private setShouldDiplay(key: string, value: boolean) {
        this.count++;
        this.shouldDisplay.set(key, value);

        if (this.count >= this.expectedCount) {
            this.isInitialized = true;
        }
    }
}
