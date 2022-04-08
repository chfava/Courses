import { Component, Input, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import FormAnswers from "../../models/form-answers.model";

import { CheckboxQuestionComponent } from "../forms-components/checkbox-question/checkbox-question.component";
import { InputQuestionComponent } from "../forms-components/input-question/input-question.component";
import { RadioButtonQuestionComponent } from "../forms-components/radio-button-question/radio-button-question.component";

@Component({
    selector: "app-patient-treatment-proposed-by-practician",
    templateUrl: "./patient-treatment-proposed-by-practician.component.html",
    styleUrls: ["./patient-treatment-proposed-by-practician.component.scss"]
})
export class PatientTreatmentProposedByPracticianComponent implements AfterViewInit {
    @ViewChildren(CheckboxQuestionComponent) public checkboxComponents: QueryList<CheckboxQuestionComponent>;
    @ViewChildren(InputQuestionComponent) public inputComponents: QueryList<InputQuestionComponent>;
    @ViewChild(RadioButtonQuestionComponent) public radioTreatmentQuestionComponent: RadioButtonQuestionComponent;

    @Input() public formAnswers4: FormAnswers;
    @Input() public hideContent: boolean;
    @Input() public treatmentChoices: string[][];
    @Input() public linkedQuestionIndexes: number[];

    private formQuestion = 12;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    public ngAfterViewInit() {
        let indexOfQuestion = 1;

        this.radioTreatmentQuestionComponent.answer = this.formAnswers4.getAnswerOfQuestionWithId(
            this.formQuestion + "/" + indexOfQuestion
        );
        indexOfQuestion++;

        this.checkboxComponents.forEach(checkboxComponent => {
            checkboxComponent.answer = this.formAnswers4.getAnswerOfQuestionWithId(this.formQuestion + "/" + indexOfQuestion);
            indexOfQuestion++;
        });

        this.inputComponents.forEach((input, index) => {
            let answer = this.formAnswers4.getAnswerOfQuestionWithId(this.formQuestion + "/" + this.linkedQuestionIndexes[index] + "L");
            if (answer) {
                input.answer = answer;
            }
        });

        this.changeDetectorRef.detectChanges();
    }

    public stopPropagation(event: MouseEvent) {
        event.stopPropagation();
    }

    public updateFormResults4() {
        let indexOfQuestion = 1;

        if (this.radioTreatmentQuestionComponent.answer !== undefined) {
            this.formAnswers4.updateAnswerOfQuestionWithId(
                this.formQuestion + "/" + indexOfQuestion,
                this.radioTreatmentQuestionComponent.answer
            );
        }
        indexOfQuestion++;

        this.checkboxComponents.forEach(checkboxComponent => {
            this.formAnswers4.updateAnswerOfQuestionWithId(this.formQuestion + "/" + indexOfQuestion, checkboxComponent.answer);
            indexOfQuestion++;
        });

        this.inputComponents.forEach((input, index) => {
            let answer = "";
            if (input.answer) {
                answer = input.answer;
            }
            this.formAnswers4.updateAnswerOfQuestionWithId(this.formQuestion + "/" + this.linkedQuestionIndexes[index] + "L", answer);
        });
    }
}
