import { Component, OnInit } from '@angular/core';
import { Pet } from '../models/Pet.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { EspecieService } from '../services/especie.service';
import { Especie } from '../models/Especie.model';


@Component({
  selector: 'app-cadastro-pet',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './cadastro-pet.component.html',
  styleUrl: './cadastro-pet.component.scss'
})
export class CadastroPetComponent implements OnInit{
  constructor(
    private router: Router,
    private especieService: EspecieService
  ) { }

  ngOnInit(): void {
    this.getEspecies();
  }

  pet: Pet = {
    Nome: '',
    Raca: '',
    DtNascimento: new Date(),
    Especie: '',
    Sexo: '',
    Castrado: false,
    Vacinas: ''
  }
  imagens: File[] = [];
  especies: Especie[] = [];

  onCancel() {
    this.router.navigate(['/home']);
  }

  onConfirm() {
    const usuario = sessionStorage.getItem('email');
    this.pet.Imagens = this.imagens;
    this.pet.Usuario = usuario;
    console.log(this.pet);
  }

  addArquivo(event: any) {
    this.imagens = Array.from(event.target.files);
  }

  getEspecies() {
     this.especieService.getEspecies().subscribe({
      next: (response) => {
        if(response.Sucesso) {
          this.especies = response.Especies ?? [];
        }
      }
     });
  }

}
