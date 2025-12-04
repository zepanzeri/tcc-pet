import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

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
@Input() nome!: string;
@Input() cidade!: string;
@Input() urlImagem?: string;
}
