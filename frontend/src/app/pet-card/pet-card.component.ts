import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Pet } from '../models/Pet.model';

@Component({
  selector: 'pet-card',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.scss'
})
export class PetCardComponent {
  @Input() pet!: Pet;
  @Output() emiteDados = new EventEmitter<Pet>();

  private urlUpload: string = 'http://localhost:3000/imagem';

  getUrlImagem() {
    if(this.pet.Imagens && this.pet.Imagens.length > 0) {
      return `${this.urlUpload}/${this.pet.Imagens[0]}`
    }
    return `${this.urlUpload}/placeholder.jpg`;
  }

  abrirModal() {
    this.emiteDados.emit(this.pet);
  }

}
