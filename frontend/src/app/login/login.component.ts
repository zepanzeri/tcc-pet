import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog'; // ← SERVIÇO
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCadastroComponent } from '../modais/modal-cadastro/modal-cadastro.component';
import { Usuario } from '../models/Usuario.model';
import { CadastroService } from '../services/cadastro.service';
import { ApiResponse } from '../models/ApiResponse.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  usuario: Usuario = {} as Usuario;

  constructor(
    private dialog: MatDialog,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  criarCadastro() {
    this.dialog.open(ModalCadastroComponent, {
      width: '800px',
      height: '900px'     
    });  
  }
  
  async login() {
    await this.cadastroService.login(this.email, this.senha).subscribe({
      next: (response: ApiResponse)=> {
        if(response.Sucesso && response.Usuario) {
          sessionStorage.setItem('email', response.Usuario.Email);
          this.router.navigate(['/home']);
        }
      }
    });
  }

}
