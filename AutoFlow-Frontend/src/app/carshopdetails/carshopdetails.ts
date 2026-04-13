
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from './../app.routes';
import { Carshop } from './../carshop/carshop';
import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { CarshopService } from '../Services/carshop.service';

@Component({
  selector: 'app-carshopdetails',
  imports: [SHARED],
  templateUrl: './carshopdetails.html',
  styleUrl: './carshopdetails.css',
})
export class Carshopdetails implements OnInit {

  car:any = null;
  activeImage = '';

  constructor(private CarshopService: CarshopService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
  const id=Number(this.route.snapshot.paramMap.get('id'));
  this.CarshopService.getCarById(id).subscribe({
    next: (data) => { this.car = data; this.activeImage = data.imageUrl1; },
    error: () => this.router.navigate(['/carshop'])
  });
  }
}
