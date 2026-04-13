import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carshopdetails } from './carshopdetails';

describe('Carshopdetails', () => {
  let component: Carshopdetails;
  let fixture: ComponentFixture<Carshopdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carshopdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Carshopdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
