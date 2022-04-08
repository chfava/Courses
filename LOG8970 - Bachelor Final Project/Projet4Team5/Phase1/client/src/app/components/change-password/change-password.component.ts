import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";

import { UserService } from "../../services/user.service";

@Component({
    selector: "change-password",
    templateUrl: "./change-password.component.html",
    styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
    @Output() public submittedSuccessful = new EventEmitter<void>();

    public changePasswordForm: FormGroup;
    public submitted = false;

    constructor(private userService: UserService, private formBuilder: FormBuilder, private alertCtrl: AlertController) {}

    private get ActualPasswordValue() {
        return this.changePasswordForm.controls.actualPassword.value;
    }

    private get NewPasswordValue() {
        return this.changePasswordForm.controls.newPassword.value;
    }

    public ngOnInit() {
        this.changePasswordForm = this.formBuilder.group(
            {
                actualPassword: ["", Validators.required],
                newPassword: ["", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd].{7,}")]],
                newPasswordConfirmed: ["", Validators.required]
            },
            {
                validator: this.mustMatch("newPassword", "newPasswordConfirmed")
            }
        );
    }

    private mustMatch(newPassword: string, newPasswordConfirmed: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[newPassword];
            const matchingControl = formGroup.controls[newPasswordConfirmed];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

    public onSubmit() {
        if (this.submitted || this.changePasswordForm.invalid) {
            return;
        }
        this.submitted = true;

        this.userService.updateSelfPassword(this.ActualPasswordValue, this.NewPasswordValue).then(
            () => {
                this.submitted = false;
                this.changePasswordForm.reset();
                this.submittedSuccessful.emit();
            },
            msg => {
                this.submitted = false;
                if (msg.status === 400) {
                    this.updatePasswordErrorAlert().then(() => {
                        this.changePasswordForm.reset();
                    });
                }
            }
        );
    }

    private async updatePasswordErrorAlert() {
        const alert = await this.alertCtrl.create({
            header: "Erreur",
            message: "Mot de passe actuel invalide.",
            buttons: ["OK"]
        });
        await alert.present();
    }
}
