import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { PatientModePostPage } from "./patient-mode-post.page";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: "",
                component: PatientModePostPage
            }
        ])
    ],
    declarations: [PatientModePostPage]
})
export class PatientModePostPageModule {}
