import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Practician from "../models/practician.model";
import Secretary from "../models/secretary.model";
import Admin from "../models/admin.model";
import Clinic from "../models/clinic.model";
import { IPractician, IClinic, ISecretary, IAdmin, IClinicUpdate, IClinicCreate } from "../utils/requests-interfaces";
import { DataService } from "./data.service";
import { MeditrinaeApi } from "./meditrinae.api";

@Injectable({
    providedIn: "root"
})
export class ClinicService extends MeditrinaeApi {
    constructor(private httpClient: HttpClient, private dataService: DataService) {
        super("clinics");
    }

    public clinicWithId(clinicId: string): Promise<Clinic> {
        return new Promise((resolve, reject) => {
            let knownClinic = this.dataService.clinicsContainer.elementWithId(clinicId);
            if (knownClinic) {
                return resolve(knownClinic);
            }

            this.loadClinicWithId(clinicId)
                .then((clinic: Clinic) => {
                    resolve(clinic);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    public loadAllClinics(): Promise<Clinic[]> {
        return new Promise(resolve => {
            this.httpClient.get<IClinic[]>(this.url()).subscribe((clinicsDto: IClinic[]) => {
                const clinics = [];
                for (let clinicDto of clinicsDto) {
                    const clinic = Clinic.fromDto(clinicDto);
                    this.dataService.clinicsContainer.register(clinic);
                    clinics.push(clinic);
                }
                resolve(clinics);
            });
        });
    }

    public loadAllPracticiansOfClinic(clinicId: string): Promise<Practician[]> {
        return new Promise(resolve => {
            this.httpClient.get<IPractician[]>(this.url(clinicId + "/practicians")).subscribe((practiciansDto: IPractician[]) => {
                const practicians = [];
                for (let practicianDto of practiciansDto) {
                    if (!practicianDto.dateDeleted) {
                        const practician = Practician.fromDto(practicianDto);
                        this.dataService.practiciansContainer.register(practician);
                        practicians.push(practician);
                    }
                }
                resolve(practicians);
            });
        });
    }

    public loadAllSecretariesOfClinic(clinicId: string): Promise<Secretary[]> {
        return new Promise(resolve => {
            this.httpClient.get<ISecretary[]>(this.url(clinicId + "/secretaries")).subscribe((secretariesDto: ISecretary[]) => {
                const secretaries = [];
                for (let secretaryDto of secretariesDto) {
                    secretaries.push(Secretary.fromDto(secretaryDto));
                }
                resolve(secretaries);
            });
        });
    }

    public loadAllAdminsOfClinic(clinicId: string): Promise<Admin[]> {
        return new Promise(resolve => {
            this.httpClient.get<IAdmin[]>(this.url(clinicId + "/admins")).subscribe((adminsDto: IAdmin[]) => {
                const admins = [];
                for (let adminDto of adminsDto) {
                    admins.push(Admin.fromDto(adminDto));
                }
                resolve(admins);
            });
        });
    }

    public loadClinicWithId(clinicId: string): Promise<Clinic> {
        return new Promise(resolve => {
            this.httpClient.get<IClinic>(this.url(clinicId)).subscribe((clinicDto: IClinic) => {
                const clinic = Clinic.fromDto(clinicDto);
                this.dataService.clinicsContainer.register(clinic);
                resolve(clinic);
            });
        });
    }

    public createClinic(clinicCreate: IClinicCreate): Promise<Clinic> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post<IClinic>(this.url(), clinicCreate, {
                    headers: { "Content-Type": "application/json" }
                })
                .subscribe((clinicDto: IClinic) => {
                    if (clinicDto) {
                        const clinic = Clinic.fromDto(clinicDto);
                        this.dataService.clinicsContainer.register(clinic);
                        resolve(clinic);
                    } else {
                        reject();
                    }
                });
        });
    }

    public updateClinic(updatedClinic: IClinicUpdate): Promise<Clinic> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put<IClinic>(this.url(), updatedClinic, {
                    headers: { "Content-Type": "application/json" }
                })
                .subscribe((clinicDto: IClinic) => {
                    if (clinicDto) {
                        const clinic = Clinic.fromDto(clinicDto);
                        this.dataService.clinicsContainer.register(clinic);
                        resolve(clinic);
                    } else {
                        reject();
                    }
                });
        });
    }
}
