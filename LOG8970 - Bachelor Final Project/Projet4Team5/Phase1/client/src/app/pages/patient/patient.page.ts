import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, ModalController, NavController } from "@ionic/angular";

import Clinic from "../../models/clinic.model";
import MedicalExam from "../../models/medical-exam.model";
import Patient from "../../models/patient.model";
import { AuthenticationService, Roles } from "../../services/authentication.service";
import { MedicalExamService } from "../../services/medical-exam.service";
import { PatientService } from "../../services/patient.service";
import { IPatientUpdate } from "../../utils/requests-interfaces";
import { BackButtonPage } from "../back-button.page";
import { MedicalExamCreationPage } from "../medical-exam-creation/medical-exam-creation.page";
import { ClinicService } from "../../services/clinic.service";

@Component({
    selector: "app-patient",
    templateUrl: "patient.page.html",
    styleUrls: ["patient.page.scss"]
})
export class PatientPage extends BackButtonPage implements OnInit {
    constructor(
        private patientService: PatientService,
        private authService: AuthenticationService,
        private medicalExamService: MedicalExamService,
        private clinicService: ClinicService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private navController: NavController,
        private modalController: ModalController,
        public router: Router
    ) {
        super();
    }

    public patient: Patient;
    public clinics: Clinic[];
    public pastMedicalExams: MedicalExam[];
    public activeMedicalExam: MedicalExam;
    public allMedicalExams: MedicalExam[];

    public isLoadingMedicalExams = true;
    public isEditable = false;
    public isUpdatingInfo = false;
    public patientInfoForm: FormGroup;
    private numberOfFailedDelete: number;

    public ngOnInit() {
        this.initializeForm();

        this.route.params.subscribe(params => {
            let patientId = params["patientId"];
            this.patientService
                .patientWithId(patientId)
                .then((patient: Patient) => {
                    this.patient = patient;

                    this.clinicService.loadClinicWithId(this.authService.ClinicIdFromToken).then((clinic: Clinic) => {
                        this.clinics = [clinic];
                        this.doRefresh(true);
                        this.resetFormValues();
                    });
                })
                .catch(() => {
                    this.presentErrorLoadingPatientAlert();
                });
        });
    }

    public ionViewWillEnter() {
        this.numberOfFailedDelete = 0;

        if (this.isEditable) {
            this.cancelEdit();
        }
    }

    public doRefresh(shouldShowSpinner: boolean, event?) {
        this.isLoadingMedicalExams = shouldShowSpinner;

        this.patientService.loadMedicalExamsForPatientWithId(this.patient.Id).then((allMedicalExams: MedicalExam[]) => {
            let sortedMedicalExams = this.medicalExamService.sortMedicalExamsIfNeeded(allMedicalExams);

            this.allMedicalExams = [].concat(sortedMedicalExams);

            if (sortedMedicalExams.length > 0 && sortedMedicalExams[0].isActive) {
                this.activeMedicalExam = sortedMedicalExams.shift();
            } else {
                this.activeMedicalExam = null;
            }

            this.pastMedicalExams = sortedMedicalExams;
            this.isLoadingMedicalExams = false;
            if (event) {
                event.target.complete();
            }
        });
    }

    public async showMedicalExamCreationPage() {
        let modal = await this.modalController.create({
            component: MedicalExamCreationPage,
            componentProps: {
                patientId: this.patient.Id,
                pastMedicalExamId: this.pastMedicalExams && this.pastMedicalExams[0] ? this.pastMedicalExams[0].Id : null
            }
        });
        modal.onDidDismiss().then(data => {
            if (data["data"]) {
                this.activeMedicalExam = <MedicalExam>data["data"];
                this.allMedicalExams.unshift(this.activeMedicalExam);

                let previousMedicalExamParam = {};
                if (this.allMedicalExams.length > 1) {
                    previousMedicalExamParam = { previousMedicalExamId: this.allMedicalExams[1].Id };
                }

                setTimeout(() => {
                    this.router.navigate([
                        this.router.url + "/medical-exams/" + this.activeMedicalExam.Id + "/active",
                        previousMedicalExamParam
                    ]);
                }, 314);
            }
        });

        await modal.present();
    }

    public edit() {
        this.isEditable = true;
        this.clinicService.loadAllClinics().then((clinics: Clinic[]) => {
            this.clinics = clinics;
        });
    }

    public cancelEdit() {
        this.resetFormValues();
        this.isEditable = false;
    }

    public isPractician(): boolean {
        return this.authService.hasPermissions([Roles.Practician]);
    }

    public saveModifications() {
        if (this.patientInfoForm.invalid) {
            if (
                this.patientInfoForm.controls.firstName.invalid ||
                this.patientInfoForm.controls.lastName.invalid ||
                this.patientInfoForm.controls.dateOfBirth.invalid ||
                this.patientInfoForm.controls.gender.invalid
            ) {
                this.presentInvalidFormErrorAlert();
            } else if (this.patientInfoForm.controls.email.invalid) {
                this.presentInvalidEmailErrorAlert();
            }
            return;
        }

        this.isUpdatingInfo = true;

        let updatedPatient: IPatientUpdate = {
            id: this.patient.Id,
            address: this.patientInfoForm.controls.address.value,
            dateOfBirth: new Date(Date.parse(this.patientInfoForm.controls.dateOfBirth.value)),
            email: this.patientInfoForm.controls.email.value,
            firstName: this.patientInfoForm.controls.firstName.value,
            gender: this.patientInfoForm.controls.gender.value,
            lastName: this.patientInfoForm.controls.lastName.value,
            note: this.patientInfoForm.controls.notes.value,
            clinic: this.patientInfoForm.controls.clinic.value
        };

        this.patientService
            .updatePatientInfo(updatedPatient)
            .then((patient: Patient) => {
                this.patient = patient;
                this.isEditable = false;
                this.isUpdatingInfo = false;
                if (this.authService.ClinicIdFromToken !== patient.Clinic) {
                    this.navController.navigateBack(this.backHref);
                }
            })
            .catch(() => {
                this.presentGenericErrorAlert();
            });
    }

    public async presentDeletePatientAlert() {
        const alert = await this.alertController.create({
            header: "Supprimer le patient",
            subHeader: "Entrez votre mot de passe afin de confirmer la suppression du patient",
            cssClass: "delete-patient-alert",
            inputs: [
                {
                    name: "username",
                    placeholder: "Nom d'utilisateur",
                    disabled: true,
                    value: this.authService.UsernameFromToken
                },
                {
                    name: "password",
                    placeholder: "Mot de passe",
                    type: "password"
                }
            ],
            buttons: [
                {
                    text: "Annuler",
                    role: "cancel"
                },
                {
                    text: "Supprimer",
                    handler: data => this.deletePatient(data)
                }
            ]
        });
        await alert.present();
    }

    private deletePatient(credentials: any) {
        this.patientService
            .deletePatient(credentials.username, credentials.password, this.patient)
            .then(() => {
                this.numberOfFailedDelete = 0;
                this.presentSuccessfulPatientDeletionAlert();
            })
            .catch(() => {
                this.numberOfFailedDelete++;
                if (this.numberOfFailedDelete === 3) {
                    this.presentTooMuchFailedPatientDeletionAlert();
                } else {
                    this.presentFailedPatientDeletionAlert();
                }
            });
    }

    private async presentTooMuchFailedPatientDeletionAlert() {
        const alert = await this.alertController.create({
            header: "Impossible de supprimer le patient",
            subHeader: "Vous avez atteint le nombre maximal d'essais, vous allez être déconnecté.",
            buttons: [
                {
                    text: "Ok",
                    handler: () => {
                        this.authService.logout();
                        this.navController.navigateBack("/login");
                    }
                }
            ]
        });
        await alert.present();
    }

    private async presentSuccessfulPatientDeletionAlert() {
        const alert = await this.alertController.create({
            header: "Succès",
            subHeader: "Le patient a été supprimé.",
            buttons: [
                {
                    text: "OK",
                    handler: () => this.navController.navigateBack("/patients")
                }
            ]
        });
        await alert.present();
    }

    private async presentFailedPatientDeletionAlert() {
        const alert = await this.alertController.create({
            header: "Impossible de supprimer le patient",
            subHeader: "Il est possible que le mot de passe entré ne soit pas valide ou qu'un problème soit survenu. Veuillez réessayer.",
            buttons: [
                {
                    text: "Réessayer",
                    handler: () => this.presentDeletePatientAlert()
                }
            ]
        });
        await alert.present();
    }

    private async presentErrorLoadingPatientAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Impossible de trouver le patient. Veuillez réessayer.",
            buttons: [
                {
                    text: "OK",
                    handler: () => this.navController.navigateBack("/patients")
                }
            ]
        });
        await alert.present();
    }

    private async presentInvalidFormErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Les champs Prénom, Nom de famille, Date de naissance et Sexe sont obligatoires.",
            buttons: ["OK"]
        });
        await alert.present();
    }

    private async presentInvalidEmailErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Le courriel fourni est invalide.",
            buttons: ["OK"]
        });
        await alert.present();
    }

    private async presentGenericErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Une erreur est survenue. Veuillez réessayer.",
            buttons: [
                {
                    text: "OK",
                    handler: () => this.navController.navigateBack("/patients")
                }
            ]
        });
        await alert.present();
    }

    private initializeForm() {
        this.patientInfoForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")],
            dateOfBirth: ["", Validators.required],
            gender: ["", Validators.required],
            notes: [""],
            address: [""],
            clinic: ["", Validators.required]
        });
    }

    private resetFormValues() {
        this.patientInfoForm.controls.firstName.setValue(this.patient.FirstName);
        this.patientInfoForm.controls.lastName.setValue(this.patient.LastName);
        this.patientInfoForm.controls.gender.setValue(this.patient.Gender);
        this.patientInfoForm.controls.dateOfBirth.setValue(this.patient.DateOfBirth ? this.patient.DateOfBirth.toISOString() : null);
        this.patientInfoForm.controls.email.setValue(this.patient.Email);
        this.patientInfoForm.controls.notes.setValue(this.patient.Notes);
        this.patientInfoForm.controls.address.setValue(this.patient.Address);
        this.patientInfoForm.controls.clinic.setValue(this.patient.Clinic);
    }
}
