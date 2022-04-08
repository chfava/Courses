import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import FormAnswers from "../../models/form-answers.model";
import { FormService } from "../../services/form.service";

@Component({
    selector: "app-forms-list",
    templateUrl: "./forms-list.component.html",
    styleUrls: ["./forms-list.component.scss"]
})
export class FormsListComponent {
    @Input() public formListTitle: string;
    @Input() public formAnswers: FormAnswers[];
    @Input() public url: string;
    @Input() public params: Object;

    constructor(public router: Router, private formService: FormService) {}

    public getFormTitle(formConfigId: string) {
        return this.formService.formWithId(formConfigId).Title;
    }

    public routeToFormWithId(formId: string) {
        this.router.navigate([`/${this.url}/form/${formId}`, this.params]);
    }

    // TODO(gabrielbdry): Voir si on peut pas bouger ce code dans les modèles, le problème en ce moment est que le FormAnswers a pas accès
    //  au Form.
    public hasScore(formAnswers: FormAnswers) {
        const sumIds = [];
        this.deepSumFinder(this.formService.formWithId(formAnswers.Id).Template.form.section, sumIds);
        return sumIds.length !== 0;
    }

    public calculateScore(formAnswers: FormAnswers) {
        const formSections = this.formService.formWithId(formAnswers.Id).Template.form.section;

        // First we find automatic sum questions.
        let sumIds: string[] = [];
        this.deepSumFinder(formSections, sumIds);
        if (sumIds.length === 0) {
            return null;
        }

        // Then we calculate the maximum score for all answers.
        let total = 0;
        for (let sumId of sumIds) {
            const sumIdPath = sumId.split("/");
            // Remove form id.
            sumIdPath.shift();
            const question = this.findQuestionWithId(formSections, sumIdPath);

            if (question.radio) {
                // Radio button question.
                total += question.radio.length;
            } else if (question.max) {
                // Slider question.
                total += question.max;
            }
        }

        // Then we calculate the achieved score.
        let sum = 0;
        for (let sumId of sumIds) {
            const sumIdPath = sumId.split("/");
            // Remove form id.
            sumIdPath.shift();

            // Run through the map to find the answer or undefined if not responded to.
            let val = formAnswers.Data.get(sumIdPath[0]);
            sumIdPath.shift();
            while (sumIdPath.length !== 0 && val) {
                val = val.get(sumIdPath[0]);
                sumIdPath.shift();
            }

            if (typeof val === "number") {
                sum += val;
            }
        }

        return `${sum.toString()}/${total.toString()}`;
    }

    // Takes an object and recursively looks through it find all automaticSum subfields, expected to be arrays of string.
    private deepSumFinder(obj: any, sumIds: string[]) {
        if (typeof obj !== "object") {
            return;
        }

        for (const property in obj) {
            if (property === "automaticSum") {
                sumIds.push(...obj[property]);
                return;
            } else {
                this.deepSumFinder(obj[property], sumIds);
            }
        }
    }

    // Uses a BFS to find a question object using the Id path. Will look through id properties and subquestion objects. Only handles search
    // starting from the section of a form.
    private findQuestionWithId(formSections: any, questionIdPath: string[]) {
        let objectsToAnalyze = [];
        for (const section in formSections) {
            if (formSections.hasOwnProperty(section)) {
                objectsToAnalyze.push(formSections[section]);
            }
        }
        let nextId = questionIdPath.shift();
        while (objectsToAnalyze.length !== 0) {
            const object = objectsToAnalyze.shift();
            for (const property in object) {
                if (!object.hasOwnProperty(property)) {
                    continue;
                }

                if (property === nextId) {
                    nextId = questionIdPath.shift();
                    if (!nextId) {
                        return object[property];
                    }

                    objectsToAnalyze = [object[property]];
                    break;
                }

                if (property === "subquestion") {
                    objectsToAnalyze.push(object[property]);
                }
            }
        }

        return null;
    }
}
