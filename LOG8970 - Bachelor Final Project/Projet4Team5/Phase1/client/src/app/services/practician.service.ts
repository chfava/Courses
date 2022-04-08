import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

import { MeditrinaeApi } from "./meditrinae.api";
import { IEmployee, IPractician } from "../utils/requests-interfaces";
import Practician from "../models/practician.model";
import Employee from "../models/employee.model";

@Injectable({
    providedIn: "root"
})
export class PracticianService extends MeditrinaeApi {
    constructor(private dataService: DataService, private httpClient: HttpClient) {
        super("practicians");
    }

    public practicianWithId(practicianId: string): Promise<Practician> {
        return new Promise((resolve, reject) => {
            let knownPractician = this.dataService.practiciansContainer.elementWithId(practicianId);
            if (knownPractician) {
                return resolve(knownPractician);
            }

            this.loadPracticianWithId(practicianId)
                .then((practician: Practician) => {
                    resolve(practician);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    public loadPracticianWithId(practicianId: string): Promise<Practician> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get<IPractician>(this.url(practicianId))
                .toPromise()
                .then((practicianDto: IPractician) => {
                    let practician = Practician.fromDto(practicianDto);
                    this.dataService.practiciansContainer.register(practician);
                    resolve(practician);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public createPractician(employee: IEmployee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post<IPractician>(this.url(), employee, {
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

    public updatePractician(employee: Employee): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put<IPractician>(this.url(), employee, {
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

    public deletePractician(username: string, password: string, employeeId: string): Promise<void> {
        const options = {
            headers: { "Content-Type": "application/json" },
            body: {
                username,
                password
            }
        };

        return new Promise((resolve, reject) => {
            this.httpClient
                .delete<IPractician>(this.url(employeeId), options)
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
