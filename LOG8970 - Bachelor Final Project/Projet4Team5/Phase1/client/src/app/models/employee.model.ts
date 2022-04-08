import Entity from "./abstract-entity.model";
import { IEmployee } from "../utils/requests-interfaces";

export default abstract class Employee extends Entity {
    public constructor(id: string, private firstName: string, private lastName: string, private clinic: string, private user: string) {
        super(id);
    }

    public get FirstName(): string {
        return this.firstName;
    }

    public set FirstName(firstName: string) {
        this.firstName = firstName;
    }

    public get LastName(): string {
        return this.lastName;
    }

    public set LastName(lastName: string) {
        this.lastName = lastName;
    }

    public get Name(): string {
        return this.firstName + " " + this.lastName;
    }

    public get Clinic(): string {
        return this.clinic;
    }

    public set Clinic(clinic: string) {
        this.clinic = clinic;
    }

    public get User(): string {
        return this.user;
    }

    public static fromDto(employee: IEmployee): Employee {
        throw new Error("Not implemented!");
    }
}

export enum EmployeeType {
    Practician = "practician",
    Secretary = "secretary",
    Admin = "admin",
    SuperAdmin = "super-admin"
}
