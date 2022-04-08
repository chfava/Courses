import { Injectable } from "@angular/core";
import Employee, { EmployeeType } from "../models/employee.model";

import { IEmployee, IUser } from "../utils/requests-interfaces";
import { AdminService } from "./admin.service";
import { ClinicService } from "./clinic.service";
import { PracticianService } from "./practician.service";
import { SecretaryService } from "./secretary.service";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root"
})
export class EmployeeService {
    constructor(
        private userService: UserService,
        private clinicService: ClinicService,
        private adminService: AdminService,
        private practicianService: PracticianService,
        private secretaryService: SecretaryService
    ) {}

    public getEmployees(employeeType: EmployeeType, clinicId: string): Promise<Employee[]> {
        switch (employeeType) {
            case EmployeeType.Admin:
                return this.clinicService.loadAllAdminsOfClinic(clinicId);
            case EmployeeType.Practician:
                return this.clinicService.loadAllPracticiansOfClinic(clinicId);
            case EmployeeType.Secretary:
                return this.clinicService.loadAllSecretariesOfClinic(clinicId);
        }
    }

    public getEmployeeById(employeeType: EmployeeType, employeeId: string): Promise<Employee> {
        switch (employeeType) {
            case EmployeeType.Admin:
                return this.adminService.getAdminById(employeeId);
            case EmployeeType.Practician:
                return this.practicianService.practicianWithId(employeeId);
            case EmployeeType.Secretary:
                return this.secretaryService.getSecretaryById(employeeId);
        }
    }

    public createEmployee(user: IUser, employee: IEmployee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.userService
                .createUser(user)
                .then((userID: string) => {
                    employee.user = userID;
                    switch (user.role) {
                        case EmployeeType.Admin:
                            resolve(this.adminService.createAdmin(employee));
                            break;
                        case EmployeeType.Practician:
                            resolve(this.practicianService.createPractician(employee));
                            break;
                        case EmployeeType.Secretary:
                            resolve(this.secretaryService.createSecretary(employee));
                            break;
                    }
                })
                .catch(error => reject(error));
        });
    }

    public updateEmployee(employeeType: EmployeeType, employee: Employee): Promise<void> {
        switch (employeeType) {
            case EmployeeType.Admin:
                return this.adminService.updateAdmin(employee);
            case EmployeeType.Practician:
                return this.practicianService.updatePractician(employee);
            case EmployeeType.Secretary:
                return this.secretaryService.updateSecretary(employee);
        }
    }

    public deleteEmployee(username: string, password: string, employeeType: EmployeeType, employee: Employee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.userService
                .deleteUser(username, password, employee.User)
                .then(() => {
                    switch (employeeType) {
                        case EmployeeType.Admin:
                            resolve(this.adminService.deleteAdmin(username, password, employee.Id));
                            break;
                        case EmployeeType.Practician:
                            resolve(this.practicianService.deletePractician(username, password, employee.Id));
                            break;
                        case EmployeeType.Secretary:
                            resolve(this.secretaryService.deleteSecretary(username, password, employee.Id));
                            break;
                    }
                })
                .catch(() => reject());
        });
    }
}
