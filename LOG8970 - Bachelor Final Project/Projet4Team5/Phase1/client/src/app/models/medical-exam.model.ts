import { IMedicalExam } from "../utils/requests-interfaces";
import Entity from "./abstract-entity.model";

export default class MedicalExam extends Entity {
    public constructor(id: string, private patientId: string, private practicianId: string, private dateCreated: Date) {
        super(id);
    }

    public static fromDto(medicalExamDto: IMedicalExam): MedicalExam {
        return new MedicalExam(
            medicalExamDto._id,
            medicalExamDto.patient,
            medicalExamDto.practician,
            medicalExamDto.dateCreated ? new Date(medicalExamDto.dateCreated) : new Date(0)
        );
    }

    private isCreatedToday(): boolean {
        return this.dateCreated.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    }

    public get PatientId(): string {
        return this.patientId;
    }

    public get PracticianId(): string {
        return this.practicianId;
    }

    public get DateCreated(): Date {
        return this.dateCreated;
    }

    public get isActive(): boolean {
        return this.isCreatedToday();
    }
}
