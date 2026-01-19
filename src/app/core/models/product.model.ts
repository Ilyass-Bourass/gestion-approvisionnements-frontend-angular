export interface ProductModel {
  id?: number;
  reference: string;
  nom: string;
  description?: string;
  prixUnitaire: number;
  categorie?: string;
  stockActuel: number;
  stockMinimum: number;
  uniteMesure?: string;
}

export interface ProductCreateRequest {
  reference: string;
  nom: string;
  description?: string;
  prixUnitaire: number;
  categorie?: string;
  stockActuel: number;
  stockMinimum: number;
  uniteMesure?: string;
}

export interface ProductUpdateRequest {
  reference?: string;
  nom?: string;
  description?: string;
  prixUnitaire?: number;
  categorie?: string;
  stockActuel?: number;
  stockMinimum?: number;
  uniteMesure?: string;
}
