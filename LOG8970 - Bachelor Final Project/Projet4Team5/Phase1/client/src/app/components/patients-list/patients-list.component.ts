import { Component, Input } from "@angular/core";
import Patient from "../../models/patient.model";

@Component({
    selector: "app-patients-list",
    templateUrl: "./patients-list.component.html",
    styleUrls: ["./patients-list.component.scss"]
})
export class PatientsListComponent {
    @Input() public patients: Patient[];
    @Input() public title: string;
    @Input() public emptyDescription: string;

    constructor() {}

    public hasPatients(): boolean {
        return this.patients && this.patients.length > 0;
    }
}
