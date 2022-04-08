import Employee from "./employee.model";
import { IPractician } from "../utils/requests-interfaces";

export default class Practician extends Employee {
    public constructor(id: string, firstName: string, lastName: string, clinic: string, user: string, private phone: string) {
        super(id, firstName, lastName, clinic, user);
    }

    public get Phone(): string {
        return this.phone;
    }

    public set Phone(phone: string) {
        this.phone = phone;
    }

    public static fromDto(dto: IPractician): Practician {
        return new Practician(dto._id, dto.firstName, dto.lastName, dto.clinic, dto.user, dto.phone);
    }
}
