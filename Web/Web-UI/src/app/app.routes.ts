/**
 * Created by Krzysztof Adamczak on 30.03.2017.
 */
import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {MainComponent} from './main/main.component';
import {UserListComponent} from './user-list/user-list.component';
import {EventsComponent} from './events/events.component';
import {CyclicalEventsComponent} from './events/event-details/cyclical-events/cyclical-events.component';
import {EventTemplateEditComponent} from "./events/event-details/edit-event-template/edit-event-template.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'students', component: UserListComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/details/cyclical/:id', component: CyclicalEventsComponent},
  {path: 'events/details/template/:id', component: EventTemplateEditComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
