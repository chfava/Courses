"use strict";
exports.__esModule = true;
var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var pdfDoc = new HummusRecipe('./questionnaires/GAD7_fr.pdf', './questionnaires/GAD7rempli.pdf');
var exam_result_1 = require("./exam-result");
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
pdfDoc.editPage(1);
// TEXT
// 1
var y = 292.5;
var x = 336.6;
var offset = exam_result_1.res["questions"]["GAD1"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 2
y = 326;
offset = exam_result_1.res["questions"]["GAD1"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 3
y = 361;
offset = exam_result_1.res["questions"]["GAD2"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 4
y = 391.3;
offset = exam_result_1.res["questions"]["GAD3"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 5
y = 422.2;
offset = exam_result_1.res["questions"]["GAD4"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 6
y = 456.3;
offset = exam_result_1.res["questions"]["GAD5"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 7
y = 486.6;
offset = exam_result_1.res["questions"]["GAD6"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 8
x = 147.8;
y = 655;
offset = exam_result_1.res["questions"]["GAD7"] * 104.06;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc
    .endPage()
    .endPDF();
//console.log(pdfReader.getPagesCount())
