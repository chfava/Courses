import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { SharedModule } from "../shared/shared.module";
import { PatientModePrePage } from "./patient-mode-pre.page";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: "",
                component: PatientModePrePage
            }
        ])
    ],
    declarations: [PatientModePrePage]
})
export class PatientModePrePageModule {}
