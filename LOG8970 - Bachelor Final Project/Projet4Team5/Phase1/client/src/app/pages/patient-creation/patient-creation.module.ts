import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { SharedModule } from "../shared/shared.module";
import { PatientCreationPage } from "./patient-creation.page";

const routes: Routes = [
    {
        path: "",
        component: PatientCreationPage
    }
];

@NgModule({
    imports: [SharedModule, CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    declarations: [PatientCreationPage]
})
export class PatientCreationPageModule {}
