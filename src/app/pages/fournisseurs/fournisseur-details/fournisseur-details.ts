import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FournisseurService } from '../../../core/services/fournisseur.service';
import { FournisseurModel } from '../../../core/models/fournisseur.model';

@Component({
  selector: 'app-fournisseur-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fournisseur-details.html'
})
export class FournisseurDetails implements OnInit {
  fournisseur?: FournisseurModel;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFournisseur(id);
  }

  loadFournisseur(id: number) {
    this.isLoading = true;
    this.fournisseurService.getFournisseurById(id).subscribe({
      next: (data) => {
        this.fournisseur = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des détails';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/fournisseurs']);
  }

  editFournisseur() {
    this.router.navigate(['/fournisseurs/form', this.fournisseur?.id]);
  }
}
