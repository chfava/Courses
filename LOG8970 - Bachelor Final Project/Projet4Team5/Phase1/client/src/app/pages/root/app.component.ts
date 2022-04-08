import { Component } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform, NavController } from "@ionic/angular";

import { AuthenticationService, Roles } from "../../services/authentication.service";

interface IMenuPage {
    title: string;
    url: string;
    icon: string;
}

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent {
    public menuPages: IMenuPage[];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthenticationService,
        private navController: NavController
    ) {
        this.initializeApp();
    }

    public openMenu() {
        this.menuPages = [];
        if (this.authService.hasPermissions([Roles.Secretary, Roles.Practician])) {
            this.menuPages.push({
                title: "Accueil",
                url: "/patients",
                icon: "home"
            });
        }
        if (this.authService.hasPermissions([Roles.Admin])) {
            this.menuPages.push({
                title: "Administration",
                url: "/admin/" + this.authService.ClinicIdFromToken,
                icon: "people"
            });
        }
        if (this.authService.hasPermissions([Roles.SuperAdmin])) {
            this.menuPages.push({
                title: "Gestion des cliniques",
                url: "/clinics",
                icon: "medical"
            });
        }
        this.menuPages.push({
            title: "Profil",
            url: "/profile",
            icon: "settings"
        });
        if (this.authService.hasPermissions([Roles.SuperAdmin])) {
            this.menuPages.push({
                title: "Données",
                url: "/data-analysis",
                icon: "analytics"
            });
        }
    }

    private initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    public onLogout() {
        this.authService.logout();
        this.navController.navigateBack("/login");
    }
}
