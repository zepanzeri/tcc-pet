import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse.model';
import { Observable } from 'rxjs';
import { Pet } from '../models/Pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl: string = 'http://localhost:3000/pet';

  constructor(private http: HttpClient) { }  

  getPets(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  getPetsUsuario(): Observable<ApiResponse> {
    const url = `${this.apiUrl}/usuario`;
    const usuario = sessionStorage.getItem('email') ?? '';
    return this.http.get<ApiResponse>(url, { params: { usuario } });
  }

  cadastraPet(pet: Pet): Observable<ApiResponse> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.http.post<ApiResponse>(url, pet);
  }

}
