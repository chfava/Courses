import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Patient from "../models/patient.model";
import MedicalExam from "../models/medical-exam.model";
import { IMedicalExam, IPatient, IPatientCreation, IPatientUpdate } from "../utils/requests-interfaces";
import { AuthenticationService } from "./authentication.service";
import { DataService } from "./data.service";
import { MeditrinaeApi } from "./meditrinae.api";

@Injectable({
    providedIn: "root"
})
export class PatientService extends MeditrinaeApi {
    constructor(private authService: AuthenticationService, private httpClient: HttpClient, private dataService: DataService) {
        super("patients");
    }

    public patientWithId(patientId: string): Promise<Patient> {
        return new Promise((resolve, reject) => {
            let knownPatient = this.dataService.patientsContainer.elementWithId(patientId);
            if (knownPatient) {
                return resolve(knownPatient);
            }

            this.loadPatientWithId(patientId)
                .then((patient: Patient) => {
                    resolve(patient);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    public createPatient(patientCreation: IPatientCreation): Promise<Patient> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post<IPatient>(this.url(), patientCreation, {
                    headers: { "Content-Type": "application/json" }
                })
                .toPromise()
                .then((patientDto: IPatient) => {
                    let patient = Patient.fromDto(patientDto);
                    this.dataService.patientsContainer.register(patient);
                    resolve(patient);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public loadPatientWithId(patientId: string): Promise<Patient> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .get<IPatient>(this.url(patientId))
                .toPromise()
                .then((patientDto: IPatient) => {
                    let patient = Patient.fromDto(patientDto);
                    this.dataService.patientsContainer.register(patient);
                    resolve(patient);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public loadMedicalExamsForPatientWithId(patientId: string): Promise<MedicalExam[]> {
        return new Promise(resolve => {
            this.httpClient.get<IMedicalExam[]>(this.url(`${patientId}/medical-exams`)).subscribe((medicalExamsDto: IMedicalExam[]) => {
                let medicalExams = [];
                for (let medicalExamDto of medicalExamsDto) {
                    let medicalExam = MedicalExam.fromDto(medicalExamDto);
                    this.dataService.medicalExamsContainer.register(medicalExam);
                    medicalExams.push(medicalExam);
                }
                resolve(medicalExams);
            });
        });
    }

    public loadActivePatients(): Promise<Patient[]> {
        return new Promise(resolve => {
            this.httpClient
                .get<IPatient[]>(this.url(`active/${this.authService.ClinicIdFromToken}`))
                .subscribe((patientsDto: IPatient[]) => {
                    let patients = [];
                    for (let patientDto of patientsDto) {
                        let patient = Patient.fromDto(patientDto);
                        this.dataService.patientsContainer.register(patient);
                        patients.push(patient);
                    }
                    resolve(patients);
                });
        });
    }

    public loadRecentPatients(): Promise<Patient[]> {
        return new Promise(resolve => {
            let body = {
                clinicId: this.authService.ClinicIdFromToken,
                fieldTokenPairs: [],
                page: 0,
                pageSize: 25,
                sort: {
                    dateModified: -1
                }
            };

            this.httpClient
                .post<IPatient[]>(this.url("filter"), body, {
                    headers: { "Content-Type": "application/json" }
                })
                .subscribe((patientsDto: IPatient[]) => {
                    let patients = [];
                    for (let patientDto of patientsDto) {
                        let patient = Patient.fromDto(patientDto);
                        this.dataService.patientsContainer.register(patient);
                        patients.push(patient);
                    }
                    resolve(patients);
                });
        });
    }

    public searchPatientWithInput(searchInput: string): Promise<Patient[]> {
        return new Promise(resolve => {
            let words = searchInput.split(" ");

            let firstNameSearch: string;
            let lastNameSearch: string;
            switch (words.length) {
                case 1:
                    firstNameSearch = words[0];
                    lastNameSearch = words[0];
                    break;
                case 2:
                    firstNameSearch = words[0];
                    lastNameSearch = words[1] !== "" ? words[1] : "-----";
                    break;
                default:
                    firstNameSearch = words.shift();
                    lastNameSearch = words.join(" ");
                    break;
            }

            let body = {
                clinicId: this.authService.ClinicIdFromToken,
                fieldTokenPairs: [["firstName", firstNameSearch], ["lastName", lastNameSearch]],
                page: 0,
                pageSize: 15,
                sort: {
                    firstName: 1,
                    lastName: 1
                }
            };

            this.httpClient
                .post<IPatient[]>(this.url("filter"), body, {
                    headers: { "Content-Type": "application/json" }
                })
                .subscribe((patientsDto: IPatient[]) => {
                    let patients = [];
                    for (let patientDto of patientsDto) {
                        let patient = Patient.fromDto(patientDto);
                        this.dataService.patientsContainer.register(patient);
                        patients.push(patient);
                    }
                    resolve(patients);
                });
        });
    }

    public loadPatientsAlphabeticallyByPage(pageIndex: number, patientsCountPerPage: number): Promise<Patient[]> {
        return new Promise(resolve => {
            let body = {
                clinicId: this.authService.ClinicIdFromToken,
                page: pageIndex,
                pageSize: patientsCountPerPage,
                sort: {
                    firstName: 1,
                    lastName: 1
                }
            };

            this.httpClient
                .post<IPatient[]>(this.url("filter"), body, {
                    headers: { "Content-Type": "application/json" }
                })
                .subscribe((patientsDto: IPatient[]) => {
                    let patients = [];
                    for (let patientDto of patientsDto) {
                        let patient = Patient.fromDto(patientDto);
                        this.dataService.patientsContainer.register(patient);
                        patients.push(patient);
                    }
                    resolve(patients);
                });
        });
    }

    public loadPatientsCount(): Promise<number> {
        return new Promise(resolve => {
            this.httpClient.get<number>(this.url("clinics/" + this.authService.ClinicIdFromToken + "/count")).subscribe((count: number) => {
                resolve(count);
            });
        });
    }

    public updatePatientInfo(updatedPatient: IPatientUpdate): Promise<Patient> {
        return new Promise((resolve, reject) => {
            this.httpClient
                .put<IPatient>(this.url(), updatedPatient, {
                    headers: { "Content-Type": "application/json" }
                })
                .subscribe((patientDto: IPatient) => {
                    if (patientDto) {
                        let patient = Patient.fromDto(patientDto);
                        this.dataService.patientsContainer.register(patient);
                        resolve(patient);
                    } else {
                        reject();
                    }
                });
        });
    }

    public deletePatient(username: string, password: string, patient: Patient): Promise<void> {
        const options = {
            headers: { "Content-Type": "application/json" },
            body: {
                username,
                password
            }
        };

        return new Promise((resolve, reject) => {
            this.httpClient
                .delete<IPatient>(this.url(patient.Id), options)
                .toPromise()
                .then(() => {
                    this.dataService.patientsContainer.remove(patient);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
