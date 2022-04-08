import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import FormAnswers from "../../models/form-answers.model";
import MedicalExamAnswers from "../../models/medical-exam-answers.model";
import { AnswersService } from "../../services/answers.service";

import { MedicalExamService } from "../../services/medical-exam.service";
import { AIService } from "../../services/ai.service";
import { DiagnosisResultsComponent } from "../../components/diagnosis-results/diagnosis-results.component";
import { TreatmentResultsComponent } from "../../components/treatment-results/treatment-results.component";
import { IMedicalExamUpdate } from "../../utils/requests-interfaces";
import { BackButtonPage } from "../back-button.page";

@Component({
    selector: "app-active-medical-exam-results",
    templateUrl: "./active-medical-exam-results.page.html",
    styleUrls: ["./active-medical-exam-results.page.scss"]
})
export class ActiveMedicalExamResultsPage extends BackButtonPage implements OnInit {
    @ViewChild(DiagnosisResultsComponent) public diagnosisResultsComponent: DiagnosisResultsComponent;
    @ViewChild(TreatmentResultsComponent) public treatmentResultsComponent: TreatmentResultsComponent;

    public isLoading = true;
    public submitIsDisabled = false;
    public diagnosisIsSelected = false;
    public treatmentIsSelected = false;
    public decisionTreeResults: string[][];
    public aiResults: string[][][];
    private patientId: string;
    private medicalExamId: string;
    private formResults4: FormAnswers;

    constructor(
        private medicalExamService: MedicalExamService,
        private answersService: AnswersService,
        private aiService: AIService,
        private route: ActivatedRoute,
        private navController: NavController
    ) {
        super();
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.patientId = params["patientId"];
            this.medicalExamId = params["medicalExamId"];

            this.answersService.answersForMedicalExamWithId(this.medicalExamId).then((medicalExamAnswers: MedicalExamAnswers) => {
                this.formResults4 = medicalExamAnswers.getFormAnswersForId("4");
                this.finishLoading();
            });

            this.decisionTreeService.getDecisionTreeResults(this.medicalExamId).then((decisionTreeResults: string[][]) => {
                this.decisionTreeResults = decisionTreeResults;
                this.finishLoading();
            });

            this.aiService.getAIResults(this.medicalExamId).then((aiResults: string[][][]) => {
                this.aiResults = aiResults;
                this.finishLoading();
            });
        });
    }

    public selectDiagnosis(isSelected: boolean) {
        this.diagnosisIsSelected = isSelected;
    }

    public selectTreatment(isSelected: boolean) {
        this.treatmentIsSelected = isSelected;
    }

    public submit() {
        this.submitIsDisabled = true;

        this.diagnosisResultsComponent.updateFormAnswers4();
        this.treatmentResultsComponent.updateFormResults4();

        let medicalExamUpdate: IMedicalExamUpdate = {
            id: this.medicalExamId,
            formsResults: [this.formResults4.toIFormAnswersUpdate()]
        };

        this.medicalExamService.updateMedicalExam(medicalExamUpdate).then(() => {
            this.navController.navigateBack("patients/" + this.patientId);
        });
    }

    private finishLoading() {
        if (this.formResults4 && this.decisionTreeResults && this.aiResults) {
            this.isLoading = false;
        }
    }
}
