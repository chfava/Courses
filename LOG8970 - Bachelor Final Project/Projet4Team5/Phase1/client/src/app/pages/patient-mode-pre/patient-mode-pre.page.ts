import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";

import { PatientService } from "../../services/patient.service";
import { AuthenticationService } from "../../services/authentication.service";
import Patient from "../../models/patient.model";
import { BackButtonPage } from "../back-button.page";

@Component({
    selector: "app-patient-mode-pre",
    templateUrl: "patient-mode-pre.page.html",
    styleUrls: ["patient-mode-pre.page.scss"]
})
export class PatientModePrePage extends BackButtonPage implements OnInit {
    public patientName: string;
    private numberOfFailedConnections = 0;
    private previousMedicalExamId: string;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private patientService: PatientService,
        private navController: NavController,
        private authService: AuthenticationService,
        private alertController: AlertController
    ) {
        super();
        this.setBackButtonUrl(2);
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            let patientId = params["patientId"];
            this.previousMedicalExamId = params["previousMedicalExamId"];

            if (this.previousMedicalExamId) {
                this.registerPathParams([["previousMedicalExamId", this.previousMedicalExamId]]);
            }

            this.patientService.patientWithId(patientId).then((patient: Patient) => {
                this.patientName = patient.Name;
            });
        });
    }

    public async navigateBack() {
        const alert = await this.alertController.create({
            header: "Retour à la page précédente",
            subHeader: "Entrez votre mot de passe afin de confirmer le retour à la page précédente.",
            inputs: [
                {
                    name: "username",
                    value: this.authService.UsernameFromStorage,
                    placeholder: "Nom d'utilisateur",
                    disabled: true
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
                    text: "Confirmer",
                    handler: data => this.validateEmployee(data)
                }
            ]
        });
        await alert.present();
    }

    private validateEmployee(credentials: any) {
        this.authService.login(credentials.username, credentials.password).then(
            () => {
                this.numberOfFailedConnections = 0;
                this.navController.navigateBack(this.backHref);
            },
            msg => {
                if (msg.error.statusCode === 400) {
                    this.numberOfFailedConnections++;

                    if (this.numberOfFailedConnections === 3) {
                        this.authService.logout();
                        this.navController.navigateBack("/login");
                        this.presentTooMuchFailedConnectionsAlert();
                    } else {
                        this.connectionErrorAlert();
                    }
                }
            }
        );
    }

    private async connectionErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            message: "Identifiants invalides.",
            buttons: ["OK"]
        });
        alert.onDidDismiss().then(() => {
            this.navigateBack();
        });
        await alert.present();
    }

    private async presentTooMuchFailedConnectionsAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Vous avez atteint le nombre maximal d'essais, vous avez été déconnecté.",
            buttons: ["OK"]
        });
        await alert.present();
    }
}
