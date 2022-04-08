import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-patient-diagnosis",
    templateUrl: "./patient-diagnosis.component.html",
    styleUrls: ["./patient-diagnosis.component.scss"]
})
export class PatientDiagnosisComponent implements OnInit {
    @Input() public diagnosisTitle: string;
    @Input() public diagnosis: string[][];
    @Input() public hideContent: boolean;

    public painfulDisorders: string[] = [];
    public rightATMDisorders: string[] = [];
    public leftATMDisorders: string[] = [];

    public ngOnInit() {
        this.painfulDisorders = this.diagnosis[0];
        this.rightATMDisorders = this.diagnosis[1];
        this.leftATMDisorders = this.diagnosis[2];
    }

    public stopPropagation(event: MouseEvent) {
        event.stopPropagation();
    }
}
