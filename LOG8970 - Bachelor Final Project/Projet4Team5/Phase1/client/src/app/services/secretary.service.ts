import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MeditrinaeApi } from "./meditrinae.api";
import { IEmployee, ISecretary } from "../utils/requests-interfaces";
import Employee from "../models/employee.model";
import Secretary from "../models/secretary.model";

@Injectable({
    providedIn: "root"
})
export class SecretaryService extends MeditrinaeApi {
    constructor(private httpClient: HttpClient) {
        super("secretaries");
    }

    public getSecretaryById(employeeId: string): Promise<Secretary> {
        return new Promise(resolve => {
            this.httpClient.get<ISecretary>(this.url(employeeId)).subscribe((secretaryDto: ISecretary) => {
                resolve(Secretary.fromDto(secretaryDto));
            });
        });
    }

    public createSecretary(employee: IEmployee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post<ISecretary>(this.url(), employee, {
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

    public updateSecretary(employee: Employee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put<ISecretary>(this.url(), employee, {
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

    public deleteSecretary(username: string, password: string, employeeId: string): Promise<void> {
        const options = {
            headers: { "Content-Type": "application/json" },
            body: {
                username,
                password
            }
        };

        return new Promise((resolve, reject) => {
            this.httpClient
                .delete<ISecretary>(this.url(employeeId), options)
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
