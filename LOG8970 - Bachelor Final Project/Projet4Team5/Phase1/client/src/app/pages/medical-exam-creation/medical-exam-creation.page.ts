import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, NavParams } from "@ionic/angular";
import MedicalExamAnswers from "../../models/medical-exam-answers.model";
import MedicalExam from "../../models/medical-exam.model";

import Practician from "../../models/practician.model";
import { AuthenticationService, Roles } from "../../services/authentication.service";
import { ClinicService } from "../../services/clinic.service";
import { MedicalExamService } from "../../services/medical-exam.service";
import { IMedicalExamCreation } from "../../utils/requests-interfaces";
import { dateToHtmlString } from "../../utils/utils";

@Component({
    selector: "app-medical-exam-creation",
    templateUrl: "./medical-exam-creation.page.html",
    styleUrls: ["./medical-exam-creation.page.scss"]
})
export class MedicalExamCreationPage implements OnInit {
    public isLoading = true;
    public medicalExamCreationForm: FormGroup;
    public practicians: Practician[];
    public answers: MedicalExamAnswers;

    constructor(
        private clinicService: ClinicService,
        private medicalExamService: MedicalExamService,
        private authService: AuthenticationService,
        private modalController: ModalController,
        private formBuilder: FormBuilder,
        private params: NavParams
    ) {}

    public ngOnInit() {
        this.clinicService.loadAllPracticiansOfClinic(this.authService.ClinicIdFromToken).then((practicians: Practician[]) => {
            this.practicians = practicians && practicians.length !== 0 ? practicians : null;
            const pastMedicalExamId: string = this.params.get("pastMedicalExamId");

            if (pastMedicalExamId) {
                this.medicalExamService.medicalExamWithId(pastMedicalExamId).then((medicalExam: MedicalExam) => {
                    this.initWithPastMedicalExam(medicalExam);
                });
            } else {
                this.initWithPastMedicalExam(null);
            }
        });
    }

    public get dateHtmlString(): string {
        return "Le " + dateToHtmlString(new Date());
    }

    public closeModal(data?: any): Promise<void> {
        return this.modalController.dismiss(data);
    }

    public onSubmit() {
        if (this.medicalExamCreationForm.invalid || this.params.get("patientId") == null) {
            return;
        }

        this.isLoading = true;
        let medicalExamCreation: IMedicalExamCreation = {
            patient: this.params.get("patientId"),
            practician: this.medicalExamCreationForm.controls.practicianId.value
        };

        if (this.answers) {
            medicalExamCreation.formsResults = this.answers.toArray();
        }

        this.medicalExamService.createMedicalExam(medicalExamCreation).then((medicalExam: MedicalExam) => {
            this.isLoading = false;
            this.closeModal(medicalExam);
        });
    }

    private initWithPastMedicalExam(pastMedicalExam: MedicalExam) {
        let selectedPracticianId = "";

        if (this.authService.RoleFromToken === Roles.Practician) {
            selectedPracticianId = this.authService.EmployeeFromToken._id;
        } else if (this.practicians && pastMedicalExam) {
            // Avoid selecting a deleted practician
            if (this.practicians.find(e => e.Id === pastMedicalExam.PracticianId)) {
                selectedPracticianId = pastMedicalExam.PracticianId;
            }
        }

        this.medicalExamCreationForm = this.formBuilder.group({
            date: [new Date().toISOString()],
            practicianId: [selectedPracticianId, Validators.required]
        });

        if (pastMedicalExam) {
            this.medicalExamService.loadAnswersOfMedicalExamWithId(pastMedicalExam.Id).then((answers: MedicalExamAnswers) => {
                this.answers = answers;
                this.isLoading = false;
            });
        } else {
            this.isLoading = false;
        }
    }
}
