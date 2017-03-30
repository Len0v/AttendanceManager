import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/Material'

import '../../node_modules/@angular/material/core/theming/prebuilt/deeppurple-amber.css';

import { AppComponent } from './app.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
