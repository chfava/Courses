import { form1 } from "./forms/form1";
// import { form9 } from "./forms/form9"; Not wanted according to Antonin 04-04-2019
import { form10 } from "./forms/form10";
import { form11 } from "./forms/form11";
import { form12 } from "./forms/form12";
import { form13 } from "./forms/form13";
import { form14 } from "./forms/form14";
import { form2 } from "./forms/form2";
import { form3 } from "./forms/form3";
import { form4 } from "./forms/form4";
import { form5 } from "./forms/form5";
import { form6 } from "./forms/form6";
// import { form7 } from "./forms/form7"; Not wanted according to Antonin 04-04-2019
import { form8 } from "./forms/form8";

export interface FormsData {
  forms: any[];
}

export const formsData: FormsData = {
  forms: [form1, form2, form3, form4, form5, form6, form8, form10, form11, form12, form13, form14]
};
