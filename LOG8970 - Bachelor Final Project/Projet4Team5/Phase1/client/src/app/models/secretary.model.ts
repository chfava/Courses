import Employee from "./employee.model";
import { ISecretary } from "../utils/requests-interfaces";

export default class Secretary extends Employee {
    public constructor(id: string, firstName: string, lastName: string, clinic: string, user: string) {
        super(id, firstName, lastName, clinic, user);
    }

    public static fromDto(dto: ISecretary): Secretary {
        return new Secretary(dto._id, dto.firstName, dto.lastName, dto.clinic, dto.user);
    }
}
