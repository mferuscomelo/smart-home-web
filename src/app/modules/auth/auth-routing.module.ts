import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import {
  canActivate,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        ...canActivate(redirectLoggedInToDashboard),
      },
      {
        path: 'register',
        component: RegisterComponent,
        ...canActivate(redirectLoggedInToDashboard),
      },
      {
        path: 'account',
        component: AccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
