/**
 * Created by Krzysztof Adamczak on 30.03.2017.
 */
import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {MainComponent} from './main/main.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginPageComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
