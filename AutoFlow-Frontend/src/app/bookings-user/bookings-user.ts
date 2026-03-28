import { LoginService } from './../Services/login.service';
import { Login } from './../login/login';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Services/booking.service';
import { bookings } from '../interfaces';
import { SHARED } from '../shared';



@Component({
  selector: 'app-bookings-user',
  imports: [SHARED],
  templateUrl: './bookings-user.html',
  styleUrl: './bookings-user.css',
})
export class BookingsUser implements OnInit {

  Email = '';
  
  mybookings: bookings[] = [];

  constructor(private bookingService: BookingService,private loginService: LoginService) {}

  ngOnInit(): void {
  
     this.Email=this.loginService.getUser()?.email ?? '';

     this.bookingService.getBookingByMailk(this.Email).subscribe((data) => {
      this.mybookings = data;
      console.log(this.mybookings);
    });
  }
 

}
