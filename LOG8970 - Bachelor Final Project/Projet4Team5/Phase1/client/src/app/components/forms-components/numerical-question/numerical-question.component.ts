import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "numerical-question",
    templateUrl: "./numerical-question.component.html",
    styleUrls: ["./numerical-question.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => NumericalQuestionComponent)
        }
    ]
})
export class NumericalQuestionComponent extends BaseQuestionComponent<number[]> implements OnInit {
    @Input() public fields: string[];

    public ngOnInit() {
        super.ngOnInit();
        this.initAnswerIfNeeded();
    }

    public changed(newValue: number, index: number) {
        this.answer[index] = newValue;
        this.onChange(this.answer);
    }

    protected initAnswerIfNeeded() {
        if (this.answer == null) {
            this.answer = new Array<number>(this.fields.length);
        }
    }
}
