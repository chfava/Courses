import { AlertController, NavController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

import Form from "../../models/form.model";
import Patient from "../../models/patient.model";
import Practician from "../../models/practician.model";
import { PatientService } from "../../services/patient.service";
import { PracticianService } from "../../services/practician.service";
import { dateToHtmlString } from "../../utils/utils";
import { BackButtonPage } from "../back-button.page";
import MedicalExam from "../../models/medical-exam.model";
import MedicalExamAnswers from "../../models/medical-exam-answers.model";
import { FormService } from "../../services/form.service";
import { AnswersService } from "../../services/answers.service";
import { MedicalExamService } from "../../services/medical-exam.service";
import { IMedicalExamUpdate } from "../../utils/requests-interfaces";
import { AuthenticationService, Roles } from "../../services/authentication.service";

@Component({
    selector: "app-active-medical-exam",
    templateUrl: "./active-medical-exam.page.html",
    styleUrls: ["./active-medical-exam.page.scss"]
})
export class ActiveMedicalExamPage extends BackButtonPage implements OnInit, AfterViewInit {
    public isFirstLoading = true;
    public isLoadingMedicalExam = false;
    public isLoadingAnswers = false;
    public isSubmitting = false;
    public isPractician: boolean;

    public forms: Form[];
    public medicalExamId: string;
    public medicalExam: MedicalExam;
    public medicalExamAnswers: MedicalExamAnswers;
    public previousMedicalExamId: string;
    public answeredForms = new Set<string>();

    public patientId: string;
    public patient: Patient;
    public practician: Practician;

    public mainForms: Form[];
    public complementaryForms: Form[];

    public mainFormsElement: HTMLIonListElement;
    public complementaryFormsElement: HTMLIonListElement;
    @ViewChild("mainFormsElementRef", { read: ElementRef }) public mainFormsElementRef: ElementRef;
    @ViewChild("complementaryFormsElementRef", { read: ElementRef }) public complementaryFormsElementRef: ElementRef;

    constructor(
        private medicalExamService: MedicalExamService,
        private answersService: AnswersService,
        private practicianService: PracticianService,
        private patientService: PatientService,
        private authService: AuthenticationService,
        private alertController: AlertController,
        private navController: NavController,
        private route: ActivatedRoute,
        public router: Router
    ) {
        super();
        this.setBackButtonUrl(3);
    }

    public ngOnInit() {
        this.isPractician = this.authService.RoleFromToken === Roles.Practician;
        this.isFirstLoading = true;
        this.isLoadingMedicalExam = true;
        this.isLoadingAnswers = true;
        this.mainForms = FormService.MainForms;
        this.complementaryForms = FormService.ComplementaryForms;

        this.route.params.subscribe(params => {
            this.medicalExamId = params["medicalExamId"];
            this.patientId = params["patientId"];
            this.previousMedicalExamId = params["previousMedicalExamId"];

            this.refreshData();
        });
    }

    public ngAfterViewInit() {
        this.mainFormsElement = this.mainFormsElementRef.nativeElement as HTMLIonListElement;
        this.complementaryFormsElement = this.complementaryFormsElementRef.nativeElement as HTMLIonListElement;
    }

    public ionViewWillEnter() {
        this.setAnsweredForms();
    }

    public get currentDate(): string {
        return "Le " + dateToHtmlString(this.medicalExam.DateCreated);
    }

    public enterPatientModeFlow() {
        const fullName = this.authService.EmployeeFromToken.firstName + " " + this.authService.EmployeeFromToken.lastName;
        localStorage.setItem("fullName", fullName);
        this.authService.saveUsernameToStorage();
        this.authService.logout();

        let previousMedicalExamParam = {};
        if (this.previousMedicalExamId) {
            previousMedicalExamParam = { previousMedicalExamId: this.previousMedicalExamId };
        }

        this.router.navigate([this.url + "/patient-mode/pre", previousMedicalExamParam]);
    }

    public clickSubmit() {
        if (this.isPractician) {
            if (!this.isSubmitting) {
                this.isSubmitting = true;

                this.answersService.answersForMedicalExamWithId(this.medicalExam.Id).then((answers: MedicalExamAnswers) => {
                    answers.includeForm4IfUnanswered();
                    let medicalExamUpdate: IMedicalExamUpdate = {
                        id: this.medicalExam.Id,
                        patient: this.medicalExam.PatientId,
                        practician: this.medicalExam.PracticianId,
                        formsResults: answers.toArray()
                    };

                    this.medicalExamService
                        .updateMedicalExam(medicalExamUpdate)
                        .then((medicalExam: MedicalExam) => {
                            this.router.navigate(["patients/" + this.patient.Id + "/medical-exams/" + medicalExam.Id + "/active/results"]);
                        })
                        .catch(() => {
                            this.presentGenericErrorAlert();
                        })
                        .finally(() => {
                            this.isSubmitting = false;
                        });
                });
            }
        } else {
            this.presentPermissionsErrorAlert();
        }
    }

    public routeToFormWithId(formId: string) {
        let previousMedicalExamParam = {};
        if (this.previousMedicalExamId) {
            previousMedicalExamParam = { previousMedicalExamId: this.previousMedicalExamId };
        }
        this.router.navigate([`/${this.url}/form/${formId}`, previousMedicalExamParam]);
    }

    public isAnswered(formId: string): boolean {
        return this.answeredForms.has(formId);
    }

    public doRefresh(event?) {
        if (this.isPractician) {
            this.confirmRefreshData(event);
        } else {
            this.refreshData(event);
        }
    }

    public async navigateBack() {
        const alert = await this.alertController.create({
            header: "Quitter l'examen médical?",
            subHeader: "Toutes les données non enregistrées seront perdues.",
            buttons: [
                {
                    text: "Annuler",
                    role: "cancel"
                },
                {
                    text: "Quitter",
                    handler: data => this.goBack()
                }
            ]
        });
        await alert.present();
    }

    private async confirmRefreshData(event?) {
        const alert = await this.alertController.create({
            header: "Mettre à jour les données?",
            subHeader: "Toutes les données non enregistrées seront écrasées",
            buttons: [
                {
                    text: "Annuler",
                    role: "cancel",
                    handler: data => this.didFinishLoading(event)
                },
                {
                    text: "Mettre à jour",
                    handler: data => this.refreshData(event)
                }
            ]
        });
        await alert.present();
    }

    private goBack() {
        this.navController.navigateBack(this.backHref);
    }

    private didFinishLoading(event?) {
        if (!this.isLoadingAnswers && !this.isLoadingMedicalExam) {
            this.isFirstLoading = false;
            this.setAnsweredForms();

            if (event) {
                event.target.complete();
            }
        }
    }

    private refreshData(event?) {
        this.isLoadingMedicalExam = true;
        this.isLoadingAnswers = true;

        if (!this.previousMedicalExamId) {
            // remove monitoring form
            this.mainForms = this.mainForms.filter(form => form.Id !== "14");
        }

        this.medicalExamService.loadMedicalExamWithId(this.medicalExamId).then((medicalExam: MedicalExam) => {
            this.medicalExam = medicalExam;
            this.practicianService.loadPracticianWithId(medicalExam.PracticianId).then((practician: Practician) => {
                this.practician = practician;
                this.isLoadingMedicalExam = false;
                this.didFinishLoading(event);
            });

            this.patientService.patientWithId(this.patientId).then((patient: Patient) => {
                this.patient = patient;
            });
        });

        this.medicalExamService.loadAnswersOfMedicalExamWithId(this.medicalExamId).then((answers: MedicalExamAnswers) => {
            this.medicalExamAnswers = answers;
            this.isLoadingAnswers = false;
            this.didFinishLoading(event);
        });
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

    private async presentGenericErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Une erreur est survenue. Veuillez réessayer.",
            buttons: ["OK"]
        });
        await alert.present();
    }

    private async presentPermissionsErrorAlert() {
        const alert = await this.alertController.create({
            header: "Impossible",
            subHeader:
                "Vous n'avez pas les permissions pour soumettre un examen médical. " +
                "Seulement un praticien est autorisé à modifier ces informations.",
            buttons: [
                {
                    text: "Annuler",
                    role: "cancel"
                }
            ]
        });
        await alert.present();
    }
}
