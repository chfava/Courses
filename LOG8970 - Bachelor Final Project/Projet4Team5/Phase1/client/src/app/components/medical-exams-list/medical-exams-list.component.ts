import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import MedicalExam from "../../models/medical-exam.model";
import { dateToHtmlString } from "../../utils/utils";

@Component({
    selector: "app-medical-exams-list",
    templateUrl: "./medical-exams-list.component.html",
    styleUrls: ["./medical-exams-list.component.scss"]
})
export class MedicalExamsListComponent {
    @Input() public medicalExams: MedicalExam[];
    @Output() public createMedicalExamEvent = new EventEmitter();

    constructor(public alertCtrl: AlertController, public router: Router) {}

    public clickAddMedicalExam() {
        if (this.hasActiveMedicalExam()) {
            this.alertCtrl
                .create({
                    header: "Impossible",
                    message: "Il est impossible de créer un nouvel examen médical lorsqu'il y a un examen médical actif.",
                    buttons: [
                        {
                            text: "Voir l'examen actif",
                            handler: () => this.routeToMedicalExam(this.getActiveMedicalExam())
                        },
                        {
                            text: "Annuler",
                            role: "cancel"
                        }
                    ]
                })
                .then(alert => alert.present());
        } else {
            this.createMedicalExamEvent.emit();
        }
    }

    public hasActiveMedicalExam(): boolean {
        return !!this.medicalExams.find(medicalExam => medicalExam.isActive);
    }

    public hasMedicalExams() {
        return !!this.medicalExams && this.medicalExams.length > 0;
    }

    public getActiveMedicalExam() {
        return this.medicalExams.find(medicalExam => medicalExam.isActive);
    }

    public medicalExamTitleFromDate(date: Date): string {
        return dateToHtmlString(date);
    }

    private routeToMedicalExam(medicalExam: MedicalExam) {
        let previousMedicalExamParam = {};
        const index = this.medicalExams.indexOf(medicalExam);
        if (index < this.medicalExams.length - 1) {
            previousMedicalExamParam = { previousMedicalExamId: this.medicalExams[index + 1].Id };
        }
        const activeUriIfNeeded = medicalExam.isActive ? "/active" : "";

        this.router.navigate([`/${this.router.url}/medical-exams/${medicalExam.Id}${activeUriIfNeeded}`, previousMedicalExamParam]);
    }
}
