"use strict";
exports.__esModule = true;
var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var pdfDoc = new HummusRecipe('./questionnaires/DC_fr.pdf', './questionnaires/DCrempli.pdf');
var exam_result_1 = require("./exam-result");
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
pdfDoc.editPage(1);
// TEXT
// 1. 
pdfDoc.text(exam_result_1.res["questions"]["DC1"], 467, 62, { fontSize: 14 });
// 2
var y = 171;
var x = 124;
var offset = 37.2;
pdfDoc.circle(x + +exam_result_1.res["questions"]["DC2"] * offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 3
y = 263;
offset = 37.2;
pdfDoc.circle(x + +exam_result_1.res["questions"]["DC3"] * offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 4
y = 366;
offset = 37.2;
pdfDoc.circle(x + +exam_result_1.res["questions"]["DC4"] * offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 5
pdfDoc.text(exam_result_1.res["questions"]["DC5"], 461, 414, { fontSize: 14 });
// 6
y = 517;
offset = 37.2;
pdfDoc.circle(x + +exam_result_1.res["questions"]["DC6"] * offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 7
y = 611;
offset = 37.2;
pdfDoc.circle(x + +exam_result_1.res["questions"]["DC7"] * offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 8
y = 705;
offset = 37.2;
pdfDoc.circle(x + +exam_result_1.res["questions"]["DC8"] * offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc
    .endPage()
    .endPDF();
//console.log(pdfReader.getPagesCount())
