import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "radio-button-question",
    templateUrl: "./radio-button-question.component.html",
    styleUrls: ["./radio-button-question.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => RadioButtonQuestionComponent)
        }
    ]
})
export class RadioButtonQuestionComponent extends BaseQuestionComponent<number> implements OnInit {
    @Input() public options: string[];
    @Input() public areUsedInForms = true;
    @Input() public form4displayed: boolean;

    public isYesNoQuestionFromForm4: boolean;

    public ngOnInit() {
        super.ngOnInit();
        if (!this.areUsedInForms) {
            this.isEditable = true;
        }

        this.isYesNoQuestionFromForm4 = this.form4displayed && this.options[0] === "Non" && this.options[1] === "Oui";
    }

    public optionClicked(option: string) {
        this.answer = this.options.indexOf(option);

        if (this.areUsedInForms) {
            this.onChange(this.answer);
        }
    }

    public isChecked(option: string): boolean {
        return this.answer === this.options.indexOf(option);
    }
}
