import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { SharedModule } from "../shared/shared.module";
import { PatientModeFormsPage } from "./patient-mode-forms.page";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: "",
                component: PatientModeFormsPage
            }
        ])
    ],
    declarations: [PatientModeFormsPage]
})
export class PatientModeFormsPageModule {}
