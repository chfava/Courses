import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MeditrinaeApi } from "./meditrinae.api";

@Injectable({
    providedIn: "root"
})
export class DecisionTreeService extends MeditrinaeApi {
    constructor(private httpClient: HttpClient) {
        super("decision-tree");
    }

    public getDecisionTreeResults(medicalExamId: string): Promise<string[][]> {
        return new Promise(resolve => {
            this.httpClient.get<string[][]>(this.url(medicalExamId)).subscribe((decisionTreeResults: string[][]) => {
                resolve(decisionTreeResults);
            });
        });
    }
}
