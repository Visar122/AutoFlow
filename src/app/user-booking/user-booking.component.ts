import { Component, OnInit } from '@angular/core';
import { CarShopServiceService } from '../services/carshop.service';
import { bookings, CarShop } from '../interfaces';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css'
})
export class UserBookingComponent implements OnInit{
 email='';
 name="";
 myBookings:bookings[] | undefined;

  constructor(private carshop:CarShopServiceService){}
 ngOnInit(): void {
     const StoreUser=localStorage.getItem("user");

     
     if(StoreUser){
      const userData=JSON.parse(StoreUser);
       this.email=userData.email;
       this.name=userData.name;
    
       this.carshop.GetBookingByEmail(this.email).subscribe(
        (result: bookings[]) => {
          this.myBookings = result;
          console.log(this.myBookings)
        });
     }
     
         
       
    }
 
  
}
