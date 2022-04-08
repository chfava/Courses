import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { MedicalExamCreationPage } from "./medical-exam-creation.page";

const routes: Routes = [
    {
        path: "",
        component: MedicalExamCreationPage
    }
];

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    declarations: [MedicalExamCreationPage]
})
export class MedicalExamCreationPageModule {}
