import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/Material';
import { FlexLayoutModule } from "@angular/flex-layout";

import '../../node_modules/@angular/material/core/theming/prebuilt/deeppurple-amber.css';

import { AppComponent } from './app.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { routing } from './app.routes';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavMenuComponent,
    LoginPageComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
