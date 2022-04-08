import { Component, forwardRef } from "@angular/core";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "long-text-question",
    templateUrl: "./long-text-question.component.html",
    styleUrls: ["./long-text-question.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => LongTextQuestionComponent)
        }
    ]
})
export class LongTextQuestionComponent extends BaseQuestionComponent<string> {}
