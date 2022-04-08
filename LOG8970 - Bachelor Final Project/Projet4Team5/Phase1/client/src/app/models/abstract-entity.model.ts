export default abstract class Entity {
    protected constructor(protected id: string) {}

    public get Id(): string {
        return this.id;
    }
}
