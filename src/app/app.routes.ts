import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import {Login} from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: Login}
];
