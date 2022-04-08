import { Component, OnInit } from "@angular/core";

import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: "app-first-time-login",
    templateUrl: "./first-time-login.page.html",
    styleUrls: ["./first-time-login.page.scss"]
})
export class FirstTimeLoginPage implements OnInit {
    public username: string;

    constructor(private authService: AuthenticationService) {}

    public ngOnInit() {
        this.username = this.authService.UsernameFromToken;
    }

    public navigateToNextPage() {
        this.authService.navigateToNextPageDependingOnRole(false);
    }
}
