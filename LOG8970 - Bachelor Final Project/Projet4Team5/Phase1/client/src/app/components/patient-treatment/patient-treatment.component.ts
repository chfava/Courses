import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-patient-treatment",
    templateUrl: "./patient-treatment.component.html",
    styleUrls: ["./patient-treatment.component.scss"]
})
export class PatientTreatmentComponent implements OnInit {
    @Input() public treatmentTitle: string;
    @Input() public treatments: string[][];
    @Input() public hideContent: boolean;

    public therapeuticEducations: string[] = [];
    public behavioralManagements: string[] = [];
    public pharmacologicalTherapies: string[] = [];
    public occlusalOrthoses: string[] = [];
    public physiotherapies: string[] = [];
    public occlusalTherapies: string[] = [];
    public injections: string[] = [];
    public ATMSurgicalApproaches: string[] = [];

    public ngOnInit() {
        this.therapeuticEducations = this.treatments[0];
        this.behavioralManagements = this.treatments[1];
        this.pharmacologicalTherapies = this.treatments[2];
        this.occlusalOrthoses = this.treatments[3];
        this.physiotherapies = this.treatments[4];
        this.occlusalTherapies = this.treatments[5];
        this.injections = this.treatments[6];
        this.ATMSurgicalApproaches = this.treatments[7];
    }

    public stopPropagation(event: MouseEvent) {
        event.stopPropagation();
    }
}
