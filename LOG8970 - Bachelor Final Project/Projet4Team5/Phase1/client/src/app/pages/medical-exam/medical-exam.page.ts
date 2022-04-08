import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { isArray } from "rxjs/internal-compatibility";

import { form4 } from "../../data/form4";
import Patient from "../../models/patient.model";
import { AnswersService } from "../../services/answers.service";
import MedicalExamAnswers from "../../models/medical-exam-answers.model";
import MedicalExam from "../../models/medical-exam.model";
import Practician from "../../models/practician.model";
import { MedicalExamService } from "../../services/medical-exam.service";
import { PatientService } from "../../services/patient.service";
import { PracticianService } from "../../services/practician.service";
import { MAIN_FORM_IDS } from "../../utils/constants";
import { dateToHtmlString } from "../../utils/utils";
import { BackButtonPage } from "../back-button.page";

@Component({
    selector: "app-medical-exam",
    templateUrl: "./medical-exam.page.html",
    styleUrls: ["./medical-exam.page.scss"]
})
export class MedicalExamPage extends BackButtonPage implements OnInit {
    public loading = { medicalExam: true, medicalExamAnswers: true };
    public medicalExam: MedicalExam;
    public medicalExamAnswers: MedicalExamAnswers;
    public patient: Patient;
    public practician: Practician;
    public selectedDiagnosisChoices: string[][];
    public selectedTreatmentChoices: string[][];
    public maximumOpeningWithHelp: number;
    public maximumOpeningWithoutHelp: number;
    public hideDiagnosis = true;
    public hideTreatment = true;
    public previousMedicalExamParam: Object;

    constructor(
        private practicianService: PracticianService,
        private patientService: PatientService,
        private medicalExamService: MedicalExamService,
        private answersService: AnswersService,
        private alertCtrl: AlertController,
        private route: ActivatedRoute,
        private navController: NavController
    ) {
        super();
        this.setBackButtonUrl(2);
    }

    public ngOnInit() {
        this.route.params.subscribe(async params => {
            let medicalExamId = params["medicalExamId"];
            const previousMedicalExamId = params["previousMedicalExamId"];

            this.previousMedicalExamParam = {};
            if (previousMedicalExamId) {
                this.previousMedicalExamParam = { previousMedicalExamId: previousMedicalExamId };
            }

            // Load medical exam and practician.
            this.loadMedicalExamAndPractician(medicalExamId);

            // Load medical exam answers and populate choices.
            this.loadMedicalExamAnswersAndPopulateChoices(medicalExamId);
        });
    }

    public get medicalExamDate(): string {
        return "Le " + dateToHtmlString(this.medicalExam.DateCreated);
    }

    public isLoading() {
        return this.loading.medicalExam || this.loading.medicalExamAnswers;
    }

    public clickToggleDiagnosis() {
        this.hideDiagnosis = !this.hideDiagnosis;
    }

    public clickToggleTreatment() {
        this.hideTreatment = !this.hideTreatment;
    }

    public getMainFormAnswers() {
        return this.medicalExamAnswers.toFormAnswersArray().filter(formAnswers => MAIN_FORM_IDS.includes(formAnswers.Id));
    }

    public getComplementaryFormAnswers() {
        return this.medicalExamAnswers.toFormAnswersArray().filter(formAnswers => !MAIN_FORM_IDS.includes(formAnswers.Id));
    }

    private loadMedicalExamAndPractician(medicalExamId: string) {
        this.loading.medicalExam = true;
        this.medicalExamService
            .medicalExamWithId(medicalExamId)
            .then(medicalExam => {
                this.medicalExam = medicalExam;

                this.patientService
                    .patientWithId(this.medicalExam.PatientId)
                    .then(patient => {
                        this.patient = patient;
                    })
                    .catch(() => {
                        this.showError("Impossible de charger le patient de l'examen médical.");
                        this.navController.navigateBack(this.backHref);
                    });

                this.practicianService
                    .loadPracticianWithId(this.medicalExam.PracticianId)
                    .then(practician => {
                        this.practician = practician;
                        this.loading.medicalExam = false;
                    })
                    .catch(() => {
                        this.showError("Impossible de charger le practicien responsable de l'examen médical.");
                        this.navController.navigateBack(this.backHref);
                    });
            })
            .catch(() => {
                this.showError("Impossible de charger l'examen médical.");
                this.navController.navigateBack(this.backHref);
            });
    }

    private loadMedicalExamAnswersAndPopulateChoices(medicalExamId: string) {
        this.loading.medicalExamAnswers = true;
        this.medicalExamService
            .loadAnswersOfMedicalExamWithId(medicalExamId)
            .then(medicalExamAnswers => {
                this.medicalExamAnswers = medicalExamAnswers;
                if (this.medicalExamAnswers.hasFormAnswersForId("4")) {
                    this.loadDiagnosisChoices();
                    this.loadTreatmentChoices();
                    this.loadMaximumOpeningValues();
                } else {
                    this.showError("Impossible de charger le diagnostic et le traitement du patient.");
                }
                this.loading.medicalExamAnswers = false;
            })
            .catch(() => {
                this.showError("Impossible de charger les formulaires de l'examen médical.");
                this.navController.navigateBack(this.backHref);
            });
    }

    private loadDiagnosisChoices() {
        this.selectedDiagnosisChoices = [];
        const form4_11 = form4.form.section[6][11];
        const diagnosisChoices = [form4_11.subquestion[1].checkbox, form4_11.subquestion[2].checkbox, form4_11.subquestion[3].checkbox];

        const formAnswers4 = this.medicalExamAnswers.getFormAnswersForId("4");
        diagnosisChoices.forEach((diagnosisChoice, index) => {
            let selectedDiagnosisChoice = formAnswers4.Data.get("11").get(String(index + 1));
            this.selectedDiagnosisChoices.push(
                diagnosisChoice.filter((textValue, subIndex) => {
                    return selectedDiagnosisChoice.indexOf(subIndex) >= 0;
                })
            );
        });
    }

    private loadTreatmentChoices() {
        this.selectedTreatmentChoices = [];
        const form4_12 = form4.form.section[6][12];
        const treatmentChoices = [
            form4_12.subquestion[1].radio,
            form4_12.subquestion[2].checkbox,
            form4_12.subquestion[3].checkbox,
            form4_12.subquestion[4].checkbox,
            form4_12.subquestion[5].checkbox,
            form4_12.subquestion[6].checkbox,
            form4_12.subquestion[7].checkbox,
            form4_12.subquestion[8].checkbox
        ];

        const formAnswers4 = this.medicalExamAnswers.getFormAnswersForId("4");
        treatmentChoices.forEach((treatmentChoice, index) => {
            let selectedTreatmentChoice = formAnswers4.Data.get("12").get(String(index + 1));
            if (!isArray(selectedTreatmentChoice)) {
                selectedTreatmentChoice = [selectedTreatmentChoice];
            }

            this.selectedTreatmentChoices.push(
                treatmentChoice.filter((textValue, subIndex) => {
                    return selectedTreatmentChoice.indexOf(subIndex) >= 0;
                })
            );
        });

        formAnswers4.Data.get("12").forEach((value, key: string) => {
            if (!key.endsWith("L") || typeof value !== "string" || value.length === 0) {
                return;
            }

            const treatmentChoiceIndex = key.substring(0, key.length - 1);
            this.selectedTreatmentChoices[treatmentChoiceIndex].push(value);
        });
    }

    private loadMaximumOpeningValues() {
        this.answersService.getAnswerForQuestionWithId(this.medicalExam.Id + "/4/4/B/0").then((answer: any) => {
            this.maximumOpeningWithoutHelp = answer;
        });
        this.answersService.getAnswerForQuestionWithId(this.medicalExam.Id + "/4/4/C/0").then((answer: any) => {
            this.maximumOpeningWithHelp = answer;
        });
    }

    private async showError(message: string) {
        const alert = await this.alertCtrl.create({
            header: "Erreur",
            message,
            buttons: ["OK"]
        });
        await alert.present();
    }
}
