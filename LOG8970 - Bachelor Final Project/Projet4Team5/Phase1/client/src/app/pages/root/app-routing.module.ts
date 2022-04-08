import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../../guards/auth.guard";
import { LoggedInGuard } from "../../guards/logged-in.guard";
import { Roles } from "../../services/authentication.service";
import { RolesGuard } from "../../guards/roles.guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        canActivate: [LoggedInGuard],
        loadChildren: "../login/login.module#LoginPageModule"
    },
    {
        path: "first-time-login",
        canActivate: [AuthGuard],
        loadChildren: "../first-time-login/first-time-login.module#FirstTimeLoginPageModule"
    },
    {
        path: "admin/:clinicId",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Admin, Roles.SuperAdmin]
        },
        loadChildren: "../admin/admin.module#AdminPageModule"
    },
    {
        path: "profile",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Admin, Roles.Secretary, Roles.Practician, Roles.SuperAdmin]
        },
        loadChildren: "../profile/profile.module#ProfilePageModule"
    },
    {
        path: "clinics",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.SuperAdmin]
        },
        loadChildren: "../clinics/clinics.module#ClinicsPageModule"
    },
    {
        path: "data-analysis",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.SuperAdmin]
        },
        loadChildren: "../data-analysis/data-analysis.module#DataAnalysisPageModule"
    },
    {
        path: "patients",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Practician, Roles.Secretary]
        },
        loadChildren: "../home/home.module#HomePageModule"
    },
    {
        path: "patients/:patientId",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Practician, Roles.Secretary]
        },
        loadChildren: "../patient/patient.module#PatientPageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId",
        pathMatch: "full",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Practician, Roles.Secretary]
        },
        loadChildren: "../medical-exam/medical-exam.module#MedicalExamPageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId/active",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Practician, Roles.Secretary]
        },
        loadChildren: "../active-medical-exam/active-medical-exam.module#ActiveMedicalExamPageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId/active/form/:formId",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Practician, Roles.Secretary]
        },
        loadChildren: "../form/form.module#FormPageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId/form/:formId",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Practician, Roles.Secretary]
        },
        loadChildren: "../form/form.module#FormPageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId/active/results",
        canActivate: [AuthGuard, RolesGuard],
        data: {
            expectedRoles: [Roles.Practician]
        },
        loadChildren: "../active-medical-exam-results/active-medical-exam-results.module#ActiveMedicalExamResultsPageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId/active/patient-mode/pre",
        loadChildren: "../patient-mode-pre/patient-mode-pre.module#PatientModePrePageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId/active/patient-mode/pre/forms",
        loadChildren: "../patient-mode-forms/patient-mode-forms.module#PatientModeFormsPageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId/active/patient-mode/pre/forms/form/:formId",
        loadChildren: "../form/form.module#FormPageModule"
    },
    {
        path: "patients/:patientId/medical-exams/:medicalExamId/active/patient-mode/pre/forms/post",
        loadChildren: "../patient-mode-post/patient-mode-post.module#PatientModePostPageModule"
    },
    {
        path: "**",
        loadChildren: "../not-found/not-found.module#NotFoundPageModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
