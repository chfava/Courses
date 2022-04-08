import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: "root" })
export class LoggedInGuard implements CanActivate {
    constructor(private authService: AuthenticationService) {}

    public canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            this.authService.navigateToNextPageDependingOnRole(false);
            return false;
        }
        return true;
    }
}
