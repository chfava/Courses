import { Injectable } from "@angular/core";
import Entity from "./abstract-entity.model";

@Injectable({
    providedIn: "root"
})
export class EntityDataContainer<T extends Entity> {
    private map: Map<string, T> = new Map();

    public get Map(): ReadonlyMap<string, T> {
        return this.map;
    }

    public hasElementWithId(id: string): boolean {
        return this.map.has(id);
    }

    public elementWithId(id: string): T {
        if (this.map.has(id)) {
            return this.map.get(id);
        }
        return null;
    }

    public register(element: T) {
        this.map.set(element.Id, element);
    }

    public remove(element: T) {
        if (this.map.has(element.Id)) {
            this.map.delete(element.Id);
        }
    }

    public reset() {
        this.map.clear();
    }

    public toArray(): T[] {
        return Array.from(this.map.values());
    }
}
