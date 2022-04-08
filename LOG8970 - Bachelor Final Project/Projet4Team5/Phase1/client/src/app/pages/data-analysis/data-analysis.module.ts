import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { DataAnalysisPage } from "./data-analysis.page";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: "",
                component: DataAnalysisPage
            }
        ])
    ],
    declarations: [DataAnalysisPage]
})
export class DataAnalysisPageModule {}
