import { Component, OnInit } from "@angular/core";

import Patient from "../../models/patient.model";
import { PatientService } from "../../services/patient.service";

@Component({
    selector: "app-patients-list-by-alphabetical-order",
    templateUrl: "./patients-list-by-alphabetical-order.component.html",
    styleUrls: ["./patients-list-by-alphabetical-order.component.scss"]
})
export class PatientsListByAlphabeticalOrderComponent implements OnInit {
    public isLoadingPage: boolean;
    public isInitializing: boolean;

    public pages: Patient[][];
    public currentPage: number;
    public pageCount: number;

    private readonly patientsCountPerPage = 15;

    constructor(private patientService: PatientService) {}

    public ngOnInit() {
        this.isInitializing = true;

        this.patientService.loadPatientsCount().then((count: number) => {
            this.setPageCount(count);
            this.pages = new Array<Patient[]>(this.pageCount);
            this.loadPatientsAtPage(0);
        });
    }

    public hasPreviousPage(): boolean {
        return this.currentPage > 0;
    }

    public hasNextPage(): boolean {
        return this.currentPage + 1 < this.pageCount;
    }

    public hasPatients(): boolean {
        return this.pages && this.pages.length > 0 && this.pages[0].length > 0;
    }

    public onPreviousPage() {
        if (this.hasPreviousPage()) {
            this.showPage(this.currentPage - 1);
        }
    }

    public onNextPage() {
        if (this.hasNextPage()) {
            this.showPage(this.currentPage + 1);
        }
    }

    public loadPatientsAtPage(page: number) {
        this.isLoadingPage = true;
        this.patientService.loadPatientsAlphabeticallyByPage(page, this.patientsCountPerPage).then((patients: Patient[]) => {
            this.pages[page] = patients;
            this.currentPage = page;
            this.isLoadingPage = false;
            this.isInitializing = false;
        });
    }

    private setPageCount(patientsCount: number) {
        this.pageCount = Math.floor(patientsCount / this.patientsCountPerPage);
        if (patientsCount % this.patientsCountPerPage !== 0) {
            this.pageCount++;
        }
    }

    private showPage(page: number) {
        if (this.isPageLoaded(page)) {
            this.currentPage = page;
        } else {
            this.loadPatientsAtPage(page);
        }
    }

    private isPageLoaded(page: number): boolean {
        return this.pages[page] != null;
    }
}
