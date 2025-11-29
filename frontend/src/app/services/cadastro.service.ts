import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl: string = 'http://localhost:3000/usuario'

  constructor(private http: HttpClient) { }

  createCadastro(dadosUsuario: Usuario): Observable<ApiResponse> {
    const url = `${this.apiUrl}/cadastrar`;

    return this.http.post<ApiResponse>(url, dadosUsuario);
  }

  login(email: string, senha: string): Observable<ApiResponse> {
    const dadosLogin = {
      Email: email,
      Senha: senha
    };
    const url = `${this.apiUrl}/login`;

    return this.http.post<ApiResponse>(url, dadosLogin);
  }


}
