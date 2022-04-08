import { Component, OnInit, ViewChild } from "@angular/core";
import { IonRefresher, ModalController } from "@ionic/angular";

import { ClinicCreationPage } from "../clinic-creation/clinic-creation.page";
import { ClinicsListComponent } from "../../components/clinics-list/clinics-list.component";

@Component({
    selector: "app-clinics",
    templateUrl: "clinics.page.html",
    styleUrls: ["clinics.page.scss"]
})
export class ClinicsPage implements OnInit {
    @ViewChild(IonRefresher) public refresher: IonRefresher;
    @ViewChild(ClinicsListComponent) public clinicsList: ClinicsListComponent;

    public isPageFirstLoading: boolean;

    constructor(private modalController: ModalController) {}

    public ngOnInit() {
        this.isPageFirstLoading = true;
        this.refresher.disabled = true;
    }

    public ionViewWillEnter() {
        this.isPageFirstLoading = true;
        this.refresher.disabled = true;
        this.refresh();
    }

    public refresh() {
        this.clinicsList.refresh();
    }

    public isLoadingPage(): boolean {
        return this.clinicsList.isLoading;
    }

    public async showClinicCreationPage() {
        let modal = await this.modalController.create({
            component: ClinicCreationPage,
            componentProps: { clinic: null }
        });
        modal.onDidDismiss().then(() => {
            this.refresh();
        });
        return await modal.present();
    }

    public completeRefresherIfFinished() {
        if (!this.isLoadingPage()) {
            this.refresher.complete();

            if (this.isPageFirstLoading) {
                this.refresher.disabled = false;
                this.isPageFirstLoading = false;
            }
        }
    }
}
