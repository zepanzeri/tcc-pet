import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoPetComponent } from './modal-info-pet.component';

describe('ModalInfoPetComponent', () => {
  let component: ModalInfoPetComponent;
  let fixture: ComponentFixture<ModalInfoPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInfoPetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInfoPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
