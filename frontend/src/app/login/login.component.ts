import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog'; // ← SERVIÇO
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCadastroComponent } from '../modais/modal-cadastro/modal-cadastro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private dialog: MatDialog) { }

  criarCadastro() {
    const modalCadastro = this.dialog.open(ModalCadastroComponent, {
      width: '800px',
      height: '900px'     
    });

    modalCadastro.afterClosed().subscribe(res => {
      console.log('Fechado');
    });

  }  

}
