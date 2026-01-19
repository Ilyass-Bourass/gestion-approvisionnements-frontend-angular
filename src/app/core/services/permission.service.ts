import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: string[] = [];

  setPermissions(permissions: string[]): void {
    this.permissions = permissions;
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  getPermissions(): string[] {
    if (this.permissions.length === 0) {
      const stored = localStorage.getItem('permissions');
      this.permissions = stored ? JSON.parse(stored) : [];
    }
    return [...this.permissions];
  }

  hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(p => this.hasPermission(p));
  }

  clear(): void {
    this.permissions = [];
    localStorage.removeItem('permissions');
  }
}
