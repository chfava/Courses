import { Router } from "@angular/router";
import { AppInjectorService } from "../services/app-injector.service";

export abstract class BackButtonPage {
    public backHref: string;
    public router: Router;

    protected constructor() {
        this.router = AppInjectorService.Injector.get(Router);
        this.setBackButtonUrl(1);
    }

    public get url(): string {
        const urlTree = this.router.parseUrl(this.router.url);
        return urlTree.root.children["primary"].segments.map(it => it.path).join("/");
    }

    protected setBackButtonUrl(segmentsToRemoveCount: number) {
        let segments = this.url.split("/");

        for (let i = 0; i < segmentsToRemoveCount && segments.length > 0; i++) {
            segments.pop();
        }

        this.backHref = segments.join("/");
    }

    protected registerPathParams(params: [string, any][]) {
        if (params && params.length > 0) {
            this.backHref += ";";
            for (let param of params) {
                this.backHref += param[0] + "=" + param[1];
                if (params.length > 1 && param[0] === params[params.length - 2][0]) {
                    this.backHref += "&";
                }
            }
        }
    }
}
