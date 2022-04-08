import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";
import { PatientDiagnosisModule } from "../../components/patient-diagnosis/patient-diagnosis.module";
import { PatientTreatmentModule } from "../../components/patient-treatment/patient-treatment.module";

import { MedicalExamPage } from "./medical-exam.page";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    {
        path: "",
        component: MedicalExamPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatientDiagnosisModule,
        PatientTreatmentModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MedicalExamPage]
})
export class MedicalExamPageModule {}
