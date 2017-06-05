/**
 * Created by Krzysztof Adamczak on 30.03.2017.
 */
import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {MainComponent} from './main/main.component';
import {UserListComponent} from './user-list/user-list.component';
import {EventsComponent} from './events/events.component';
import {ExpiredEventDetailsComponent} from './events/event-details/expired-event-details/expired-event-details.component';
import {EventTemplateEditComponent} from "./events/event-details/edit-event-template/edit-event-template.component";
import {AddEventComponent} from "./events/add-event/add-event.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'students', component: UserListComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/details/expired/:id', component: ExpiredEventDetailsComponent},
  {path: 'events/details/:id', component: EventTemplateEditComponent},
  {path: 'events/addEvent', component: AddEventComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
