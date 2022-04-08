import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "slider-question",
    templateUrl: "./slider-question.component.html",
    styleUrls: ["./slider-question.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => SliderQuestionComponent)
        }
    ]
})
export class SliderQuestionComponent extends BaseQuestionComponent<number> implements OnInit {
    @Input() public min: number;
    @Input() public max: number;

    public ngOnInit() {
        super.ngOnInit();
    }

    protected initAnswerIfNeeded() {
        if (this.answer == null) {
            this.answer = this.min;
        }
    }
}
