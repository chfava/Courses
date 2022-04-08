import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "checkbox-question",
    templateUrl: "./checkbox-question.component.html",
    styleUrls: ["./checkbox-question.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => CheckboxQuestionComponent)
        }
    ]
})
export class CheckboxQuestionComponent extends BaseQuestionComponent<number[]> implements OnInit {
    @Input() public options: string[];
    @Input() public areUsedInForms = true;

    public ngOnInit() {
        super.ngOnInit();
        if (!this.areUsedInForms) {
            this.isEditable = true;
        }
        this.initAnswerIfNeeded();
    }

    public optionClicked(option: string) {
        let optionIndex = this.options.indexOf(option);
        let index = this.answer.indexOf(optionIndex);

        if (index !== -1) {
            this.answer.splice(index, 1);
        } else {
            this.answer.push(optionIndex);
        }
        if (this.areUsedInForms) {
            this.onChange(this.answer);
        }
    }

    public isChecked(option: string): boolean {
        return this.answer.includes(this.options.indexOf(option));
    }

    protected initAnswerIfNeeded() {
        if (this.answer == null) {
            this.answer = [];
        }
    }
}
