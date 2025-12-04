import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getEmailLogado(): string | null {
    return sessionStorage.getItem('email');
  }

  usuarioLogado(): boolean {
    return this.getEmailLogado() !== null;
  }

  deslogarUsuario(): void {
    return sessionStorage.removeItem('email');
  }
}
