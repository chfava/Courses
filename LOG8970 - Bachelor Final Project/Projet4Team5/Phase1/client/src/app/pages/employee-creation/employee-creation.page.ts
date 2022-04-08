import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController } from "@ionic/angular";

import { EmployeeService } from "../../services/employee.service";
import { IEmployee, IUser } from "../../utils/requests-interfaces";
import { EmployeeType } from "../../models/employee.model";

@Component({
    selector: "app-employee-creation",
    templateUrl: "./employee-creation.page.html",
    styleUrls: ["./employee-creation.page.scss"]
})
export class EmployeeCreationPage implements OnInit {
    @Input() public employeeType: EmployeeType;
    @Input() public clinicId: string;

    public EmployeeType = EmployeeType;
    public isSubmitted = false;
    public employeeCreationForm: FormGroup;
    public modalTitle: string;

    constructor(
        private employeeService: EmployeeService,
        private modalController: ModalController,
        private formBuilder: FormBuilder,
        private alertController: AlertController
    ) {}

    public ngOnInit() {
        let formGroup: any = {
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            username: ["", Validators.required],
            password: ["", Validators.required]
        };

        switch (this.employeeType) {
            case EmployeeType.Admin:
                this.modalTitle = "Nouvel administrateur";
                break;
            case EmployeeType.Practician:
                this.modalTitle = "Nouveau praticien";
                formGroup = {
                    firstName: ["", Validators.required],
                    lastName: ["", Validators.required],
                    username: ["", Validators.required],
                    password: ["", Validators.required],
                    phone: ["", Validators.required]
                };
                break;
            case EmployeeType.Secretary:
                this.modalTitle = "Nouveau secrétaire";
                break;
        }

        this.employeeCreationForm = this.formBuilder.group(formGroup);
    }

    public closeModal(): Promise<void> {
        return this.modalController.dismiss();
    }

    public onSubmit() {
        if (this.employeeCreationForm.invalid) {
            return;
        }
        this.isSubmitted = true;

        let user: IUser = {
            username: this.employeeCreationForm.controls.username.value,
            password: this.employeeCreationForm.controls.password.value,
            role: this.employeeType
        };

        let employee: IEmployee = {
            firstName: this.employeeCreationForm.controls.firstName.value,
            lastName: this.employeeCreationForm.controls.lastName.value,
            clinic: this.clinicId
        };

        if (this.employeeType === EmployeeType.Practician) {
            employee.phone = this.employeeCreationForm.controls.phone.value;
        }

        this.employeeService
            .createEmployee(user, employee)
            .then(() => {
                this.closeModal();
            })
            .catch(error => {
                this.isSubmitted = false;
                if (error.status === 409 && error.error.userAlreadyExists) {
                    this.presentUsernameAlreadyExistErrorAlert();
                } else {
                    this.presentGenericErrorAlert();
                }
            });
    }

    private async presentUsernameAlreadyExistErrorAlert() {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader:
                "Ce nom d'utilisateur (" +
                this.employeeCreationForm.controls.username.value +
                ") est déjà utilisé. Veuillez en choisir un autre.",
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
                    handler: () => this.closeModal()
                }
            ]
        });
        await alert.present();
    }
}
