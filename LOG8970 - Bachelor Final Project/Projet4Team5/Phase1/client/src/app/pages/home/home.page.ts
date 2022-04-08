import { Component, OnInit, ViewChild } from "@angular/core";
import { IonRefresher, ModalController } from "@ionic/angular";

import { PatientsSearchComponent } from "../../components/patients-search/patients-search.component";
import Patient from "../../models/patient.model";
import { AuthenticationService } from "../../services/authentication.service";
import { ClinicService } from "../../services/clinic.service";
import { PatientService } from "../../services/patient.service";
import { PatientCreationPage } from "../patient-creation/patient-creation.page";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
    @ViewChild(IonRefresher) public refresher: IonRefresher;
    @ViewChild(PatientsSearchComponent) public search: PatientsSearchComponent;

    public isHomeFirstLoading = true;
    public isAlphabeticalListVisible = false;

    public isLoadingActive: boolean;
    public isLoadingRecents: boolean;
    public activePatients: Patient[];
    public recentsPatients: Patient[];

    constructor(
        private patientService: PatientService,
        private clinicService: ClinicService,
        private authService: AuthenticationService,
        private modalController: ModalController
    ) {}

    public ngOnInit() {
        this.isHomeFirstLoading = true;
        this.refresher.disabled = true;
        this.refreshClinic();
    }

    public ionViewWillEnter() {
        this.isHomeFirstLoading = true;
        this.refresher.disabled = true;
        this.refresh();
        this.isAlphabeticalListVisible = false;
    }

    public refresh() {
        this.refreshActivePatient();
        this.refreshRecentsPatient();
    }

    public isLoadingHome(): boolean {
        return this.isLoadingActive || this.isLoadingRecents;
    }

    public async showPatientCreationPage() {
        let modal = await this.modalController.create({
            component: PatientCreationPage
        });
        return await modal.present();
    }

    public showAlphabeticalList() {
        this.isAlphabeticalListVisible = true;
    }

    public completeRefresherIfFinished() {
        if (!this.isLoadingHome()) {
            this.refresher.complete();

            if (this.isHomeFirstLoading) {
                this.refresher.disabled = false;
                this.isHomeFirstLoading = false;
            }

            this.isAlphabeticalListVisible = false;
        }
    }

    private refreshActivePatient() {
        this.isLoadingActive = true;
        this.patientService.loadActivePatients().then((patients: Patient[]) => {
            this.activePatients = patients;
            this.isLoadingActive = false;
            this.completeRefresherIfFinished();
            this.removeActivePatientsFromRecentsPatients();
        });
    }

    private refreshRecentsPatient() {
        this.isLoadingRecents = true;
        this.patientService.loadRecentPatients().then((patients: Patient[]) => {
            this.recentsPatients = patients;
            this.isLoadingRecents = false;
            this.completeRefresherIfFinished();
            this.removeActivePatientsFromRecentsPatients();
        });
    }

    private removeActivePatientsFromRecentsPatients() {
        if (!this.isLoadingHome() && this.activePatients && this.recentsPatients) {
            let activePatientsIds = this.activePatients.map(patient => patient.Id);
            this.recentsPatients = this.recentsPatients.filter(patient => {
                return activePatientsIds.indexOf(patient.Id) === -1;
            });
        }
    }

    private refreshClinic() {
        this.clinicService.loadClinicWithId(this.authService.ClinicIdFromToken);
    }
}
