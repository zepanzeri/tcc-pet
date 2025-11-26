import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Estado } from '../models/Estado.model';
import { Cidade } from '../models/Cidade.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  private url = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) { }
  

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.url}/estados?orderBy=nome`);
  }

  getCidades(uf: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.url}/estados/${uf}/municipios?orderBy=nome`);
  }
}
