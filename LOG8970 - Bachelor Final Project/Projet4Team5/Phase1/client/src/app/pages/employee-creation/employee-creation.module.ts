import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { EmployeeCreationPage } from "./employee-creation.page";

const routes: Routes = [
    {
        path: "",
        component: EmployeeCreationPage
    }
];

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    declarations: [EmployeeCreationPage]
})
export class EmployeeCreationPageModule {}
