import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../models/Pet.model';
import { CommonModule } from '@angular/common';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { EspecieService } from '../services/especie.service';
import { Especie } from '../models/Especie.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoPetComponent } from '../modais/modal-info-pet/modal-info-pet.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PetCardComponent,
    MatButtonModule,
    MatInputModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pets: Pet[] = [];
  petsFiltro: Pet[] = [];
  especies: Especie[] = [];
  corBtnEspecie: any = {};
  usuario: string = '';

  constructor(
    private petService: PetService,
    private especieService: EspecieService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {    
    this.buscaPets();
    this.buscaEspecies();
    this.usuario = sessionStorage.getItem('email') ?? '';

    this.corBtnEspecie = {
      1: '#d39b2c',
      2: '#d4634d',
      3: '#5cc4d7',
      4: '#b256c8',
      5: '#249245ff'
    }
  }

  buscaPets() {
    this.petService.getPets().subscribe({
      next: (response) => {
        if(response.Sucesso){
          this.pets = response.Pets ?? [];
          this.petsFiltro = [...this.pets];
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  buscaEspecies() {
    this.especieService.getEspecies().subscribe({
      next: (response) => {
        if(response.Sucesso) {
          this.especies = response.Especies ?? [];
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  filtrarEspecies(id: number) {   
    this.petsFiltro = this.pets.filter(pet => pet.Especie.IdEspecie === id);
  }

  mostrarTodos() {
    this.petsFiltro = [...this.pets];
  }

  abrirModal(pet: any) {
    const dialogRef = this.dialog.open(ModalInfoPetComponent, {
      width: '800px',
      height: '900px',
      data: pet
    });
    
    dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 50);
    });
  }
}
