"use strict";
exports.__esModule = true;
var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var pdfDoc = new HummusRecipe('./questionnaires/JLFS20_fr.pdf', './questionnaires/JLFS20rempli.pdf');
var exam_result_1 = require("./exam-result");
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
pdfDoc.editPage(1);
// TEXT
// 1
var y = 136.5;
var x = 269.5;
var offset = Math.pow(exam_result_1.res["questions"]["FM201"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 2
y = 162.5;
offset = Math.pow(exam_result_1.res["questions"]["FM202"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 3
y = 188.4;
offset = Math.pow(exam_result_1.res["questions"]["FM203"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 4
y = 214.2;
offset = Math.pow(exam_result_1.res["questions"]["FM204"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 5
y = 240.2;
offset = Math.pow(exam_result_1.res["questions"]["FM205"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 6
y = 289;
offset = Math.pow(exam_result_1.res["questions"]["FM206"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 7
y = 349.4;
offset = Math.pow(exam_result_1.res["questions"]["FM207"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 8
y = 386.6;
offset = Math.pow(exam_result_1.res["questions"]["FM208"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 9
y = 424;
offset = Math.pow(exam_result_1.res["questions"]["FM209"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 10
y = 450.2;
offset = Math.pow(exam_result_1.res["questions"]["FM2010"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 11
y = 487.5;
offset = Math.pow(exam_result_1.res["questions"]["FM2011"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 12
y = 513.5;
offset = Math.pow(exam_result_1.res["questions"]["FM2012"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 13
y = 539.2;
offset = Math.pow(exam_result_1.res["questions"]["FM2013"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 14
y = 565;
offset = Math.pow(exam_result_1.res["questions"]["FM2014"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 15
y = 591;
offset = Math.pow(exam_result_1.res["questions"]["FM2015"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 16
y = 617;
offset = Math.pow(exam_result_1.res["questions"]["FM2016"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 17
y = 643;
offset = Math.pow(exam_result_1.res["questions"]["FM2017"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 18
y = 668.8;
offset = Math.pow(exam_result_1.res["questions"]["FM2018"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 19
y = 694.5;
offset = Math.pow(exam_result_1.res["questions"]["FM2019"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 20
y = 720.6;
offset = Math.pow(exam_result_1.res["questions"]["FM2020"], 28.65);
pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc
    .endPage()
    .endPDF();
//console.log(pdfReader.getPagesCount())
