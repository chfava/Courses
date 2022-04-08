import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "input-question",
    templateUrl: "./input-question.component.html",
    styleUrls: ["./input-question.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => InputQuestionComponent)
        }
    ]
})
export class InputQuestionComponent extends BaseQuestionComponent<string> implements OnInit {
    @Input() public inputType: string;
    @Input() public areUsedInForms = true;

    public ngOnInit() {
        super.ngOnInit();
        if (!this.areUsedInForms) {
            this.isEditable = true;
        }
    }

    public inputChange(newValue: string) {
        if (this.areUsedInForms) {
            this.onChange(newValue);
        }
    }
}
