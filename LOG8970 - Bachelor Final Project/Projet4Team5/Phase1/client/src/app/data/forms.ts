import Form from "../models/form.model";
import { form1 } from "./form1";
import { form2 } from "./form2";
import { form3 } from "./form3";
import { form4 } from "./form4";
import { form5 } from "./form5";
import { form6 } from "./form6";
// import { form7 } from "./form7"; Not wanted according to Antonin 04-04-2019
import { form8 } from "./form8";
// import { form9 } from "./form9"; Not wanted according to Antonin 04-04-2019
import { form10 } from "./form10";
import { form11 } from "./form11";
import { form12 } from "./form12";
import { form13 } from "./form13";
import { form14 } from "./form14";

export const allForms = [
    new Form("Dépistage de douleur de DTM", "1", "Axis I", form1),
    new Form("Questionnaire symptômes de DTM", "2", "Axis I", form2),
    new Form("Données démographiques", "3", "Axis I", form3),
    new Form("Formulaire examen clinique (FDI)", "4", "Axis II", form4),
    new Form("Morphographie de la douleur", "5", "Axis II", form5),
    new Form("Échelle graduée de douleur chronique - version 2.0", "6", "Axis II", form6),
    // new Form("Échelle de limitation fonctionnelle de la mandibule - 8 (JFLS-8)", "7", "Axis II", form7),
    new Form("Échelle de limitation fonctionnelle de la mandibule - 20 (JFLS-20)", "8", "Axis II", form8),
    // new Form("Questionnaire sur la santé du patient - 4 (PHQ-4)", "9", "Axis II", form9),
    new Form("Questionnaire sur la santé du patient - 9 (PHQ-9)", "10", "Axis II", form10),
    new Form("Troubles anxieux généralisés - 7 (GAD-7)", "11", "Axis II", form11),
    new Form("Questionnaire sur la santé du patient - 15 (PHQ-15)", "12", "Axis II", form12),
    new Form("Inventaires des habitudes orales (OBC)", "13", "Axis II", form13),
    new Form("Monitorage des traitements", "14", "Axis II", form14)
];
