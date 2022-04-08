import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, IonRefresher } from "@ionic/angular";
import Employee, { EmployeeType } from "../../models/employee.model";
import Practician from "../../models/practician.model";
import { AuthenticationService } from "../../services/authentication.service";

import { EmployeeService } from "../../services/employee.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.page.html",
    styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
    @ViewChild(IonRefresher) public refresher: IonRefresher;

    public EmployeeType = EmployeeType;
    public employee: Employee;
    public employeeType: EmployeeType;
    public employeeId: string;
    public frenchTranslationOfRole: string;
    public profileForm: FormGroup;
    public isEditable: boolean;
    public isChangingPassword: boolean;
    public isPageFirstLoading: boolean;
    public isSuperAdminConnected: boolean;

    constructor(
        private authService: AuthenticationService,
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private alertController: AlertController
    ) {}

    public ngOnInit(): void {
        this.updateProfileForm();
    }

    public ionViewWillEnter() {
        this.isPageFirstLoading = true;
        this.refresher.disabled = true;
        this.isEditable = false;
        this.isChangingPassword = false;
        this.isSuperAdminConnected = false;

        this.updateProfileForm();
        this.refresh();
    }

    public refresh() {
        if (!this.isSuperAdminConnected) {
            this.employeeService.getEmployeeById(this.employeeType, this.employeeId).then((employee: Employee) => {
                this.employee = employee;
                this.resetFormValues();
                this.refresher.complete();

                if (this.isPageFirstLoading) {
                    this.refresher.disabled = false;
                    this.isPageFirstLoading = false;
                }
            });
        } else {
            if (this.isPageFirstLoading) {
                this.refresher.disabled = false;
                this.isPageFirstLoading = false;
            }
        }
    }

    public edit() {
        this.isEditable = true;
    }

    public saveModifications() {
        if (this.profileForm.invalid) {
            return;
        }

        this.employee.FirstName = this.profileForm.controls.firstName.value;
        this.employee.LastName = this.profileForm.controls.lastName.value;

        if (this.employeeType === EmployeeType.Practician) {
            (this.employee as Practician).Phone = this.profileForm.controls.phone.value;
        }

        this.employeeService
            .updateEmployee(this.employeeType, this.employee)
            .then(() => {
                this.isEditable = false;
            })
            .catch(() => {
                this.presentGenericErrorAlert();
            });
    }

    public cancel() {
        if (this.isEditable) {
            this.resetFormValues();
            this.isEditable = false;
        } else {
            this.isChangingPassword = false;
        }
    }

    public changePassword() {
        this.isChangingPassword = true;
    }

    public passwordChanged() {
        this.presentSuccessfulAlert();
    }

    private async presentSuccessfulAlert() {
        const alert = await this.alertController.create({
            header: "Succès",
            subHeader: "Votre mot de passe a été modifié avec succès!",
            buttons: [
                {
                    text: "OK"
                }
            ]
        });
        alert.onDidDismiss().then(() => {
            this.isChangingPassword = false;
        });
        await alert.present();
    }

    private updateProfileForm() {
        this.employeeType = this.authService.RoleFromToken as EmployeeType;

        if (this.employeeType === EmployeeType.SuperAdmin) {
            this.isSuperAdminConnected = true;
        } else {
            this.employeeId = this.authService.EmployeeFromToken._id;

            let formGroup: any = {
                firstName: ["", Validators.required],
                lastName: ["", Validators.required],
                role: ["", Validators.required]
            };

            switch (this.employeeType) {
                case EmployeeType.Admin:
                    this.frenchTranslationOfRole = "Administrateur";
                    break;
                case EmployeeType.Practician:
                    this.frenchTranslationOfRole = "Praticien";
                    formGroup = {
                        firstName: ["", Validators.required],
                        lastName: ["", Validators.required],
                        role: ["", Validators.required],
                        phone: ["", Validators.required]
                    };
                    break;
                case EmployeeType.Secretary:
                    this.frenchTranslationOfRole = "Secrétaire";
                    break;
            }

            this.profileForm = this.formBuilder.group(formGroup);
        }
    }

    private resetFormValues() {
        this.profileForm.controls.firstName.setValue(this.employee.FirstName);
        this.profileForm.controls.lastName.setValue(this.employee.LastName);
        this.profileForm.controls.role.setValue(this.frenchTranslationOfRole);

        if (this.employeeType === EmployeeType.Practician) {
            this.profileForm.controls.phone.setValue((this.employee as Practician).Phone);
        }
    }

    private async presentGenericErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: "Une erreur est survenue. Veuillez réessayer.",
            buttons: ["OK"]
        });
        alert.onDidDismiss().then(() => {
            this.refresh();
        });
        await alert.present();
    }
}
