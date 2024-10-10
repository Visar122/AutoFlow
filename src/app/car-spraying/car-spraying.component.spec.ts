import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSprayingComponent } from './car-spraying.component';

describe('CarSprayingComponent', () => {
  let component: CarSprayingComponent;
  let fixture: ComponentFixture<CarSprayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarSprayingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSprayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
