import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { ReserveParts } from '../interfaces';
import { ReservepartsService } from '../Services/reserveparts.service';

@Component({
  selector: 'app-reserve-parts',
  imports: [SHARED],
  templateUrl: './reserve-parts.html',
  styleUrl: './reserve-parts.css',
})
export class ReservePartsComponent implements OnInit {

  parts: ReserveParts[] = [];

  constructor(private reservePartsService: ReservepartsService) {}

  ngOnInit() {
    this.reservePartsService.getParts().subscribe((data) => {
      this.parts = data;
    });
  }
  
}


