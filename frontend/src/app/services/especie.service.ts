import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {

  apiUrl: string = 'http://localhost:3000/especie';

  constructor(private http: HttpClient) { }

  getEspecies():Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

}
