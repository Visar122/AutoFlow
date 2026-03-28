import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carshop } from './carshop';

describe('Carshop', () => {
  let component: Carshop;
  let fixture: ComponentFixture<Carshop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carshop],
    }).compileComponents();

    fixture = TestBed.createComponent(Carshop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
