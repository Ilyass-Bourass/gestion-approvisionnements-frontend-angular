import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  authService = inject(AuthService);

  userEmail: string = '';
  userRole: string = '';
  permissions: string[] = [];

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userEmail = user?.email || 'Inconnu';
    this.userRole = user?.role || 'Aucun';
    this.permissions = this.authService.getPermissions();
  }
}
