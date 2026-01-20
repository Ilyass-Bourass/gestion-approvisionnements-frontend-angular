import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FournisseurService } from '../../core/services/fournisseur.service';
import { FournisseurModel } from '../../core/models/fournisseur.model';

@Component({
  selector: 'app-fournisseurs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fournisseurs.html'
})
export class FournisseursComponent implements OnInit {
  fournisseurs: FournisseurModel[] = [];
  filteredData: FournisseurModel[] = [];

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    this.fournisseurService.getAllFournisseurs().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.fournisseurs = data;
          this.filteredData = [...data];
        }, 0);
      },
      error: (error) => console.error('Erreur lors du chargement:', error)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.fournisseurs.filter(f =>
      f.raisonSociale.toLowerCase().includes(filterValue) ||
      f.email.toLowerCase().includes(filterValue) ||
      f.ville.toLowerCase().includes(filterValue)
    );
  }

  addFournisseur() {
    this.router.navigate(['/fournisseurs/form']);
  }

  editFournisseur(fournisseur: FournisseurModel) {
    this.router.navigate(['/fournisseurs/form', fournisseur.id]);
  }

  viewDetails(fournisseur: FournisseurModel) {
    this.router.navigate(['/fournisseurs/details', fournisseur.id]);
  }

  deleteFournisseur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseurService.deleteFournisseur(id).subscribe({
        next: () => this.loadFournisseurs(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }
}
