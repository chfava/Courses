import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { EmployeeUpdatePage } from "./employee-update.page";

const routes: Routes = [
    {
        path: "",
        component: EmployeeUpdatePage
    }
];

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    declarations: [EmployeeUpdatePage]
})
export class EmployeeUpdatePageModule {}
