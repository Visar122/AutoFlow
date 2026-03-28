import { CarshopService } from './../Services/carshop.service';
import { Component } from '@angular/core';
import { SHARED } from '../shared';
import { CarShop } from '../interfaces';

@Component({
  selector: 'app-carshop',
  imports: [SHARED],
  templateUrl: './carshop.html',
  styleUrl: './carshop.css',
})
export class Carshop {

  Cars:CarShop[]=[];

  constructor(private carshopService:CarshopService){}

  ngOnInit(): void {
    this.carshopService.getCars().subscribe((data)=>{
      this.Cars=data;
    })
    
  }



}
