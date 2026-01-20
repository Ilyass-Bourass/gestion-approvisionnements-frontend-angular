import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  permission?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  authService = inject(AuthService);

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '📊' },
    { label: 'Gestion des utilisateurs', route: '/utilisateurs', icon: '👥', permission: 'ASSIGNER_ROLE' },
    { label: 'Produits', route: '/products', icon: '📦', permission: 'PRODUCT_READ' },
    { label: 'Fornisseurs', route: '/fournisseurs', icon: '🚚', permission: 'FOURNISSEUR_READ' },

  ];
}
