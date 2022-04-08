import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/pages/root/app.module";
import { AppInjectorService } from "./app/services/app-injector.service";
import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(moduleRef => {
        AppInjectorService.Injector = moduleRef.injector;
    })
    .catch(err => console.log(err));
