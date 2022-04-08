const fs = require('fs')
const HummusRecipe = require('hummus-recipe')

import {res, ExamResultInterface} from './exam-result'
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");

export class dc {
	public dc(res) {
		if (!fs.existsSync("/root/temp")){
			fs.mkdirSync("/root/temp");
		}

		const pdfDoc = new HummusRecipe('/root/questionnaires/DC_fr.pdf', '/root/temp/DC.pdf')
		pdfDoc.editPage(1)

		// TEXT


		// 1. 
		pdfDoc.text(res["DC1"], 467, 62, {fontSize: 14})


		// 2
		let y = 171
		let x = 124
		let offset = 37.2

		pdfDoc.circle(x + +res["DC2"]*offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 3
		y = 263
		offset = 37.2

		pdfDoc.circle(x + +res["DC3"]*offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 4
		y = 366
		offset = 37.2

		pdfDoc.circle(x + +res["DC4"]*offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 5
		pdfDoc.text(res["DC5"], 461, 414, {fontSize: 14})



		// 6
		y = 517
		offset = 37.2

		pdfDoc.circle(x + +res["DC6"]*offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 7
		y = 611
		offset = 37.2

		pdfDoc.circle(x + +res["DC7"]*offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 8
		y = 705
		offset = 37.2

		pdfDoc.circle(x + +res["DC8"]*offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		pdfDoc

		.endPage()
		.endPDF()
	}
}	
