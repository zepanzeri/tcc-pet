import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IbgeService } from '../../services/ibge.service';
import { Estado } from '../../models/Estado.model';
import { Cidade } from '../../models/Cidade.model';
import { Usuario } from '../../models/Usuario.model';
import { CadastroService } from '../../services/cadastro.service';
import { ApiResponse } from '../../models/ApiResponse.model';

@Component({
  selector: 'app-modal-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './modal-cadastro.component.html',
  styleUrl: './modal-cadastro.component.scss'
})
export class ModalCadastroComponent implements OnInit {

  estadoSelecionado: Estado = {} as Estado;
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  cidadeSelecionada: Cidade = {} as Cidade;
  usuario: Usuario = {
    Nome: '',
    Email: '',
    Senha: '',
    Estado: '',
    Cidade: '',
    Sexo: ''
  };
  loading: boolean = false;
  senhaConfirm: string = '';

  constructor(
      private dialog: MatDialogRef<ModalCadastroComponent>,
      private ibgeService: IbgeService,
      private cadastroService: CadastroService
    ) { }

  ngOnInit(): void {
    this.getEstados();
  }

  onCancel() {
    this.dialog.close();
  }

  onConfirm() {
    this.usuario.Estado = this.estadoSelecionado?.sigla;
    this.usuario.Cidade = this.cidadeSelecionada.nome;
    this.cadastroService.createCadastro(this.usuario).subscribe({
      next: (response: ApiResponse) => {
        if(!response.Sucesso) {
          alert(response.Erro);
        }
        else {
          alert('Cadastro realizado com sucesso!');
        }
      }
    });    
    this.dialog.close();
  }

  onEstadoChange() {
    if(this.estadoSelecionado) {
      this.loading = true;
      this.cidadeSelecionada = {} as Cidade;
      this.cidades = [];
      this.getCidades(this.estadoSelecionado.sigla);      
    }
    else {
      this.cidadeSelecionada = {} as Cidade;
      this.cidades = [];
    }
  }

  getCidades(uf: string) {
    this.ibgeService.getCidades(uf).subscribe({
        next: (cidades) => {
          this.cidades = cidades;
          this.loading = false;
        },
        error: (e) => {
          console.log(e);
          alert('Erro ao buscar cidades');
        }
      });
  }

  getEstados() {
    this.loading = true;
    this.ibgeService.getEstados().subscribe({
      next: (estados) => {
        this.estados = estados;
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        alert('Erro ao buscar estados');        
      }
    });
  }

  verificaErro() {
    const verificaSenha = this.usuario.Senha === this.senhaConfirm && this.usuario.Senha.length > 0;
    return verificaSenha && this.usuario.Nome.length > 0
        && this.usuario.Nome.length > 0 && this.usuario.Email.length > 0
        && this.usuario.Sexo.length > 0 && this.cidadeSelecionada.id && this.estadoSelecionado.id
  }
}
