import { Component } from "@angular/core";

import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: "app-not-found",
    templateUrl: "./not-found.page.html",
    styleUrls: ["./not-found.page.scss"]
})
export class NotFoundPage {
    constructor(private authService: AuthenticationService) {}

    public goBackToFirstPage() {
        this.authService.navigateToNextPageDependingOnRole(true);
    }
}
