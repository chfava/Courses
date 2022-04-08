import { IPatient } from "../utils/requests-interfaces";
import Entity from "./abstract-entity.model";

export default class Patient extends Entity {
    public constructor(
        id: string,
        private firstName: string,
        private lastName: string,
        private email: string,
        private dateOfBirth: Date,
        private dateCreated: Date,
        private gender: string,
        private notes: string,
        private address: string,
        private clinic: string
    ) {
        super(id);
    }

    public static fromDto(dto: IPatient): Patient {
        return new Patient(
            dto._id,
            dto.firstName,
            dto.lastName,
            dto.email,
            new Date(dto.dateOfBirth),
            dto.dateCreated,
            dto.gender,
            dto.note,
            dto.address,
            dto.clinic
        );
    }

    public get FirstName(): string {
        return this.firstName;
    }

    public get LastName(): string {
        return this.lastName;
    }

    public get Name(): string {
        return this.firstName + " " + this.lastName;
    }

    public get Email(): string {
        return this.email;
    }

    public get DateOfBirth(): Date {
        return this.dateOfBirth;
    }

    public get DateCreated(): Date {
        return this.dateCreated;
    }

    public get Gender(): string {
        return this.gender;
    }

    public get Notes(): string {
        return this.notes;
    }

    public get Address(): string {
        return this.address;
    }

    public get Clinic(): string {
        return this.clinic;
    }

    public static calculateAge(dateOfBirth: Date): string {
        if (dateOfBirth) {
            let timeDiff = Math.abs(Date.now() - dateOfBirth.getTime());
            return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25).toString();
        }

        return "-";
    }
}
