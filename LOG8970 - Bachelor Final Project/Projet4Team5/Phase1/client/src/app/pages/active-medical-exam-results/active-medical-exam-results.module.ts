import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { PatientDiagnosisModule } from "../../components/patient-diagnosis/patient-diagnosis.module";
import { PatientTreatmentModule } from "../../components/patient-treatment/patient-treatment.module";
import { CheckboxQuestionModule } from "../../components/forms-components/checkbox-question/checkbox-question.module";
import { RadioButtonQuestionModule } from "../../components/forms-components/radio-button-question/radio-button-question.module";
import { InputQuestionModule } from "../../components/forms-components/input-question/input-question.module";
import { ActiveMedicalExamResultsPage } from "./active-medical-exam-results.page";
import { DiagnosisResultsComponent } from "../../components/diagnosis-results/diagnosis-results.component";
import { TreatmentResultsComponent } from "../../components/treatment-results/treatment-results.component";
import { PatientDiagnosisProposedByPracticianComponent } from
        "../../components/patient-diagnosis-proposed-by-practician/patient-diagnosis-proposed-by-practician.component";
import { PatientTreatmentProposedByPracticianComponent } from
        "../../components/patient-treatment-proposed-by-practician/patient-treatment-proposed-by-practician.component";

const routes: Routes = [
    {
        path: "",
        component: ActiveMedicalExamResultsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PatientDiagnosisModule,
        PatientTreatmentModule,
        CheckboxQuestionModule,
        RadioButtonQuestionModule,
        InputQuestionModule
    ],
    declarations: [
        ActiveMedicalExamResultsPage,
        DiagnosisResultsComponent,
        TreatmentResultsComponent,
        PatientDiagnosisProposedByPracticianComponent,
        PatientTreatmentProposedByPracticianComponent
    ]
})
export class ActiveMedicalExamResultsPageModule {}
