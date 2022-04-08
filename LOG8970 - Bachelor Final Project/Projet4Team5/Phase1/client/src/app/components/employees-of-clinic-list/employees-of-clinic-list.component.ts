import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import Employee, { EmployeeType } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee.service";
import { AuthenticationService } from "../../services/authentication.service";
import { EmployeeCreationPage } from "../../pages/employee-creation/employee-creation.page";
import { EmployeeUpdatePage } from "../../pages/employee-update/employee-update.page";

@Component({
    selector: "app-employees-of-clinic-list",
    templateUrl: "./employees-of-clinic-list.component.html",
    styleUrls: ["./employees-of-clinic-list.component.scss"]
})
export class EmployeesOfClinicListComponent implements OnInit {
    @Input() public employeeType: EmployeeType;
    @Input() public clinicId: string;
    @Output() public refreshed = new EventEmitter<void>();

    public userId: string;
    public employees: Employee[];
    public isLoading = false;
    public frenchTranslationOfEmployee: string;
    public frenchTranslationOfNoEmployee: string;

    constructor(
        private authService: AuthenticationService,
        private employeeService: EmployeeService,
        private modalController: ModalController
    ) {}

    public ngOnInit() {
        this.userId = this.authService.UserIdFromToken;

        switch (this.employeeType) {
            case EmployeeType.Practician:
                this.frenchTranslationOfEmployee = "praticien";
                this.frenchTranslationOfNoEmployee = "pas de " + this.frenchTranslationOfEmployee;
                break;
            case EmployeeType.Secretary:
                this.frenchTranslationOfEmployee = "secrétaire";
                this.frenchTranslationOfNoEmployee = "pas de " + this.frenchTranslationOfEmployee;
                break;
            case EmployeeType.Admin:
                this.frenchTranslationOfEmployee = "administrateur";
                this.frenchTranslationOfNoEmployee = "pas d'" + this.frenchTranslationOfEmployee;
                break;
        }
    }

    public refresh() {
        this.isLoading = true;

        this.employeeService.getEmployees(this.employeeType, this.clinicId).then((employees: Employee[]) => {
            this.employees = employees;
            this.isLoading = false;
            this.refreshed.emit();
        });
    }

    public hasEmployees(): boolean {
        return this.employees && this.employees.length > 0;
    }

    public async showEmployeeCreationPage() {
        let modal = await this.modalController.create({
            component: EmployeeCreationPage,
            cssClass: "employee-creation-modale" + (this.employeeType === EmployeeType.Practician ? "-for-practician" : ""),
            componentProps: {
                employeeType: this.employeeType,
                clinicId: this.clinicId
            }
        });
        modal.onDidDismiss().then(() => {
            this.refresh();
        });
        return await modal.present();
    }

    public async showEmployeeUpdatePage(employee: Employee) {
        let modal = await this.modalController.create({
            component: EmployeeUpdatePage,
            cssClass: "employee-update-modale" + (employee.User === this.userId ? "-for-current-user" : ""),
            componentProps: {
                employeeType: this.employeeType,
                employee: employee,
                clinicId: this.clinicId
            }
        });
        modal.onDidDismiss().then(() => {
            if (this.authService.isAuthenticated()) {
                this.refresh();
            }
        });
        return await modal.present();
    }
}
