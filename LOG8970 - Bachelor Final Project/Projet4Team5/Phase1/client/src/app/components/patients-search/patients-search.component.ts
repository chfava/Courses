import { Component } from "@angular/core";
import Patient from "../../models/patient.model";
import { PatientService } from "../../services/patient.service";

@Component({
    selector: "app-patients-search",
    templateUrl: "./patients-search.component.html",
    styleUrls: ["./patients-search.component.scss"]
})
export class PatientsSearchComponent {
    public isStarting = true;

    public searchResults: Patient[];
    public inputValue: string;

    constructor(private patientService: PatientService) {}

    public hasSearchResults(): boolean {
        return this.searchResults && this.searchResults.length > 0;
    }

    public onSearchInputChange(event) {
        this.inputValue = event.detail.value;
        if (this.inputValue.length === 0) {
            this.isStarting = true;
        } else {
            this.patientService.searchPatientWithInput(this.inputValue).then((patients: Patient[]) => {
                this.searchResults = patients;
                this.isStarting = false;
            });
        }
    }
}
