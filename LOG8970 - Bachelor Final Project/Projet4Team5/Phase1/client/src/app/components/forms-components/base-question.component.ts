import { Input, OnInit } from "@angular/core";
import MedicalExam from "../../models/medical-exam.model";
import { AnswersService } from "../../services/answers.service";
import { AppInjectorService } from "../../services/app-injector.service";
import { AuthenticationService, Roles } from "../../services/authentication.service";
import { FormEventPubSubService } from "../../services/form-event-pub-sub.service";
import { MedicalExamService } from "../../services/medical-exam.service";
import { parseQuestionId } from "../../utils/utils";

export abstract class BaseQuestionComponent<T> implements OnInit {
    @Input() public id: string;
    @Input() public question: string;
    public answer: T;
    public isEditable: boolean;
    protected formEventPubSubService: FormEventPubSubService;
    private medicalExamService: MedicalExamService;
    private answersService: AnswersService;
    protected authService: AuthenticationService;

    constructor() {
        this.formEventPubSubService = AppInjectorService.Injector.get(FormEventPubSubService);
        this.medicalExamService = AppInjectorService.Injector.get(MedicalExamService);
        this.answersService = AppInjectorService.Injector.get(AnswersService);
        this.authService = AppInjectorService.Injector.get(AuthenticationService);
    }

    public ngOnInit() {
        if (this.id) {
            this.answersService.getAnswerForQuestionWithId(this.id).then((answer: T) => {
                this.answer = answer;
                this.initAnswerIfNeeded();
            });

            let medicalExamId = parseQuestionId(this.id).shift();
            this.medicalExamService.medicalExamWithId(medicalExamId).then((medicalExam: MedicalExam) => {
                this.isEditable =
                    medicalExam.isActive && (this.authService.RoleFromToken === Roles.Practician || !this.authService.isAuthenticated());
            });
        }
    }

    public onChange(newValue: T) {
        let event = { id: this.id, answer: newValue };
        this.formEventPubSubService.publishEvent(event);
        this.answersService.updateAnswerForQuestionWithId(this.id, newValue);
    }

    protected initAnswerIfNeeded() {}
}
