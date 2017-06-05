import * as jQuery from 'jquery';
import 'moment';
import 'fullcalendar';
(window as any).jQuery = (window as any).$ = jQuery;

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {MdInputModule, MdCheckboxModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NguiDatetimePickerModule} from '@ngui/datetime-picker';
import {FormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MomentModule} from 'angular2-moment';
import {CoolStorageModule} from 'angular2-cool-storage';

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
import {EventRemoveDialog} from './events/remove-event-dialog/event-remove-dialog.component';

import {EventsService} from './events/events-services/events.service';
import {StorageService} from './storage.service';

import {CyclicalEventsComponent} from './events/event-details/cyclical-events/cyclical-events.component';
import {EventDetailsEditDialogComponent} from './events/event-details-edit-dialog/event-details-edit-dialog.component';
import {EventTemplateEditComponent} from "./events/event-details/edit-event-template/edit-event-template.component";
import {AddUserModalWindowComponent} from "./events/event-details/edit-event-template/add-user-modal/add-user-modal-window.component";
import { ExpiredEventDetailsComponent } from './events/event-details/expired-event-details/expired-event-details.component';
import { AddEventComponent } from './events/add-event/add-event.component';

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
    EventRemoveDialog,
    CyclicalEventsComponent,
    EventDetailsEditDialogComponent,
    EventTemplateEditComponent,
    AddUserModalWindowComponent,
    ExpiredEventDetailsComponent,
    AddEventComponent
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
    MomentModule,
    CoolStorageModule,
    MdInputModule,
    MdCheckboxModule,
    NguiDatetimePickerModule,
    FormsModule
  ],
  entryComponents: [
    EventRemoveDialog,
    EventDetailsEditDialogComponent,
    AddUserModalWindowComponent
  ],
  providers: [EventsService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
