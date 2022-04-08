import { FormGroup } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";

import Clinic from "../../models/clinic.model";
import Patient from "../../models/patient.model";
import { frenchMonthNames } from "../../utils/utils";
import { customEnterAnimation } from "../../animations/enter";
import { customLeaveAnimation } from "../../animations/leave";

@Component({
    selector: "app-patient-info",
    templateUrl: "./patient-info.component.html",
    styleUrls: ["./patient-info.component.scss"]
})
export class PatientInfoComponent implements OnInit {
    @Input() public patient: Patient;
    @Input() public isEditable: boolean;
    @Input() public patientInfoForm: FormGroup;
    @Input() public clinics: Clinic[];

    public patientAge: string;
    public frenchMonthNames = frenchMonthNames;
    public enterAnimation = customEnterAnimation;
    public leaveAnimation = customLeaveAnimation;

    public ngOnInit() {
        this.patientAge = Patient.calculateAge(new Date(Date.parse(this.patientInfoForm.get("dateOfBirth").value)));

        this.patientInfoForm.get("dateOfBirth").valueChanges.subscribe(dateOfBirth => {
            this.patientAge = Patient.calculateAge(new Date(Date.parse(dateOfBirth)));
        });
    }
}
