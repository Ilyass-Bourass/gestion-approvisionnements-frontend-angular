import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login';
import {MainLayoutComponent} from './layout/main-layout/main-layout';
import {DashboardComponent} from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];
