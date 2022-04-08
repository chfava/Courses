import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { RadioButtonQuestionComponent } from "./radio-button-question.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [RadioButtonQuestionComponent],
    exports: [RadioButtonQuestionComponent]
})
export class RadioButtonQuestionModule {}
