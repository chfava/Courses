import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { ClinicCreationPage } from "./clinic-creation.page";

const routes: Routes = [
    {
        path: "",
        component: ClinicCreationPage
    }
];

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    declarations: [ClinicCreationPage]
})
export class ClinicCreationPageModule {}
