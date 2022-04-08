import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from "@angular/core";

import { form4 } from "../../data/form4";
import FormAnswers from "../../models/form-answers.model";
import { RadioButtonQuestionComponent } from "../forms-components/radio-button-question/radio-button-question.component";
import { PatientDiagnosisProposedByPracticianComponent }
    from "../patient-diagnosis-proposed-by-practician/patient-diagnosis-proposed-by-practician.component";

enum Diagnosis {
    DecisionTree = 0,
    AI,
    Practician,
    None
}

@Component({
    selector: "app-diagnosis-results",
    templateUrl: "./diagnosis-results.component.html",
    styleUrls: ["./diagnosis-results.component.scss"]
})
export class DiagnosisResultsComponent implements OnInit {
    @ViewChild(RadioButtonQuestionComponent) public radioSelectedDiagnosisQuestionComponent: RadioButtonQuestionComponent;
    @ViewChild(PatientDiagnosisProposedByPracticianComponent)
    public patientDiagnosisProposedByPracticianComponent: PatientDiagnosisProposedByPracticianComponent;

    @Input() public formAnswers4: FormAnswers;
    @Input() public decisionTreeResults: string[][];
    @Input() public aiResults: string[][];
    @Output() public diagnosisIsSelected = new EventEmitter<boolean>();

    public Diagnosis = Diagnosis;
    public displayedDiagnosis = Diagnosis.None;
    public selectedDiagnosis = Diagnosis.None;
    public diagnosisChoices: string[][];
    private formQuestion = 11;

    public ngOnInit() {
        const form4_11 = form4.form.section[6][this.formQuestion];
        this.diagnosisChoices = [form4_11.subquestion[1].checkbox, form4_11.subquestion[2].checkbox, form4_11.subquestion[3].checkbox];
    }

    public switchContentShowed(newDisplayedDiagnosis: Diagnosis) {
        this.displayedDiagnosis = this.displayedDiagnosis === newDisplayedDiagnosis ? Diagnosis.None : newDisplayedDiagnosis;
    }

    public selectDiagnosis() {
        if (this.radioSelectedDiagnosisQuestionComponent.answer !== undefined) {
            this.selectedDiagnosis = this.radioSelectedDiagnosisQuestionComponent.answer;

            this.diagnosisIsSelected.emit(true);
        }
    }

    public updateFormAnswers4() {
        switch (this.selectedDiagnosis) {
            case Diagnosis.DecisionTree:
                this.updateFormAnswers4WithDecisionTreeOrAIResult(this.decisionTreeResults);
                break;
            case Diagnosis.AI:
                this.updateFormAnswers4WithDecisionTreeOrAIResult(this.aiResults);
                break;
            case Diagnosis.Practician:
                this.patientDiagnosisProposedByPracticianComponent.updateFormResults4();
                break;
        }
    }

    private updateFormAnswers4WithDecisionTreeOrAIResult(decisionTreeOrAIResults: string[][]) {
        let indexOfQuestion = 1;
        decisionTreeOrAIResults.forEach(result => {
            let answer = result.map(diagnosis => {
                return this.diagnosisChoices[indexOfQuestion - 1].indexOf(diagnosis);
            });
            this.formAnswers4.updateAnswerOfQuestionWithId(this.formQuestion + "/" + indexOfQuestion, answer);
            indexOfQuestion++;
        });
    }
}
