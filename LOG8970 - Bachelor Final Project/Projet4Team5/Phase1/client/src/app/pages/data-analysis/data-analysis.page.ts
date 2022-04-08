import { Component } from "@angular/core";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { AlertController } from "@ionic/angular";
import { AIService } from "../../services/ai.service";

@Component({
    selector: "app-data-analysis",
    templateUrl: "data-analysis.page.html",
    styleUrls: ["data-analysis.page.scss"]
})
export class DataAnalysisPage {
    public isTrainingAI = false;
    public isAITrained = false;
    public isExportingData = false;
    public isDataExported = false;

    constructor(private aiService: AIService, private emailComposer: EmailComposer, private alertController: AlertController) {}

    public get trainAIButtonTitle(): string {
        return this.isAITrained ? "L'IA a été entraînée." : "Entraîner l'IA maintenant";
    }

    public get exportDataButtonTitle(): string {
        return this.isDataExported ? "Les données ont été exportées." : "Exporter les données en CSV";
    }

    public get isBusy(): boolean {
        return this.isTrainingAI || this.isExportingData;
    }

    public trainAI() {
        if (!this.isTrainingAI) {
            this.isTrainingAI = true;

            this.aiService
                .trainAI()
                .then(() => {
                    this.trainAI();
                    this.presentSuccessfulTrainedAIAlert();
                    this.isTrainingAI = false;
                    this.isAITrained = true;
                })
                .catch(() => {
                    this.isTrainingAI = false;
                    this.presentErrorAlert("Échec de l'entraînement de l'IA.");
                });
        }
    }

    public exportData() {
        if (!this.isExportingData) {
            this.isExportingData = true;

            this.aiService
                .getCSVFromData()
                .then((fileContent: string) => {
                    let email = {
                        to: "",
                        cc: "",
                        attachments: [this.generateAttachment(fileContent, "meditrinae_data.csv")],
                        subject: "Données médicales - Meditrinae",
                        body: "",
                        isHtml: true
                    };

                    this.emailComposer.open(email).then(
                        () => {
                            this.isDataExported = true;
                        },
                        () => {
                            this.isDataExported = false;
                            this.presentErrorAlert(
                                "Impossible d'envoyer les données par courriel. Assurez-vous d'être sur une tablette compatible."
                            );
                        }
                    );

                    this.isExportingData = false;
                })
                .catch(() => {
                    this.isExportingData = false;
                    this.presentErrorAlert("Échec de l'exportation des données en csv.");
                });
        }
    }

    private generateAttachment(content: string, fileName: string) {
        let contentParts = content.split(",");
        contentParts.shift();
        return "base64:" + fileName + "//" + btoa(unescape(encodeURI(contentParts.join(","))));
    }

    private async presentSuccessfulTrainedAIAlert() {
        const alert = await this.alertController.create({
            header: "Succès",
            subHeader: "L'intelligence artificielle est au meilleur de ses capacités.",
            buttons: ["Super!"]
        });
        await alert.present();
    }

    private async presentErrorAlert(message: string) {
        const alert = await this.alertController.create({
            header: "Erreur",
            subHeader: message,
            buttons: ["OK"]
        });
        await alert.present();
    }
}
