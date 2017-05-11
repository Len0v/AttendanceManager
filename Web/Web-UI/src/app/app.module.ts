import * as jQuery from 'jquery';
import 'moment';
import 'fullcalendar';
(window as any).jQuery = (window as any).$ = jQuery;

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MomentModule} from 'angular2-moment';
import {MdDialog, MdDialogRef} from '@angular/material';

import {AppComponent} from './app.component';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';
import {LoginPageComponent} from './login-page/login-page.component';

import {routing} from './app.routes';
import {MainComponent} from './main/main.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UserListComponent} from './user-list/user-list.component';
import {EventsComponent} from './events/events.component';
import {EventsListComponent} from './events/events-list/events-list.component';
import {EventsExpiredListComponent} from './events/events-expired-list/events-expired-list.component';
import {EventDetailsComponent} from './events/event-details/event-details.component';
import {EventRemoveDialog} from './events/remove-event-dialog/event-remove-dialog.component';

import {EventsService} from './events/events-services/events.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavMenuComponent,
    LoginPageComponent,
    MainComponent,
    NavbarComponent,
    UserListComponent,
    EventsComponent,
    EventsListComponent,
    EventsExpiredListComponent,
    EventDetailsComponent,
    EventRemoveDialog
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    FlexLayoutModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    MomentModule
  ],
  entryComponents: [
    EventRemoveDialog
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
