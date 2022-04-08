import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "automatic-sum",
    templateUrl: "./automatic-sum.component.html",
    styleUrls: ["./automatic-sum.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => AutomaticSumComponent)
        }
    ]
})
export class AutomaticSumComponent extends BaseQuestionComponent<number> implements OnInit, OnDestroy {
    @Input() public sumIds: string[];

    public isInPatientMode: boolean;
    private answers = new Map<string, number>();
    private subscription: Subscription;

    public ngOnInit() {
        super.ngOnInit();
        this.initAnswerIfNeeded();
        this.startAutomaticSumming();

        this.isInPatientMode = !this.authService.isAuthenticated();
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    protected initAnswerIfNeeded() {
        if (this.answer == null) {
            this.answer = 0;
        }
    }

    private startAutomaticSumming() {
        this.subscription = this.formEventPubSubService.emitter.subscribe((event: any) => {
            if (!event || isNaN(event.answer) || !event.id || typeof event.id !== "string") {
                // answer is junk
                return;
            }

            // Strip database ID
            event.id = event.id.substring(event.id.indexOf("/") + 1, event.id.length);
            if (this.sumIds.includes(event.id)) {
                if (this.answers.has(event.id)) {
                    // remove previous answer's value
                    this.answer -= this.answers.get(event.id);
                }

                this.answers.set(event.id, event.answer);
                this.answer += event.answer;
                this.onChange(this.answer);
            }
        });
    }
}
