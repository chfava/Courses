"use strict";
exports.__esModule = true;
var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var pdfDoc = new HummusRecipe('./questionnaires/JLFS8_fr.pdf', './questionnaires/JLFS8rempli.pdf');
var exam_result_1 = require("./exam-result");
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
pdfDoc.editPage(1);
// TEXT
// 1
var y = 161.5;
var x = 269.5;
var offset = exam_result_1.res["questions"]["FM81"] * 28.65;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 2
y = 186.5;
offset = exam_result_1.res["questions"]["FM82"] * 28.65;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 3
y = 212.5;
offset = exam_result_1.res["questions"]["FM83"] * 28.65;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 4
y = 272.5;
offset = exam_result_1.res["questions"]["FM84"] * 28.65;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 5
y = 310;
offset = exam_result_1.res["questions"]["FM85"] * 28.65;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 6
y = 336;
offset = exam_result_1.res["questions"]["FM86"] * 28.65;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 7
y = 362;
offset = exam_result_1.res["questions"]["FM87"] * 28.65;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 8
y = 388;
offset = exam_result_1.res["questions"]["FM88"] * 28.65;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc
    .endPage()
    .endPDF();
//console.log(pdfReader.getPagesCount())
