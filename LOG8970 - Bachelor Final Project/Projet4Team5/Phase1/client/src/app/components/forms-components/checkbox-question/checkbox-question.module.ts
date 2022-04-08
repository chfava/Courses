import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { CheckboxQuestionComponent } from "./checkbox-question.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [CheckboxQuestionComponent],
    exports: [CheckboxQuestionComponent]
})
export class CheckboxQuestionModule {}
