import { Component, EventEmitter, Output } from "@angular/core";

import Clinic from "../../models/clinic.model";
import { ClinicService } from "../../services/clinic.service";

@Component({
    selector: "app-clinics-list",
    templateUrl: "./clinics-list.component.html",
    styleUrls: ["./clinics-list.component.scss"]
})
export class ClinicsListComponent {
    @Output() public refreshed = new EventEmitter<void>();

    public clinics: Clinic[];
    public isLoading = false;

    constructor(private clinicService: ClinicService) {}

    public refresh() {
        this.isLoading = true;

        this.clinicService.loadAllClinics().then((clinics: Clinic[]) => {
            this.clinics = clinics;
            this.isLoading = false;
            this.refreshed.emit();
        });
    }

    public hasClinics(): boolean {
        return this.clinics && this.clinics.length > 0;
    }
}
