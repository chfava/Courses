import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public submitted = false;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController
    ) {}

    private get UsernameValue() {
        return this.loginForm.controls.username.value;
    }

    private get PasswordValue() {
        return this.loginForm.controls.password.value;
    }

    public ngOnInit() {
        this.resetForm();
    }

    public onSubmit() {
        if (this.submitted || this.loginForm.invalid) {
            return;
        }
        this.submitted = true;

        this.authService.login(this.UsernameValue, this.PasswordValue).then(
            firstLogIn => {
                this.submitted = false;
                if (firstLogIn) {
                    this.router.navigate(["/first-time-login"]);
                } else {
                    this.authService.navigateToNextPageDependingOnRole(false);
                }
                this.resetForm();
            },
            msg => {
                this.submitted = false;
                if (msg.error.statusCode === 400) {
                    this.connectionErrorAlert("Identifiants invalides.").then(() => {
                        this.loginForm.reset();
                    });
                } else {
                    this.connectionErrorAlert("Impossible de se connecter au serveur. Vérifiez votre connexion internet.");
                }
            }
        );
    }

    private resetForm() {
        this.loginForm = this.formBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    private async connectionErrorAlert(message: string) {
        const alert = await this.alertCtrl.create({
            header: "Erreur",
            message: message,
            buttons: ["OK"]
        });
        await alert.present();
    }
}
