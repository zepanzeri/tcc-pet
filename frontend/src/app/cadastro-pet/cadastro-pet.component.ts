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
import { PetService } from '../services/pet.service';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE as MAT_DATE_LOCALE_TOKEN } from '@angular/material/core';


export const DATA_FORMATO_BR = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};

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
  styleUrl: './cadastro-pet.component.scss',
  providers: [
     { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE_TOKEN] },
    { provide: MAT_DATE_FORMATS, useValue: DATA_FORMATO_BR },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
})

export class CadastroPetComponent implements OnInit{
  constructor(
    private router: Router,
    private especieService: EspecieService,
    private petService: PetService
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
    Cor: '',
    Vacinas: ''
  }
  imagens: File[] = [];
  especies: Especie[] = [];
  imagensPreview: string [] = [];

  onCancel() {
    this.router.navigate(['/home']);
  }

  onConfirm() {
    const usuario = sessionStorage.getItem('email');
    this.pet.Imagens = this.imagens;
    this.pet.Usuario = usuario;
    this.petService.cadastraPet(this.pet);
  }

  addArquivo(event: any) {
    const files: FileList = event.target.files;

    if (!files || files.length === 0)
      return;

    Array.from(files).forEach(file => {
      if (!file.type.includes('jpeg') && !file.type.includes('png')) {
        alert('Escolha imagens em formato JPG ou PNG');
        return;
      }

      this.imagens.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagensPreview.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
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

  removerImagem(index: number) {
    this.imagensPreview.splice(index, 1);
    this.imagens.splice(index, 1);
  }

}
