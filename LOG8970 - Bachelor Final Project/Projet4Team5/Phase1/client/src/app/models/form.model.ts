import Entity from "./abstract-entity.model";

export default class Form extends Entity {
    public constructor(private title: string, id: string, private category: string, private template: any) {
        super(id);
    }

    public get Title(): string {
        return this.title;
    }

    public get Category(): string {
        return this.category;
    }

    public get Template(): any {
        return this.template;
    }
}
