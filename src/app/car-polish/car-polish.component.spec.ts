import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPolishComponent } from './car-polish.component';

describe('CarPolishComponent', () => {
  let component: CarPolishComponent;
  let fixture: ComponentFixture<CarPolishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarPolishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPolishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
