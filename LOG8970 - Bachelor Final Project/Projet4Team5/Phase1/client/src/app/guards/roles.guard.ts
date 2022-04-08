import { NavController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: "root" })
export class RolesGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private navController: NavController) {}

    public canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRoles: string[] = route.data.expectedRoles;

        if (!this.authService.hasPermissions(expectedRoles)) {
            this.navController.navigateBack("/login");
            return false;
        }
        return true;
    }
}
