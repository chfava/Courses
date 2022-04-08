const fs = require('fs')
const HummusRecipe = require('hummus-recipe')

import {ExamResultInterface } from './exam-result'
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");

export class ess {
	public ess(res) {
		if (!fs.existsSync("/root/temp")){
			fs.mkdirSync("/root/temp");
		}
		const pdfDoc = new HummusRecipe('/root/questionnaires/ESS.pdf', '/root/temp/ESS.pdf')

		pdfDoc.editPage(1)



		// 1
		let y = 426
		let x = 439

		pdfDoc.text(res["ESS1"], x, y)

		// 2
		y += 26

		pdfDoc.text(res["ESS2"], x, y)

		// 3
		y += 26

		pdfDoc.text(res["ESS3"], x, y)

		// 4
		y += 26

		pdfDoc.text(res["ESS4"], x, y)

		// 5
		y += 26

		pdfDoc.text(res["ESS5"], x, y)

		// 6
		y += 26

		pdfDoc.text(res["ESS6"], x, y)

		// 7
		y += 26

		pdfDoc.text(res["ESS7"], x, y)


		// 8
		y += 26

		pdfDoc.text(res["ESS8"], x, y)

		pdfDoc

		.endPage()
		.endPDF()
	}
}
