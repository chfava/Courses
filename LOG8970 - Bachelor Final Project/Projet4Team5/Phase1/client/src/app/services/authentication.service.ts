import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import * as jwt_decode from "jwt-decode";

import { IAccessToken } from "../utils/requests-interfaces";
import { MeditrinaeApi } from "./meditrinae.api";
import { IEmployee } from "../utils/requests-interfaces";

export enum Roles {
    Admin = "admin",
    Practician = "practician",
    Secretary = "secretary",
    SuperAdmin = "super-admin"
}

@Injectable({
    providedIn: "root"
})
export class AuthenticationService extends MeditrinaeApi {
    constructor(private http: HttpClient, private router: Router, private navController: NavController) {
        super("auth");
    }

    public get TokenAccess(): string {
        return localStorage.getItem("tokenAccess");
    }

    public async login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http
                .post<{ accessToken: string; firstLogIn: boolean }>(
                    this.url("token"),
                    {
                        username,
                        password
                    },
                    { headers: { "Content-Type": "application/json" } }
                )
                .toPromise()
                .then(
                    res => {
                        localStorage.setItem("tokenAccess", res.accessToken);
                        resolve(res.firstLogIn);
                    },
                    msg => {
                        reject(msg);
                    }
                );
        });
    }

    public get UsernameFromStorage() {
        return localStorage.getItem("username");
    }

    public saveUsernameToStorage() {
        localStorage.setItem("username", this.UsernameFromToken);
    }

    public removeUsernameFromStorage() {
        localStorage.removeItem("username");
    }

    public logout() {
        localStorage.removeItem("tokenAccess");
    }

    public isAuthenticated(): boolean {
        return this.TokenAccess != null;
    }

    public hasPermissions(expectedRoles: string[]): boolean {
        return expectedRoles.indexOf(this.RoleFromToken) !== -1;
    }

    public get UsernameFromToken(): string {
        return this.DecodedAccessToken.user.username;
    }

    public get UserIdFromToken(): string {
        return this.DecodedAccessToken.user._id;
    }

    public get ClinicIdFromToken(): string {
        return this.EmployeeFromToken.clinic;
    }

    public get RoleFromToken(): string {
        return this.DecodedAccessToken ? this.DecodedAccessToken.user.role.name : null;
    }

    public get EmployeeFromToken(): IEmployee {
        return this.DecodedAccessToken[this.RoleFromToken];
    }

    public navigateToNextPageDependingOnRole(navigateBack: boolean) {
        let url: string;
        switch (this.RoleFromToken) {
            case Roles.Admin:
                url = "/admin/" + this.ClinicIdFromToken;
                break;
            case Roles.SuperAdmin:
                url = "/clinics";
                break;
            default:
                url = "/patients";
                break;
        }

        if (navigateBack) {
            this.navController.navigateBack(url);
        } else {
            this.router.navigate([url]);
        }
    }

    private get DecodedAccessToken(): IAccessToken {
        try {
            return jwt_decode(this.TokenAccess);
        } catch (Error) {
            return null;
        }
    }
}
