import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MeditrinaeApi } from "./meditrinae.api";
import { IEmployee, IAdmin } from "../utils/requests-interfaces";
import Employee from "../models/employee.model";
import Admin from "../models/admin.model";

@Injectable({
    providedIn: "root"
})
export class AdminService extends MeditrinaeApi {
    constructor(private httpClient: HttpClient) {
        super("admins");
    }

    public getAdminById(employeeId: string): Promise<Admin> {
        return new Promise(resolve => {
            this.httpClient.get<IAdmin>(this.url(employeeId)).subscribe((adminDto: IAdmin) => {
                resolve(Admin.fromDto(adminDto));
            });
        });
    }

    public createAdmin(employee: IEmployee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post<IAdmin>(this.url(), employee, {
                    headers: { "Content-Type": "application/json" }
                })
                .toPromise()
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public updateAdmin(employee: Employee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put<IAdmin>(this.url(), employee, {
                    headers: { "Content-Type": "application/json" }
                })
                .toPromise()
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public deleteAdmin(username: string, password: string, employeeId: string): Promise<void> {
        const options = {
            headers: { "Content-Type": "application/json" },
            body: {
                username,
                password
            }
        };

        return new Promise((resolve, reject) => {
            this.httpClient
                .delete<IAdmin>(this.url(employeeId), options)
                .toPromise()
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
