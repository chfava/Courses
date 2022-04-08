import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { HttpErrorInterceptor } from "../../interceptors/http-error.interceptor";
import { TokenInterceptor } from "../../interceptors/token.interceptor";
import { FormPageModule } from "../form/form.module";
import { MedicalExamCreationPageModule } from "../medical-exam-creation/medical-exam-creation.module";
import { ClinicCreationPageModule } from "../clinic-creation/clinic-creation.module";
import { PatientCreationPageModule } from "../patient-creation/patient-creation.module";
import { EmployeeCreationPageModule } from "../employee-creation/employee-creation.module";
import { EmployeeUpdatePageModule } from "../employee-update/employee-update.module";
import { PatientPageModule } from "../patient/patient.module";
import { HomePageModule } from "../home/home.module";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        IonicModule.forRoot({
            backButtonText: "Retour"
        }),
        AppRoutingModule,
        HttpClientModule,
        HomePageModule,
        PatientPageModule,
        PatientCreationPageModule,
        MedicalExamCreationPageModule,
        FormPageModule,
        EmployeeCreationPageModule,
        EmployeeUpdatePageModule,
        ClinicCreationPageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        EmailComposer,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
