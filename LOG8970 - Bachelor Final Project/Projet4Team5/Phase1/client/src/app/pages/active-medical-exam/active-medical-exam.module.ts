import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { SharedModule } from "../shared/shared.module";
import { ActiveMedicalExamPage } from "./active-medical-exam.page";
import { PatientDiagnosisModule } from "../../components/patient-diagnosis/patient-diagnosis.module";
import { PatientTreatmentModule } from "../../components/patient-treatment/patient-treatment.module";

const routes: Routes = [
    {
        path: "",
        component: ActiveMedicalExamPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        PatientDiagnosisModule,
        PatientTreatmentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ActiveMedicalExamPage]
})
export class ActiveMedicalExamPageModule {}
