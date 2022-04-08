import Entity from "./abstract-entity.model";
import { IClinic } from "../utils/requests-interfaces";

export default class Clinic extends Entity {
    public constructor(id: string, private address: string, private email: string, private name: string, private phone: string) {
        super(id);
    }

    public get Address(): string {
        return this.address;
    }

    public get Email(): string {
        return this.email;
    }

    public get Name(): string {
        return this.name;
    }

    public get Phone(): string {
        return this.phone;
    }

    public static fromDto(dto: IClinic): Clinic {
        return new Clinic(dto._id, dto.address, dto.email, dto.name, dto.phone);
    }
}
