import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { ProfilePage } from "./profile.page";
import { ChangePasswordModule } from "../../components/change-password/change-password.module";

const routes: Routes = [
    {
        path: "",
        component: ProfilePage
    }
];

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterModule.forChild(routes), ChangePasswordModule],
    declarations: [ProfilePage]
})
export class ProfilePageModule {}
