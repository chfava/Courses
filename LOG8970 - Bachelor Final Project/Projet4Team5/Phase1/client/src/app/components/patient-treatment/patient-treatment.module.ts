import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { PatientTreatmentComponent } from "./patient-treatment.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [PatientTreatmentComponent],
    exports: [PatientTreatmentComponent]
})
export class PatientTreatmentModule {}
