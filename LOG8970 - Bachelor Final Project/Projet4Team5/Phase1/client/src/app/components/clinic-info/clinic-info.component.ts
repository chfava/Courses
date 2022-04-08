import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import Clinic from "../../models/clinic.model";
import { ClinicService } from "../../services/clinic.service";
import { IClinicUpdate } from "../../utils/requests-interfaces";

@Component({
    selector: "app-clinic-info",
    templateUrl: "./clinic-info.component.html",
    styleUrls: ["./clinic-info.component.scss"]
})
export class ClinicInfoComponent implements OnInit {
    public isEditable = false;
    public clinic: Clinic;
    public clinicInfoForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private clinicService: ClinicService,
        private alertController: AlertController
    ) {}

    public ngOnInit() {
        this.initializeForm();

        this.route.params.subscribe(params => {
            const clinicId = params["clinicId"];
            this.clinicService.loadClinicWithId(clinicId).then((clinic: Clinic) => {
                this.clinic = clinic;
                this.resetFormValues();
            });
        });
    }

    public edit() {
        this.isEditable = true;
    }

    public saveModifications() {
        if (this.clinicInfoForm.invalid) {
            if (this.clinicInfoForm.get("email").hasError("pattern")) {
                this.presentInvalidEmailErrorAlert();
            } else {
                this.presentInvalidFormErrorAlert();
            }
            return;
        }

        let updatedClinic: IClinicUpdate = {
            id: this.clinic.Id,
            name: this.clinicInfoForm.controls.name.value,
            address: this.clinicInfoForm.controls.address.value,
            email: this.clinicInfoForm.controls.email.value,
            phone: this.clinicInfoForm.controls.phone.value
        };

        this.clinicService
            .updateClinic(updatedClinic)
            .then((clinic: Clinic) => {
                this.clinic = clinic;
                this.isEditable = false;
            })
            .catch(() => {
                this.presentGenericErrorAlert();
            });
    }

    private initializeForm() {
        this.clinicInfoForm = this.formBuilder.group({
            name: ["", Validators.required],
            address: ["", Validators.required],
            email: ["", Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")],
            phone: [""]
        });
    }

    public cancel() {
        this.resetFormValues();
        this.isEditable = false;
    }

    private async presentInvalidFormErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Les champs Nom, Adresse, Téléphone et Courriel sont obligatoires.",
            buttons: ["OK"]
        });
        await alert.present();
    }

    private async presentInvalidEmailErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Le courriel fourni n'est pas valide.",
            buttons: ["OK"]
        });
        await alert.present();
    }

    private async presentGenericErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Une erreur est survenue. Veuillez réessayer.",
            buttons: ["OK"]
        });
        await alert.present();
    }

    private resetFormValues() {
        this.clinicInfoForm.controls.name.setValue(this.clinic.Name);
        this.clinicInfoForm.controls.address.setValue(this.clinic.Address);
        this.clinicInfoForm.controls.email.setValue(this.clinic.Email);
        this.clinicInfoForm.controls.phone.setValue(this.clinic.Phone);
    }
}
