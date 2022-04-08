import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { MedicalExamsListComponent } from "../../components/medical-exams-list/medical-exams-list.component";
import { PatientInfoComponent } from "../../components/patient-info/patient-info.component";

import { PatientPage } from "./patient.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: "",
                component: PatientPage
            }
        ])
    ],
    declarations: [PatientPage, PatientInfoComponent, MedicalExamsListComponent]
})
export class PatientPageModule {}
