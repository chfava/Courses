import { Injector } from "@angular/core";

export class AppInjectorService {
    private static injector: Injector;

    public static get Injector(): Injector {
        return AppInjectorService.injector;
    }

    public static set Injector(injector: Injector) {
        AppInjectorService.injector = injector;
    }
}
