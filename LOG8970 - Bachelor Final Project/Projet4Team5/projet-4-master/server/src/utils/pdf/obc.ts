const fs = require('fs')
const HummusRecipe = require('hummus-recipe')
import { ExamResultInterface } from './exam-result'

const ASSIGNATIONS = {
	"Jamais": 0,
	"1 Nuit/mois": 1,
	"1-3 Nuit/mois": 2,
	"1-3 Nuit/semaine": 3,
	"4-7 Nuit/semaine": 4,
	"Un peu de temps": 1,
	"Une partie du temps": 2,
	"La pluspart du temps": 3,
	"Tout le temps": 4
	

}

export class obc {
	public obc(res) {
		if (!fs.existsSync("/root/temp")){
			fs.mkdirSync("/root/temp");
		}
		const pdfDoc = new HummusRecipe('/root/questionnaires/OBC_fr.pdf', '/root/temp/OBC.pdf')
		//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");

		pdfDoc.editPage(1)

		// TEXT




		// 1
		let y = 112
		let x = 352
		let offset = ASSIGNATIONS[res["OBC1"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 2
		y = 146
		offset = ASSIGNATIONS[res["OBC2"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 3
		y = 205
		offset = ASSIGNATIONS[res["OBC3"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 4
		y = 230
		offset = ASSIGNATIONS[res["OBC4"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 5
		y = 264
		offset = ASSIGNATIONS[res["OBC5"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 6
		y = 302
		offset = ASSIGNATIONS[res["OBC6"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 7
		y = 330.6
		offset = ASSIGNATIONS[res["OBC7"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 8
		y = 356
		offset = ASSIGNATIONS[res["OBC8"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 9
		y = 381.2
		offset = ASSIGNATIONS[res["OBC9"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 10
		y = 406
		offset = ASSIGNATIONS[res["OBC10"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 11
		y = 434.8
		offset = ASSIGNATIONS[res["OBC11"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 12
		y = 466.4
		offset = ASSIGNATIONS[res["OBC12"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 13
		y = 492.8
		offset = ASSIGNATIONS[res["OBC13"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 14
		y = 524.4
		offset = ASSIGNATIONS[res["OBC14"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 15
		y = 560
		offset = ASSIGNATIONS[res["OBC15"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 16
		y = 585
		offset = ASSIGNATIONS[res["OBC16"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 17
		y = 611.4
		offset = ASSIGNATIONS[res["OBC17"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 18
		y = 642.4
		offset = ASSIGNATIONS[res["OBC18"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 19
		y = 670.4
		offset = ASSIGNATIONS[res["OBC19"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})

		// 20
		y = 695.5
		offset = ASSIGNATIONS[res["OBC20"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})


		// 21
		y = 721
		offset = ASSIGNATIONS[res["OBC21"]]*51.15

		pdfDoc.circle(x + offset, y, 5, { stroke: '#000000', lineWidth: .01,
			fill: true ? '#228b22' : '#8b0000'
		})




		pdfDoc

		.endPage()
		.endPDF()


	
		
	}
}