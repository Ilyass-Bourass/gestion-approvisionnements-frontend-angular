import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FournisseurService } from '../../../core/services/fournisseur.service';

@Component({
  selector: 'app-fournisseur-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fournisseur-form.html'
})
export class FournisseurForm implements OnInit {
  fournisseurForm: FormGroup;
  isEditMode = false;
  fournisseurId?: number;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fournisseurForm = this.fb.group({
      raisonSociale: ['', [Validators.required, Validators.maxLength(100)]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      personneContact: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      ville: ['', [Validators.required, Validators.maxLength(50)]],
      ice: ['', [Validators.required, Validators.pattern(/^[0-9]{15}$/)]]
    });
  }

  ngOnInit() {
    this.fournisseurId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.fournisseurId) {
      this.isEditMode = true;
      this.loadFournisseur();
    }
  }

  loadFournisseur() {
    this.isLoading = true;
    this.fournisseurService.getFournisseurById(this.fournisseurId!).subscribe({
      next: (fournisseur) => {
        this.fournisseurForm.patchValue(fournisseur);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du fournisseur';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onSubmit() {
    if (this.fournisseurForm.invalid) {
      this.fournisseurForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const fournisseurData = this.fournisseurForm.value;

    const request = this.isEditMode
      ? this.fournisseurService.updateFournisseur(this.fournisseurId!, fournisseurData)
      : this.fournisseurService.createFournisseur(fournisseurData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/fournisseurs']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de l\'enregistrement';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/fournisseurs']);
  }

  get raisonSociale() { return this.fournisseurForm.get('raisonSociale'); }
  get adresse() { return this.fournisseurForm.get('adresse'); }
  get personneContact() { return this.fournisseurForm.get('personneContact'); }
  get email() { return this.fournisseurForm.get('email'); }
  get telephone() { return this.fournisseurForm.get('telephone'); }
  get ville() { return this.fournisseurForm.get('ville'); }
  get ice() { return this.fournisseurForm.get('ice'); }
}
