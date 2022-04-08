import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { ClinicsPage } from "./clinics.page";
import { ClinicsListComponent } from "../../components/clinics-list/clinics-list.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: "",
                component: ClinicsPage
            }
        ])
    ],
    declarations: [ClinicsPage, ClinicsListComponent]
})
export class ClinicsPageModule {}
