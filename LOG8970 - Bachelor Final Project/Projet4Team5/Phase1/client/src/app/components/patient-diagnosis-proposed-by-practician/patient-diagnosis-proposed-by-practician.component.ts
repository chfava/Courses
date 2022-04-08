import { Component, Input, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import FormAnswers from "../../models/form-answers.model";

import { CheckboxQuestionComponent } from "../forms-components/checkbox-question/checkbox-question.component";

@Component({
    selector: "app-patient-diagnosis-proposed-by-practician",
    templateUrl: "./patient-diagnosis-proposed-by-practician.component.html",
    styleUrls: ["./patient-diagnosis-proposed-by-practician.component.scss"]
})
export class PatientDiagnosisProposedByPracticianComponent implements AfterViewInit {
    @ViewChildren(CheckboxQuestionComponent) public checkboxComponents: QueryList<CheckboxQuestionComponent>;

    @Input() public formAnswers4: FormAnswers;
    @Input() public hideContent: boolean;
    @Input() public diagnosisChoices: string[][];

    private formQuestion = 11;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    public ngAfterViewInit() {
        let indexOfQuestion = 1;
        this.checkboxComponents.forEach(checkboxComponent => {
            checkboxComponent.answer = this.formAnswers4.getAnswerOfQuestionWithId(this.formQuestion + "/" + indexOfQuestion);
            indexOfQuestion++;
        });

        this.changeDetectorRef.detectChanges();
    }

    public stopPropagation(event: MouseEvent) {
        event.stopPropagation();
    }

    public updateFormResults4() {
        let indexOfQuestion = 1;
        this.checkboxComponents.forEach(checkboxComponent => {
            this.formAnswers4.updateAnswerOfQuestionWithId(this.formQuestion + "/" + indexOfQuestion, checkboxComponent.answer);
            indexOfQuestion++;
        });
    }
}
