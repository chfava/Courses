import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { PatientsListComponent } from "../../components/patients-list/patients-list.component";
import { PatientsListByAlphabeticalOrderComponent }
    from "../../components/patients-list-by-alphabetical-order/patients-list-by-alphabetical-order.component";
import { PatientsSearchComponent } from "../../components/patients-search/patients-search.component";

import { HomePage } from "./home.page";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: "",
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage, PatientsListByAlphabeticalOrderComponent, PatientsSearchComponent, PatientsListComponent]
})
export class HomePageModule {}
