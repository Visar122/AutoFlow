import { bookings } from './../interfaces';
import { Component } from '@angular/core';
import { SHARED } from '../shared';
import { BookingService } from '../Services/booking.service';

@Component({
  selector: 'app-booking-list',
  imports: [SHARED],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.css',
})
export class BookingList {

  constructor(private BookingList:BookingService) {}

  bookings  : bookings[] = [];

  ngOnInit() {
    this.BookingList.getBookings().subscribe((data) => {
      this.bookings = data;
      console.log(this.bookings)
    });
  }
}
