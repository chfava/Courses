import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MeditrinaeApi } from "./meditrinae.api";

@Injectable({
    providedIn: "root"
})
export class AIService extends MeditrinaeApi {
    constructor(private httpClient: HttpClient) {
        super("ai");
    }

    public getAIResults(medicalExamId: string): Promise<string[][][]> {
        return new Promise(resolve => {
            this.httpClient.get<string[][][]>(this.url("predict/" + medicalExamId)).subscribe((aiResults: string[][][]) => {
                resolve(aiResults);
            });
        });
    }

    public trainAI(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpClient.post<any>(this.url("train"), null).subscribe(
                () => {
                    resolve();
                },
                err => {
                    reject(err);
                }
            );
        });
    }

    public getCSVFromData(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.httpClient.get(this.url("training-data"), { responseType: "text" }).subscribe(
                data => {
                    resolve(data);
                },
                err => {
                    reject(err);
                }
            );
        });
    }
}
