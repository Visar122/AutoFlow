import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservepartsdetails } from './reservepartsdetails';

describe('Reservepartsdetails', () => {
  let component: Reservepartsdetails;
  let fixture: ComponentFixture<Reservepartsdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservepartsdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Reservepartsdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
