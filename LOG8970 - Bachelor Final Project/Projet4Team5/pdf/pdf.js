"use strict";
exports.__esModule = true;
var PDFDocument = require("pdfkit");
var fs = require('fs');
var exam_result_1 = require("./exam-result");
function dd(res) {
    var doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('DD.pdf'));
    doc
        .font("fonts/times-new-roman.ttf").fontSize(25).text("DÉPISTAGE DOULEUR DE DTM", {
        width: 410,
        align: "center"
    });
    doc.moveDown();
    doc.fontSize(13).text("1. Au cours des 30 derniers jours, combien de temps a duré toute douleur à votre mâchoire ou à la tempe, d'un côté ou de l'autre?");
    res["questions"]["DD1"] == "Aucune douleur" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.fontSize(13).text("a.  Aucune douleur", { indent: 48 });
    res["questions"]["DD1"] == "La douleur apparait et disparait" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.fontSize(13).text("b.  La douleur apparait et disparait", { indent: 48 });
    res["questions"]["DD1"] == "Douleur toujours présente" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.fontSize(13).text("c.  Douleur toujours présente", { indent: 48 });
    doc.font("Times-Roman");
    doc.moveDown();
    doc.fontSize(13).text("2. Au cours des 30 derniers jours, avez-vous eu de la douleur ou une raideur à la mâchoire au réveil?");
    res["questions"]["DD2"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.fontSize(13).text("a.  Non", { indent: 48 });
    res["questions"]["DD2"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.fontSize(13).text("b.  Oui", { indent: 48 });
    doc.font("Times-Roman");
    doc.moveDown();
    doc.text("3. Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié (amélioré ou aggravé) toute douleur à la mâchoire ou à la tempe d'un côté ou de l'autre?");
    doc.moveDown();
    doc.text("A. Mastiquer des aliments durs ou coriaces.", { indent: 24 });
    res["questions"]["DD3A"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("a.    Non", { indent: 48 });
    res["questions"]["DD3A"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("b.    Oui", { indent: 48 });
    doc.font("Times-Roman");
    doc.moveDown();
    doc.text("B. Ouvrir votre bouche ou bouger votre mâchoire vers l'avant ou sur le côté.", { indent: 24 });
    res["questions"]["DD3B"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("a.    Non", { indent: 48 });
    res["questions"]["DD3B"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("b.    Oui", { indent: 48 });
    doc.font("Times-Roman");
    doc.moveDown();
    doc.text("C. Habitudes de la mâchoire tel que garder les dents ensemble, serrer, grincer des dents, ou mâcher de la gomme.", { indent: 24 });
    res["questions"]["DD3C"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("a.    Non", { indent: 48 });
    res["questions"]["DD3C"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("b.    Oui", { indent: 48 });
    doc.font("Times-Roman");
    doc.moveDown();
    doc.text("D. Autres activités de la mâchoire tel que parler, embrasser ou bâiller.", { indent: 24 });
    res["questions"]["DD3D"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("a.    Non", { indent: 48 });
    res["questions"]["DD3D"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("b.    Oui", { indent: 48 });
    doc.font("Times-Roman");
    doc.end();
}
function qs(res) {
    var doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('QS.pdf'));
    doc
        .font("fonts/times-new-roman.ttf").fontSize(25).text("QUESTIONNAIRE SYMPTÔMES DE DTM", {
        width: 410,
        align: "center"
    });
    doc.moveDown()
        .moveDown()
        .fontSize(16).text("DOULEUR");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("1.   Avez-vous déjà eu de la douleur à la mâchoire, à la tempe, à l'intérieur de l'oreille ou devant l'oreille, d'un côté ou de l'autre?", { continued: true });
    res["questions"]["QS1"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS1"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y).font("Times-Roman").moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("2.   Il y a combien d'années ou de mois qu'a commencé pour la première fois votre douleur à la mâchoire, à la tempe, à l'intérieur de l'oreille ou devant l'oreille?", { continued: true })
        .text(Math.floor(res["questions"]["QS2"] / 12), doc.x + 15, doc.y, { continued: true })
        .text(" années", doc.x + 10, doc.y, { continued: true })
        .text(res["questions"]["QS2"] % 12, doc.x + 15, doc.y, { continued: true })
        .text(" mois", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("3.   Au cours des 30 derniers jours, qu'est-ce qui décrit le mieux toute la douleur à votre mâchoire, à la tempe, à l'intérieur de l'oreille ou devant l'oreille, d'un côté ou de l'autre?")
        .moveDown();
    res["questions"]["QS3"] == "Aucune douleur" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Aucune douleur", { align: "center" });
    res["questions"]["QS3"] == "Douleur qui vient et part" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Douleur qui vient et part", { align: "center" });
    res["questions"]["QS3"] == "Douleur toujours présente" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Douleur toujours présente", { align: "center" }).font("Times-Roman")
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("4.   Au cours des 30 derniers jours, est-ce que les activités suivantes ont modifié (c'est-à-dire amélioré ou aggravé) toute douleur à votre mâchoire, à la tempe, à l'intérieur de l'oreille ou devant l'oreille, d'un côté ou de l'autre?")
        .moveDown();
    res["questions"]["QS4A"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("A.   Mastiquer des aliments durs ou coriaces", { indent: 12 });
    res["questions"]["QS4B"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("B.   Ouvrir votre bouche ou déplacer votre mâchoire vers l'avant ou de côté", { indent: 12 });
    res["questions"]["QS4C"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("C.   Habitudes de la mâchoire tel que tenir les dents ensemble, serrer/grincer des dents, ou mâcher de la gomme", { indent: 12 });
    res["questions"]["QS4D"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D.   Autres activités de la mâchoire tel que parler, embrasser ou bâiller.", { indent: 12 })
        .font("Times-Roman")
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown()
        .fontSize(16).text("MAUX DE TÊTE");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("5.   Au cours des 30 derniers jours, avez-vous eu des maux de tête qui comprenaient la région de la tempe?", { continued: true });
    res["questions"]["QS5"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS5"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("6. Depuis combien d'années ou de mois est-ce que vos maux de tête à la tempe ont commencé pour la première fois?", { continued: true })
        .text(Math.floor(res["questions"]["QS6"] / 12) + " années", doc.x + 10, doc.y, { continued: true }).text(Math.floor(res["questions"]["QS6"] % 12) + " mois", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("7.   Au cours des 30 derniers jours, est-ce que les activités suivantes ont été modifié (c'est-à-dire amélioré ou aggravé) tout maux de tête dans la région de la tempe d'un côté ou de l'autre?")
        .moveDown();
    res["questions"]["QS7A"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("A.   Mastiquer des aliments durs ou coriaces", { indent: 12 });
    res["questions"]["QS7B"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("B.   Ouvrir votre bouche ou déplacer votre mâchoire vers l'avant ou de côté", { indent: 12 });
    res["questions"]["QS7C"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("C.   Habitudes de la mâchoire tel que tenir les dents ensemble, serrer/grincer des dents, ou mâcher de la gomme", { indent: 12 });
    res["questions"]["QS7D"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D.   Autres activités de la mâchoire tel que parler, embrasser ou bâiller.", { indent: 12 })
        .font("Times-Roman")
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
        .moveDown();
    res["questions"]["QS8"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", doc.x, doc.y, { continued: true });
    res["questions"]["QS8"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS8E"] == "D" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS8E"] == "G" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("G", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS8E"] == "NSP" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("NSP", doc.x + 10, doc.y).moveDown().font("Times-Roman");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown()
        .fontSize(16).text("BLOCAGE FERMÉ DE LA MÂCHOIRE");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("9.   Avez-vous déjà eu la mâchoire bloquée ou coincée, même pour un instant, de sorte à ne pas pouvoir ouvrir AU COMPLET?")
        .moveDown();
    res["questions"]["QS9"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", { continued: true });
    res["questions"]["QS9"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS9E"] == "D" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS9E"] == "G" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("G", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS9E"] == "NSP" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("NSP", doc.x + 10, doc.y).moveDown().font("Times-Roman");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("10.   Est-ce que blocage ou le coincement de votre mâchoire, même pour un instant, a été suffisamment grave pour limiter votre ouverture de bouche et interférer avec votre habileté à manger?")
        .moveDown();
    res["questions"]["QS10"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", { continued: true });
    res["questions"]["QS10"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS10E"] == "D" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS10E"] == "G" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("G", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS8E"] == "NSP" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("NSP", doc.x + 10, doc.y).moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("11. Au cours des 30 derniers jours, est-ce que votre mâchoire a bloqué pour ne pas pouvoir ouvrir COMPLÈTEMENT, même un instant, pour ensuite débloquer et pouvoir ouvrir AU COMPLET?")
        .moveDown();
    res["questions"]["QS11"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", doc.x, doc.y, { continued: true });
    res["questions"]["QS11"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS11E"] == "D" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS11E"] == "G" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("G", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS11E"] == "NSP" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("NSP", doc.x + 10, doc.y).moveDown().font("Times-Roman");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("12. Est-ce que votre mâchoire est présentement bloquée ou limitée de sorte à ne pas pouvoir ouvrir AU COMPLET?")
        .moveDown();
    res["questions"]["QS12"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", doc.x, doc.y, { continued: true });
    res["questions"]["QS12"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS12E"] == "D" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS12E"] == "G" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("G", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS12E"] == "NSP" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("NSP", doc.x + 10, doc.y).moveDown().font("Times-Roman");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown()
        .fontSize(16).text("BLOCAGE OUVERT DE LA MÂCHOIRE");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("13.  Au cours des 30 derniers jours, est-ce que votre mâchoire a bloqué ou coincé en ouvrant la bouche toute grande, même un instant, de sorte à ne pas pouvoir fermer à partir de cette position grande ouverte?")
        .moveDown();
    res["questions"]["QS13"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", { continued: true });
    res["questions"]["QS13"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS13E"] == "D" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS13E"] == "G" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("G", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS13E"] == "NSP" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("NSP", doc.x + 10, doc.y).moveDown().font("Times-Roman");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("14. Au cours des 30 derniers jours, lorsque votre mâchoire était bloquée ou coincée grande ouverte, avez-vous eu à faire quelque chose pour fermer tel que la mettre au repos, la bouger, la pousser ou la manipuler?")
        .moveDown();
    res["questions"]["QS14"] == "Non" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Non", { continued: true });
    res["questions"]["QS14"] == "Oui" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Oui", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS14E"] == "D" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("D", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS14E"] == "G" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("G", doc.x + 10, doc.y, { continued: true });
    res["questions"]["QS14E"] == "NSP" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("NSP", doc.x + 10, doc.y).moveDown().font("Times-Roman");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.end();
}
function demo(res) {
    var doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('DEMO.pdf'));
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
        .moveDown();
    res["questions"]["DEMO1"] == "Marié(e)" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Marié(e)", { align: "left", continued: true });
    res["questions"]["DEMO1"] == "Conjoint(e) de fait" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Conjoint(e) de fait", { align: "center", continued: true });
    res["questions"]["DEMO1"] == "Divorcé(e)" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Divorcé(e)", { align: "right" });
    res["questions"]["DEMO1"] == "Séparé(e)" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Séparé(e)", { align: "left", continued: true });
    res["questions"]["DEMO1"] == "Veuf / veuve" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Veuf / veuve", { align: "center", continued: true });
    res["questions"]["DEMO1"] == "Jamais marié(e)" ? doc.font("Times-Bold") : doc.font("Times-Roman");
    doc.text("Jamais marié(e)", { align: "right" })
        .moveDown().font("Times-Roman");
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("2. Quelle est votre origine?")
        .moveDown().font("Times-Bold")
        .text(res["questions"]["DEMO2"], { align: "center" })
        .font("Times-Roman")
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("3. Quelle est votre profession?")
        .moveDown().font("Times-Bold")
        .text(res["questions"]["DEMO3"], { align: "center" })
        .font("Times-Roman")
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.fontSize(10).text("4. Quel est le plus haut niveau de scolarité que vous avez complété?")
        .moveDown().font("Times-Bold")
        .text(res["questions"]["DEMO4"], { align: "center" })
        .font("Times-Roman")
        .moveDown();
    doc.moveTo(doc.x, doc.y).lineTo(410, doc.y)
        .fillAndStroke("0xFFFFFF")
        .fill("0xFFFFFF").moveDown();
    doc.end();
}
dd(exam_result_1.res);
demo(exam_result_1.res);
qs(exam_result_1.res);
