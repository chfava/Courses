"use strict";
exports.__esModule = true;
var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var res = {
    "questions": {
        "FIRST_NAME": "Jean clément",
        "LAST_NAME": "Cadel15",
        "SEXE": "Femme",
        "AGE": "25",
        "DD1": "La douleur apparait et disparait",
        "DD2": "Non",
        "DD3A": "Oui",
        "DD3B": "Oui",
        "DD3C": "Oui",
        "DD3D": "Oui",
        "QS1": "Oui",
        "QS2": "3",
        "QS3": "Douleur qui vient et part",
        "QS4A": "Oui",
        "QS4B": "Oui",
        "QS4C": "Oui",
        "QS5": "Non",
        "QS6": "0",
        "QS7A": "Non",
        "QS7B": "Non",
        "QS7C": "Non",
        "QS7D": "Non",
        "QS8": "Oui",
        "QS8E": "G",
        "QS9": "Oui",
        "QS9E": "G",
        "QS10": "Oui",
        "QS10E": "G",
        "QS11": "Oui",
        "QS11E": "G",
        "QS12": "Non",
        "QS12E": "NSP",
        "QS13": "Non",
        "QS13E": "NSP",
        "QS14": "Non",
        "QS14E": "NSP",
        "DEMO1": "Jamais marié(e)",
        "DEMO2": "Toulouse",
        "DEMO3": "Professions libérales et assimilés",
        "DEMO4": "Universitaire 2e ou 3e cycle",
        "E1B_D": "Non",
        "E1B_G": "Autre",
        "E1_DOUL_D_ATM": "NA",
        "E1_DOUL_D_DIGASTRIQUEPOS": "NA",
        "E1_DOUL_D_MASSETER_BODY": "NA",
        "E1_DOUL_D_MASSETER_INSERTION": "NA",
        "E1_DOUL_D_MASSETER_ORIGIN": "NA",
        "E1_DOUL_D_PTERIGOIDIENMEDIAL": "NA",
        "E1_DOUL_D_TEMPORAL_ANTERIOR": "NA",
        "E1_DOUL_D_TEMPORAL_MIDDLE": "NA",
        "E1_DOUL_D_TEMPORAL_POSTERIOR": "NA",
        "E1_DOUL_G_ATM": "NA",
        "E1_DOUL_G_DIGASTRIQUEPOS": "NA",
        "E1_DOUL_G_MASSETER_BODY": "NA",
        "E1_DOUL_G_MASSETER_INSERTION": "NA",
        "E1_DOUL_G_MASSETER_ORIGIN": "NA",
        "E1_DOUL_G_PTERIGOIDIENMEDIAL": "NA",
        "E1_DOUL_G_TEMPORAL_ANTERIOR": "NA",
        "E1_DOUL_G_TEMPORAL_MIDDLE": "NA",
        "E1_DOUL_G_TEMPORAL_POSTERIOR": "NA",
        "E2DIST_H": "2",
        "E2DIST_MEDIA": "2",
        "E2DIST_V": "2",
        "E2NEG_H": "negatif",
        "E2NEG_V": "negatif",
        "E2REF": "Aucune",
        "E4A": "30",
        "E4B": "35",
        "E4C": "40",
        "E4D": "N",
        "E4_MA_D_ATM": "NA",
        "E4_MA_D_DIGASTRIQUEPOS": "NA",
        "E4_MA_D_MASSETER_BODY": "NA",
        "E4_MA_D_MASSETER_INSERTION": "NA",
        "E4_MA_D_MASSETER_ORIGIN": "NA",
        "E4_MA_D_PTERIGOIDIENMEDIAL": "NA",
        "E4_MA_D_TEMPORAL_ANTERIOR": "NA",
        "E4_MA_D_TEMPORAL_MIDDLE": "NA",
        "E4_MA_D_TEMPORAL_POSTERIOR": "NA",
        "E4_MA_G_ATM": "DH",
        "E4_MA_G_DIGASTRIQUEPOS": "NA",
        "E4_MA_G_MASSETER_BODY": "NA",
        "E4_MA_G_MASSETER_INSERTION": "NA",
        "E4_MA_G_MASSETER_ORIGIN": "NA",
        "E4_MA_G_PTERIGOIDIENMEDIAL": "NA",
        "E4_MA_G_TEMPORAL_ANTERIOR": "NA",
        "E4_MA_G_TEMPORAL_MIDDLE": "NA",
        "E4_MA_G_TEMPORAL_POSTERIOR": "NA",
        "E4_MS_D_ATM": "NA",
        "E4_MS_D_DIGASTRIQUEPOS": "NA",
        "E4_MS_D_MASSETER_BODY": "NA",
        "E4_MS_D_MASSETER_INSERTION": "NA",
        "E4_MS_D_MASSETER_ORIGIN": "NA",
        "E4_MS_D_PTERIGOIDIENMEDIAL": "NA",
        "E4_MS_D_TEMPORAL_ANTERIOR": "NA",
        "E4_MS_D_TEMPORAL_MIDDLE": "NA",
        "E4_MS_D_TEMPORAL_POSTERIOR": "NA",
        "E4_MS_G_ATM": "DH",
        "E4_MS_G_DIGASTRIQUEPOS": "NA",
        "E4_MS_G_MASSETER_BODY": "NA",
        "E4_MS_G_MASSETER_INSERTION": "NA",
        "E4_MS_G_MASSETER_ORIGIN": "NA",
        "E4_MS_G_PTERIGOIDIENMEDIAL": "NA",
        "E4_MS_G_TEMPORAL_ANTERIOR": "NA",
        "E4_MS_G_TEMPORAL_MIDDLE": "NA",
        "E4_MS_G_TEMPORAL_POSTERIOR": "NA",
        "E5A": "7",
        "E5B": "10",
        "E5C": "8",
        "E5D": "N",
        "E5_LD_D_ATM": "NA",
        "E5_LD_D_DIGASTRIQUEPOS": "NA",
        "E5_LD_D_MASSETER_BODY": "NA",
        "E5_LD_D_MASSETER_INSERTION": "NA",
        "E5_LD_D_MASSETER_ORIGIN": "NA",
        "E5_LD_D_PTERIGOIDIENMEDIAL": "NA",
        "E5_LD_D_TEMPORAL_ANTERIOR": "NA",
        "E5_LD_D_TEMPORAL_MIDDLE": "NA",
        "E5_LD_D_TEMPORAL_POSTERIOR": "NA",
        "E5_LD_G_ATM": "DH",
        "E5_LD_G_DIGASTRIQUEPOS": "NA",
        "E5_LD_G_MASSETER_BODY": "NA",
        "E5_LD_G_MASSETER_INSERTION": "NA",
        "E5_LD_G_MASSETER_ORIGIN": "NA",
        "E5_LD_G_PTERIGOIDIENMEDIAL": "NA",
        "E5_LD_G_TEMPORAL_ANTERIOR": "NA",
        "E5_LD_G_TEMPORAL_MIDDLE": "NA",
        "E5_LD_G_TEMPORAL_POSTERIOR": "NA",
        "E5_LG_D_ATM": "NA",
        "E5_LG_D_DIGASTRIQUEPOS": "NA",
        "E5_LG_D_MASSETER_BODY": "NA",
        "E5_LG_D_MASSETER_INSERTION": "NA",
        "E5_LG_D_MASSETER_ORIGIN": "NA",
        "E5_LG_D_PTERIGOIDIENMEDIAL": "NA",
        "E5_LG_D_TEMPORAL_ANTERIOR": "NA",
        "E5_LG_D_TEMPORAL_MIDDLE": "NA",
        "E5_LG_D_TEMPORAL_POSTERIOR": "NA",
        "E5_LG_G_ATM": "NA",
        "E5_LG_G_DIGASTRIQUEPOS": "NA",
        "E5_LG_G_MASSETER_BODY": "NA",
        "E5_LG_G_MASSETER_INSERTION": "NA",
        "E5_LG_G_MASSETER_ORIGIN": "NA",
        "E5_LG_G_PTERIGOIDIENMEDIAL": "NA",
        "E5_LG_G_TEMPORAL_ANTERIOR": "NA",
        "E5_LG_G_TEMPORAL_MIDDLE": "NA",
        "E5_LG_G_TEMPORAL_POSTERIOR": "NA",
        "E5_PI_D_ATM": "NA",
        "E5_PI_D_DIGASTRIQUEPOS": "NA",
        "E5_PI_D_MASSETER_BODY": "NA",
        "E5_PI_D_MASSETER_INSERTION": "NA",
        "E5_PI_D_MASSETER_ORIGIN": "NA",
        "E5_PI_D_PTERIGOIDIENMEDIAL": "NA",
        "E5_PI_D_TEMPORAL_ANTERIOR": "NA",
        "E5_PI_D_TEMPORAL_MIDDLE": "NA",
        "E5_PI_D_TEMPORAL_POSTERIOR": "NA",
        "E5_PI_G_ATM": "DH",
        "E5_PI_G_DIGASTRIQUEPOS": "NA",
        "E5_PI_G_MASSETER_BODY": "NA",
        "E5_PI_G_MASSETER_INSERTION": "NA",
        "E5_PI_G_MASSETER_ORIGIN": "NA",
        "E5_PI_G_PTERIGOIDIENMEDIAL": "NA",
        "E5_PI_G_TEMPORAL_ANTERIOR": "NA",
        "E5_PI_G_TEMPORAL_MIDDLE": "NA",
        "E5_PI_G_TEMPORAL_POSTERIOR": "NA",
        "E6_CRAQ_FERM_D": "N",
        "E7_CRAQ_DOUL_G": "Y",
        "E7_CREP_DOUL_HAB_G": "N",
        "E6_CREP_OUV_G": "N",
        "E6_CREP_DOUL_G": "N",
        "E7_CRAQ_FERM_D": "N",
        "E7_CREP_DOUL_G": "N",
        "E6_CREP_DOUL_D": "N",
        "E6_CREP_OUV_D": "N",
        "E6_CREP_DOUL_HAB_G": "N",
        "E6_CREP_DOU_HAB_D": "N",
        "E6_CRAQ_OUV_G": "Y",
        "E7_CRAQ_FERM_G": "Y",
        "E6_CRAQ_DOUL_D": "N",
        "E6_CRAQ_DOUL_G": "Y",
        "E6_CREP_PAT_G": "N",
        "E6_CRAQ_PAT_D": "N",
        "E6_CRAQ_FERM_G": "Y",
        "E7_CRAQ_OUV_D": "N",
        "E7_CREP_PAT_D": "N",
        "E6_CREP_FERM_G": "N",
        "E7_CREP_DOUL_D": "N",
        "E7_CRAQ_PAT_G": "Y",
        "E7_CREP_FERM_G": "N",
        "E6_CRAQ_DOUL_HAB_D": "N",
        "E6_CREP_PAT_D": "N",
        "E6_CRAQ_PAT_G": "Y",
        "E7_CRAQ_OUV_G": "Y",
        "E6_CRAQ_OUV_D": "N",
        "E7_CREP_OUV_D": "N",
        "E7_CRAQ_PAT_D": "N",
        "E7_CRAQ_DOUL_HAB_D": "N",
        "E7_CREP_DOUL_HAB_D": "N",
        "E7_CREP_FERM_D": "N",
        "E6_CRAQ_DOUL_HAB_G": "Y",
        "E7_CRAQ_DOUL_D": "N",
        "E6_CREP_FERM_D": "N",
        "E7_CREP_PAT_G": "N",
        "E7_CREP_OUV_G": "N",
        "E7_CRAQ_DOUL_HAB_G": "Y",
        "E8_OUVERT_BLOC_D": "N",
        "E8_OUVERT_PAT_D": "N",
        "E8_OUVERT_EXAM_D": "N",
        "E8_OUVRANT_EXAM_G": "Y",
        "E8_OUVERT_EXAM_G": "N",
        "E8_OUVERT_PAT_G": "N",
        "E8_OUVERT_BLOC_G": "N",
        "E8_OUVRANT_PAT_G": "Y",
        "E8_OUVRANT_BLOC_D": "N",
        "E8_OUVRANT_EXAM_D": "N",
        "E8_OUVRANT_BLOC_G": "Y",
        "E8_OUVRANT_PAT_D": "N",
        "E9_AL_DH_D": "N",
        "E9_AL_DH_G": "Y",
        "E9_AL_DOU_REF_D": "N",
        "E9_AL_MTH_D": "N",
        "E9_AL_MTH_G": "N",
        "E9_PALP_D_ATM": "NA",
        "E9_PALP_D_DIGASTRIQUEPOS": "NA",
        "E9_PALP_D_MASSETER_BODY": "NA",
        "E9_PALP_D_MASSETER_INSERTION": "NA",
        "E9_PALP_D_MASSETER_ORIGIN": "NA",
        "E9_PALP_D_PTERIGOIDIENMEDIAL": "NA",
        "E9_PALP_D_TEMPORAL_ANTERIOR": "NA",
        "E9_PALP_D_TEMPORAL_MIDDLE": "NA",
        "E9_PALP_D_TEMPORAL_POSTERIOR": "NA",
        "E9_PALP_G_ATM": "DH",
        "E9_PALP_G_DIGASTRIQUEPOS": "NA",
        "E9_PALP_G_MASSETER_BODY": "NA",
        "E9_PALP_G_MASSETER_INSERTION": "NA",
        "E9_PALP_G_MASSETER_ORIGIN": "NA",
        "E9_PALP_G_PTERIGOIDIENMEDIAL": "NA",
        "E9_PALP_G_TEMPORAL_ANTERIOR": "NA",
        "E9_PALP_G_TEMPORAL_MIDDLE": "NA",
        "E9_PALP_G_TEMPORAL_POSTERIOR": "NA",
        "E9_PL_DH_D": "N",
        "E9_PL_DH_G": "Y",
        "E9_PL_DOU_REF_D": "N",
        "E9_PL_DOU_REF_G": "N",
        "E9_PL_MTH_D": "N",
        "E9_PL_MTH_G": "N",
        "E10_REG_MAND_DOUL_D": "N",
        "E10_REG_MAND_DOUL_G": "N",
        "E10_REG_MAND_DOUL_HAB_D": "N",
        "E10_REG_MAND_DOUL_HAB_G": "N",
        "E10_REG_MAND_DOUL_REF_D": "N",
        "E10_REG_MAND_DOUL_REF_G": "N",
        "E10_REG_PTER_DOUL_D": "N",
        "E10_REG_PTER_DOUL_G": "Y",
        "E10_REG_PTER_DOUL_HAB_D": "N",
        "E10_REG_PTER_DOUL_HAB_G": "Y",
        "E10_REG_PTER_DOUL_REF_D": "N",
        "E10_REG_PTER_DOUL_REF_G": "N",
        "E10_REG_SOUS_DOUL_D": "N",
        "E10_REG_SOUS_DOUL_G": "N",
        "E10_REG_SOUS_DOUL_HAB_D": "N",
        "E10_REG_SOUS_DOUL_HAB_G": "N",
        "E10_REG_SOUS_DOUL_REF_D": "N",
        "E10_REG_SOUS_DOUL_REF_G": "N",
        "E10_TEND_DOUL_D": "N",
        "E10_TEND_DOUL_G": "N",
        "E10_TEND_DOUL_HAB_D": "N",
        "E10_TEND_DOUL_HAB_G": "N",
        "E10_TEND_DOUL_REF_D": "N",
        "E10_TEND_DOUL_REF_G": "N",
        "E11_AD": "Y",
        "E11_ATMD": "N",
        "E11_ATMG": "DEP_REDUC_BLOC",
        "E11_MTAD": "N",
        "E11_MYO_D_D": "N",
        "E11_MYO_D_G": "N",
        "E11_MYO_M_D": "N",
        "E11_MYO_M_G": "N",
        "E11_MYO_T_D": "N",
        "E11_MYO_T_G": "N",
        "E11_MY_D_D": "N",
        "E11_MY_D_G": "N",
        "E11_MY_M_D": "N",
        "E11_MY_M_G": "N",
        "E11_MY_P_D": "N",
        "E11_MY_P_G": "N",
        "E11_MY_T_D": "N",
        "E11_MY_T_G": "N",
        "E11_NO": "N",
        "E13_ET": "Y",
        "E13_HYP": "N",
        "E13_KIN": "N",
        "E13_OO": "Y",
        "E13_TB": "N",
        "E13_TCC": "N",
        "E13_TP": "N",
        "MD_MOR_D_ATM": "NA",
        "MD_MOR_D_DIGASTRIQUEPOS": "NA",
        "MD_MOR_D_MASSETER_BODY": "NA",
        "MD_MOR_D_MASSETER_INSERTION": "NA",
        "MD_MOR_D_MASSETER_ORIGIN": "NA",
        "MD_MOR_D_PTERIGOIDIENMEDIAL": "NA",
        "MD_MOR_D_TEMPORAL_ANTERIOR": "NA",
        "MD_MOR_D_TEMPORAL_MIDDLE": "NA",
        "MD_MOR_D_TEMPORAL_POSTERIOR": "NA",
        "MD_MOR_G_ATM": "D",
        "MD_MOR_G_DIGASTRIQUEPOS": "NA",
        "MD_MOR_G_MASSETER_BODY": "NA",
        "MD_MOR_G_MASSETER_ORIGIN": "NA",
        "MD_MOR_G_PTERIGOIDIENMEDIAL": "NA",
        "MD_MOR_G_TEMPORAL_ANTERIOR": "NA",
        "MD_MOR_G_TEMPORAL_MIDDLE": "NA",
        "MD_MOR_G_TEMPORAL_POSTERIOR": "NA",
        "MD_MOR_G_MASSETER_INSERTION": "NA",
        "MD1": "30",
        "DC1": "30",
        "DC2": "0",
        "DC3": "0",
        "DC4": "5",
        "DC5": "0",
        "DC6": "2",
        "DC7": "2",
        "DC8": "0",
        "FM81": "6",
        "FM82": "4",
        "FM83": "2",
        "FM84": "5",
        "FM85": "0",
        "FM86": "7",
        "FM87": "0",
        "FM88": "0",
        "PHQ41": "0",
        "PHQ42": "0",
        "PHQ43": "0",
        "PHQ44": "0",
        "OBC1": "1-3 Nuit/semaine",
        "OBC2": "Jamais",
        "OBC3": "Jamais",
        "OBC4": "La pluspart du temps",
        "OBC5": "La pluspart du temps",
        "OBC6": "La pluspart du temps",
        "OBC7": "La pluspart du temps",
        "OBC8": "Jamais",
        "OBC9": "Jamais",
        "OBC10": "Jamais",
        "OBC11": "Jamais",
        "OBC12": "Jamais",
        "OBC13": "Un peu de temps",
        "OBC14": "Jamais",
        "OBC15": "Jamais",
        "OBC16": "La pluspart du temps",
        "OBC17": "Un peu de temps",
        "OBC18": "Un peu de temps",
        "OBC19": "Jamais",
        "OBC20": "Une partie du temps",
        "OBC21": "Un peu de temps"
    },
    "patientID": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TG9nSW4iOmZhbHNlLCJfaWQiOiI1Y2ExOTVmZjUxZGEzMDBjNDA2YjBkYzIiLCJyb2xlIjp7Il9pZCI6IjVjYTE5NGQ0MzVkNGY0NTk5MDcwMmM3NyIsIm5hbWUiOiJzdXBlci1hZG1pbiIsIl9fdiI6MH0sInVzZXJuYW1lIjoic3VwZXItYWRtaW4iLCJfX3YiOjB9LCJpYXQiOjE1NzMzODAzMTJ9.-gQ-kt0E6IRYLUGOb9jFqDE6VQCk0LC5ApVuIuO4QnA"
};
function generate_fdi(examResult) {
    var pdfDoc = new HummusRecipe('./questionnaires/FDI_fr.pdf', './questionnaires/FDIrempli.pdf');
    //let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
    pdfDoc.editPage(1);
    // TEXT
    pdfDoc.text(examResult.questions["FIRST_NAME"] + " " + examResult.questions["LAST_NAME"], 72, 66, { fontSize: 10 })
        .text(/*practicien*/ " w", 264.5, 66, { fontSize: 10 });
    // date
    /*
    pdfDoc
    .text("1", 401, 56, {fontSize:16})
    .text("1", 417, 56, {fontSize:16})
    .text("1", 442, 56, {fontSize:16})
    .text("1", 459, 56, {fontSize:16})
    .text("1", 487, 56, {fontSize:16})
    .text("1", 503, 56, {fontSize:16})
    .text("1", 520, 56, {fontSize:16})
    .text("1", 538, 56, {fontSize:16})
    */
    // 2 surplomb incisif horizontal 
    pdfDoc
        .text(Math.floor(+examResult.questions["E2DIST_H"] / 10).toString(), 173, 213, { fontSize: 16 })
        .text((+examResult.questions["E2DIST_H"] % 10).toString(), 195, 213, { fontSize: 16 })
        // 2 surplomb incisif vertical 
        .text(Math.floor(+examResult.questions["E2DIST_V"] / 10).toString(), 359, 213, { fontSize: 16 })
        .text((+examResult.questions["E2DIST_V"] % 10).toString(), 382, 213, { fontSize: 16 })
        // 2 deviation mediane
        .text(Math.floor(+examResult.questions["E2DIST_MEDIA"] / 10).toString(), 528, 213, { fontSize: 16 })
        .text((+examResult.questions["E2DIST_MEDIA"] % 10).toString(), 551, 213, { fontSize: 16 });
    // 4a
    pdfDoc
        .text(Math.floor(+examResult.questions["E4A"] / 10).toString(), 91, 311, { fontSize: 16 })
        .text((+examResult.questions["E4A"] % 10).toString(), 112.6, 311, { fontSize: 16 });
    // 4b
    pdfDoc
        .text(Math.floor(+examResult.questions["E4B"] / 10).toString(), 91, 361, { fontSize: 16 })
        .text((+examResult.questions["E4B"] % 10).toString(), 112.6, 361, { fontSize: 16 });
    // 4c
    pdfDoc
        .text(Math.floor(+examResult.questions["E4C"] / 10).toString(), 91, 438, { fontSize: 16 })
        .text((+examResult.questions["E4C"] % 10).toString(), 112.6, 438, { fontSize: 16 });
    // 5a
    pdfDoc
        .text(Math.floor(+examResult.questions["E4A"] / 10).toString(), 91, 563, { fontSize: 16 })
        .text((+examResult.questions["E4A"] % 10).toString(), 112.6, 563, { fontSize: 16 });
    // 5b
    pdfDoc
        .text(Math.floor(+examResult.questions["E4B"] / 10).toString(), 91, 638, { fontSize: 16 })
        .text((+examResult.questions["E4B"] % 10).toString(), 112.6, 638, { fontSize: 16 });
    // 5c
    pdfDoc
        .text(Math.floor(+examResult.questions["E4C"] / 10).toString(), 91, 715, { fontSize: 16 })
        .text((+examResult.questions["E4C"] % 10).toString(), 112.6, 715, { fontSize: 16 });
    // BULLES
    var horizontal_offsets;
    var vertical_offsets;
    // 1a right pain, x: 32.5, y: 99
    var x = 59;
    var y = 126.75;
    horizontal_offsets = [0, 40, 103, 187.5];
    vertical_offsets = [0, 13, 46];
    pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_D_ATM"] != "D" &&
            examResult.questions["E1_DOUL_D_DIGASTRIQUEPOS"] != "D" &&
            examResult.questions["E1_DOUL_D_MASSETER_BODY"] != "D" &&
            examResult.questions["E1_DOUL_D_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E1_DOUL_D_MASSETER_ORIGIN"] != "D" &&
            examResult.questions["E1_DOUL_D_PTERIGOIDIENMEDIAL"] != "D" &&
            examResult.questions["E1_DOUL_D_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E1_DOUL_D_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E1_DOUL_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    }).text('Y', x + horizontal_offsets[0] - 2.6, y + vertical_offsets[0] - 2.6, { fontSize: 8, color: '#000000' });
    pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_D_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E1_DOUL_D_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E1_DOUL_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[3], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_D_MASSETER_BODY"] == "D" ||
            examResult.questions["E1_DOUL_D_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E1_DOUL_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_D_ATM"] == "D" ? '#228b22' : '#808080'
    });
    // 1b right pain
    pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1B_D"] == "Non" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1B_D"] == "Temporal" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1B_D"] == "Autre" ? '#228b22' : '#808080'
    });
    // 1a left pain
    x = 326;
    y = 126.5;
    pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_G_ATM"] != "D" &&
            examResult.questions["E1_DOUL_G_DIGASTRIQUEPOS"] != "D" &&
            examResult.questions["E1_DOUL_G_MASSETER_BODY"] != "D" &&
            examResult.questions["E1_DOUL_G_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E1_DOUL_G_MASSETER_ORIGIN"] != "D" &&
            examResult.questions["E1_DOUL_G_PTERIGOIDIENMEDIAL"] != "D" &&
            examResult.questions["E1_DOUL_G_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E1_DOUL_G_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E1_DOUL_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_G_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E1_DOUL_G_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E1_DOUL_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[3], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_G_MASSETER_BODY"] == "D" ||
            examResult.questions["E1_DOUL_G_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E1_DOUL_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1_DOUL_G_ATM"] == "D" ? '#228b22' : '#808080'
    });
    // 1b right pain
    pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1B_G"] == "Non" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1B_G"] == "Temporal" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E1B_G"] == "Autre" ? '#228b22' : '#808080'
    });
    // 2
    pdfDoc.circle(235.5, 195.5, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E2REF"] == "11" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(276.66, 195.5, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E2REF"] == "21" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(334.2, 195.5, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E2REF"] != "11" &&
            examResult.questions["E2REF"] != "21" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(123.3, 226.1, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E2NEG_H"] == "negatif" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(309.5, 226.1, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E2NEG_V"] == "negatif" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(477.5, 226.1, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E2DEVIA_MEDIA"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(495, 226.1, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E2DEVIA_MEDIA"] == "G" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(512.6, 226.1, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E2DEVIA_MEDIA"] == "0" ? '#228b22' : '#808080'
    });
    // 3
    pdfDoc.circle(209.3, 261, 5, { stroke: '#000000', lineWidth: .01,
        fill: false ? '#228b22' : '#808080'
    });
    pdfDoc.circle(281.1, 261, 5, { stroke: '#000000', lineWidth: .01,
        fill: false ? '#228b22' : '#808080'
    });
    pdfDoc.circle(420.85, 261, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E31"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(480.6, 261, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E32"] == "Y" ? '#228b22' : '#808080'
    });
    // 4 droit
    pdfDoc.circle(128.4, 472.1, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4D"] == "N" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(141.1, 472.1, 5, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4D"] == "Y" ? '#228b22' : '#808080'
    });
    x = 246.5;
    y = 348;
    horizontal_offsets = 45.5;
    var yes = 16;
    vertical_offsets = 12.75;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E4_MS_D_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E4_MS_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E4_MS_D_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E4_MS_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E4_MS_D_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E4_MS_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E4_MS_D_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E4_MS_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E4_MS_MT_D_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E4_MS_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E4_MS_MT_D_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E4_MS_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_MASSETER_BODY"] != "D" &&
            examResult.questions["E4_MS_D_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E4_MS_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_MASSETER_BODY"] == "D" ||
            examResult.questions["E4_MS_D_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E4_MS_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_MASSETER_BODY"] != "DH" &&
            examResult.questions["E4_MS_D_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E4_MS_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_MASSETER_BODY"] == "DH" ||
            examResult.questions["E4_MS_D_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E4_MS_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E4_MA_D_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E4_MA_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E4_MA_D_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E4_MA_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E4_MA_D_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E4_MA_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E4_MA_D_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E4_MA_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E4_MA_MT_D_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E4_MA_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E4_MA_MT_D_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E4_MA_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_MASSETER_BODY"] != "D" &&
            examResult.questions["E4_MA_D_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E4_MA_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_MASSETER_BODY"] == "D" ||
            examResult.questions["E4_MA_D_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E4_MA_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_MASSETER_BODY"] != "DH" &&
            examResult.questions["E4_MA_D_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E4_MA_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_MASSETER_BODY"] == "DH" ||
            examResult.questions["E4_MA_D_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E4_MA_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    // 4 gauche 
    x = 450.25;
    y = 348;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E4_MS_G_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E4_MS_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E4_MS_G_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E4_MS_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E4_MS_G_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E4_MS_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E4_MS_G_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E4_MS_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E4_MS_MT_G_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E4_MS_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E4_MS_MT_G_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E4_MS_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_MASSETER_BODY"] != "D" &&
            examResult.questions["E4_MS_G_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E4_MS_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_MASSETER_BODY"] == "D" ||
            examResult.questions["E4_MS_G_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E4_MS_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_MASSETER_BODY"] != "DH" &&
            examResult.questions["E4_MS_G_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E4_MS_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_MASSETER_BODY"] == "DH" ||
            examResult.questions["E4_MS_G_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E4_MS_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MS_G_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E4_MA_G_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E4_MA_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E4_MA_G_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E4_MA_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E4_MA_G_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E4_MA_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E4_MA_G_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E4_MA_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E4_MA_MT_G_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E4_MA_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E4_MA_MT_G_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E4_MA_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_MASSETER_BODY"] != "D" &&
            examResult.questions["E4_MA_G_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E4_MA_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_MASSETER_BODY"] == "D" ||
            examResult.questions["E4_MA_G_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E4_MA_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_MASSETER_BODY"] != "DH" &&
            examResult.questions["E4_MA_G_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E4_MA_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_MASSETER_BODY"] == "DH" ||
            examResult.questions["E4_MA_G_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E4_MA_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E4_MA_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    // 5 droit
    pdfDoc.circle(68.5, 750, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5D"] == "Y" ? '#228b22' : '#808080'
    });
    x = 246.5;
    y = 549.5;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E5_LD_D_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E5_LD_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E5_LD_D_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E5_LD_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E5_LD_D_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E5_LD_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E5_LD_D_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E5_LD_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E5_LD_MT_D_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E5_LD_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E5_LD_MT_D_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E5_LD_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_MASSETER_BODY"] != "D" &&
            examResult.questions["E5_LD_D_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E5_LD_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_MASSETER_BODY"] == "D" ||
            examResult.questions["E5_LD_D_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E5_LD_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_MASSETER_BODY"] != "DH" &&
            examResult.questions["E5_LD_D_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E5_LD_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_MASSETER_BODY"] == "DH" ||
            examResult.questions["E5_LD_D_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E5_LD_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E5_LG_D_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E5_LG_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E5_LG_D_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E5_LG_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E5_LG_D_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E5_LG_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E5_LG_D_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E5_LG_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E5_LG_MT_D_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E5_LG_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E5_LG_MT_D_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E5_LG_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_MASSETER_BODY"] != "D" &&
            examResult.questions["E5_LG_D_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E5_LG_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_MASSETER_BODY"] == "D" ||
            examResult.questions["E5_LG_D_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E5_LG_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_MASSETER_BODY"] != "DH" &&
            examResult.questions["E5_LG_D_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E5_LG_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_MASSETER_BODY"] == "DH" ||
            examResult.questions["E5_LG_D_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E5_LG_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E5_PI_D_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E5_PI_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E5_PI_D_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E5_PI_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E5_PI_D_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E5_PI_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E5_PI_D_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E5_PI_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E5_PI_MT_D_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E5_PI_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E5_PI_MT_D_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E5_PI_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_MASSETER_BODY"] != "D" &&
            examResult.questions["E5_PI_D_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E5_PI_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_MASSETER_BODY"] == "D" ||
            examResult.questions["E5_PI_D_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E5_PI_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_MASSETER_BODY"] != "DH" &&
            examResult.questions["E5_PI_D_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E5_PI_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_MASSETER_BODY"] == "DH" ||
            examResult.questions["E5_PI_D_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E5_PI_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    // 5 gauche
    x = 450.25;
    y = 549.5;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E5_LD_G_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E5_LD_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E5_LD_G_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E5_LD_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E5_LD_G_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E5_LD_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E5_LD_G_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E5_LD_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E5_LD_MT_G_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E5_LD_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E5_LD_MT_G_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E5_LD_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_MASSETER_BODY"] != "D" &&
            examResult.questions["E5_LD_G_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E5_LD_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_MASSETER_BODY"] == "D" ||
            examResult.questions["E5_LD_G_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E5_LD_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_MASSETER_BODY"] != "DH" &&
            examResult.questions["E5_LD_G_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E5_LD_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_MASSETER_BODY"] == "DH" ||
            examResult.questions["E5_LD_G_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E5_LD_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LD_G_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E5_LG_G_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E5_LG_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E5_LG_G_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E5_LG_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E5_LG_G_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E5_LG_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E5_LG_G_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E5_LG_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E5_LG_MT_G_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E5_LG_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E5_LG_MT_G_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E5_LG_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_MASSETER_BODY"] != "D" &&
            examResult.questions["E5_LG_G_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E5_LG_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_MASSETER_BODY"] == "D" ||
            examResult.questions["E5_LG_G_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E5_LG_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_MASSETER_BODY"] != "DH" &&
            examResult.questions["E5_LG_G_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E5_LG_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_MASSETER_BODY"] == "DH" ||
            examResult.questions["E5_LG_G_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E5_LG_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_LG_G_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_TEMPORAL_ANTERIOR"] != "D" &&
            examResult.questions["E5_PI_G_TEMPORAL_MIDDLE"] != "D" &&
            examResult.questions["E5_PI_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_TEMPORAL_ANTERIOR"] == "D" ||
            examResult.questions["E5_PI_G_TEMPORAL_MIDDLE"] == "D" ||
            examResult.questions["E5_PI_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_TEMPORAL_ANTERIOR"] != "DH" &&
            examResult.questions["E5_PI_G_TEMPORAL_MIDDLE"] != "DH" &&
            examResult.questions["E5_PI_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_TEMPORAL_ANTERIOR"] == "DH" ||
            examResult.questions["E5_PI_G_TEMPORAL_MIDDLE"] == "DH" ||
            examResult.questions["E5_PI_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
            examResult.questions["E5_PI_MT_G_TEMPORAL_MIDDLE"] != "true" &&
            examResult.questions["E5_PI_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
            examResult.questions["E5_PI_MT_G_TEMPORAL_MIDDLE"] == "true" ||
            examResult.questions["E5_PI_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_MASSETER_BODY"] != "D" &&
            examResult.questions["E5_PI_G_MASSETER_INSERTION"] != "D" &&
            examResult.questions["E5_PI_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_MASSETER_BODY"] == "D" ||
            examResult.questions["E5_PI_G_MASSETER_INSERTION"] == "D" ||
            examResult.questions["E5_PI_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_MASSETER_BODY"] != "DH" &&
            examResult.questions["E5_PI_G_MASSETER_INSERTION"] != "DH" &&
            examResult.questions["E5_PI_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_MASSETER_BODY"] == "DH" ||
            examResult.questions["E5_PI_G_MASSETER_INSERTION"] == "DH" ||
            examResult.questions["E5_PI_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_ATM"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_ATM"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_ATM"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_ATM"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E5_PI_G_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
    });
    pdfDoc.endPage();
    pdfDoc.editPage(2);
    // 6 droite
    x = 102.25;
    y = 100.25;
    horizontal_offsets = 39.5;
    vertical_offsets = 11.75;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_OUV_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_OUV_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_FERM_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_FERM_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_PAT_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_PAT_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 3 * horizontal_offsets + 3, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_DOUL_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 3 * horizontal_offsets + 3 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_DOUL_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 4 * horizontal_offsets + 6, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 4 * horizontal_offsets + 6 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_FERM_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_FERM_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_OUV_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_OUV_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_PAT_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_PAT_D"] == "Y" ? '#228b22' : '#808080'
    });
    // 6 gauche
    x = 380;
    y = 100;
    horizontal_offsets = 39.5;
    vertical_offsets = 11.5;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_FERM_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_FERM_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_OUV_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_OUV_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_PAT_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_PAT_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 3 * horizontal_offsets + 3, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_DOUL_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 3 * horizontal_offsets + 3 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_DOUL_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 4 * horizontal_offsets + 5.5, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 4 * horizontal_offsets + 4.75 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CRAQ_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_FERM_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_FERM_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_OUV_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_OUV_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_PAT_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E6_CREP_PAT_G"] == "Y" ? '#228b22' : '#808080'
    });
    // 7 droite
    x = 102.25;
    y = 179;
    horizontal_offsets = 39.5;
    vertical_offsets = 12;
    pdfDoc.circle(x + 15, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_FERM_D"] != "Y" && examResult.questions["E7_CRAQ_OUV_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 15 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_FERM_D"] == "Y" || examResult.questions["E7_CRAQ_OUV_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 30 + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_PAT_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 30 + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_PAT_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 3.098 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_DOUL_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 3.093 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_DOUL_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 4.2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 4.18 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 15, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CREP_OUV_D"] != "Y" && examResult.questions["E7_CREP_FERM_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 15 + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CREP_OUV_D"] == "Y" || examResult.questions["E7_CREP_FERM_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 30 + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CREP_PAT_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 30 + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CREP_PAT_D"] == "Y" ? '#228b22' : '#808080'
    });
    // 7 gauche
    x = 385;
    y = 179;
    horizontal_offsets = 39.5;
    vertical_offsets = 12;
    pdfDoc.circle(x + 15, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_FERM_G"] != "Y" && examResult.questions["E7_CRAQ_OUV_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 15 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_FERM_G"] == "Y" || examResult.questions["E7_CRAQ_OUV_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.55 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_PAT_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.55 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_PAT_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.94 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_DOUL_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.96 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_DOUL_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 3.97 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 3.97 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CRAQ_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 15, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CREP_OUV_G"] != "Y" && examResult.questions["E7_CREP_FERM_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 15 + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CREP_OUV_G"] == "Y" || examResult.questions["E7_CREP_FERM_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.55 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CREP_PAT_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.55 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E7_CREP_PAT_G"] == "Y" ? '#228b22' : '#808080'
    });
    // 8 droite
    x = 144.5;
    y = 253.5;
    horizontal_offsets = 41;
    vertical_offsets = 11.5;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_BLOC_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_BLOC_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.08 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_PAT_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.05 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_PAT_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_EXAM_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_EXAM_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_BLOC_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_BLOC_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.08 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_PAT_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.05 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_PAT_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_EXAM_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_EXAM_D"] == "Y" ? '#228b22' : '#808080'
    });
    // 8 gauche
    x = 405;
    y = 253.5;
    horizontal_offsets = 41;
    vertical_offsets = 11.5;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_BLOC_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_BLOC_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.08 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_PAT_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.05 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_PAT_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.09 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_EXAM_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.03 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVRANT_EXAM_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_BLOC_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_BLOC_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.08 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_PAT_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.05 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_PAT_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.09 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_EXAM_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.03 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E8_OUVERT_EXAM_G"] == "Y" ? '#228b22' : '#808080'
    });
    // 9 droite
    x = 144;
    y = 334;
    horizontal_offsets = 45;
    vertical_offsets = 12.2;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("D") && !examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("D") || examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.95 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("DH") && !examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("DH") || examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("DR") && !examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("DR") || examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("D") && !examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("D") || examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.95 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("DH") && !examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("DH") || examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_D_TEMPORAL_MIDDLE"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_D_TEMPORAL_MIDDLE"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("DR") && !examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("DR") || examResult.questions["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("D") && !examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("D") || examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.95 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("DH") && !examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("DH") || examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_D_TEMPORAL_ANTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_D_TEMPORAL_ANTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("DR") && !examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("DR") || examResult.questions["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("D") && !examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("D") || examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.95 * horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("DH") && !examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("DH") || examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("DR") && !examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("DR") || examResult.questions["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("D") && !examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("D") || examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.95 * horizontal_offsets, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("DH") && !examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("DH") || examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("DR") && !examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("DR") || examResult.questions["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("D") && !examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("D") || examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.95 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("DH") && !examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("DH") || examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("DR") && !examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_D_MASSETER_INSERTION"].includes("DR") || examResult.questions["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_MTH_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_MTH_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 1 * horizontal_offsets, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_DH_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 1 * horizontal_offsets + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_DH_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 2 * horizontal_offsets, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_DOU_REF_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 2 * horizontal_offsets + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_DOU_REF_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_MTH_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_MTH_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 1 * horizontal_offsets, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_DH_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 1 * horizontal_offsets + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_DH_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 2 * horizontal_offsets, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_DOU_REF_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 2 * horizontal_offsets + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_DOU_REF_D"] == "Y" ? '#228b22' : '#808080'
    });
    // 9 gauche
    x = 408;
    y = 334;
    horizontal_offsets = 45;
    vertical_offsets = 12.2;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("D") && !examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("D") || examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.02 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("DH") && !examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("DH") || examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.04 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.04 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("DR") && !examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("DR") || examResult.questions["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("D") && !examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("D") || examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.02 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("DH") && !examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("DH") || examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.04 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_G_TEMPORAL_MIDDLE"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.04 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_G_TEMPORAL_MIDDLE"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("DR") && !examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("DR") || examResult.questions["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("D") && !examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("D") || examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.02 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("DH") && !examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("DH") || examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.04 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_G_TEMPORAL_ANTERIOR"] != "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.04 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_MT_G_TEMPORAL_ANTERIOR"] == "true" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("DR") && !examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("DR") || examResult.questions["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("D") && !examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("D") || examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.02 * horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("DH") && !examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("DH") || examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("DR") && !examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("DR") || examResult.questions["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("D") && !examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("D") || examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.02 * horizontal_offsets, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("DH") && !examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("DH") || examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("DR") && !examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("DR") || examResult.questions["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("D") && !examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("D") || examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1.02 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("DH") && !examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("DH") || examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: !examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("DR") && !examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("DR") || examResult.questions["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_MTH_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_MTH_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 1 * horizontal_offsets, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_DH_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 1 * horizontal_offsets + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_DH_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 2 * horizontal_offsets, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_DOU_REF_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 2 * horizontal_offsets + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_PL_DOU_REF_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_MTH_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_MTH_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 1 * horizontal_offsets, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_DH_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 1 * horizontal_offsets + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_DH_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 2 * horizontal_offsets, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_DOU_REF_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 34 + 2 * horizontal_offsets + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E9_AL_DOU_REF_G"] == "Y" ? '#228b22' : '#808080'
    });
    // 10 droite 
    x = 177;
    y = 528;
    horizontal_offsets = 46;
    vertical_offsets = 12.2;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_REF_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_REF_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_REF_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_REF_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_REF_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_REF_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_REF_D"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_REF_D"] == "Y" ? '#228b22' : '#808080'
    });
    // 10 gauche 
    x = 442;
    y = 528;
    horizontal_offsets = 46;
    vertical_offsets = 12.2;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_REF_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_MAND_DOUL_REF_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_REF_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_SOUS_DOUL_REF_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_REF_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_PTER_DOUL_REF_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_REF_G"] != "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E10_REG_TEND_DOUL_REF_G"] == "Y" ? '#228b22' : '#808080'
    });
    // 11 
    // Désordres douloureux
    x = 40.4;
    y = 611.3;
    vertical_offsets = 12.35;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_NO"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_MY_D_D"] == "Y" ||
            examResult.questions["E11_MY_M_D"] == "Y" ||
            examResult.questions["E11_MY_P_D"] == "Y" ||
            examResult.questions["E11_MY_T_D"] == "Y" ||
            examResult.questions["E11_MY_D_G"] == "Y" ||
            examResult.questions["E11_MY_M_G"] == "Y" ||
            examResult.questions["E11_MY_P_G"] == "Y" ||
            examResult.questions["E11_MY_T_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_MYO_D_D"] == "Y" ||
            examResult.questions["E11_MYO_M_D"] == "Y" ||
            examResult.questions["E11_MYO_P_D"] == "Y" ||
            examResult.questions["E11_MYO_T_D"] == "Y" ||
            examResult.questions["E11_MYO_D_G"] == "Y" ||
            examResult.questions["E11_MYO_M_G"] == "Y" ||
            examResult.questions["E11_MYO_P_G"] == "Y" ||
            examResult.questions["E11_MYO_T_G"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_AD"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_AG"] == "Y" ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_MATD"] == "Y" ? '#228b22' : '#808080'
    });
    // Désordres atm droite
    x = 179.6;
    y = 611.3;
    vertical_offsets = 12.5;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMD"] == undefined || examResult.questions["E11_DATMD"].includes("Non") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMD"] != undefined && examResult.questions["E11_DATMD"].includes("avec réduction") && !examResult.questions["E11_DATMD"].includes("avec réduction et") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMD"] != undefined && examResult.questions["E11_DATMD"].includes("avec réduction et blocage") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMD"] != undefined && examResult.questions["E11_DATMD"].includes("sans réduction et avec ") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMD"] != undefined && examResult.questions["E11_DATMD"].includes("sans réduction avec") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMD"] != undefined && examResult.questions["E11_DATMD"].includes("Maladie") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMD"] != undefined && examResult.questions["E11_DATMD"].includes("Sublux") ? '#228b22' : '#808080'
    });
    // Désordres atm gauche
    x = 393;
    y = 611.3;
    vertical_offsets = 12.5;
    pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMG"] == undefined || examResult.questions["E11_DATMG"].includes("Non") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMG"] != undefined && examResult.questions["E11_DATMG"].includes("avec réduction") && !examResult.questions["E11_DATMG"].includes("avec réduction et") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMG"] != undefined && examResult.questions["E11_DATMG"].includes("avec réduction et blocage") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMG"] != undefined && examResult.questions["E11_DATMG"].includes("sans réduction et avec") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMG"] != undefined && examResult.questions["E11_DATMG"].includes("avec réduction avec") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMG"] != undefined && examResult.questions["E11_DATMG"].includes("Maladie") ? '#228b22' : '#808080'
    });
    pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
        fill: examResult.questions["E11_DATMG"] != undefined && examResult.questions["E11_DATMG"].includes("Sublux") ? '#228b22' : '#808080'
    });
    /*pdfDoc
    .moveTo(200, 600)
        .lineTo('center', 650)
        .lineTo(412, 600)

    .moveTo("right", "bottom");
    */
    pdfDoc
        .endPage()
        .endPDF();
    //console.log(pdfReader.getPagesCount())
}
generate_fdi(res);
