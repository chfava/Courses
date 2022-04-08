import { NavController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(private navController: NavController, private authService: AuthenticationService) {}

    public canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.navController.navigateBack("/login");
            return false;
        }
    }
}
