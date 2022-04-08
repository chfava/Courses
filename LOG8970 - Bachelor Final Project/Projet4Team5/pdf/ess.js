"use strict";
exports.__esModule = true;
var fs = require('fs');
var HummusRecipe = require('hummus-recipe');
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
var ess = /** @class */ (function () {
    function ess() {
    }
    ess.prototype.ess = function (res) {
        /*if (!fs.existsSync("/root/temp")){
            fs.mkdirSync("/root/temp");
        }*/
        var pdfDoc = new HummusRecipe('./questionnaires/ESS.pdf', './ESS.pdf');
        pdfDoc.editPage(1);
        // TEXT
        // 1
        var y = 426;
        var x = 439;
        pdfDoc.text(res["ESS1"], x, y);
        // 2
        y += 26;
        pdfDoc.text(res["ESS2"], x, y);
        // 3
        y += 26;
        pdfDoc.text(res["ESS3"], x, y);
        // 4
        y += 26;
        pdfDoc.text(res["ESS4"], x, y);
        // 5
        y += 26;
        pdfDoc.text(res["ESS5"], x, y);
        // 6
        y += 26;
        pdfDoc.text(res["ESS6"], x, y);
        // 7
        y += 26;
        pdfDoc.text(res["ESS7"], x, y);
        // 8
        y += 26;
        pdfDoc.text(res["ESS8"], x, y);
        pdfDoc
            .endPage()
            .endPDF();
    };
    return ess;
}());
exports.ess = ess;
var res = {
    "ESS1": 2,
    "ESS2": 2,
    "ESS3": 2,
    "ESS4": 2,
    "ESS5": 2,
    "ESS6": 2,
    "ESS7": 2,
    "ESS8": 2
};
var ESS = new ess();
ESS.ess(res);
//console.log(pdfReader.getPagesCount())
