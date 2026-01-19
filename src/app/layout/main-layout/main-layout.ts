import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar';
import {TopbarComponent} from '../topbar/topbar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {}
