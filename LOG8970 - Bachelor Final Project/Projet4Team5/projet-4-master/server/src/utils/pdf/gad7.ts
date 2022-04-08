const fs = require('fs')
const HummusRecipe = require('hummus-recipe')
import {res, ExamResultInterface } from './exam-result'


export class gad7 {
	public gad7(res) {
		if (!fs.existsSync("/root/temp")){
			fs.mkdirSync("/root/temp");
		}
		//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");

		const pdfDoc = new HummusRecipe('/root/questionnaires/GAD7_fr.pdf', '/root/temp/GAD7.pdf')
		pdfDoc.editPage(1)

		// TEXT




		// 1
		let y = 292.5
		let x = 336.6
		let offset = res["GAD1"] * 56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 2
		y = 326
		offset = res["GAD1"] * 56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 3
		y = 361
		offset = res["GAD2"] * 56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 4
		y = 391.3
		offset = res["GAD3"] * 56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})



		// 5
		y = 422.2
		offset = res["GAD4"] * 56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 6
		y = 456.3
		offset = res["GAD5"] * 56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 7
		y = 486.6
		offset = res["GAD6"] * 56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})
		
		// 8
		x = 147.8
		y = 655
		offset = res["GAD7"] * 104.06

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		pdfDoc

		.endPage()
		.endPDF()
	}
}
