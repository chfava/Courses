import { Injectable } from "@angular/core";
import Clinic from "../models/clinic.model";
import Form from "../models/form.model";
import MedicalExamAnswers from "../models/medical-exam-answers.model";
import MedicalExam from "../models/medical-exam.model";
import Patient from "../models/patient.model";
import Practician from "../models/practician.model";
import { EntityDataContainer } from "../models/entity-data-container.model";

@Injectable({
    providedIn: "root"
})
export class DataService {
    public patientsContainer: EntityDataContainer<Patient> = new EntityDataContainer();
    public practiciansContainer: EntityDataContainer<Practician> = new EntityDataContainer();
    public medicalExamsContainer: EntityDataContainer<MedicalExam> = new EntityDataContainer();
    public clinicsContainer: EntityDataContainer<Clinic> = new EntityDataContainer();
    public formsTemplateContainer: EntityDataContainer<Form> = new EntityDataContainer();
    public medicalExamsAnswersContainer: EntityDataContainer<MedicalExamAnswers> = new EntityDataContainer();

    public reset() {
        this.patientsContainer.reset();
        this.practiciansContainer.reset();
        this.medicalExamsContainer.reset();
        this.clinicsContainer.reset();
        this.formsTemplateContainer.reset();
        this.medicalExamsAnswersContainer.reset();
    }
}
