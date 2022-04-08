import { ActivatedRoute } from "@angular/router";
import { IonRefresher } from "@ionic/angular";
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from "@angular/core";

import { AuthenticationService, Roles } from "../../services/authentication.service";
import { EmployeesOfClinicListComponent } from "../../components/employees-of-clinic-list/employees-of-clinic-list.component";
import { EmployeeType } from "../../models/employee.model";
import { BackButtonPage } from "../back-button.page";

@Component({
    selector: "app-admin",
    templateUrl: "admin.page.html",
    styleUrls: ["admin.page.scss"]
})
export class AdminPage extends BackButtonPage implements OnInit {
    @ViewChild(IonRefresher) public refresher: IonRefresher;
    @ViewChildren(EmployeesOfClinicListComponent) public employeesLists: QueryList<EmployeesOfClinicListComponent>;

    public isPageFirstLoading: boolean;
    public clinicId: string;
    public superAdminRole = Roles.SuperAdmin;
    public EmployeeType = EmployeeType;

    constructor(private route: ActivatedRoute, public authService: AuthenticationService) {
        super();
        this.backHref = "/clinics";
    }

    public ngOnInit() {
        this.isPageFirstLoading = true;
        this.refresher.disabled = true;

        this.route.params.subscribe(params => {
            this.clinicId = params["clinicId"];
        });
    }

    public ionViewWillEnter() {
        this.isPageFirstLoading = true;
        this.refresher.disabled = true;
        this.refresh();
    }

    public refresh() {
        this.employeesLists.forEach(list => {
            list.refresh();
        });
    }

    public isLoadingPage(): boolean {
        this.employeesLists.forEach(list => {
            if (list.isLoading) {
                return true;
            }
        });
        return false;
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
