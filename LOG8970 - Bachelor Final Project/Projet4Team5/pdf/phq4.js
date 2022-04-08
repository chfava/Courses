"use strict";
exports.__esModule = true;
var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var pdfDoc = new HummusRecipe('./questionnaires/PHQ4_fr.pdf', './questionnaires/PHQ4rempli.pdf');
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
var exam_result_1 = require("./exam-result");
pdfDoc.editPage(1);
// TEXT
// 1
var y = 292;
var x = 336.5;
var offset = exam_result_1.res["questions"]["PHQ41"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 2
y = 326.5;
offset = exam_result_1.res["questions"]["PHQ42"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 3
y = 361.5;
offset = exam_result_1.res["questions"]["PHQ43"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 4
y = 396;
offset = exam_result_1.res["questions"]["PHQ44"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 10
x = 147.5;
y = 561.5;
offset = exam_result_1.res["questions"]["PHQ45"] * 104.5;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc
    .endPage()
    .endPDF();
//console.log(pdfReader.getPagesCount())
