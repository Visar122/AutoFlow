import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRepairComponent } from './car-repair.component';

describe('CarRepairComponent', () => {
  let component: CarRepairComponent;
  let fixture: ComponentFixture<CarRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarRepairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
