/**
 * app.module.ts - Module de base de l'application.
 * 
 * @authors Mathieu KABORÉ
 * @date 2017/01/16
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent} from './menu.component'
// À compléter si nécessaire ...

@NgModule({
  imports: [
    BrowserModule,
    HttpModule],

  declarations: [
    AppComponent,
    MenuComponent,
     // À compléter si nécessaire ...
  ],
  exports: [AppComponent, MenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
