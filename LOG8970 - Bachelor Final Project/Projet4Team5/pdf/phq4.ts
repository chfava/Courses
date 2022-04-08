const fs = require('fs')
const HummusRecipe = require('hummus-recipe')
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");
import { ExamResultInterface } from "./exam-result"

export class phq4 {
	public phq4(res: ExamResultInterface) {
		if (!fs.existsSync("/root/temp")){
			fs.mkdirSync("/root/temp");
		}

		const pdfDoc = new HummusRecipe('./questionnaires/PHQ4_fr.pdf', '/root/temp/PHQ4.pdf')
		pdfDoc.editPage(1)

		// TEXT




		// 1
		let y = 292
		let x = 336.5
		let offset = res["questions"]["PHQ41"]*56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 2
		y = 326.5
		offset = res["questions"]["PHQ42"]*56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 3
		y = 361.5
		offset = res["questions"]["PHQ43"]*56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 4
		y = 396 
		offset = res["questions"]["PHQ44"]*56.9

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})




		// 10
		x = 147.5
		y = 561.5
		offset = res["questions"]["PHQ45"]*104.5

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		pdfDoc

		.endPage()
		.endPDF()
	}
}

//console.log(pdfReader.getPagesCount())