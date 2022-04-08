"use strict";
exports.__esModule = true;
var PDFDocument = require("pdfkit");
var fs = require('fs');
var data = {
    patientID: "1",
    questions: {
        FIRST_NAME: "test",
        LAST_NAME: "test",
        SEXE: "test",
        AGE: "test",
        DD1: "test",
        DD2: "test",
        DD3A: "test",
        DD3B: "test",
        DD3C: "test",
        DD3D: "test",
        QS1: "test",
        QS2: "test",
        QS3: "test",
        QS4A: "test",
        QS4B: "test",
        QS4C: "test",
        QS5: "test",
        QS6: "test",
        QS7A: "test",
        QS7B: "test",
        QS7C: "test",
        QS7D: "test",
        QS8: "test",
        QS8E: "test",
        QS9: "test",
        QS9E: "test",
        QS10: "test",
        QS10E: "test",
        QS11: "test",
        QS11E: "test",
        QS12: "test",
        QS12E: "test",
        QS13: "test",
        QS13E: "test",
        QS14: "test",
        QS14E: "test",
        DEMO1: "test",
        DEMO2: "test",
        DEMO3: "test",
        DEMO4: "test",
        DEMO5: "test",
        E1B_D: "test",
        E1B_G: "test",
        E1_DOUL_D_ATM: "test",
        E1_DOUL_D_DIGASTRIQUEPOS: "test",
        E1_DOUL_D_MASSETER_BODY: "test",
        E1_DOUL_D_MASSETER_INSERTION: "test",
        E1_DOUL_D_MASSETER_ORIGIN: "test",
        E1_DOUL_D_PTERIGOIDIENMEDIAL: "test",
        E1_DOUL_D_TEMPORAL_ANTERIOR: "test",
        E1_DOUL_D_TEMPORAL_MIDDLE: "test",
        E1_DOUL_D_TEMPORAL_POSTERIOR: "test",
        E1_DOUL_G_ATM: "test",
        E1_DOUL_G_DIGASTRIQUEPOS: "test",
        E1_DOUL_G_MASSETER_BODY: "test",
        E1_DOUL_G_MASSETER_INSERTION: "test",
        E1_DOUL_G_MASSETER_ORIGIN: "test",
        E1_DOUL_G_PTERIGOIDIENMEDIAL: "test",
        E1_DOUL_G_TEMPORAL_ANTERIOR: "test",
        E1_DOUL_G_TEMPORAL_MIDDLE: "test",
        E1_DOUL_G_TEMPORAL_POSTERIOR: "test",
        E2DEVIA_MEDIA: "test",
        E2DIST_H: "test",
        E2DIST_MEDIA: "test",
        E2DIST_V: "test",
        E2NEG_H: "test",
        E2NEG_V: "test",
        E2REF: "test",
        E31: "test",
        E32: "test",
        E4A: "test",
        E4B: "test",
        E4C: "test",
        E4D: "test",
        E4_DH_G_D_TEMPORAL: "test",
        E4_MA_D_ATM: "test",
        E4_MA_D_DIGASTRIQUEPOS: "test",
        E4_MA_D_MASSETER_BODY: "test",
        E4_MA_D_MASSETER_INSERTION: "test",
        E4_MA_D_MASSETER_ORIGIN: "test",
        E4_MA_D_PTERIGOIDIENMEDIAL: "test",
        E4_MA_D_TEMPORAL_ANTERIOR: "test",
        E4_MA_D_TEMPORAL_MIDDLE: "test",
        E4_MA_D_TEMPORAL_POSTERIOR: "test",
        E4_MA_G_ATM: "test",
        E4_MA_G_DIGASTRIQUEPOS: "test",
        E4_MA_G_MASSETER_BODY: "test",
        E4_MA_G_MASSETER_INSERTION: "test",
        E4_MA_G_MASSETER_ORIGIN: "test",
        E4_MA_G_PTERIGOIDIENMEDIAL: "test",
        E4_MA_G_TEMPORAL_ANTERIOR: "test",
        E4_MA_G_TEMPORAL_MIDDLE: "test",
        E4_MA_G_TEMPORAL_POSTERIOR: "test",
        E4_MS_D_ATM: "test",
        E4_MS_D_DIGASTRIQUEPOS: "test",
        E4_MS_D_MASSETER_BODY: "test",
        E4_MS_D_MASSETER_INSERTION: "test",
        E4_MS_D_MASSETER_ORIGIN: "test",
        E4_MS_D_PTERIGOIDIENMEDIAL: "test",
        E4_MS_D_TEMPORAL_ANTERIOR: "test",
        E4_MS_D_TEMPORAL_MIDDLE: "test",
        E4_MS_D_TEMPORAL_POSTERIOR: "test",
        E4_MS_G_ATM: "test",
        E4_MS_G_DIGASTRIQUEPOS: "test",
        E4_MS_G_MASSETER_BODY: "test",
        E4_MS_G_MASSETER_INSERTION: "test",
        E4_MS_G_MASSETER_ORIGIN: "test",
        E4_MS_G_PTERIGOIDIENMEDIAL: "test",
        E4_MS_G_TEMPORAL_ANTERIOR: "test",
        E4_MS_G_TEMPORAL_MIDDLE: "test",
        E4_MS_G_TEMPORAL_POSTERIOR: "test",
        E4_MA_MT_D_TEMPORAL_ANTERIOR: "test",
        E4_MA_MT_D_TEMPORAL_MIDDLE: "test",
        E4_MA_MT_D_TEMPORAL_POSTERIOR: "test",
        E4_MA_MT_G_TEMPORAL_ANTERIOR: "test",
        E4_MA_MT_G_TEMPORAL_MIDDLE: "test",
        E4_MA_MT_G_TEMPORAL_POSTERIOR: "test",
        E4_MS_MT_D_TEMPORAL_ANTERIOR: "test",
        E4_MS_MT_D_TEMPORAL_MIDDLE: "test",
        E4_MS_MT_D_TEMPORAL_POSTERIOR: "test",
        E4_MS_MT_G_TEMPORAL_ANTERIOR: "test",
        E4_MS_MT_G_TEMPORAL_MIDDLE: "test",
        E4_MS_MT_G_TEMPORAL_POSTERIOR: "test",
        E5A: "test",
        E5B: "test",
        E5C: "test",
        E5D: "test",
        E5_LD_D_ATM: "test",
        E5_LD_D_DIGASTRIQUEPOS: "test",
        E5_LD_D_MASSETER_BODY: "test",
        E5_LD_D_MASSETER_INSERTION: "test",
        E5_LD_D_MASSETER_ORIGIN: "test",
        E5_LD_D_PTERIGOIDIENMEDIAL: "test",
        E5_LD_D_TEMPORAL_ANTERIOR: "test",
        E5_LD_D_TEMPORAL_MIDDLE: "test",
        E5_LD_D_TEMPORAL_POSTERIOR: "test",
        E5_LD_G_ATM: "test",
        E5_LD_G_DIGASTRIQUEPOS: "test",
        E5_LD_G_MASSETER_BODY: "test",
        E5_LD_G_MASSETER_INSERTION: "test",
        E5_LD_G_MASSETER_ORIGIN: "test",
        E5_LD_G_PTERIGOIDIENMEDIAL: "test",
        E5_LD_G_TEMPORAL_ANTERIOR: "test",
        E5_LD_G_TEMPORAL_MIDDLE: "test",
        E5_LD_G_TEMPORAL_POSTERIOR: "test",
        E5_LD_MT_D_TEMPORAL_ANTERIOR: "test",
        E5_LD_MT_D_TEMPORAL_MIDDLE: "test",
        E5_LD_MT_D_TEMPORAL_POSTERIOR: "test",
        E5_LD_MT_G_TEMPORAL_ANTERIOR: "test",
        E5_LD_MT_G_TEMPORAL_MIDDLE: "test",
        E5_LD_MT_G_TEMPORAL_POSTERIOR: "test",
        E5_LG_D_ATM: "test",
        E5_LG_D_DIGASTRIQUEPOS: "test",
        E5_LG_D_MASSETER_BODY: "test",
        E5_LG_D_MASSETER_INSERTION: "test",
        E5_LG_D_MASSETER_ORIGIN: "test",
        E5_LG_D_PTERIGOIDIENMEDIAL: "test",
        E5_LG_D_TEMPORAL_ANTERIOR: "test",
        E5_LG_D_TEMPORAL_MIDDLE: "test",
        E5_LG_D_TEMPORAL_POSTERIOR: "test",
        E5_LG_G_ATM: "test",
        E5_LG_G_DIGASTRIQUEPOS: "test",
        E5_LG_G_MASSETER_BODY: "test",
        E5_LG_G_MASSETER_INSERTION: "test",
        E5_LG_G_MASSETER_ORIGIN: "test",
        E5_LG_G_PTERIGOIDIENMEDIAL: "test",
        E5_LG_G_TEMPORAL_ANTERIOR: "test",
        E5_LG_G_TEMPORAL_MIDDLE: "test",
        E5_LG_G_TEMPORAL_POSTERIOR: "test",
        E5_LG_MT_D_TEMPORAL_ANTERIOR: "test",
        E5_LG_MT_D_TEMPORAL_MIDDLE: "test",
        E5_LG_MT_D_TEMPORAL_POSTERIOR: "test",
        E5_LG_MT_G_TEMPORAL_ANTERIOR: "test",
        E5_LG_MT_G_TEMPORAL_MIDDLE: "test",
        E5_LG_MT_G_TEMPORAL_POSTERIOR: "test",
        E5_PI_D_ATM: "test",
        E5_PI_D_DIGASTRIQUEPOS: "test",
        E5_PI_D_MASSETER_BODY: "test",
        E5_PI_D_MASSETER_INSERTION: "test",
        E5_PI_D_MASSETER_ORIGIN: "test",
        E5_PI_D_PTERIGOIDIENMEDIAL: "test",
        E5_PI_D_TEMPORAL_ANTERIOR: "test",
        E5_PI_D_TEMPORAL_MIDDLE: "test",
        E5_PI_D_TEMPORAL_POSTERIOR: "test",
        E5_PI_G_ATM: "test",
        E5_PI_G_DIGASTRIQUEPOS: "test",
        E5_PI_G_MASSETER_BODY: "test",
        E5_PI_G_MASSETER_INSERTION: "test",
        E5_PI_G_MASSETER_ORIGIN: "test",
        E5_PI_G_PTERIGOIDIENMEDIAL: "test",
        E5_PI_G_TEMPORAL_ANTERIOR: "test",
        E5_PI_G_TEMPORAL_MIDDLE: "test",
        E5_PI_G_TEMPORAL_POSTERIOR: "test",
        E5_PI_MT_D_TEMPORAL_ANTERIOR: "test",
        E5_PI_MT_D_TEMPORAL_MIDDLE: "test",
        E5_PI_MT_D_TEMPORAL_POSTERIOR: "test",
        E5_PI_MT_G_TEMPORAL_ANTERIOR: "test",
        E5_PI_MT_G_TEMPORAL_MIDDLE: "test",
        E5_PI_MT_G_TEMPORAL_POSTERIOR: "test",
        E6_CRAQ_FERM_D: "test",
        E7_CRAQ_DOUL_G: "test",
        E7_CREP_DOUL_HAB_G: "test",
        E6_CREP_OUV_G: "test",
        E6_CREP_DOUL_G: "test",
        E7_CRAQ_FERM_D: "test",
        E7_CREP_DOUL_G: "test",
        E6_CREP_DOUL_D: "test",
        E6_CREP_OUV_D: "test",
        E6_CREP_DOUL_HAB_G: "test",
        E6_CREP_DOU_HAB_D: "test",
        E6_CRAQ_OUV_G: "test",
        E7_CRAQ_FERM_G: "test",
        E6_CRAQ_DOUL_D: "test",
        E6_CRAQ_DOUL_G: "test",
        E6_CREP_PAT_G: "test",
        E6_CRAQ_PAT_D: "test",
        E6_CRAQ_FERM_G: "test",
        E7_CRAQ_OUV_D: "test",
        E7_CREP_PAT_D: "test",
        E6_CREP_FERM_G: "test",
        E7_CREP_DOUL_D: "test",
        E7_CRAQ_PAT_G: "test",
        E7_CREP_FERM_G: "test",
        E6_CRAQ_DOUL_HAB_D: "test",
        E6_CREP_PAT_D: "test",
        E6_CRAQ_PAT_G: "test",
        E7_CRAQ_OUV_G: "test",
        E6_CRAQ_OUV_D: "test",
        E7_CREP_OUV_D: "test",
        E7_CRAQ_PAT_D: "test",
        E7_CRAQ_DOUL_HAB_D: "test",
        E7_CREP_DOUL_HAB_D: "test",
        E7_CREP_FERM_D: "test",
        E6_CRAQ_DOUL_HAB_G: "test",
        E7_CRAQ_DOUL_D: "test",
        E6_CREP_FERM_D: "test",
        E7_CREP_PAT_G: "test",
        E7_CREP_OUV_G: "test",
        E7_CRAQ_DOUL_HAB_G: "test",
        E8_OUVERT_BLOC_D: "test",
        E8_OUVERT_PAT_D: "test",
        E8_OUVERT_EXAM_D: "test",
        E8_OUVRANT_EXAM_G: "test",
        E8_OUVERT_EXAM_G: "test",
        E8_OUVERT_PAT_G: "test",
        E8_OUVERT_BLOC_G: "test",
        E8_OUVERT_REDUC_G: "test",
        E8_OUVRANT_PAT_G: "test",
        E8_OUVRANT_BLOC_D: "test",
        E8_OUVRANT_EXAM_D: "test",
        E8_OUVRANT_REDUC_G: "test",
        E8_OUVRANT_REDUC_D: "test",
        E8_OUVRANT_BLOC_G: "test",
        E8_OUVRANT_PAT_D: "test",
        E8_OUVERT_REDUC_D: "test",
        E9_AL_DH_D: "test",
        E9_AL_DH_G: "test",
        E9_AL_DOU_REF_D: "test",
        E9_AL_MTH_D: "test",
        E9_AL_MTH_G: "test",
        E9_PALP_D_ATM: "test",
        E9_PALP_D_DIGASTRIQUEPOS: "test",
        E9_PALP_D_MASSETER_BODY: "test",
        E9_PALP_D_MASSETER_INSERTION: "test",
        E9_PALP_D_MASSETER_ORIGIN: "test",
        E9_PALP_D_PTERIGOIDIENMEDIAL: "test",
        E9_PALP_D_TEMPORAL_ANTERIOR: "test",
        E9_PALP_D_TEMPORAL_MIDDLE: "test",
        E9_PALP_D_TEMPORAL_POSTERIOR: "test",
        E9_PALP_G_ATM: "test",
        E9_PALP_G_DIGASTRIQUEPOS: "test",
        E9_PALP_G_MASSETER_BODY: "test",
        E9_PALP_G_MASSETER_INSERTION: "test",
        E9_PALP_G_MASSETER_ORIGIN: "test",
        E9_PALP_G_PTERIGOIDIENMEDIAL: "test",
        E9_PALP_G_TEMPORAL_ANTERIOR: "test",
        E9_PALP_G_TEMPORAL_MIDDLE: "test",
        E9_PALP_G_TEMPORAL_POSTERIOR: "test",
        E9_PL_DH_D: "test",
        E9_PL_DH_G: "test",
        E9_PL_DOU_REF_D: "test",
        E9_PL_DOU_REF_G: "test",
        E9_PL_MTH_D: "test",
        E9_PL_MTH_G: "test",
        E9_PALP_MT_D_TEMPORAL_ANTERIOR: "test",
        E9_PALP_MT_D_TEMPORAL_MIDDLE: "test",
        E9_PALP_MT_D_TEMPORAL_POSTERIOR: "test",
        E9_PALP_MT_G_TEMPORAL_ANTERIOR: "test",
        E9_PALP_MT_G_TEMPORAL_MIDDLE: "test",
        E9_PALP_MT_G_TEMPORAL_POSTERIOR: "test",
        E10_REG_MAND_DOUL_D: "test",
        E10_REG_MAND_DOUL_G: "test",
        E10_REG_MAND_DOUL_HAB_D: "test",
        E10_REG_MAND_DOUL_HAB_G: "test",
        E10_REG_MAND_DOUL_REF_D: "test",
        E10_REG_MAND_DOUL_REF_G: "test",
        E10_REG_PTER_DOUL_D: "test",
        E10_REG_PTER_DOUL_G: "test",
        E10_REG_PTER_DOUL_HAB_D: "test",
        E10_REG_PTER_DOUL_HAB_G: "test",
        E10_REG_PTER_DOUL_REF_D: "test",
        E10_REG_PTER_DOUL_REF_G: "test",
        E10_REG_SOUS_DOUL_D: "test",
        E10_REG_SOUS_DOUL_G: "test",
        E10_REG_SOUS_DOUL_HAB_D: "test",
        E10_REG_SOUS_DOUL_HAB_G: "test",
        E10_REG_SOUS_DOUL_REF_D: "test",
        E10_REG_SOUS_DOUL_REF_G: "test",
        E10_TEND_DOUL_D: "test",
        E10_TEND_DOUL_G: "test",
        E10_TEND_DOUL_HAB_D: "test",
        E10_TEND_DOUL_HAB_G: "test",
        E10_TEND_DOUL_REF_D: "test",
        E10_TEND_DOUL_REF_G: "test",
        E11_AD: "test",
        E11_ATMD: "test",
        E11_ATMG: "test",
        E11_DATMD: "test",
        E11_DATMG: "test",
        E11_DD: "test",
        E11_MTAD: "test",
        E11_MYO_D_D: "test",
        E11_MYO_D_G: "test",
        E11_MYO_M_D: "test",
        E11_MYO_M_G: "test",
        E11_MYO_T_D: "test",
        E11_MYO_T_G: "test",
        E11_MY_D_D: "test",
        E11_MY_D_G: "test",
        E11_MY_M_D: "test",
        E11_MY_M_G: "test",
        E11_MY_P_D: "test",
        E11_MY_P_G: "test",
        E11_MY_T_D: "test",
        E11_MY_T_G: "test",
        E11_NO: "test",
        E12: "test",
        E13_ET: "test",
        E13_HYP: "test",
        E13_KIN: "test",
        E13_OO: "test",
        E13_TB: "test",
        E13_TCC: "test",
        E13_TP: "test",
        E13_Trait: "test",
        COMMENT: "test",
        MD_MOR_D_ATM: "test",
        MD_MOR_D_DIGASTRIQUEPOS: "test",
        MD_MOR_D_MASSETER_BODY: "test",
        MD_MOR_D_MASSETER_INSERTION: "test",
        MD_MOR_D_MASSETER_ORIGIN: "test",
        MD_MOR_D_PTERIGOIDIENMEDIAL: "test",
        MD_MOR_D_TEMPORAL_ANTERIOR: "test",
        MD_MOR_D_TEMPORAL_MIDDLE: "test",
        MD_MOR_D_TEMPORAL_POSTERIOR: "test",
        MD_MOR_G_ATM: "test",
        MD_MOR_G_DIGASTRIQUEPOS: "test",
        MD_MOR_G_MASSETER_BODY: "test",
        MD_MOR_G_MASSETER_ORIGIN: "test",
        MD_MOR_G_PTERIGOIDIENMEDIAL: "test",
        MD_MOR_G_TEMPORAL_ANTERIOR: "test",
        MD_MOR_G_TEMPORAL_MIDDLE: "test",
        MD_MOR_G_TEMPORAL_POSTERIOR: "test",
        MD_MOR_G_MASSETER_INSERTION: "test",
        MD1: "test",
        DC1: "test",
        DC2: "test",
        DC3: "test",
        DC4: "test",
        DC5: "test",
        DC6: "test",
        DC7: "test",
        DC8: "test",
        FM81: "test",
        FM82: "test",
        FM83: "test",
        FM84: "test",
        FM85: "test",
        FM86: "test",
        FM87: "test",
        FM88: "test",
        FM201: "test",
        FM202: "test",
        FM203: "test",
        FM204: "test",
        FM205: "test",
        FM206: "test",
        FM207: "test",
        FM208: "test",
        FM209: "test",
        FM2010: "test",
        FM2011: "test",
        FM2012: "test",
        PHQ41: "test",
        PHQ42: "test",
        PHQ43: "test",
        PHQ44: "test",
        PHQ91: "test",
        PHQ92: "test",
        PHQ93: "test",
        PHQ94: "test",
        PHQ95: "test",
        PHQ96: "test",
        PHQ97: "test",
        PHQ151: "test",
        PHQ152: "test",
        PHQ153: "test",
        PHQ154: "test",
        PHQ155: "test",
        PHQ156: "test",
        PHQ157: "test",
        PHQ158: "test",
        PHQ159: "test",
        PHQ1510: "test",
        PHQ1511: "test",
        PHQ1512: "test",
        PHQ1513: "test",
        PHQ1514: "test",
        PHQ1515: "test",
        GAD1: "test",
        GAD2: "test",
        GAD3: "test",
        GAD4: "test",
        GAD5: "test",
        GAD6: "test",
        GAD7: "test",
        OBC1: "test",
        OBC2: "test",
        OBC3: "test",
        OBC4: "test",
        OBC5: "test",
        OBC6: "test",
        OBC7: "test",
        OBC8: "test",
        OBC9: "test",
        OBC10: "test",
        OBC11: "test",
        OBC12: "test",
        OBC13: "test",
        OBC14: "test",
        OBC15: "test",
        OBC16: "test",
        OBC17: "test",
        OBC18: "test",
        OBC19: "test",
        OBC20: "test",
        OBC21: "test"
    }
};
function dd(doc) {
    doc
        .font("fonts/times-new-roman.ttf").fontSize(25).text("DÉPISTAGE DOULEUR DE DTM", {
        width: 410,
        align: "center"
    });
    doc.moveDown();
    doc.fontSize(13).text("1. Au cours des 30 derniers jours, combien de temps a duré toute douleur à votre mâchoire ou à la tempe, d'un côté ou de l'autre?")
        .fontSize(13).text("a.  Aucune douleur", { indent: 48 })
        .fontSize(13).text("b.  La douleur apparait et disparait", { indent: 48 })
        .fontSize(13).text("c.  Douleur toujours présente", { indent: 48 });
    doc.moveDown();
    doc.fontSize(13).text("2. Au cours des 30 derniers jours, avez-vous eu de la douleur ou une raideur à la mâchoire au réveil?")
        .fontSize(13).text("a.  Non", { indent: 48 })
        .fontSize(13).text("b.  Oui", { indent: 48 });
    doc.moveDown();
    doc.text("3. Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié (amélioré ou aggravé) toute douleur à la mâchoire ou à la tempe d'un côté ou de l'autre?");
    doc.moveDown();
    doc.text("A. Mastiquer des aliments durs ou coriaces.", { indent: 24 });
    doc.text("a.    Non", { indent: 48 });
    doc.text("b.    Oui", { indent: 48 });
    doc.moveDown();
    doc.text("B. Ouvrir votre bouche ou bouger votre mâchoire vers l'avant ou sur le côté.", { indent: 24 });
    doc.text("a.    Non", { indent: 48 });
    doc.text("b.    Oui", { indent: 48 });
    doc.moveDown();
    doc.text("C. Habitudes de la mâchoire tel que garder les dents ensemble, serrer, grincer des dents, ou mâcher de la gomme.", { indent: 24 });
    doc.text("a.    Non", { indent: 48 });
    doc.text("b.    Oui", { indent: 48 });
    doc.moveDown();
    doc.text("D. Autres activités de la mâchoire tel que parler, embrasser ou bâiller.", { indent: 24 });
    doc.text("a.    Non", { indent: 48 });
    doc.text("b.    Oui", { indent: 48 })
        .addPage();
    return doc;
}
function qs(doc) {
    doc
        .font("fonts/times-new-roman.ttf").fontSize(25).text("QUESTIONNAIRE SYMPTÔMES DE DTM", {
        width: 410,
        align: "center"
    });
    doc.moveDown().fontSize(11);
    doc.text("Nom du patient:                   Date:")
        .moveDown()
        .fontSize(16).text("DOULEUR");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("1.   Avez-vous déjà eu de la douleur à la mâchoire, à la tempe, à l'intérieur de l'oreille ou devant l'oreille, d'un côté ou de l'autre?", { continued: true }).text("Non", doc.x + 10, doc.y, { continued: true }).text("Oui", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("2.   Il y a combien d'années ou de mois qu'a commencé pour la première fois votre douleur à la mâchoire, à la tempe, à l'intérieur de l'oreille ou devant l'oreille?", { continued: true }).text(" années", doc.x + 10, doc.y, { continued: true }).text(" mois", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("3.   Au cours des 30 derniers jours, qu'est-ce qui décrit le mieux toute la douleur à votre mâchoire, à la tempe, à l'intérieur de l'oreille ou devant l'oreille, d'un côté ou de l'autre?")
        .moveDown()
        .font(data.questions["FM207"] == "test" ? "Times-Bold" : "Times-Roman").text("Aucune douleur", { align: "center" })
        .font("Times-Roman").text("Douleur qui vient et part", { align: "center" })
        .text("Douleur toujours présente", { align: "center" })
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("4.   Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié (c'est-à-dire amélioré ou aggravé) toute douleur à votre mâchoire, à la tempe, à l'intérieur de l'oreille ou devant l'oreille, d'un côté ou de l'autre?")
        .moveDown()
        .text("A.   Mastiquer des aliments durs ou coriaces", { indent: 12 })
        .text("B.   Ouvrir votre bouche ou déplacer votre mâchoire vers l'avant ou de côté", { indent: 12 })
        .text("C.   Habitudes de la mâchoire tel que tenir les dents ensemble, serrer/grincer des dents, ou mâcher de la gomme", { indent: 12 })
        .text("D.   Autres activités de la mâchoire tel que parler, embrasser ou bâiller.", { indent: 12 })
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown()
        .fontSize(16).text("MAUX DE TÊTE");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("5.   Au cours des 30 derniers jours, avez-vous eu des maux de tête qui comprenaient la région de la tempe?", { continued: true }).text("Non", doc.x + 10, doc.y, { continued: true }).text("Oui", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("6. Depuis combien d'années ou de mois est-ce que vos maux de tête à la tempe ont commencé pour la première fois?", { continued: true }).text(" années", doc.x + 10, doc.y, { continued: true }).text(" mois", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("7.   Au cours des 30 derniers jours, est-ce que les activités suivantes ont été modifié (c'est-à-dire amélioré ou aggravé) tout maux de tête dans la région de la tempe d'un côté ou de l'autre?")
        .moveDown()
        .text("A.   Mastiquer des aliments durs ou coriaces", { indent: 12 })
        .text("B.   Ouvrir votre bouche ou déplacer votre mâchoire vers l'avant ou de côté", { indent: 12 })
        .text("C.   Habitudes de la mâchoire tel que tenir les dents ensemble, serrer/grincer des dents, ou mâcher de la gomme", { indent: 12 })
        .text("D.   Autres activités de la mâchoire tel que parler, embrasser ou bâiller.", { indent: 12 })
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.addPage()
        .fontSize(16).text("BRUITS ARTICULAIRES");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("8.   Au cours des 30 derniers jours, avez-vous eu n'importe quel bruit articulaire en bougeant ou utilisant la mâchoire?")
        .moveDown().text("Non", doc.x, doc.y, { continued: true }).text("Oui", doc.x + 10, doc.y, { continued: true }).text("D", doc.x + 10, doc.y, { continued: true }).text("G", doc.x + 10, doc.y, { continued: true }).text("NSP", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown()
        .fontSize(16).text("BLOCAGE FERMÉ DE LA MÂCHOIRE");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("9.   Avez-vous déjà eu la mâchoire bloquée ou coincée, même pour un instant, de sorte à ne pas pouvoir ouvrir AU COMPLET?")
        .moveDown().text("Non", { continued: true }).text("Oui", doc.x + 10, doc.y, { continued: true }).text("D", doc.x + 10, doc.y, { continued: true }).text("G", doc.x + 10, doc.y, { continued: true }).text("NSP", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("10.   Est-ce que blocage ou le coincement de votre mâchoire, même pour un instant, a été suffisamment grave pour limiter votre ouverture de bouche et interférer avec votre habileté à manger?")
        .moveDown().text("Non", { continued: true }).text("Oui", doc.x + 10, doc.y, { continued: true }).text("D", doc.x + 10, doc.y, { continued: true }).text("G", doc.x + 10, doc.y, { continued: true }).text("NSP", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("11. Au cours des 30 derniers jours, est-ce que votre mâchoire a bloqué pour ne pas pouvoir ouvrir COMPLÈTEMENT, même un instant, pour ensuite débloquer et pouvoir ouvrir AU COMPLET?")
        .moveDown().text("Non", doc.x, doc.y, { continued: true }).text("Oui", doc.x + 10, doc.y, { continued: true }).text("D", doc.x + 10, doc.y, { continued: true }).text("G", doc.x + 10, doc.y, { continued: true }).text("NSP", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("12. Est-ce que votre mâchoire est présentement bloquée ou limitée de sorte à ne pas pouvoir ouvrir AU COMPLET?")
        .moveDown().text("Non", doc.x, doc.y, { continued: true }).text("Oui", doc.x + 10, doc.y, { continued: true }).text("D", doc.x + 10, doc.y, { continued: true }).text("G", doc.x + 10, doc.y, { continued: true }).text("NSP", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown()
        .fontSize(16).text("BLOCAGE OUVERT DE LA MÂCHOIRE");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("13.  Au cours des 30 derniers jours, est-ce que votre mâchoire a bloqué ou coincé en ouvrant la bouche toute grande, même un instant, de sorte à ne pas pouvoir fermer à partir de cette position grande ouverte?")
        .moveDown().text("Non", { continued: true }).text("Oui", doc.x + 10, doc.y, { continued: true }).text("D", doc.x + 10, doc.y, { continued: true }).text("G", doc.x + 10, doc.y, { continued: true }).text("NSP", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("14. Au cours des 30 derniers jours, lorsque votre mâchoire était bloquée ou coincée grande ouverte, avez-vous eu à faire quelque chose pour fermer tel que la mettre au repos, la bouger, la pousser ou la manipuler?")
        .moveDown().text("Non", { continued: true }).text("Oui", doc.x + 10, doc.y, { continued: true }).text("D", doc.x + 10, doc.y, { continued: true }).text("G", doc.x + 10, doc.y, { continued: true }).text("NSP", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.addPage();
    return doc;
}
function demo(doc) {
    doc
        .font("fonts/times-new-roman.ttf").fontSize(16).text("CRITÈRES DIAGNOSTIQUES DES DÉSORDRES TEMPOROMANDIBULAIRES", {
        width: 410,
        align: "center"
    })
        .font("fonts/times-new-roman.ttf").fontSize(25).text("DONNÉES DÉMOGRAPHIQUES", {
        width: 410,
        align: "center"
    });
    doc.moveDown().fontSize(10);
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("1. Quel est votre état civil actuel?")
        .moveDown()
        .text("Marié(e)", { align: "left", continued: true }).text("Conjoint(e) de fait", { align: "center", continued: true }).text("Divorcé(e)", { align: "right" })
        .text("Séparé(e)", { align: "left", continued: true }).text("Veuf / veuve", { align: "center", continued: true }).text("Jamais marié(e)", { align: "right" })
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("2. Quel est votre groupe ethnique?")
        .moveDown()
        .text("Hispanique", { align: "left", continued: true }).text("Anglo-saxon", { align: "center", continued: true }).text("Autochtone", { align: "right" })
        .text("Autre", { align: "left", continued: true }).text("Ne sait pas", { align: "center" })
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("3. Quelle est votre origine raciale? Indiquez tout ce qui s'applique.")
        .moveDown()
        .text("Blanc d'Amérique, d'Europe", { align: "center" })
        .text("Inuit, Amérindien, Métis", { align: "center" })
        .text("Noir d'Amérique, de Haïti, d'Afrique", { align: "center" })
        .text("Asiatique", { align: "center" })
        .text("Hispanique", { align: "center" })
        .text("Autre", { align: "center" })
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("4. Quel est le plus haut niveau de scolarité que vous avez complété?")
        .moveDown()
        .text("Études secondaires", { align: "center" })
        .text("Formation professionnelle", { align: "center" })
        .text("Études collégiales en partie (CEGEP)", { align: "center" })
        .text("Études collégiales (CEGEP)", { align: "center" })
        .text("Universitaire premier cycle", { align: "center" })
        .text("Universitaire 2e ou 3e cycle", { align: "center" })
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("5. Quel est votre revenu familial annuel? Inclure toutes les sources de revenu des membres de la famille tel que pourvoires, salaire, investissements, etc.")
        .moveDown()
        .text("$0 - $19 999", { align: "center" })
        .text("$20 000 - $39 999", { align: "center" })
        .text("$40 000 - $59 999", { align: "center" })
        .text("$60 000 - $79 999", { align: "center" })
        .text("$80 000 - $99 999", { align: "center" })
        .text("$100 000 - $149 999", { align: "center" })
        .text("$150 000 et plus", { align: "center" })
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.addPage();
    return doc;
}
function fdi(doc) {
    return doc;
}
var doc = new PDFDocument(fs.createReadStream('./questionnaires/FDI.pdf'));
doc.pipe(fs.createWriteStream('output.pdf'));
doc = fdi(doc);
doc = demo(doc);
doc = qs(doc);
doc = dd(doc);
doc.font('fonts/times-new-roman.ttf')
    .fontSize(25)
    .text('Some text with an embedded font!', 100, 100);
doc.addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);
doc.save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill("#FF3300");
// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc.scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();
// Add some text with annotations
doc.addPage()
    .fillColor("blue")
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: "#0000FF" })
    .link(100, 100, 160, 27, 'http://google.com/');
// Finalize PDF file
doc.rect(doc.x, 0, 410, doc.y).stroke();
doc.end();
