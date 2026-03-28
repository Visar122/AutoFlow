import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReserveparts } from './add-reserveparts';

describe('AddReserveparts', () => {
  let component: AddReserveparts;
  let fixture: ComponentFixture<AddReserveparts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReserveparts],
    }).compileComponents();

    fixture = TestBed.createComponent(AddReserveparts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
