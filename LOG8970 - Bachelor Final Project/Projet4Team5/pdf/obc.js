"use strict";
exports.__esModule = true;
var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var exam_result_1 = require("./exam-result");
var ASSIGNATIONS = {
    "Jamais": 0,
    "1 Nuit/mois": 1,
    "1-3 Nuit/mois": 2,
    "1-3 Nuit/semaine": 3,
    "4-7 Nuit/semaine": 4,
    "Un peu de temps": 1,
    "Une partie du temps": 2,
    "La pluspart du temps": 3,
    "Tout le temps": 4
};
function generate_obc(examResult) {
    var pdfDoc = new HummusRecipe('./questionnaires/OBC_fr.pdf', './questionnaires/OBCrempli.pdf');
    //let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
    pdfDoc.editPage(1);
    // TEXT
    // 1
    var y = 112;
    var x = 352;
    var offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC1"]] * 51.15;
    console.log(offset);
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 2
    y = 146;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC2"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 3
    y = 205;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC3"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 4
    y = 230;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC4"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 5
    y = 264;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC5"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 6
    y = 302;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC6"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 7
    y = 330.6;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC7"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 8
    y = 356;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC8"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 9
    y = 381.2;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC9"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 10
    y = 406;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC10"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 11
    y = 434.8;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC11"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 12
    y = 466.4;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC12"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 13
    y = 492.8;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC13"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 14
    y = 524.4;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC14"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 15
    y = 560;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC15"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 16
    y = 585;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC16"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 17
    y = 611.4;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC17"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 18
    y = 642.4;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC18"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 19
    y = 670.4;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC19"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 20
    y = 695.5;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC20"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    // 21
    y = 721;
    offset = ASSIGNATIONS[exam_result_1.res["questions"]["OBC21"]] * 51.15;
    pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
        fill: true ? '#228b22' : '#8b0000'
    });
    pdfDoc
        .endPage()
        .endPDF();
    //console.log(pdfReader.getPagesCount())
}
generate_obc(exam_result_1.res);
