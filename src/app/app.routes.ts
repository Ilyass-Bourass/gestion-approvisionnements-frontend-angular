import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import {LoginComponent} from './pages/login/login';
import {Home} from './pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  {path : 'home' ,component : Home}
];
