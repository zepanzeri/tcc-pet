import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../models/Pet.model';
import { CommonModule } from '@angular/common';
import { PetCardComponent } from '../pet-card/pet-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PetCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pets: Pet[] = [];
  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.buscaPets();
  }

  buscaPets() {
    this.petService.getPets().subscribe({
      next: (response) => {
        console.log(response);
        if(response.Sucesso){
          this.pets = response.Pets ?? [];
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

}
