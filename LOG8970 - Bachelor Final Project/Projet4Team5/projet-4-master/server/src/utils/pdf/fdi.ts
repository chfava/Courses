const hummus = require('hummus')
const HummusRecipe = require('hummus-recipe')
const fs = require("fs")

export class fdi {
	public fdi(res) {
		if (!fs.existsSync("/root/temp")){
			fs.mkdirSync("/root/temp");
		}
		//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");

		const pdfDoc = new HummusRecipe('/root/questionnaires/FDI_fr.pdf', '/root/temp/FDI.pdf')
		pdfDoc.editPage(1)

		// TEXT

		pdfDoc.text(/*res["FIRST_NAME"] + " " + res["LAST_NAME"]*/" ", 72, 66, {fontSize:10})
		.text(" "/*practicien*/, 264.5, 66, {fontSize:10})

		// date
		/*
		pdfDoc
		.text("1", 401, 56, {fontSize:16})
		.text("1", 417, 56, {fontSize:16})
		.text("1", 442, 56, {fontSize:16})
		.text("1", 459, 56, {fontSize:16})
		.text("1", 487, 56, {fontSize:16})
		.text("1", 503, 56, {fontSize:16})
		.text("1", 520, 56, {fontSize:16})
		.text("1", 538, 56, {fontSize:16})
		*/
		// 2 surplomb incisif horizontal 

		pdfDoc
		.text(Math.floor(+res["E2DIST_H"]/10).toString(), 173, 213, {fontSize:16})
		.text((+res["E2DIST_H"]%10).toString(), 195, 213, {fontSize:16})

		// 2 surplomb incisif vertical 

		.text(Math.floor(+res["E2DIST_V"]/10).toString(), 359, 213, {fontSize:16})
		.text((+res["E2DIST_V"]%10).toString(), 382, 213, {fontSize:16})

		// 2 deviation mediane

		.text(Math.floor(+res["E2DIST_MEDIA"]/10).toString(), 528, 213, {fontSize:16})
		.text((+res["E2DIST_MEDIA"]%10).toString(), 551, 213, {fontSize:16})


		// 4a

		pdfDoc
		.text(Math.floor(+res["E4A"]/10).toString(), 91, 311, {fontSize:16})
		.text((+res["E4A"]%10).toString(), 112.6, 311, {fontSize:16})

		// 4b

		pdfDoc
		.text(Math.floor(+res["E4B"]/10).toString(), 91, 361, {fontSize:16})
		.text((+res["E4B"]%10).toString(), 112.6, 361, {fontSize:16})

		// 4c

		pdfDoc
		.text(Math.floor(+res["E4C"]/10).toString(), 91, 438, {fontSize:16})
		.text((+res["E4C"]%10).toString(), 112.6, 438, {fontSize:16})


		// 5a

		pdfDoc
		.text(Math.floor(+res["E4A"]/10).toString(), 91, 563, {fontSize:16})
		.text((+res["E4A"]%10).toString(), 112.6, 563, {fontSize:16})

		// 5b

		pdfDoc
		.text(Math.floor(+res["E4B"]/10).toString(), 91, 638, {fontSize:16})
		.text((+res["E4B"]%10).toString(), 112.6, 638, {fontSize:16})

		// 5c

		pdfDoc
		.text(Math.floor(+res["E4C"]/10).toString(), 91, 715, {fontSize:16})
		.text((+res["E4C"]%10).toString(), 112.6, 715, {fontSize:16})

		// BULLES

		let horizontal_offsets
		let vertical_offsets

		// 1a right pain, x: 32.5, y: 99
		let x = 59
		let y = 126.75

		horizontal_offsets = [0, 40, 103, 187.5]
		vertical_offsets = [0, 13, 46]

		pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E1_DOUL_D_ATM"] != "D" &&
					res["E1_DOUL_D_DIGASTRIQUEPOS"] != "D" &&
					res["E1_DOUL_D_MASSETER_BODY"] != "D" &&
					res["E1_DOUL_D_MASSETER_INSERTION"] != "D" &&
					res["E1_DOUL_D_MASSETER_ORIGIN"] != "D" &&
					res["E1_DOUL_D_PTERIGOIDIENMEDIAL"] != "D" &&
					res["E1_DOUL_D_TEMPORAL_ANTERIOR"] != "D" &&
					res["E1_DOUL_D_TEMPORAL_MIDDLE"] != "D" &&
					res["E1_DOUL_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		}).text('Y',x + horizontal_offsets[0] - 2.6, y + vertical_offsets[0]-2.6, {fontSize:8,  color: '#000000'})
		pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E1_DOUL_D_TEMPORAL_ANTERIOR"] == "D" ||
					res["E1_DOUL_D_TEMPORAL_MIDDLE"] == "D" ||
					res["E1_DOUL_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1_DOUL_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[3], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1_DOUL_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E1_DOUL_D_MASSETER_BODY"] == "D" ||
					res["E1_DOUL_D_MASSETER_INSERTION"] == "D" ||
					res["E1_DOUL_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1_DOUL_D_ATM"] == "D" ? '#228b22' : '#808080'
		})

		// 1b right pain
		pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1B_D"] == "Non" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1B_D"] == "Temporal" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1B_D"] == "Autre" ? '#228b22' : '#808080'
		})



		// 1a left pain
		x = 326
		y = 126.5


		pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E1_DOUL_G_ATM"] != "D" &&
					res["E1_DOUL_G_DIGASTRIQUEPOS"] != "D" &&
					res["E1_DOUL_G_MASSETER_BODY"] != "D" &&
					res["E1_DOUL_G_MASSETER_INSERTION"] != "D" &&
					res["E1_DOUL_G_MASSETER_ORIGIN"] != "D" &&
					res["E1_DOUL_G_PTERIGOIDIENMEDIAL"] != "D" &&
					res["E1_DOUL_G_TEMPORAL_ANTERIOR"] != "D" &&
					res["E1_DOUL_G_TEMPORAL_MIDDLE"] != "D" &&
					res["E1_DOUL_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E1_DOUL_G_TEMPORAL_ANTERIOR"] == "D" ||
					res["E1_DOUL_G_TEMPORAL_MIDDLE"] == "D" ||
					res["E1_DOUL_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1_DOUL_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[3], y + vertical_offsets[0], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1_DOUL_G_DIGASTRIQUEPOS"] == "D"  ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E1_DOUL_G_MASSETER_BODY"] == "D" ||
					res["E1_DOUL_G_MASSETER_INSERTION"] == "D" ||
					res["E1_DOUL_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[1], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1_DOUL_G_ATM"] == "D" ? '#228b22' : '#808080'
		})

		// 1b right pain
		pdfDoc.circle(x + horizontal_offsets[0], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1B_G"] == "Non" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[1], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1B_G"] == "Temporal" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets[2], y + vertical_offsets[2], 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E1B_G"] == "Autre" ? '#228b22' : '#808080'
		})


		// 2

		pdfDoc.circle(235.5, 195.5, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E2REF"] == "11" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(276.66, 195.5, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E2REF"] == "21" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(334.2, 195.5, 5, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E2REF"] != "11" &&
					res["E2REF"] != "21" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(123.3, 226.1, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E2NEG_H"] == "negatif" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(309.5, 226.1, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E2NEG_V"] == "negatif" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(477.5, 226.1, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E2DEVIA_MEDIA"] == "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(495, 226.1, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E2DEVIA_MEDIA"] == "G" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(512.6, 226.1, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E2DEVIA_MEDIA"] == "0" ? '#228b22' : '#808080'
		})

		// 3
		pdfDoc.circle(209.3, 261, 5, { stroke: '#000000', lineWidth: .01,
			fill: false ? '#228b22' : '#808080'
		})
		pdfDoc.circle(281.1, 261, 5, { stroke: '#000000', lineWidth: .01,
			fill: false ? '#228b22' : '#808080'
		})
		pdfDoc.circle(420.85, 261, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E31"] == "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(480.6, 261, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E32"] == "Y" ? '#228b22' : '#808080'
		})



		// 4 droit
		pdfDoc.circle(128.4, 472.1, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E4D"] == "N" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(141.1, 472.1, 5, { stroke: '#000000', lineWidth: .01,
			fill: res["E4D"] == "Y"  ? '#228b22' : '#808080'
		})


		x = 246.5
		y = 348

		horizontal_offsets = 45.5
		let yes = 16
		vertical_offsets = 12.75

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_D_TEMPORAL_ANTERIOR"] != "D" &&
					res["E4_MS_D_TEMPORAL_MIDDLE"] != "D" &&
					res["E4_MS_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_D_TEMPORAL_ANTERIOR"] == "D" ||
					res["E4_MS_D_TEMPORAL_MIDDLE"] == "D" ||
					res["E4_MS_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_D_TEMPORAL_ANTERIOR"] != "DH" &&
					res["E4_MS_D_TEMPORAL_MIDDLE"] != "DH" &&
					res["E4_MS_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_D_TEMPORAL_ANTERIOR"] == "DH" ||
					res["E4_MS_D_TEMPORAL_MIDDLE"] == "DH" ||
					res["E4_MS_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 0*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
					res["E4_MS_MT_D_TEMPORAL_MIDDLE"] != "true" &&
					res["E4_MS_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 0*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
					res["E4_MS_MT_D_TEMPORAL_MIDDLE"] == "true" ||
					res["E4_MS_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_D_MASSETER_BODY"] != "D" &&
					res["E4_MS_D_MASSETER_INSERTION"] != "D" &&
					res["E4_MS_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_D_MASSETER_BODY"] == "D" ||
					res["E4_MS_D_MASSETER_INSERTION"] == "D" ||
					res["E4_MS_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_D_MASSETER_BODY"] != "DH" &&
					res["E4_MS_D_MASSETER_INSERTION"] != "DH" &&
					res["E4_MS_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MS_D_MASSETER_BODY"] == "DH" ||
					res["E4_MS_D_MASSETER_INSERTION"] == "DH" ||
					res["E4_MS_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_D_TEMPORAL_ANTERIOR"] != "D" &&
					res["E4_MA_D_TEMPORAL_MIDDLE"] != "D" &&
					res["E4_MA_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_D_TEMPORAL_ANTERIOR"] == "D" ||
					res["E4_MA_D_TEMPORAL_MIDDLE"] == "D" ||
					res["E4_MA_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_D_TEMPORAL_ANTERIOR"] != "DH" &&
					res["E4_MA_D_TEMPORAL_MIDDLE"] != "DH" &&
					res["E4_MA_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_D_TEMPORAL_ANTERIOR"] == "DH" ||
					res["E4_MA_D_TEMPORAL_MIDDLE"] == "DH" ||
					res["E4_MA_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
					res["E4_MA_MT_D_TEMPORAL_MIDDLE"] != "true" &&
					res["E4_MA_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
					res["E4_MA_MT_D_TEMPORAL_MIDDLE"] == "true" ||
					res["E4_MA_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_D_MASSETER_BODY"] != "D" &&
					res["E4_MA_D_MASSETER_INSERTION"] != "D" &&
					res["E4_MA_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_D_MASSETER_BODY"] == "D" ||
					res["E4_MA_D_MASSETER_INSERTION"] == "D" ||
					res["E4_MA_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_D_MASSETER_BODY"] != "DH" &&
					res["E4_MA_D_MASSETER_INSERTION"] != "DH" &&
					res["E4_MA_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E4_MA_D_MASSETER_BODY"] == "DH" ||
					res["E4_MA_D_MASSETER_INSERTION"] == "DH" ||
					res["E4_MA_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		// 4 gauche 
		x = 450.25
		y = 348

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_TEMPORAL_ANTERIOR"] != "D" &&
			res["E4_MS_G_TEMPORAL_MIDDLE"] != "D" &&
			res["E4_MS_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_TEMPORAL_ANTERIOR"] == "D" ||
			res["E4_MS_G_TEMPORAL_MIDDLE"] == "D" ||
			res["E4_MS_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_TEMPORAL_ANTERIOR"] != "DH" &&
			res["E4_MS_G_TEMPORAL_MIDDLE"] != "DH" &&
			res["E4_MS_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_TEMPORAL_ANTERIOR"] == "DH" ||
			res["E4_MS_G_TEMPORAL_MIDDLE"] == "DH" ||
			res["E4_MS_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 0*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
			res["E4_MS_MT_G_TEMPORAL_MIDDLE"] != "true" &&
			res["E4_MS_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 0*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
			res["E4_MS_MT_G_TEMPORAL_MIDDLE"] == "true" ||
			res["E4_MS_MT_G_TEMPORAL_POSTERIOR"] == "true"  ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_MASSETER_BODY"] != "D" &&
			res["E4_MS_G_MASSETER_INSERTION"] != "D" &&
			res["E4_MS_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_MASSETER_BODY"] == "D" ||
			res["E4_MS_G_MASSETER_INSERTION"] == "D" ||
			res["E4_MS_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_MASSETER_BODY"] != "DH" &&
			res["E4_MS_G_MASSETER_INSERTION"] != "DH" &&
			res["E4_MS_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_MASSETER_BODY"] == "DH" ||
			res["E4_MS_G_MASSETER_INSERTION"] == "DH" ||
			res["E4_MS_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MS_G_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_TEMPORAL_ANTERIOR"] != "D" &&
			res["E4_MA_G_TEMPORAL_MIDDLE"] != "D" &&
			res["E4_MA_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_TEMPORAL_ANTERIOR"] == "D" ||
			res["E4_MA_G_TEMPORAL_MIDDLE"] == "D" ||
			res["E4_MA_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_TEMPORAL_ANTERIOR"] != "DH" &&
			res["E4_MA_G_TEMPORAL_MIDDLE"] != "DH" &&
			res["E4_MA_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_TEMPORAL_ANTERIOR"] == "DH" ||
			res["E4_MA_G_TEMPORAL_MIDDLE"] == "DH" ||
			res["E4_MA_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
			res["E4_MA_MT_G_TEMPORAL_MIDDLE"] != "true" &&
			res["E4_MA_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
			res["E4_MA_MT_G_TEMPORAL_MIDDLE"] == "true" ||
			res["E4_MA_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_MASSETER_BODY"] != "D" &&
			res["E4_MA_G_MASSETER_INSERTION"] != "D" &&
			res["E4_MA_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_MASSETER_BODY"] == "D" ||
			res["E4_MA_G_MASSETER_INSERTION"] == "D" ||
			res["E4_MA_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_MASSETER_BODY"] != "DH" &&
			res["E4_MA_G_MASSETER_INSERTION"] != "DH" &&
			res["E4_MA_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_MASSETER_BODY"] == "DH" ||
			res["E4_MA_G_MASSETER_INSERTION"] == "DH" ||
			res["E4_MA_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E4_MA_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})




		// 5 droit
		pdfDoc.circle(68.5, 750, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5D"] == "Y" ? '#228b22' : '#808080'
		})

		x = 246.5
		y = 549.5

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_D_TEMPORAL_ANTERIOR"] != "D" &&
					res["E5_LD_D_TEMPORAL_MIDDLE"] != "D" &&
					res["E5_LD_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_D_TEMPORAL_ANTERIOR"] == "D" ||
					res["E5_LD_D_TEMPORAL_MIDDLE"] == "D" ||
					res["E5_LD_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_D_TEMPORAL_ANTERIOR"] != "DH" &&
					res["E5_LD_D_TEMPORAL_MIDDLE"] != "DH" &&
					res["E5_LD_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_D_TEMPORAL_ANTERIOR"] == "DH" ||
					res["E5_LD_D_TEMPORAL_MIDDLE"] == "DH" ||
					res["E5_LD_D_TEMPORAL_POSTERIOR"] == "DH"  ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 0*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
					res["E5_LD_MT_D_TEMPORAL_MIDDLE"] != "true" &&
					res["E5_LD_MT_D_TEMPORAL_POSTERIOR"] != "true"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 0*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
					res["E5_LD_MT_D_TEMPORAL_MIDDLE"] == "true" ||
					res["E5_LD_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_D_MASSETER_BODY"] != "D" &&
					res["E5_LD_D_MASSETER_INSERTION"] != "D" &&
					res["E5_LD_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_D_MASSETER_BODY"] == "D" ||
					res["E5_LD_D_MASSETER_INSERTION"] == "D" ||
					res["E5_LD_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_D_MASSETER_BODY"] != "DH" &&
					res["E5_LD_D_MASSETER_INSERTION"] != "DH" &&
					res["E5_LD_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E5_LD_D_MASSETER_BODY"] == "DH" ||
					res["E5_LD_D_MASSETER_INSERTION"] == "DH" ||
					res["E5_LD_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_TEMPORAL_ANTERIOR"] != "D" &&
			res["E5_LG_D_TEMPORAL_MIDDLE"] != "D" &&
			res["E5_LG_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_TEMPORAL_ANTERIOR"] == "D" ||
			res["E5_LG_D_TEMPORAL_MIDDLE"] == "D" ||
			res["E5_LG_D_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_TEMPORAL_ANTERIOR"] != "DH" &&
			res["E5_LG_D_TEMPORAL_MIDDLE"] != "DH" &&
			res["E5_LG_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_TEMPORAL_ANTERIOR"] == "DH" ||
			res["E5_LG_D_TEMPORAL_MIDDLE"] == "DH" ||
			res["E5_LG_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
			res["E5_LG_MT_D_TEMPORAL_MIDDLE"] != "true" &&
			res["E5_LG_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
			res["E5_LG_MT_D_TEMPORAL_MIDDLE"] == "true" ||
			res["E5_LG_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_MASSETER_BODY"] != "D" &&
			res["E5_LG_D_MASSETER_INSERTION"] != "D" &&
			res["E5_LG_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_MASSETER_BODY"] == "D" ||
			res["E5_LG_D_MASSETER_INSERTION"] == "D" ||
			res["E5_LG_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_MASSETER_BODY"] != "DH" &&
			res["E5_LG_D_MASSETER_INSERTION"] != "DH" &&
			res["E5_LG_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_MASSETER_BODY"] == "DH" ||
			res["E5_LG_D_MASSETER_INSERTION"] == "DH" ||
			res["E5_LG_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_TEMPORAL_ANTERIOR"] != "D" &&
			res["E5_PI_D_TEMPORAL_MIDDLE"] != "D" &&
			res["E5_PI_D_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_TEMPORAL_ANTERIOR"] == "D" ||
			res["E5_PI_D_TEMPORAL_MIDDLE"] == "D" ||
			res["E5_PI_D_TEMPORAL_POSTERIOR"] == "D"  ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_TEMPORAL_ANTERIOR"] != "DH" &&
			res["E5_PI_D_TEMPORAL_MIDDLE"] != "DH" &&
			res["E5_PI_D_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_TEMPORAL_ANTERIOR"] == "DH" ||
			res["E5_PI_D_TEMPORAL_MIDDLE"] == "DH" ||
			res["E5_PI_D_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_MT_D_TEMPORAL_ANTERIOR"] != "true" &&
			res["E5_PI_MT_D_TEMPORAL_MIDDLE"] != "true" &&
			res["E5_PI_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_MT_D_TEMPORAL_ANTERIOR"] == "true" ||
			res["E5_PI_MT_D_TEMPORAL_MIDDLE"] == "true" ||
			res["E5_PI_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 13*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_MASSETER_BODY"] != "D" &&
			res["E5_PI_D_MASSETER_INSERTION"] != "D" &&
			res["E5_PI_D_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 13*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_MASSETER_BODY"] == "D" ||
			res["E5_PI_D_MASSETER_INSERTION"] == "D" ||
			res["E5_PI_D_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 13*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_MASSETER_BODY"] != "DH" &&
			res["E5_PI_D_MASSETER_INSERTION"] != "DH" &&
			res["E5_PI_D_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 13*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_MASSETER_BODY"] == "DH" ||
			res["E5_PI_D_MASSETER_INSERTION"] == "DH" ||
			res["E5_PI_D_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 14*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 14*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 14*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 14*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 15*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 15*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 15*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 15*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 16*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 16*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 16*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 16*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_D_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		// 5 gauche


		x = 450.25
		y = 549.5

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_TEMPORAL_ANTERIOR"] != "D" &&
			res["E5_LD_G_TEMPORAL_MIDDLE"] != "D" &&
			res["E5_LD_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_TEMPORAL_ANTERIOR"] == "D" ||
			res["E5_LD_G_TEMPORAL_MIDDLE"] == "D" ||
			res["E5_LD_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_TEMPORAL_ANTERIOR"] != "DH" &&
			res["E5_LD_G_TEMPORAL_MIDDLE"] != "DH" &&
			res["E5_LD_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_TEMPORAL_ANTERIOR"] == "DH" ||
			res["E5_LD_G_TEMPORAL_MIDDLE"] == "DH" ||
			res["E5_LD_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 0*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
			res["E5_LD_MT_G_TEMPORAL_MIDDLE"] != "true" &&
			res["E5_LD_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 0*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
			res["E5_LD_MT_G_TEMPORAL_MIDDLE"] == "true" ||
			res["E5_LD_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_MASSETER_BODY"] != "D" &&
			res["E5_LD_G_MASSETER_INSERTION"] != "D" &&
			res["E5_LD_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_MASSETER_BODY"] == "D" ||
			res["E5_LD_G_MASSETER_INSERTION"] == "D" ||
			res["E5_LD_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_MASSETER_BODY"] != "DH" &&
			res["E5_LD_G_MASSETER_INSERTION"] != "DH" &&
			res["E5_LD_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 1*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_MASSETER_BODY"] == "DH" ||
			res["E5_LD_G_MASSETER_INSERTION"] == "DH" ||
			res["E5_LD_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LD_G_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_TEMPORAL_ANTERIOR"] != "D" &&
			res["E5_LG_G_TEMPORAL_MIDDLE"] != "D" &&
			res["E5_LG_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_TEMPORAL_ANTERIOR"] == "D" ||
			res["E5_LG_G_TEMPORAL_MIDDLE"] == "D" ||
			res["E5_LG_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_TEMPORAL_ANTERIOR"] != "DH" &&
			res["E5_LG_G_TEMPORAL_MIDDLE"] != "DH" &&
			res["E5_LG_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_TEMPORAL_ANTERIOR"] == "DH" ||
			res["E5_LG_G_TEMPORAL_MIDDLE"] == "DH" ||
			res["E5_LG_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
			res["E5_LG_MT_G_TEMPORAL_MIDDLE"] != "true" &&
			res["E5_LG_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
			res["E5_LG_MT_G_TEMPORAL_MIDDLE"] == "true" ||
			res["E5_LG_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_MASSETER_BODY"] != "D" &&
			res["E5_LG_G_MASSETER_INSERTION"] != "D" &&
			res["E5_LG_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_MASSETER_BODY"] == "D" ||
			res["E5_LG_G_MASSETER_INSERTION"] == "D" ||
			res["E5_LG_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_MASSETER_BODY"] != "DH" &&
			res["E5_LG_G_MASSETER_INSERTION"] != "DH" &&
			res["E5_LG_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_MASSETER_BODY"] == "DH" ||
			res["E5_LG_G_MASSETER_INSERTION"] == "DH" ||
			res["E5_LG_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 8*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 9*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 10*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_LG_G_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_TEMPORAL_ANTERIOR"] != "D" &&
			res["E5_PI_G_TEMPORAL_MIDDLE"] != "D" &&
			res["E5_PI_G_TEMPORAL_POSTERIOR"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_TEMPORAL_ANTERIOR"] == "D" ||
			res["E5_PI_G_TEMPORAL_MIDDLE"] == "D" ||
			res["E5_PI_G_TEMPORAL_POSTERIOR"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_TEMPORAL_ANTERIOR"] != "DH" &&
			res["E5_PI_G_TEMPORAL_MIDDLE"] != "DH" &&
			res["E5_PI_G_TEMPORAL_POSTERIOR"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_TEMPORAL_ANTERIOR"] == "DH" ||
			res["E5_PI_G_TEMPORAL_MIDDLE"] == "DH" ||
			res["E5_PI_G_TEMPORAL_POSTERIOR"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_MT_G_TEMPORAL_ANTERIOR"] != "true" &&
			res["E5_PI_MT_G_TEMPORAL_MIDDLE"] != "true" &&
			res["E5_PI_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 12*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_MT_G_TEMPORAL_ANTERIOR"] == "true" ||
			res["E5_PI_MT_G_TEMPORAL_MIDDLE"] == "true" ||
			res["E5_PI_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 13*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_MASSETER_BODY"] != "D" &&
			res["E5_PI_G_MASSETER_INSERTION"] != "D" &&
			res["E5_PI_G_MASSETER_ORIGIN"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 13*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_MASSETER_BODY"] == "D" ||
			res["E5_PI_G_MASSETER_INSERTION"] == "D" ||
			res["E5_PI_G_MASSETER_ORIGIN"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 13*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_MASSETER_BODY"] != "DH" &&
			res["E5_PI_G_MASSETER_INSERTION"] != "DH" &&
			res["E5_PI_G_MASSETER_ORIGIN"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 13*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_MASSETER_BODY"] == "DH" ||
			res["E5_PI_G_MASSETER_INSERTION"] == "DH" ||
			res["E5_PI_G_MASSETER_ORIGIN"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 14*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_ATM"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 14*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_ATM"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 14*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_ATM"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 14*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_ATM"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 15*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_PTERIGOIDIENMEDIAL"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 15*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_PTERIGOIDIENMEDIAL"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 15*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_PTERIGOIDIENMEDIAL"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 15*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_PTERIGOIDIENMEDIAL"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x, y + 16*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_DIGASTRIQUEPOS"] != "D" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 16*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_DIGASTRIQUEPOS"] == "D" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + 16*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_DIGASTRIQUEPOS"] != "DH" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + 16*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E5_PI_G_DIGASTRIQUEPOS"] == "DH" ? '#228b22' : '#808080'
		})

		pdfDoc.endPage()
		pdfDoc.editPage(2)


		// 6 droite
		x = 102.25
		y = 100.25

		horizontal_offsets = 39.5
		vertical_offsets = 11.75

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_OUV_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_OUV_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_FERM_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_FERM_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_PAT_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_PAT_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 3*horizontal_offsets + 3, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_DOUL_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 3*horizontal_offsets + 3 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_DOUL_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 4*horizontal_offsets + 6, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 4*horizontal_offsets + 6 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
		})




		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_FERM_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_FERM_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_OUV_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_OUV_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_PAT_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_PAT_D"] == "Y" ? '#228b22' : '#808080'
		})

		// 6 gauche
		x = 380
		y = 100

		horizontal_offsets = 39.5
		vertical_offsets = 11.5

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_FERM_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_FERM_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_OUV_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_OUV_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_PAT_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_PAT_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 3*horizontal_offsets + 3, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_DOUL_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 3*horizontal_offsets + 3 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_DOUL_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 4*horizontal_offsets + 5.5, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 4*horizontal_offsets + 4.75 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CRAQ_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_FERM_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_FERM_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_OUV_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_OUV_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_PAT_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E6_CREP_PAT_G"] == "Y" ? '#228b22' : '#808080'
		})



		// 7 droite
		x = 102.25
		y = 179

		horizontal_offsets = 39.5
		vertical_offsets = 12

		pdfDoc.circle(x + 15, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_FERM_D"] != "Y" && res["E7_CRAQ_OUV_D"] != "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 15 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_FERM_D"] == "Y" || res["E7_CRAQ_OUV_D"] == "Y"  ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 30 + horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_PAT_D"] != "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 30 + horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_PAT_D"] == "Y"  ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 3.098*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_DOUL_D"] != "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 3.093*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_DOUL_D"] == "Y"  ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 4.2*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_DOUL_HAB_D"] != "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 4.18*horizontal_offsets+ yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_DOUL_HAB_D"] == "Y"  ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x + 15, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CREP_OUV_D"] != "Y" && res["E7_CREP_FERM_D"] != "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 15 + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CREP_OUV_D"] == "Y" ||  res["E7_CREP_FERM_D"] == "Y"  ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 30 + horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CREP_PAT_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 30 + horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CREP_PAT_D"] == "Y" ? '#228b22' : '#808080'
		})

		// 7 gauche
		x = 385
		y = 179

		horizontal_offsets = 39.5
		vertical_offsets = 12

		pdfDoc.circle(x + 15, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_FERM_G"] != "Y" && res["E7_CRAQ_OUV_G"] != "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 15 + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_FERM_G"] == "Y" || res["E7_CRAQ_OUV_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.55*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_PAT_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1.55*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_PAT_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.94*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_DOUL_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.96*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_DOUL_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 3.97*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 3.97*horizontal_offsets+ yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CRAQ_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x + 15, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CREP_OUV_G"] != "Y" && res["E7_CREP_FERM_G"] != "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 15 + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CREP_OUV_G"] == "Y" || res["E7_CREP_FERM_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.55*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CREP_PAT_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1.55*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E7_CREP_PAT_G"] == "Y" ? '#228b22' : '#808080'
		})



		// 8 droite
		x = 144.5
		y = 253.5

		horizontal_offsets = 41
		vertical_offsets = 11.5

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_BLOC_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_BLOC_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.08*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_PAT_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1.05*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_PAT_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_EXAM_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_EXAM_D"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_BLOC_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_BLOC_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.08*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_PAT_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1.05*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_PAT_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_EXAM_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_EXAM_D"] == "Y" ? '#228b22' : '#808080'
		})

		// 8 gauche
		x = 405
		y = 253.5

		horizontal_offsets = 41
		vertical_offsets = 11.5

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_BLOC_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_BLOC_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.08*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_PAT_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1.05*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_PAT_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.09*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_EXAM_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.03*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVRANT_EXAM_G"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_BLOC_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_BLOC_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.08*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_PAT_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1.05*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_PAT_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.09*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_EXAM_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.03*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E8_OUVERT_EXAM_G"] == "Y" ? '#228b22' : '#808080'
		})



		// 9 droite
		x = 144
		y = 334

		horizontal_offsets = 45
		vertical_offsets = 12.2

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("D") && !res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("D") || res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 0.95*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("DH") && !res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 0.94*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("DH") || res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_D_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_D_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("DR") && !res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("DR") || res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("D") && !res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("D") || res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 0.95*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("DH") && !res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 0.94*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("DH") || res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_D_TEMPORAL_MIDDLE"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_D_TEMPORAL_MIDDLE"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("DR") && !res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("DR") || res["E9_PALP_D_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("D") && !res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("D") || res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 0.95*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("DH") && !res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 0.94*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("DH") || res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_D_TEMPORAL_ANTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_D_TEMPORAL_ANTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("DR") && !res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("DR") || res["E9_PALP_D_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_ORIGIN"].includes("D") && !res["E9_PALP_D_MASSETER_ORIGIN"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_ORIGIN"].includes("D") || res["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 0.95*horizontal_offsets, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_ORIGIN"].includes("DH") && !res["E9_PALP_D_MASSETER_ORIGIN"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 0.94*horizontal_offsets + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_ORIGIN"].includes("DH") || res["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_ORIGIN"].includes("DR") && !res["E9_PALP_D_MASSETER_ORIGIN"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_ORIGIN"].includes("DR") || res["E9_PALP_D_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_BODY"].includes("D") && !res["E9_PALP_D_MASSETER_BODY"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_BODY"].includes("D") || res["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 0.95*horizontal_offsets, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_BODY"].includes("DH") && !res["E9_PALP_D_MASSETER_BODY"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 0.94*horizontal_offsets + yes, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_BODY"].includes("DH") || res["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_BODY"].includes("DR") && !res["E9_PALP_D_MASSETER_BODY"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_BODY"].includes("DR") || res["E9_PALP_D_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_INSERTION"].includes("D") && !res["E9_PALP_D_MASSETER_INSERTION"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_INSERTION"].includes("D") || res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 0.95*horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_INSERTION"].includes("DH") && !res["E9_PALP_D_MASSETER_INSERTION"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 0.94*horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_INSERTION"].includes("DH") || res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_D_MASSETER_INSERTION"].includes("DR") && !res["E9_PALP_D_MASSETER_INSERTION"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_D_MASSETER_INSERTION"].includes("DR") || res["E9_PALP_D_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x + 34, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_MTH_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + yes, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_MTH_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 34 + 1*horizontal_offsets, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_DH_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + 1*horizontal_offsets + yes, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_DH_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 34 + 2*horizontal_offsets, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_DOU_REF_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + 2*horizontal_offsets + yes, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_DOU_REF_D"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x + 34, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_MTH_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + yes, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_MTH_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 34 + 1*horizontal_offsets, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_DH_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + 1*horizontal_offsets + yes, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_DH_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 34 + 2*horizontal_offsets, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_DOU_REF_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + 2*horizontal_offsets + yes, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_DOU_REF_D"] == "Y" ? '#228b22' : '#808080'
		})


		// 9 gauche
		x = 408
		y = 334

		horizontal_offsets = 45
		vertical_offsets = 12.2

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("D") && !res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("D") || res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.02*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("DH") && !res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("DH") || res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.04*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_G_TEMPORAL_POSTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.04*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_G_TEMPORAL_POSTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("DR") && !res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("DR") || res["E9_PALP_G_TEMPORAL_POSTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("D") && !res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("D") || res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.02*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("DH") && !res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("DH") || res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.04*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_G_TEMPORAL_MIDDLE"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.04*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_G_TEMPORAL_MIDDLE"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("DR") && !res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("DR") || res["E9_PALP_G_TEMPORAL_MIDDLE"].includes("AP") ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("D") && !res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("D") || res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.02*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("DH") && !res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("DH") || res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.04*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_G_TEMPORAL_ANTERIOR"] != "true" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.04*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_MT_G_TEMPORAL_ANTERIOR"] == "true" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("DR") && !res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("DR") || res["E9_PALP_G_TEMPORAL_ANTERIOR"].includes("AP") ? '#228b22' : '#808080'
		})



		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_ORIGIN"].includes("D") && !res["E9_PALP_G_MASSETER_ORIGIN"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_ORIGIN"].includes("D") || res["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.02*horizontal_offsets, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_ORIGIN"].includes("DH") && !res["E9_PALP_G_MASSETER_ORIGIN"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_ORIGIN"].includes("DH") || res["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_ORIGIN"].includes("DR") && !res["E9_PALP_G_MASSETER_ORIGIN"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_ORIGIN"].includes("DR") || res["E9_PALP_G_MASSETER_ORIGIN"].includes("AP") ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_BODY"].includes("D") && !res["E9_PALP_G_MASSETER_BODY"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_BODY"].includes("D") || res["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.02*horizontal_offsets, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_BODY"].includes("DH") && !res["E9_PALP_G_MASSETER_BODY"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_BODY"].includes("DH") || res["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_BODY"].includes("DR") && !res["E9_PALP_G_MASSETER_BODY"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_BODY"].includes("DR") || res["E9_PALP_G_MASSETER_BODY"].includes("AP") ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_INSERTION"].includes("D") && !res["E9_PALP_G_MASSETER_INSERTION"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_INSERTION"].includes("D") || res["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1.02*horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_INSERTION"].includes("DH") && !res["E9_PALP_G_MASSETER_INSERTION"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_INSERTION"].includes("DH") || res["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2.95*horizontal_offsets, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: !res["E9_PALP_G_MASSETER_INSERTION"].includes("DR") && !res["E9_PALP_G_MASSETER_INSERTION"].includes("AP")? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2.95*horizontal_offsets + yes, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PALP_G_MASSETER_INSERTION"].includes("DR") || res["E9_PALP_G_MASSETER_INSERTION"].includes("AP") ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x + 34, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_MTH_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + yes, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_MTH_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 34 + 1*horizontal_offsets, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_DH_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + 1*horizontal_offsets + yes, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_DH_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 34 + 2*horizontal_offsets, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_DOU_REF_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + 2*horizontal_offsets + yes, y + 9.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_PL_DOU_REF_G"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x + 34, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_MTH_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + yes, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_MTH_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 34 + 1*horizontal_offsets, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_DH_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + 1*horizontal_offsets + yes, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_DH_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 34 + 2*horizontal_offsets, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_DOU_REF_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 34 + 2*horizontal_offsets + yes, y + 10.4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E9_AL_DOU_REF_G"] == "Y" ? '#228b22' : '#808080'
		})


		// 10 droite 

		x = 177
		y = 528

		horizontal_offsets = 46
		vertical_offsets = 12.2

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_REF_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_REF_D"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_REF_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_REF_D"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_REF_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_REF_D"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1*horizontal_offsets, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_HAB_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_HAB_D"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_REF_D"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_REF_D"] == "Y" ? '#228b22' : '#808080'
		})


		// 10 gauche 

		x = 442
		y = 528

		horizontal_offsets = 46
		vertical_offsets = 12.2

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_REF_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_MAND_DOUL_REF_G"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_REF_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_SOUS_DOUL_REF_G"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_REF_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_PTER_DOUL_REF_G"] == "Y" ? '#228b22' : '#808080'
		})


		pdfDoc.circle(x, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 1*horizontal_offsets, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_HAB_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 1*horizontal_offsets + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_HAB_G"] == "Y" ? '#228b22' : '#808080'
		})

		pdfDoc.circle(x + 2*horizontal_offsets, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_REF_G"] != "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x + 2*horizontal_offsets + yes, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E10_REG_TEND_DOUL_REF_G"] == "Y" ? '#228b22' : '#808080'
		})

		// 11 

		// Désordres douloureux
		x = 40.4
		y = 611.3

		vertical_offsets = 12.35

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_NO"] == "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E11_MY_D_D"] == "Y" ||
					res["E11_MY_M_D"] == "Y" ||
					res["E11_MY_P_D"] == "Y" ||
					res["E11_MY_T_D"] == "Y" ||
					res["E11_MY_D_G"] == "Y" ||
					res["E11_MY_M_G"] == "Y" ||
					res["E11_MY_P_G"] == "Y" ||
					res["E11_MY_T_G"] == "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: 	res["E11_MYO_D_D"] == "Y" ||
					res["E11_MYO_M_D"] == "Y" ||
					res["E11_MYO_P_D"] == "Y" ||
					res["E11_MYO_T_D"] == "Y" ||
					res["E11_MYO_D_G"] == "Y" ||
					res["E11_MYO_M_G"] == "Y" ||
					res["E11_MYO_P_G"] == "Y" ||
					res["E11_MYO_T_G"] == "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_AD"] == "Y"  ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_AG"] == "Y" ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_MATD"] == "Y" ? '#228b22' : '#808080'
		})

		// Désordres atm droite
		x = 179.6
		y = 611.3

		vertical_offsets = 12.5

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMD"] == undefined || res["E11_DATMD"].includes("Non") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMD"] != undefined && res["E11_DATMD"].includes("avec réduction") && !res["E11_DATMD"].includes("avec réduction et") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMD"] != undefined && res["E11_DATMD"].includes("avec réduction et blocage") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMD"] != undefined && res["E11_DATMD"].includes("sans réduction et avec ") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMD"] != undefined && res["E11_DATMD"].includes("sans réduction avec") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMD"] != undefined && res["E11_DATMD"].includes("Maladie") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMD"] != undefined && res["E11_DATMD"].includes("Sublux") ? '#228b22' : '#808080'
		})

		// Désordres atm gauche
		x = 393
		y = 611.3

		vertical_offsets = 12.5

		pdfDoc.circle(x, y, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMG"] == undefined || res["E11_DATMG"].includes("Non") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 2*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMG"] != undefined && res["E11_DATMG"].includes("avec réduction")  && !res["E11_DATMG"].includes("avec réduction et") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 3*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMG"] != undefined && res["E11_DATMG"].includes("avec réduction et blocage") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 4*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMG"] != undefined && res["E11_DATMG"].includes("sans réduction et avec") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 5*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMG"] != undefined && res["E11_DATMG"].includes("avec réduction avec") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 6*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMG"] != undefined && res["E11_DATMG"].includes("Maladie") ? '#228b22' : '#808080'
		})
		pdfDoc.circle(x, y + 7*vertical_offsets, 6, { stroke: '#000000', lineWidth: .01,
			fill: res["E11_DATMG"] != undefined && res["E11_DATMG"].includes("Sublux") ? '#228b22' : '#808080'
		})








		/*pdfDoc
		.moveTo(200, 600)
			.lineTo('center', 650)
			.lineTo(412, 600)

		.moveTo("right", "bottom");
		*/


		pdfDoc

		.endPage()
		.endPDF()


		
	}
}
