import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FournisseurModel, FournisseurCreateRequest, FournisseurUpdateRequest } from '../models/fournisseur.model';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  private apiUrl = 'http://localhost:8080/api/v1/fournisseurs';

  constructor(private http: HttpClient) {}

  getAllFournisseurs(): Observable<FournisseurModel[]> {
    return this.http.get<FournisseurModel[]>(this.apiUrl);
  }

  getFournisseurById(id: number): Observable<FournisseurModel> {
    return this.http.get<FournisseurModel>(`${this.apiUrl}/${id}`);
  }

  createFournisseur(data: FournisseurCreateRequest): Observable<FournisseurModel> {
    return this.http.post<FournisseurModel>(this.apiUrl, data);
  }

  updateFournisseur(id: number, data: FournisseurUpdateRequest): Observable<FournisseurModel> {
    return this.http.put<FournisseurModel>(`${this.apiUrl}/${id}`, data);
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
