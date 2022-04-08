import { Injectable } from "@angular/core";

import { allForms } from "../data/forms";
import Form from "../models/form.model";
import { MAIN_FORM_IDS } from "../utils/constants";

@Injectable({
    providedIn: "root"
})
export class FormService {
    public static get Forms(): Form[] {
        return allForms;
    }

    public static get MainForms(): Form[] {
        // MainForms are FDI form and Drawing form
        return allForms.filter(form => MAIN_FORM_IDS.includes(form.Id));
    }

    public static get ComplementaryForms(): Form[] {
        // ComplementaryForms are all forms but FDI form and Drawing form
        return allForms.filter(form => !MAIN_FORM_IDS.includes(form.Id));
    }

    public formWithId(formId: string): Form {
        return allForms.find((form: Form) => form.Id === formId);
    }
}
