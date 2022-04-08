import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { NavController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";

import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private readonly auth: AuthenticationService, private readonly navController: NavController) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return fromPromise(this.handleError(req, next));
    }

    private async handleError(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        try {
            return await next.handle(req.clone()).toPromise();
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    this.auth.logout();
                    this.navController.navigateBack("/login");
                }
            }

            throw error;
        }
    }
}
