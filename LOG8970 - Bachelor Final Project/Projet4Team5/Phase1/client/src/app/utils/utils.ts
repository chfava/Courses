import { KeyValue } from "@angular/common";

export function orderedFormQuestionsByKeyAsc(a: KeyValue<string, Object>, b: KeyValue<string, Object>): number {
    const aKey = parseInt(a.key, 10);
    const bKey = parseInt(b.key, 10);

    if (isNaN(aKey) || isNaN(bKey)) {
        return a.key < b.key ? -1 : b.key < a.key ? 1 : 0;
    } else {
        return aKey < bKey ? -1 : bKey < aKey ? 1 : 0;
    }
}

export function mapToObject(map: Map<any, any>): Object {
    let obj = {};
    for (const [key, value] of Array.from(map.entries())) {
        if (value instanceof Map) {
            obj[key] = mapToObject(value);
        } else {
            obj[key] = value;
        }
    }

    return obj;
}

export function objectToMap(obj: Object): Map<any, any> {
    let map = new Map();

    for (let key of Object.keys(obj)) {
        if (obj[key] instanceof Object && !(obj[key] instanceof Array)) {
            map.set(key, objectToMap(obj[key]));
        } else {
            map.set(key, obj[key]);
        }
    }
    return map;
}

export function parseQuestionId(fullId: string): string[] {
    return fullId.split("/");
}

export const frenchMonthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
];

export function dateToHtmlString(date: Date): string {
    let dateDay = date.getDate() + "";
    dateDay += date.getDate() === 1 ? "<sup>er</sup>" : "";
    const month = frenchMonthNames[date.getMonth()].toLowerCase();
    const year = date.getFullYear();

    return dateDay + " " + month + " " + year;
}
