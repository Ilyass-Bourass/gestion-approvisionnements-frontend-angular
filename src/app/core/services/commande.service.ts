import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeRequest, CommandeResponse } from '../models/commande.model';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/commandes';

  getAllCommandes(): Observable<CommandeResponse[]> {
    return this.http.get<CommandeResponse[]>(this.apiUrl);
  }

  getCommandeById(id: number): Observable<CommandeResponse> {
    return this.http.get<CommandeResponse>(`${this.apiUrl}/${id}`);
  }

  createCommande(commande: CommandeRequest): Observable<CommandeResponse> {
    return this.http.post<CommandeResponse>(this.apiUrl, commande);
  }

  updateCommande(id: number, commande: CommandeRequest): Observable<CommandeResponse> {
    return this.http.put<CommandeResponse>(`${this.apiUrl}/${id}`, commande);
  }

  deleteCommande(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  validerCommande(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/validerCommande/${id}`, {}, { responseType: 'text' });
  }
}
