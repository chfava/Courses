import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { InputQuestionComponent } from "./input-question.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [InputQuestionComponent],
    exports: [InputQuestionComponent]
})
export class InputQuestionModule {}
