import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarShopComponent } from './car-shop.component';

describe('CarShopComponent', () => {
  let component: CarShopComponent;
  let fixture: ComponentFixture<CarShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
