import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { IonicModule } from "@ionic/angular";
import { AutomaticSumComponent } from "../../components/forms-components/automatic-sum/automatic-sum.component";
import { CheckboxQuestionModule } from "../../components/forms-components/checkbox-question/checkbox-question.module";
import { Form4TableComponent } from "../../components/forms-components/form4/form4-table/form4-table.component";
import { Form4Component } from "../../components/forms-components/form4/form4.component";
import { RadioButtonQuestionModule } from "../../components/forms-components/radio-button-question/radio-button-question.module";
import { InputQuestionModule } from "../../components/forms-components/input-question/input-question.module";
import { CompleteQuestionComponent } from "../../components/forms-components/complete-question/complete-question.component";
import { DropdownQuestionComponent } from "../../components/forms-components/dropdown-question/dropdown-question.component";
import { LongTextQuestionComponent } from "../../components/forms-components/long-text-question/long-text-question.component";
import { NumericalQuestionComponent } from "../../components/forms-components/numerical-question/numerical-question.component";
import { SliderQuestionComponent } from "../../components/forms-components/slider-question/slider-question.component";
import { ImgQuestionComponent } from "../../components/forms-components/img-question/img-question.component";
import { FormEventPubSubService } from "../../services/form-event-pub-sub.service";

import { FormPage } from "./form.page";

const routes: Routes = [
    {
        path: "",
        component: FormPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        CheckboxQuestionModule,
        RadioButtonQuestionModule,
        InputQuestionModule
    ],
    declarations: [
        FormPage,
        Form4Component,
        Form4TableComponent,
        LongTextQuestionComponent,
        SliderQuestionComponent,
        CompleteQuestionComponent,
        DropdownQuestionComponent,
        NumericalQuestionComponent,
        AutomaticSumComponent,
        ImgQuestionComponent
    ],
    providers: [FormEventPubSubService]
})
export class FormPageModule {}
