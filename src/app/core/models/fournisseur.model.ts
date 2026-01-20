export interface FournisseurModel {
  id?: number;
  raisonSociale: string;
  adresse: string;
  personneContact: string;
  email: string;
  telephone: string;
  ville: string;
  ice: string;
}

export interface FournisseurCreateRequest {
  raisonSociale: string;
  adresse: string;
  personneContact: string;
  email: string;
  telephone: string;
  ville: string;
  ice: string;
}

export interface FournisseurUpdateRequest {
  raisonSociale?: string;
  adresse?: string;
  personneContact?: string;
  email?: string;
  telephone?: string;
  ville?: string;
  ice?: string;
}
