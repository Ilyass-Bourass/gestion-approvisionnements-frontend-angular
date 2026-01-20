export enum StatutCommande {
  EN_ATTENTE = 'EN_ATTENTE',
  VALIDEE = 'VALIDEE',
  LIVREE = 'LIVREE',
  ANNULEE = 'ANNULEE'
}

export interface CommandeProduit {
  id?: Long;
  produitId: number;
  produitNom?: string;
  quantite: number;
  prixUnitaire: number;
}

export interface RequestCommandeProduit {
  id: number;
  quantite: number;
  prixUnitaire: number;
}

export interface CommandeRequest {
  dateCommande: string;
  montantTotal?: number;
  statutCommande: StatutCommande;
  fournisseurId: number;
  produits: RequestCommandeProduit[];
}

export interface CommandeResponse {
  id: number;
  dateCommande: string;
  montantTotal: number;
  statutCommande: StatutCommande;
  fournisseurId: number;
  fournisseurNom: string;
  produits: CommandeProduit[];
}
