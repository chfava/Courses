import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, NavController } from "@ionic/angular";

import { AuthenticationService } from "../../services/authentication.service";
import { EmployeeService } from "../../services/employee.service";
import { ClinicService } from "../../services/clinic.service";
import { UserService } from "../../services/user.service";
import Employee, { EmployeeType } from "../../models/employee.model";
import Clinic from "../../models/clinic.model";

@Component({
    selector: "app-employee-update",
    templateUrl: "./employee-update.page.html",
    styleUrls: ["./employee-update.page.scss"]
})
export class EmployeeUpdatePage implements OnInit {
    @Input() public employeeType: EmployeeType;
    @Input() public employee: Employee;
    @Input() public clinicId: string;

    public isSubmitted = false;
    public isCurrentUserOpenedModal: boolean;
    public employeeUpdatePasswordForm: FormGroup;
    public employeeUpdateClinicForm: FormGroup;
    public clinics: Clinic[];
    private numberOfFailedDelete = 0;

    constructor(
        private clinicService: ClinicService,
        private employeeService: EmployeeService,
        private userService: UserService,
        private authService: AuthenticationService,
        private modalController: ModalController,
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private navController: NavController
    ) {}

    public ngOnInit() {
        this.clinicService.loadAllClinics().then((clinics: Clinic[]) => (this.clinics = clinics));

        this.isCurrentUserOpenedModal = this.employee.User !== this.authService.UserIdFromToken;

        this.employeeUpdatePasswordForm = this.formBuilder.group({
            password: ["", Validators.required]
        });

        this.employeeUpdateClinicForm = this.formBuilder.group(
            {
                clinic: [this.clinicId, Validators.required]
            },
            {
                validator: this.mustNotMatchActualClinicId()
            }
        );
    }

    public closeModal(): Promise<void> {
        return this.modalController.dismiss();
    }

    public changePassword() {
        if (this.isSubmitted || this.employeeUpdatePasswordForm.invalid) {
            return;
        }
        this.isSubmitted = true;

        this.userService
            .updateUserPassword(this.employee.User, this.employeeUpdatePasswordForm.controls.password.value)
            .then(() => {
                this.presentSuccessfulAlert("Mise à jour du mot de passe réussie.");
            })
            .catch(() => {
                this.isSubmitted = false;
                this.presentGenericErrorAlert();
            });
    }

    public changeClinic() {
        if (this.isSubmitted || this.employeeUpdateClinicForm.invalid) {
            return;
        }
        this.isSubmitted = true;

        this.employee.Clinic = this.employeeUpdateClinicForm.controls.clinic.value;

        this.employeeService
            .updateEmployee(this.employeeType, this.employee)
            .then(() => {
                this.presentSuccessfulAlert("Mise à jour de la clinique réussie.");
            })
            .catch(() => {
                this.isSubmitted = false;
                this.presentGenericErrorAlert();
            });
    }

    public async presentDeleteEmployeeAlert() {
        if (this.isSubmitted) {
            return;
        }
        this.isSubmitted = true;

        const alert = await this.alertController.create({
            header: "Supprimer " + this.employee.Name,
            subHeader: "Entrez votre mot de passe afin de confirmer la suppression",
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
                    handler: data => this.deleteEmployee(data)
                }
            ]
        });
        alert.onDidDismiss().then(() => {
            this.isSubmitted = false;
        });
        await alert.present();
    }

    private deleteEmployee(credentials: any) {
        this.employeeService
            .deleteEmployee(credentials.username, credentials.password, this.employeeType, this.employee)
            .then(() => {
                this.numberOfFailedDelete = 0;
                this.presentSuccessfulAlert("Suppression réussie");
            })
            .catch(() => {
                this.isSubmitted = false;
                this.numberOfFailedDelete++;
                if (this.numberOfFailedDelete === 3) {
                    this.closeModal();
                    this.authService.logout();
                    this.navController.navigateBack("/login");
                    this.presentTooMuchFailedEmployeeDeletionAlert();
                } else {
                    this.presentFailedEmployeeDeletionAlert();
                }
            });
    }

    private async presentSuccessfulAlert(text: string) {
        const alert = await this.alertController.create({
            header: "Succès",
            subHeader: text,
            buttons: [
                {
                    text: "OK",
                    handler: () => this.closeModal()
                }
            ]
        });
        alert.onDidDismiss().then(() => {
            this.isSubmitted = false;
        });
        await alert.present();
    }

    private async presentFailedEmployeeDeletionAlert() {
        const alert = await this.alertController.create({
            header: "Impossible de supprimer " + this.employee.Name,
            subHeader: "Il est possible que le mot de passe entré ne soit pas valide ou qu'un problème soit survenu. Veuillez réessayer.",
            buttons: [
                {
                    text: "Réessayer",
                    handler: () => this.presentDeleteEmployeeAlert()
                }
            ]
        });
        alert.onDidDismiss().then(() => {
            this.isSubmitted = false;
        });
        await alert.present();
    }

    private async presentTooMuchFailedEmployeeDeletionAlert() {
        const alert = await this.alertController.create({
            header: "Impossible de supprimer le patient",
            subHeader: "Vous avez atteint le nombre maximal d'essais, vous avez été déconnecté.",
            buttons: [
                {
                    text: "Ok"
                }
            ]
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
                    handler: () => this.closeModal()
                }
            ]
        });
        alert.onDidDismiss().then(() => {
            this.isSubmitted = false;
        });
        await alert.present();
    }

    private mustNotMatchActualClinicId() {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls["clinic"];

            if (control.errors && !control.errors.mustNotMatchActualClinic) {
                // return if another validator has already found an error on the control
                return;
            }

            // set error on control if validation fails
            if (control.value === this.clinicId) {
                control.setErrors({ mustNotMatchActualClinic: true });
            } else {
                control.setErrors(null);
            }
        };
    }
}
