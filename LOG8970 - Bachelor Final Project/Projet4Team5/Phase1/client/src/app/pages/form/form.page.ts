import { KeyValue } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AnswersService } from "../../services/answers.service";

import { orderedFormQuestionsByKeyAsc } from "../../utils/utils";
import Form from "../../models/form.model";
import { FormService } from "../../services/form.service";
import { AuthenticationService, Roles } from "../../services/authentication.service";
import { MedicalExamService } from "../../services/medical-exam.service";
import { BackButtonPage } from "../back-button.page";
import MedicalExam from "../../models/medical-exam.model";

@Component({
    selector: "app-form",
    templateUrl: "./form.page.html",
    styleUrls: ["./form.page.scss"]
})
export class FormPage extends BackButtonPage implements OnInit {
    @ViewChild("ionContent", { read: ElementRef }) public ionContent: ElementRef;

    public form: Form;
    public currentSection = 1;
    public medicalExamId: string;
    public previousMedicalExamId: string;
    public isLoadingMedicalExamAnswers = true;
    public isLoadingPreviousMedicalExamAnswers = true;
    public isForm4Editable: boolean;

    constructor(
        private formService: FormService,
        private medicalExamService: MedicalExamService,
        private answersService: AnswersService,
        private navController: NavController,
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        public router: Router
    ) {
        super();
        this.setBackButtonUrl(2);
    }

    public ngOnInit() {
        this.isLoadingMedicalExamAnswers = true;
        this.isLoadingPreviousMedicalExamAnswers = true;
        this.route.params.subscribe(params => {
            this.medicalExamId = params["medicalExamId"];
            this.previousMedicalExamId = params["previousMedicalExamId"];

            if (this.previousMedicalExamId) {
                this.registerPathParams([["previousMedicalExamId", this.previousMedicalExamId]]);
            }

            this.medicalExamService.medicalExamWithId(this.medicalExamId).then((medicalExam: MedicalExam) => {
                this.isForm4Editable = medicalExam.isActive && this.authService.RoleFromToken === Roles.Practician;
            });

            // Load answers of medical exam if not loaded before showing form
            // (to avoid every question component to load answers individually)
            this.answersService.answersForMedicalExamWithId(this.medicalExamId).then(() => {
                this.isLoadingMedicalExamAnswers = false;
            });

            let formId = params["formId"];
            if (formId !== undefined) {
                this.form = this.formService.formWithId(formId);

                // Disable scroll if loading form #5
                if (formId === "5") {
                    let content = this.ionContent.nativeElement as HTMLIonContentElement;
                    content.classList.add("disabledScroll");
                } else if (formId === "14") {
                    // Load answers of last medical exam if not loaded before showing form
                    // (to avoid every question component to load answers individually)
                    if (this.previousMedicalExamId) {
                        this.answersService.answersForMedicalExamWithId(this.previousMedicalExamId).then(() => {
                            this.isLoadingPreviousMedicalExamAnswers = false;
                        });
                    }
                }
            }

            if (formId == null || formId !== "14" || this.previousMedicalExamId == null) {
                this.isLoadingPreviousMedicalExamAnswers = false;
            }
        });
    }

    public orderedByKeyAsc(a: KeyValue<string, Object>, b: KeyValue<string, Object>): number {
        return orderedFormQuestionsByKeyAsc(a, b);
    }

    public previousPage() {
        this.currentSection = this.currentSection - 1;
    }

    public nextPage() {
        this.currentSection = this.currentSection + 1;
    }

    public goBack() {
        this.medicalExamService.medicalExamWithId(this.medicalExamId).then(() => {
            this.navController.navigateBack(this.backHref);
        });
    }
}
