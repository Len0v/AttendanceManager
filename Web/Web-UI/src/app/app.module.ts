import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TreeModule, SharedModule, ButtonModule, DataTableModule, DropdownModule, SliderModule, InputTextModule} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';
import {LoginPageComponent} from './login-page/login-page.component';

import {routing} from './app.routes';
import {MainComponent} from './main/main.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UserListComponent} from './user-list/user-list.component';
import {EventsComponent} from './events/events.component';
import {EventsTreeviewComponent} from './events/events-treeview/events-treeview.component';
import {EventsListComponent} from './events/events-list/events-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavMenuComponent,
    LoginPageComponent,
    MainComponent,
    NavbarComponent,
    UserListComponent,
    EventsComponent,
    EventsTreeviewComponent,
    EventsListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    FlexLayoutModule,
    BrowserAnimationsModule,
    TreeModule,
    SharedModule,
    ButtonModule,
    DataTableModule,
    DropdownModule,
    SliderModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
