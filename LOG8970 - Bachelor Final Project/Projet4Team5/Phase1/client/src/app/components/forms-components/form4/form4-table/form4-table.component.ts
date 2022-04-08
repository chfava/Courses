import { Component, Input, OnInit } from "@angular/core";
import { AnswersService } from "../../../../services/answers.service";

@Component({
    selector: "app-form4-table",
    templateUrl: "form4-table.component.html",
    styleUrls: ["form4-table.component.scss"]
})
export class Form4TableComponent implements OnInit {
    @Input() public titles: string[];
    @Input() public superHeader: { offset: number; size: number; text: string };
    @Input() public headers: string[];
    @Input() public rowHeaders: string[];
    @Input() public yesNoDisplay: any[][];
    @Input() public isYesNo = true;
    @Input() public useRadio = true;
    @Input() public colCount: number;
    @Input() public ids: string[][];
    @Input() public displayedAsRow = true;
    @Input() public isEditable: boolean;

    public values = [];
    public valuesLoaded = false;

    constructor(private answersService: AnswersService) {}

    public async ngOnInit() {
        for (let i = 0; i < this.ids.length; ++i) {
            let values = [];
            for (const id of this.ids[i]) {
                if (id.length !== 0) {
                    const value = await this.answersService.getAnswerForQuestionWithId(id);
                    values.push(value);
                } else {
                    values.push(null);
                }
            }
            this.values.push(values);
        }
        this.valuesLoaded = true;
    }

    public isCheckboxChecked(row, col) {
        if (this.displayedAsRow) {
            return this.values[0][0] && this.values[0][0].includes(col);
        } else {
            return this.values[0][col] && this.values[0][col].includes(row);
        }
    }

    public getColCount(): number {
        if (this.colCount) {
            return this.colCount;
        }

        return this.headers.length;
    }

    public onChange(index, id) {
        if (this.useRadio) {
            this.answersService.updateAnswerForQuestionWithId(id, index);
        } else {
            this.answersService
                .getAnswerForQuestionWithId(id)
                .then(oldAnswer => {
                    if (!oldAnswer) {
                        oldAnswer = [index];
                        this.answersService.updateAnswerForQuestionWithId(id, oldAnswer);
                    } else if (oldAnswer.includes(index)) {
                        oldAnswer = oldAnswer.filter(checkboxId => checkboxId !== index);
                        this.answersService.updateAnswerForQuestionWithId(id, oldAnswer);
                    } else {
                        oldAnswer.push(index);
                        this.answersService.updateAnswerForQuestionWithId(id, oldAnswer);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
}
