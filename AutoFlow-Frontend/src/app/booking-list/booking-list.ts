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

  constructor(private bookingService:BookingService) {}

  bookings: bookings[] = [];
  view: 'thisWeek' | 'nextWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' = 'thisWeek';

  ngOnInit() {
    this.loadThisWeek();
    
  }

  loadThisWeek() {
    this.view = 'thisWeek';
    this.bookingService.getBookingsThisWeek().subscribe((data) => {
      this.bookings = data;
    });
  }
  loadNextWeek(){
    this.view = 'nextWeek';
    this.bookingService.getNextWeekBookings().subscribe((data)=>{
      this.bookings=data;
    });
  }

  loadLastWeek() {
    this.view = 'lastWeek';
    this.bookingService.getLastWeekBookings().subscribe((data) => {
      this.bookings = data;
    });
  }
  loadThisMonth(){
    this.view = 'thisMonth';
    this.bookingService.getThisMonthBookings().subscribe((data)=>{
      this.bookings=data;
  });
  }

  loadLastMonth() {
    this.view = 'lastMonth';
    this.bookingService.getLastMonthBookings().subscribe((data) => {
      this.bookings = data;
    });
  }
}
