import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import Form from "../../models/form.model";
import MedicalExam from "../../models/medical-exam.model";
import Patient from "../../models/patient.model";
import Practician from "../../models/practician.model";
import { FormService } from "../../services/form.service";
import { AnswersService } from "../../services/answers.service";
import { PatientService } from "../../services/patient.service";
import { MedicalExamService } from "../../services/medical-exam.service";
import { PracticianService } from "../../services/practician.service";
import { dateToHtmlString } from "../../utils/utils";

@Component({
    selector: "app-patient-mode-forms",
    templateUrl: "patient-mode-forms.page.html",
    styleUrls: ["patient-mode-forms.page.scss"]
})
export class PatientModeFormsPage implements OnInit {
    public patient: Patient;
    public practician: Practician;
    public patientForms: Form[];
    public medicalExamId: string;
    public submitIsDisabled = false;
    public answeredForms = new Set<string>();

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public answersService: AnswersService,
        public patientService: PatientService,
        public practicianService: PracticianService,
        public medicalExamService: MedicalExamService
    ) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            const patientId = params["patientId"];
            this.medicalExamId = params["medicalExamId"];

            this.medicalExamService.medicalExamWithId(this.medicalExamId).then((medicalExam: MedicalExam) => {
                this.patientService.patientWithId(patientId).then((patient: Patient) => {
                    this.patient = patient;
                });

                this.practicianService.practicianWithId(medicalExam.PracticianId).then((practician: Practician) => {
                    this.practician = practician;
                });
            });
        });

        this.patientForms = FormService.Forms;
    }

    public ionViewWillEnter() {
        this.setAnsweredForms();
    }

    public get currentDate(): string {
        return "Le " + dateToHtmlString(new Date());
    }

    public isAnswered(formId: string): boolean {
        return this.answeredForms.has(formId);
    }

    private setAnsweredForms() {
        this.answeredForms.clear();

        this.answersService.answersForMedicalExamWithId(this.medicalExamId).then(answers => {
            answers.Container.Map.forEach(answer => {
                if (answer.Data.size !== 0) {
                    this.answeredForms.add(answer.Id);
                }
            });
        });
    }
}
