const fs = require('fs')
const HummusRecipe = require('hummus-recipe')

import {ExamResultInterface } from './exam-result'
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");

export class jlfs8 {
	public jlfs8(res: ExamResultInterface) {
		if (!fs.existsSync("/root/temp")){
			fs.mkdirSync("/root/temp");
		}
		const pdfDoc = new HummusRecipe('./questionnaires/JLFS8_fr.pdf', '/root/temp/JLFS8.pdf')

		pdfDoc.editPage(1)

		// TEXT




		// 1
		let y = 161.5
		let x = 269.5
		let offset = res["questions"]["FM81"]*28.65

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 2
		y = 186.5
		offset = res["questions"]["FM82"]*28.65

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 3
		y = 212.5
		offset = res["questions"]["FM83"]*28.65

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 4
		y = 272.5
		offset = res["questions"]["FM84"]*28.65

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 5
		y = 310
		offset = res["questions"]["FM85"]*28.65

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 6
		y = 336
		offset = res["questions"]["FM86"]*28.65

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 7
		y = 362
		offset = res["questions"]["FM87"]*28.65

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 8
		y = 388
		offset = res["questions"]["FM88"]*28.65

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})



		pdfDoc

		.endPage()
		.endPDF()
	}
}

//console.log(pdfReader.getPagesCount())