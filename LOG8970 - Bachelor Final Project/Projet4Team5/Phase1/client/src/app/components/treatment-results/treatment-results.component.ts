import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from "@angular/core";

import { form4 } from "../../data/form4";
import FormAnswers from "../../models/form-answers.model";
import { RadioButtonQuestionComponent } from "../forms-components/radio-button-question/radio-button-question.component";
import { PatientTreatmentProposedByPracticianComponent }
    from "../patient-treatment-proposed-by-practician/patient-treatment-proposed-by-practician.component";

enum Treatment {
    AI = 0,
    Practician,
    None
}

@Component({
    selector: "app-treatment-results",
    templateUrl: "./treatment-results.component.html",
    styleUrls: ["./treatment-results.component.scss"]
})
export class TreatmentResultsComponent implements OnInit {
    @ViewChild(RadioButtonQuestionComponent) public radioSelectedTreatmentQuestionComponent: RadioButtonQuestionComponent;
    @ViewChild(PatientTreatmentProposedByPracticianComponent)
    public patientDiagnosisProposedByPracticianComponent: PatientTreatmentProposedByPracticianComponent;

    @Input() public formAnswers4: FormAnswers;
    @Input() public aiResults: string[][];
    @Output() public treatmentIsSelected = new EventEmitter<boolean>();

    public Treatment = Treatment;
    public displayedTreatment = Treatment.None;
    public selectedTreatment = Treatment.None;
    public treatmentChoices: string[][];
    public linkedQuestionIndexes = [3, 4, 5, 7];
    private formQuestion = 12;

    public ngOnInit() {
        const form4_12 = form4.form.section[6][this.formQuestion];
        this.treatmentChoices = [
            form4_12.subquestion[1].radio,
            form4_12.subquestion[2].checkbox,
            form4_12.subquestion[3].checkbox,
            form4_12.subquestion[4].checkbox,
            form4_12.subquestion[5].checkbox,
            form4_12.subquestion[6].checkbox,
            form4_12.subquestion[7].checkbox,
            form4_12.subquestion[8].checkbox
        ];
    }

    public switchContentShowed(newDisplayedTreatment: Treatment) {
        this.displayedTreatment = this.displayedTreatment === newDisplayedTreatment ? Treatment.None : newDisplayedTreatment;
    }

    public selectTreatment() {
        if (this.radioSelectedTreatmentQuestionComponent.answer !== undefined) {
            this.selectedTreatment = this.radioSelectedTreatmentQuestionComponent.answer;

            this.treatmentIsSelected.emit(true);
        }
    }

    public updateFormResults4() {
        switch (this.selectedTreatment) {
            case Treatment.AI:
                let indexOfQuestionAI = 1;
                this.aiResults.forEach(result => {
                    if (indexOfQuestionAI === 1) {
                        this.formAnswers4.updateAnswerOfQuestionWithId(
                            this.formQuestion + "/" + indexOfQuestionAI,
                            this.treatmentChoices[0].indexOf(result[0])
                        );
                    } else {
                        if (this.linkedQuestionIndexes.includes(indexOfQuestionAI)) {
                            this.formAnswers4.updateAnswerOfQuestionWithId(this.formQuestion + "/" + indexOfQuestionAI + "L", "");
                        }

                        let answer = result.map(treatment => {
                            const index = this.treatmentChoices[indexOfQuestionAI - 1].indexOf(treatment);
                            if (index !== -1) {
                                return index;
                            } else if (this.linkedQuestionIndexes.includes(indexOfQuestionAI)) {
                                this.formAnswers4.updateAnswerOfQuestionWithId(
                                    this.formQuestion + "/" + indexOfQuestionAI + "L",
                                    treatment
                                );
                            }
                        });
                        this.formAnswers4.updateAnswerOfQuestionWithId(this.formQuestion + "/" + indexOfQuestionAI, answer);
                    }
                    indexOfQuestionAI++;
                });
                break;
            case Treatment.Practician:
                this.patientDiagnosisProposedByPracticianComponent.updateFormResults4();
                break;
        }
    }
}
