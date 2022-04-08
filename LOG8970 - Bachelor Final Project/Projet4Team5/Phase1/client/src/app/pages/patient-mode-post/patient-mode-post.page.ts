import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, AlertController } from "@ionic/angular";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import MedicalExam from "../../models/medical-exam.model";

import { AnswersService } from "../../services/answers.service";
import { IMedicalExamUpdate } from "../../utils/requests-interfaces";
import { MedicalExamService } from "../../services/medical-exam.service";
import MedicalExamAnswers from "../../models/medical-exam-answers.model";
import { AuthenticationService } from "../../services/authentication.service";
import { SignatureComponent } from "../../components/signature/signature.component";

@Component({
    selector: "app-patient-mode-post",
    templateUrl: "patient-mode-post.page.html",
    styleUrls: ["patient-mode-post.page.scss"]
})
export class PatientModePostPage implements OnInit {
    @ViewChild("signature") public signature: SignatureComponent;
    public fullName: string;
    public patientId: string;
    public loginForm: FormGroup;
    public medicalExam: MedicalExam;
    public loginFormIsSubmitted = false;
    private numberOfFailedConnections = 0;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController,
        private navController: NavController,
        private answersService: AnswersService,
        private authService: AuthenticationService,
        private medicalExamService: MedicalExamService
    ) {}

    public ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [this.authService.UsernameFromStorage],
            password: ["", Validators.required]
        });

        this.fullName = localStorage.getItem("fullName");
        localStorage.removeItem("fullName");

        this.route.params.subscribe(params => {
            this.patientId = params["patientId"];
            const medicalExamId = params["medicalExamId"];

            this.medicalExamService.medicalExamWithId(medicalExamId).then((medicalExam: MedicalExam) => {
                this.medicalExam = medicalExam;
            });
        });
    }

    private get UsernameValue() {
        return this.loginForm.controls.username.value;
    }

    private get PasswordValue() {
        return this.loginForm.controls.password.value;
    }

    public onSubmit() {
        if (this.loginFormIsSubmitted || this.loginForm.invalid) {
            return;
        }
        this.loginFormIsSubmitted = true;

        this.authService.login(this.UsernameValue, this.PasswordValue).then(
            () => {
                this.loginFormIsSubmitted = false;
                this.numberOfFailedConnections = 0;

                this.route.params.subscribe(() => {
                    this.answersService.answersForMedicalExamWithId(this.medicalExam.Id).then((answers: MedicalExamAnswers) => {
                        let medicalExamUpdate: IMedicalExamUpdate = {
                            id: this.medicalExam.Id,
                            patient: this.medicalExam.PatientId,
                            practician: this.medicalExam.PracticianId,
                            formsResults: answers.toArray()
                        };
                        this.medicalExamService.updateMedicalExam(medicalExamUpdate);

                        this.authService.removeUsernameFromStorage();
                        this.navController.navigateBack("patients/" + this.patientId);
                    });
                });
            },
            msg => {
                this.loginFormIsSubmitted = false;

                if (msg.error.statusCode === 400) {
                    this.numberOfFailedConnections++;
                    this.loginForm.controls.password.setValue("");

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
        const alert = await this.alertCtrl.create({
            header: "Erreur",
            message: "Identifiants invalides.",
            buttons: ["OK"]
        });
        await alert.present();
    }

    private async presentTooMuchFailedConnectionsAlert() {
        const alert = await this.alertCtrl.create({
            header: "Erreur",
            subHeader: "Vous avez atteint le nombre maximal d'essais, vous avez été déconnecté.",
            buttons: ["OK"]
        });
        await alert.present();
    }
}
