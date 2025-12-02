import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getEmailLogado(): string | null {
    return localStorage.getItem('email');
  }

  usuarioLogado(): boolean {
    return this.getEmailLogado() !== null;
  }

  deslogarUsuario(): void {
    return sessionStorage.removeItem('email');
  }
}
