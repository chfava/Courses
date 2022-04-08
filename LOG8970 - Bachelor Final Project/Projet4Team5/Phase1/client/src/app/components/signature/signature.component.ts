import { Component, Input, ViewChild } from "@angular/core";
import { IonCheckbox } from "@ionic/angular";

@Component({
    selector: "signature",
    templateUrl: "./signature.component.html",
    styleUrls: ["./signature.component.scss"]
})
export class SignatureComponent {
    @ViewChild(IonCheckbox) public checkbox: IonCheckbox;
    @Input() public name: string;
}
