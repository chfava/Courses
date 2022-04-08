import Employee from "./employee.model";
import { IAdmin } from "../utils/requests-interfaces";

export default class Admin extends Employee {
    public constructor(id: string, firstName: string, lastName: string, clinic: string, user: string) {
        super(id, firstName, lastName, clinic, user);
    }

    public static fromDto(dto: IAdmin): Admin {
        return new Admin(dto._id, dto.firstName, dto.lastName, dto.clinic, dto.user);
    }
}
