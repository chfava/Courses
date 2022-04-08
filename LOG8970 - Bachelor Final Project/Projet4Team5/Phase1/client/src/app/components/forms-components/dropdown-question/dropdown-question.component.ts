import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "dropdown-question",
    templateUrl: "./dropdown-question.component.html",
    styleUrls: ["./dropdown-question.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => DropdownQuestionComponent)
        }
    ]
})
export class DropdownQuestionComponent extends BaseQuestionComponent<number> implements OnInit {
    @Input() public options: string[];
    public selectedOption: string;

    public ngOnInit(): void {
        super.ngOnInit();
        this.selectedOption = this.options[this.answer];
    }

    public updatedAnswer(option: string) {
        this.answer = this.options.indexOf(option);
        this.onChange(this.answer);
    }
}
