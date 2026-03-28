import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCars } from './add-cars';

describe('AddCars', () => {
  let component: AddCars;
  let fixture: ComponentFixture<AddCars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCars],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
