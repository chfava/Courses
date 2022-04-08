import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { IClinicCreate } from "../../utils/requests-interfaces";
import { ClinicService } from "../../services/clinic.service";

@Component({
    selector: "app-clinic-creation",
    templateUrl: "./clinic-creation.page.html",
    styleUrls: ["./clinic-creation.page.scss"]
})
export class ClinicCreationPage implements OnInit {
    public isSubmitted = false;
    public clinicCreationForm: FormGroup;

    constructor(
        private clinicService: ClinicService,
        private modalController: ModalController,
        private formBuilder: FormBuilder,
        private alertController: AlertController
    ) {}

    public ngOnInit() {
        this.clinicCreationForm = this.formBuilder.group({
            name: ["", Validators.required],
            address: ["", Validators.required],
            email: ["", Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")],
            phone: [""]
        });
    }

    public closeModal(): Promise<void> {
        return this.modalController.dismiss();
    }

    public onSubmit() {
        if (this.clinicCreationForm.invalid) {
            return;
        }
        this.isSubmitted = true;

        let clinicCreation: IClinicCreate = {
            address: this.clinicCreationForm.controls.address.value,
            email: this.clinicCreationForm.controls.email.value,
            name: this.clinicCreationForm.controls.name.value,
            phone: this.clinicCreationForm.controls.phone.value
        };

        this.clinicService
            .createClinic(clinicCreation)
            .then(() => {
                this.closeModal();
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
                    handler: () => this.closeModal()
                }
            ]
        });
        await alert.present();
    }
}
