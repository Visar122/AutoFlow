import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveParts } from './reserve-parts';

describe('ReserveParts', () => {
  let component: ReserveParts;
  let fixture: ComponentFixture<ReserveParts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveParts],
    }).compileComponents();

    fixture = TestBed.createComponent(ReserveParts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
