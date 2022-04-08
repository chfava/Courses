"use strict";
exports.__esModule = true;
var fs = require('fs');
var HummusRecipe = require('hummus-recipe');
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
var isi = /** @class */ (function () {
    function isi() {
    }
    isi.prototype.isi = function (res) {
        /*
        if (!fs.existsSync("/root/temp")){
            fs.mkdirSync("/root/temp");
        }*/
        var pdfDoc = new HummusRecipe('./questionnaires/ISI.pdf', './ISI.pdf');
        pdfDoc.editPage(1);
        // TEXT
        var first_offsets = [0, 59, 120, 182, 244];
        // 1
        var y = 201;
        var x = 297;
        var offset = first_offsets[res["ISI1"]];
        pdfDoc.circle(x + offset, y, 6, { stroke: '#000000', lineWidth: .01,
            fill: true ? '#228b22' : '#8b0000'
        });
        // 2
        y = 221;
        offset = first_offsets[res["ISI2"]];
        pdfDoc.circle(x + offset, y, 6, { stroke: '#000000', lineWidth: .01,
            fill: true ? '#228b22' : '#8b0000'
        });
        // 3
        y = 240;
        offset = first_offsets[res["ISI3"]];
        pdfDoc.circle(x + offset, y, 6, { stroke: '#000000', lineWidth: .01,
            fill: true ? '#228b22' : '#8b0000'
        });
        var second_offsets = [0, 70, 160, 244, 332];
        // 4
        x = 148;
        y = 297;
        offset = second_offsets[res["ISI4"]];
        pdfDoc.circle(x + offset, y, 6, { stroke: '#000000', lineWidth: .01,
            fill: true ? '#228b22' : '#8b0000'
        });
        var third_offsets = [0, 67, 148, 206, 302];
        // 5
        y = 360.5;
        x = 139;
        offset = third_offsets[res["ISI5"]];
        pdfDoc.circle(x + offset, y, 6, { stroke: '#000000', lineWidth: .01,
            fill: true ? '#228b22' : '#8b0000'
        });
        // 6
        y = 423;
        offset = third_offsets[res["ISI6"]];
        pdfDoc.circle(x + offset, y, 6, { stroke: '#000000', lineWidth: .01,
            fill: true ? '#228b22' : '#8b0000'
        });
        // 7
        y = 501;
        offset = third_offsets[res["ISI7"]];
        pdfDoc.circle(x + offset, y, 6, { stroke: '#000000', lineWidth: .01,
            fill: true ? '#228b22' : '#8b0000'
        });
        // 8
        x = 376;
        y = 578;
        var score = res["ISI1"] + res["ISI2"] + res["ISI3"] + res["ISI4"] + res["ISI5"] + res["ISI6"] + res["ISI7"];
        pdfDoc.text(score, x, y);
        pdfDoc
            .endPage()
            .endPDF();
    };
    return isi;
}());
exports.isi = isi;
var res = {
    "ISI1": 0,
    "ISI2": 2,
    "ISI3": 3,
    "ISI4": 4,
    "ISI5": 3,
    "ISI6": 4,
    "ISI7": 2
};
var ISI = new isi();
ISI.isi(res);
//console.log(pdfReader.getPagesCount())
