import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, NavController } from "@ionic/angular";

import Patient from "../../models/patient.model";
import { AuthenticationService } from "../../services/authentication.service";
import { PatientService } from "../../services/patient.service";
import { IPatientCreation } from "../../utils/requests-interfaces";
import { frenchMonthNames } from "../../utils/utils";
import { customEnterAnimation } from "../../animations/enter";
import { customLeaveAnimation } from "../../animations/leave";

@Component({
    selector: "app-patient-creation",
    templateUrl: "./patient-creation.page.html",
    styleUrls: ["./patient-creation.page.scss"]
})
export class PatientCreationPage implements OnInit {
    public isSubmitted = false;
    public patientCreationForm: FormGroup;
    public frenchMonthNames = frenchMonthNames;
    public enterAnimation = customEnterAnimation;
    public leaveAnimation = customLeaveAnimation;

    constructor(
        private patientService: PatientService,
        private authService: AuthenticationService,
        private navController: NavController,
        private modalController: ModalController,
        private formBuilder: FormBuilder,
        private alertController: AlertController
    ) {}

    public ngOnInit() {
        this.patientCreationForm = this.formBuilder.group({
            address: [""],
            dateOfBirth: ["", Validators.required],
            email: ["", Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")],
            firstName: ["", Validators.required],
            gender: ["", Validators.required],
            lastName: ["", Validators.required],
            note: [""]
        });
    }

    public closeModal(): Promise<void> {
        return this.modalController.dismiss();
    }

    public onSubmit() {
        if (this.patientCreationForm.invalid) {
            return;
        }
        this.isSubmitted = true;

        let patientCreation: IPatientCreation = {
            address: this.patientCreationForm.controls.address.value,
            clinic: this.authService.ClinicIdFromToken,
            dateOfBirth: this.patientCreationForm.controls.dateOfBirth.value,
            email: this.patientCreationForm.controls.email.value,
            firstName: this.patientCreationForm.controls.firstName.value,
            gender: this.patientCreationForm.controls.gender.value,
            lastName: this.patientCreationForm.controls.lastName.value
        };

        this.patientService
            .createPatient(patientCreation)
            .then((patient: Patient) => {
                this.closeModal().then(() => {
                    this.navController.navigateForward("/patients/" + patient.Id);
                });
            })
            .catch(() => {
                this.isSubmitted = false;
                this.presentGenericErrorAlert();
            });
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
}
