var hummus = require('hummus');
var HummusRecipe = require('hummus-recipe');
var pdfDoc = new HummusRecipe('./questionnaires/FDI_fr.pdf', './questionnaires/FDIrempli.pdf');
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
pdfDoc.editPage(1);
// TEXT
pdfDoc.text("PATIENT", 72, 66, { fontSize: 10 })
    .text("PRATICIEN", 264.5, 66, { fontSize: 10 });
// date
pdfDoc
    .text("1", 401, 56, { fontSize: 16 })
    .text("1", 417, 56, { fontSize: 16 })
    .text("1", 442, 56, { fontSize: 16 })
    .text("1", 459, 56, { fontSize: 16 })
    .text("1", 487, 56, { fontSize: 16 })
    .text("1", 503, 56, { fontSize: 16 })
    .text("1", 520, 56, { fontSize: 16 })
    .text("1", 538, 56, { fontSize: 16 });
// 2 surplomb incisif horizontal 
pdfDoc
    .text("1", 173, 213, { fontSize: 16 })
    .text("1", 195, 213, { fontSize: 16 })
    // 2 surplomb incisif vertical 
    .text("1", 359, 213, { fontSize: 16 })
    .text("1", 382, 213, { fontSize: 16 })
    // 2 deviation mediane
    .text("1", 528, 213, { fontSize: 16 })
    .text("1", 551, 213, { fontSize: 16 });
// 4a
pdfDoc
    .text("1", 91, 311, { fontSize: 16 })
    .text("1", 112.6, 311, { fontSize: 16 });
// 4b
pdfDoc
    .text("1", 91, 361, { fontSize: 16 })
    .text("1", 112.6, 361, { fontSize: 16 });
// 4c
pdfDoc
    .text("1", 91, 438, { fontSize: 16 })
    .text("1", 112.6, 438, { fontSize: 16 });
// 5a
pdfDoc
    .text("1", 91, 563, { fontSize: 16 })
    .text("1", 112.6, 563, { fontSize: 16 });
// 5b
pdfDoc
    .text("1", 91, 638, { fontSize: 16 })
    .text("1", 112.6, 638, { fontSize: 16 });
// 5c
pdfDoc
    .text("1", 91, 715, { fontSize: 16 })
    .text("1", 112.6, 715, { fontSize: 16 });
// BULLES
var horizontal_offsets;
var vertical_offsets;
// 1a right pain, x: 32.5, y: 99
var x = 59;
var y = 126.75;
horizontal_offsets = [0, 40, 103, 187.5];
vertical_offsets = [0, 13, 46];
pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
}).text('Y', x + horizontal_offsets[0] - 2.6, y + vertical_offsets[0] - 2.6, { fontSize: 8, color: '#000000' });
pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[3], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 1b right pain
pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 1a left pain
x = 326;
y = 126.5;
pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[3], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 1b right pain
pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 2
pdfDoc.circle(235.5, 195.5, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(276.66, 195.5, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(334.2, 195.5, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(123.3, 226.1, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(309.5, 226.1, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(477.5, 226.1, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(495, 226.1, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(512.6, 226.1, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 3
pdfDoc.circle(209.3, 261, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(281.1, 261, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(420.85, 261, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(480.6, 261, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 4 droit
pdfDoc.circle(128.4, 472.1, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(141.1, 472.1, 5, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
x = 246.5;
y = 348;
horizontal_offsets = 45.5;
var yes = 16;
vertical_offsets = 12.75;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 4 gauche 
x = 450.25;
y = 348;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 5 droit
pdfDoc.circle(68.5, 750, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
x = 246.5;
y = 549.5;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 5 gauche
x = 450.25;
y = 549.5;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 0 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 1 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 8 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 9 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 10 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 12 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 13 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 14 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 15 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + 16 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.endPage();
pdfDoc.editPage(2);
// 6 droite
x = 102.25;
y = 100.25;
horizontal_offsets = 39.5;
vertical_offsets = 11.75;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 3 * horizontal_offsets + 3, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 3 * horizontal_offsets + 3 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 4 * horizontal_offsets + 6, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 4 * horizontal_offsets + 6 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 6 gauche
x = 380;
y = 100;
horizontal_offsets = 39.5;
vertical_offsets = 11.5;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 3 * horizontal_offsets + 3, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 3 * horizontal_offsets + 3 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 4 * horizontal_offsets + 5.5, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 4 * horizontal_offsets + 4.75 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 7 droite
x = 102.25;
y = 179;
horizontal_offsets = 39.5;
vertical_offsets = 12;
pdfDoc.circle(x + 15, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 15 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 30 + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 30 + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 3.098 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 3.093 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 4.2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 4.18 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 15, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 15 + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 30 + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 30 + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 7 gauche
x = 385;
y = 179;
horizontal_offsets = 39.5;
vertical_offsets = 12;
pdfDoc.circle(x + 15, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 15 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.55 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.55 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.94 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.96 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 3.97 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 3.97 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 15, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 15 + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.55 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.55 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 8 droite
x = 144.5;
y = 253.5;
horizontal_offsets = 41;
vertical_offsets = 11.5;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.08 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.05 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.08 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.05 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 8 gauche
x = 405;
y = 253.5;
horizontal_offsets = 41;
vertical_offsets = 11.5;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.08 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.05 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.09 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.03 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.08 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.05 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.09 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.03 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 9 droite
x = 144;
y = 334;
horizontal_offsets = 45;
vertical_offsets = 12.2;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.95 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.95 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.95 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.95 * horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.95 * horizontal_offsets, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.95 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 0.94 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 1 * horizontal_offsets, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 1 * horizontal_offsets + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 2 * horizontal_offsets, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 2 * horizontal_offsets + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 1 * horizontal_offsets, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 1 * horizontal_offsets + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 2 * horizontal_offsets, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 2 * horizontal_offsets + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 9 gauche
x = 408;
y = 334;
horizontal_offsets = 45;
vertical_offsets = 12.2;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.02 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.04 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.04 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.02 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.04 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.04 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.02 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.04 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.04 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.02 * horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.02 * horizontal_offsets, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1.02 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2.95 * horizontal_offsets + yes, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 1 * horizontal_offsets, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 1 * horizontal_offsets + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 2 * horizontal_offsets, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 2 * horizontal_offsets + yes, y + 9.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 1 * horizontal_offsets, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 1 * horizontal_offsets + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 2 * horizontal_offsets, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 34 + 2 * horizontal_offsets + yes, y + 10.4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 10 droite 
x = 177;
y = 528;
horizontal_offsets = 46;
vertical_offsets = 12.2;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#a0a0a0' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 10 gauche 
x = 442;
y = 528;
horizontal_offsets = 46;
vertical_offsets = 12.2;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 1 * horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x + 2 * horizontal_offsets + yes, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// 11 
// Désordres douloureux
x = 40.4;
y = 611.3;
vertical_offsets = 12.35;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// Désordres atm droite
x = 179.6;
y = 611.3;
vertical_offsets = 12.5;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
// Désordres atm gauche
x = 393;
y = 611.3;
vertical_offsets = 12.5;
pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 2 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 3 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 4 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 5 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 6 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
pdfDoc.circle(x, y + 7 * vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
    fill: true ? '#228b22' : '#8b0000'
});
/*pdfDoc
.moveTo(200, 600)
    .lineTo('center', 650)
    .lineTo(412, 600)

.moveTo("right", "bottom");
*/
pdfDoc
    .endPage()
    .endPDF();
//console.log(pdfReader.getPagesCount())
