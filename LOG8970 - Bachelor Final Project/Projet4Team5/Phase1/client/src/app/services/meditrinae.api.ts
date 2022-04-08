import { environment } from "../../environments/environment";

export abstract class MeditrinaeApi {
    private readonly API_URL = environment.meditrinaeApiUrl;
    private readonly path: string;

    protected constructor(path: string) {
        this.path = path;
    }

    protected url(route = ""): string {
        return `${this.API_URL}/${this.path}/${route}`;
    }
}
