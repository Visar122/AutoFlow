import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { FadeIn } from '../fade-in';
import { CarshopService } from '../Services/carshop.service';
import { ReservepartsService } from '../Services/reserveparts.service';
import { CarShop, ReserveParts } from '../interfaces';

@Component({
  selector: 'app-home',
  imports: [SHARED, FadeIn],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  featuredCars: CarShop[] = [];
  featuredParts: ReserveParts[] = [];

  constructor(
    private carshopService: CarshopService,
    private reservePartsService: ReservepartsService
  ) {}

  ngOnInit() {
    this.carshopService.getCars().subscribe(data => {
      this.featuredCars = data.slice(0, 3);
    });
    this.reservePartsService.getParts().subscribe(data => {
      this.featuredParts = data.slice(0, 6);
    });
  }
}
