import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login';
import {MainLayoutComponent} from './layout/main-layout/main-layout';
import {DashboardComponent} from './pages/dashboard/dashboard';
import {ProductsComponent} from './pages/products/products';
import {ProductForm} from './pages/products/product-form/product-form';
import {ProductDetails} from './pages/products/product-details/product-details';
import {RegisterComponent} from './pages/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path : 'register' ,component : RegisterComponent},
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/form', component: ProductForm },
      { path: 'products/details/:id', component: ProductDetails }
    ]
  }
];
