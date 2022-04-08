const fs = require('fs')
const HummusRecipe = require('hummus-recipe')

import {res, ExamResultInterface} from './exam-result'
import { PatientInterface } from 'src/modules/patient/patient.interface';
//let pdfReader = hummus.createReader("./questionnaires/FDI_fr.pdf");

export class info {
	public info(patient: PatientInterface) {
		if (!fs.existsSync("/root/temp")){
			fs.mkdirSync("/root/temp");
		}
		if (fs.existsSync("/root/temp/info-patient.pdf")){
			fs.unlinkSync("/root/temp/info-patient.pdf");
		}

		const pdfDoc = new HummusRecipe("new", '/root/temp/info-patient.pdf')
		
		pdfDoc.createPage('letter-size')
		pdfDoc.text("Informations du patient", "center", 25, {
			size: 25,
			underline: {
				color:"#000000"
			},
			align: "center top",
			color: "#000000",
			font: "Times New Roman"
		})
		
		const x_label = 30
		const x_data = 240
		const y = 100

		const y_offset = 20

		pdfDoc.text("Prénom : ", x_label, y+0*y_offset, { color: "#000000", size: 12}).text(patient.firstName != undefined && patient.firstName != ""? patient.firstName : "aucune donnée", x_data, y+0*y_offset, { color: "#000000", size: 12})
		pdfDoc.text("Nom : ", x_label, y+1*y_offset, { color: "#000000", size: 12}).text(patient.lastName != undefined && patient.lastName != "" ? patient.lastName: "aucune donnée", x_data, y+1*y_offset, { color: "#000000", size: 12})
		pdfDoc.text("Adresse : ", x_label, y+2*y_offset, { color: "#000000", size: 12}).text(((patient.address != undefined) && (patient.address != "__") && (patient.address != "")) ? patient.address : "aucune donnée", x_data, y+2*y_offset, { color: "#000000", size: 12})
		pdfDoc.text("Courriel : ", x_label, y+3*y_offset, { color: "#000000", size: 12}).text(patient.email != undefined && patient.email != ""? patient.email : "aucune donnée", x_data, y+3*y_offset, { color: "#000000", size: 12})
		pdfDoc.text("Date de naissance : ", x_label, y+4*y_offset, { color: "#000000", size: 12}).text(patient.dateOfBirth != undefined ? patient.dateOfBirth.toLocaleString() : "aucune donnée", x_data, y+4*y_offset, { color: "#000000", size: 12})
		pdfDoc.text("Genre : ", x_label, y+5*y_offset, { color: "#000000", size: 12}).text(patient.gender != undefined && patient.gender != ""? patient.gender : "aucune donnée", x_data, y+5*y_offset, { color: "#000000", size: 12})
		pdfDoc.text("Date de création du dossier : ", x_label, y+7*y_offset, { color: "#000000", size: 12}).text(patient["dateCreated"] != undefined ? patient["dateCreated"].toLocaleString() : "aucune donnée", x_data, y+7*y_offset, { color: "#000000", size: 12})
		pdfDoc.text("Date de modification du dossier : ", x_label, y+8*y_offset, { color: "#000000", size: 12}).text(patient["dateModified"] != undefined ? patient["dateModified"].toLocaleString() : "aucune donnée", x_data, y+8*y_offset, { color: "#000000", size: 12})
		
		let i = 0
		if (!(patient["notes"] == null)) {
			for (let keys of Object.keys(patient["notes"])) {
				i++
				pdfDoc.text("Note ("+keys.toLocaleString()+") : " + patient["notes"][keys], x_label + 5, y+(10+i)*y_offset, { color: "#000000", size: 12})
			}
		}
		if (!(patient["diagnostic"] == null)) {
			for (let keys of Object.keys(patient["diagnostic"])) {
				i++
				pdfDoc.text("Diagnostic "+keys+" : " + patient["diagnostic"][keys], x_label + 5, y+(11+i)*y_offset, { color: "#000000", size: 12})
			}
		}
		if (!(patient["treatment"] == null)) {
			for (let keys of Object.keys(patient["diagnostic"])) {
				i++
				pdfDoc.text("Treatment "+keys+" : " + patient["treatment"][keys], x_label + 5, y+(12+i)*y_offset, { color: "#000000", size: 12})
			}
		}

		pdfDoc

		.endPage()
		.endPDF()
	}
}	
