import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { ChangePasswordComponent } from "./change-password.component";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, IonicModule],
    declarations: [ChangePasswordComponent],
    exports: [ChangePasswordComponent]
})
export class ChangePasswordModule {}
