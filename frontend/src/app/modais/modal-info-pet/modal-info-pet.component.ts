import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pet } from '../../models/Pet.model';
import { CarouselModule } from 'ngx-owl-carousel-o' 

@Component({
  selector: 'app-modal-info-pet',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CarouselModule
  ],
  templateUrl: './modal-info-pet.component.html',
  styleUrl: './modal-info-pet.component.scss'
})

export class ModalInfoPetComponent {

  pet: Pet = {} as Pet;
  private urlUpload: string = 'http://localhost:3000/imagem';
  carouselOptions: any = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['Anterior', 'Próximo'],
      responsive: {
        0: { items: 1 },
        400: { items: 1 },
        740: { items: 1 },
        940: { items: 1 }
      },
      nav: true,
      autoHeight: false
    }

  constructor(
    private dialogRef: MatDialogRef<ModalInfoPetComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.pet = data;
  }
  
getIdade(dtNascimento: any) {
  if (!dtNascimento)
    return null;

  const data = new Date(dtNascimento);
  if (isNaN(data.getTime()))
    return null;

  const hoje = new Date();
  let idade = hoje.getFullYear() - data.getFullYear();
  const mes = hoje.getMonth() - data.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < data.getDate())) {
    idade--;
  }

  return `${idade} anos`;
}

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close();
  }

  getUrlImagem(nomeImg: string) {
    if(nomeImg) {
      return `${this.urlUpload}/${nomeImg}`;
    }
    return `${this.urlUpload}/placeholder.jpg`;
  }
}
