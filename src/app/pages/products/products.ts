import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductModel } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['reference', 'nom', 'categorie', 'prixUnitaire', 'stockActuel', 'actions'];
  dataSource: ProductModel[] = [];
  filteredData: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        setTimeout(() => {
          this.dataSource = products;
          this.filteredData = [...products];
        }, 0);
      },
      error: (error) => console.error('Erreur lors du chargement:', error)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.dataSource.filter(product =>
      product.nom.toLowerCase().includes(filterValue) ||
      product.reference.toLowerCase().includes(filterValue)
    );
  }

  addProduct() {
    this.router.navigate(['/products/form']);
  }

  editProduct(product: ProductModel) {
    this.router.navigate(['/products/form', product.id]);
  }

  viewDetails(product: ProductModel) {
    this.router.navigate(['/products/details', product.id]);
  }

  deleteProduct(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }
}
