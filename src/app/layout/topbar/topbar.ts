import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.html'
})
export class TopbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userEmail: string = '';
  userRole: string = '';

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userEmail = user?.email || 'pas d\'email';
    this.userRole = user?.role || 'No_ROLE';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
