import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { form4 } from "../../../data/form4";
import { BackButtonPage } from "../../../pages/back-button.page";
import { AnswersService } from "../../../services/answers.service";
import { MedicalExamService } from "../../../services/medical-exam.service";

@Component({
    selector: "app-form4",
    templateUrl: "form4.component.html",
    styleUrls: ["form4.component.scss"]
})
export class Form4Component extends BackButtonPage implements OnInit {
    @Input() public id: string;
    @Input() public isEditable: boolean;
    public formTemplate = form4;
    public formResultsLoaded = false;
    public values = new Map<string, any>();

    private previousMedicalExamId: string;
    private medicalExamId: string;

    constructor(
        private answersService: AnswersService,
        private medicalExamService: MedicalExamService,
        private navController: NavController,
        private route: ActivatedRoute
    ) {
        super();
        this.setBackButtonUrl(2);
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.medicalExamId = params["medicalExamId"];
            this.previousMedicalExamId = params["previousMedicalExamId"];

            if (this.previousMedicalExamId) {
                this.registerPathParams([["previousMedicalExamId", this.previousMedicalExamId]]);
            }
        });

        this.answersService.getAnswerForQuestionWithId(this.buildId("2/B")).then(() => {
            [
                "2/B",
                "2/C",
                "2/D",
                "2/E",
                "2/F",
                "4/A",
                "4/B/0",
                "4/C/0",
                "4/D",
                "5/A/0",
                "5/B/0",
                "5/C/0",
                "5/C/1",
                "12/3L",
                "12/4L",
                "12/5L",
                "12/7L",
                "13"
            ].forEach(async id => {
                const fullId = this.buildId(id);
                const value = await this.answersService.getAnswerForQuestionWithId(fullId);
                this.values.set(fullId, value);
            });
            this.formResultsLoaded = true;
        });
    }

    public buildId(questionId: string): string {
        return this.id + questionId;
    }

    public getInput(id: string): string {
        const value = this.values.get(this.buildId(id));
        return value || "";
    }

    public isChecked(id: string): boolean {
        const value = this.values.get(this.buildId(id));
        return value && value.length !== 0;
    }

    public isRadioChecked(id: string, index: number): boolean {
        const value = this.values.get(this.buildId(id));
        return value !== null && value !== undefined && value === index;
    }

    public onInputChange(event, id: string) {
        this.answersService.updateAnswerForQuestionWithId(id, event.detail.value);
    }

    public onIfNegativeChange(id: string) {
        this.answersService.getAnswerForQuestionWithId(id).then(oldAnswer => {
            if (oldAnswer && oldAnswer.length !== 0) {
                this.answersService.updateAnswerForQuestionWithId(id, []);
            } else {
                this.answersService.updateAnswerForQuestionWithId(id, [0]);
            }
        });
    }

    public onRadioChange(index: number, id: string) {
        this.answersService.updateAnswerForQuestionWithId(id, index);
    }

    public goBack() {
        this.medicalExamService.medicalExamWithId(this.medicalExamId).then(() => {
            this.navController.navigateBack(this.backHref);
        });
    }
}
