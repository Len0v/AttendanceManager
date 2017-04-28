/**
 * Created by Krzysztof Adamczak on 30.03.2017.
 */
import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {MainComponent} from './main/main.component';
import {UserListComponent} from './user-list/user-list.component';
import {EventsComponent} from './events/events.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'students', component: UserListComponent},
  {path: 'events', component: EventsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
