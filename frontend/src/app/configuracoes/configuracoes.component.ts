import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CadastroService } from '../services/cadastro.service';
import { Usuario } from '../models/Usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastroComponent } from '../modais/modal-cadastro/modal-cadastro.component';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class ConfiguracoesComponent {
  dadosUsuario: Usuario = {} as Usuario;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cadastroService: CadastroService,
    private dialog: MatDialog
  ) { }

  getDadosUsuario() {
    const email = this.authService.getEmailLogado() ?? '';
    this.cadastroService.getDadosUsuario(email).subscribe({
      next: (response) => {
        if(response.Sucesso) {
          this.dadosUsuario = response.Usuario ?? {} as Usuario;
          const dialogRef = this.dialog.open(ModalCadastroComponent, {
            width: '800px',
            height: '900px',
            data: this.dadosUsuario
          });
        }
      },
      error: (e) => {
        console.log(e);
      }
    });   
    
  }

  sair() {
    this.authService.deslogarUsuario();
    this.router.navigate(['/login']);
  }

}
