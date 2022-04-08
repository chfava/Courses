import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FormsListComponent } from "../../components/forms-list/forms-list.component";
import { SignatureComponent } from "../../components/signature/signature.component";

@NgModule({
    declarations: [SignatureComponent, FormsListComponent],
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [SignatureComponent, FormsListComponent]
})
export class SharedModule {}
