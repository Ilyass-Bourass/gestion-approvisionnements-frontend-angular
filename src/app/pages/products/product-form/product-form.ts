import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html'
})
export class ProductForm implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId?: number;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      reference: ['', [Validators.required, Validators.maxLength(50)]],
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(255)],
      prixUnitaire: ['', [Validators.required, Validators.min(0.01)]],
      categorie: [''],
      stockActuel: ['', [Validators.required, Validators.min(0)]],
      stockMinimum: ['', [Validators.required, Validators.min(0)]],
      uniteMesure: ['']
    });
  }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }
  }

  loadProduct() {
    this.isLoading = true;
    this.productService.getProductById(this.productId!).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du produit';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const productData = this.productForm.value;

    const request = this.isEditMode
      ? this.productService.updateProduct(this.productId!, productData)
      : this.productService.createProduct(productData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de l\'enregistrement';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }

  get reference() { return this.productForm.get('reference'); }
  get nom() { return this.productForm.get('nom'); }
  get prixUnitaire() { return this.productForm.get('prixUnitaire'); }
  get stockActuel() { return this.productForm.get('stockActuel'); }
  get stockMinimum() { return this.productForm.get('stockMinimum'); }
}
