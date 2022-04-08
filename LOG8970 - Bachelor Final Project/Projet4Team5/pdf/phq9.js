"use strict";
exports.__esModule = true;
var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var pdfDoc = new HummusRecipe('./questionnaires/PHQ9_fr.pdf', './questionnaires/PHQ9rempli.pdf');
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
var exam_result_1 = require("./exam-result");
pdfDoc.editPage(1);
// TEXT
// 1
var y = 210.4;
var x = 336.5;
var offset = exam_result_1.res["questions"]["PHQ91"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 2
y = 245.5;
offset = exam_result_1.res["questions"]["PHQ92"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 3
y = 276;
offset = exam_result_1.res["questions"]["PHQ93"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 4
y = 310;
offset = exam_result_1.res["questions"]["PHQ94"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 5
y = 341;
offset = exam_result_1.res["questions"]["PHQ95"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 6
y = 371;
offset = exam_result_1.res["questions"]["PHQ96"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 7
y = 418;
offset = exam_result_1.res["questions"]["PHQ97"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 8
y = 465;
offset = exam_result_1.res["questions"]["PHQ98"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 9
y = 549.5;
offset = exam_result_1.res["questions"]["PHQ99"] * 56.9;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 10
x = 147.5;
y = 704.5;
offset = exam_result_1.res["questions"]["PHQ910"] * 103;
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc
    .endPage()
    .endPDF();
//console.log(pdfReader.getPagesCount())
