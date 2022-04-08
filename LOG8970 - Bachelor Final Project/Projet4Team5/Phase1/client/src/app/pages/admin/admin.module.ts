import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminPage } from "./admin.page";
import { ClinicInfoComponent } from "../../components/clinic-info/clinic-info.component";
import { EmployeesOfClinicListComponent } from "../../components/employees-of-clinic-list/employees-of-clinic-list.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: "",
                component: AdminPage
            }
        ])
    ],
    declarations: [AdminPage, ClinicInfoComponent, EmployeesOfClinicListComponent]
})
export class AdminPageModule {}
