import { Component, OnInit } from '@angular/core';
import { CarShopServiceService } from '../services/carshop.service';
import { bookings, CarShop } from '../interfaces';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.css'
})
export class AdminBookingsComponent implements OnInit {
  allBookings:bookings[]|undefined;
constructor(private carshop:CarShopServiceService){}

ngOnInit() {
    this.carshop.GetAllBookings().subscribe((result:bookings[])=>{
      this.allBookings=result;

    })
}

}
