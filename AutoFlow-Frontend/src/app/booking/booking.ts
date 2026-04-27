import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED } from '../shared';
import { BookingService } from '../Services/booking.service';
import { LoginService } from '../Services/login.service';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-booking',
  imports: [SHARED],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit, AfterViewInit {
  successMessage = '';
  errorMessage = '';

  Times = ['11:00', '12:30', '14:00', '15:00', '16:00'];
  takenSlots: string[] = [];
  userCarPlates: string[] = [];

  form = {
    customerName: '',
    customerEmail: '',
    tlf: '',
    serviceType: '',
    bookingDate: '',
    bookingTime: '',
    carPlate: '',
    status: 'Pending',
    note: '',
  };

  serviceTypes = [
    'Olieskift',
    'Dækskift',
    'Bremseservice',
    'Generel inspektion',
    'Klimaservice',
    'Andet',
  ];

  constructor(private bookingService: BookingService, private Login: LoginService, private router: Router) {}

  ngOnInit() {
    const user = this.Login.getUser();
    if (user) {
      this.form.customerName = user.firstName ?? '';
      this.form.customerEmail = user.email ?? '';
      if (user.carPlate) this.userCarPlates.push(user.carPlate);
      if (user.carPlate2) this.userCarPlates.push(user.carPlate2);
    }
  }

  ngAfterViewInit() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);

    flatpickr('#bookingDate', {
      minDate: 'today',
      maxDate: maxDate,
      disable: [(date) => date.getDay() === 0 || date.getDay() === 6],
   
      onChange: (_, dateStr) => { //når brugere vælger en dato
        if (!this.Login.isLoggedIn()) {
          this.errorMessage = 'Du skal være logget ind for at booke en tid';
          setTimeout(() => { this.errorMessage = ''; this.router.navigate(['/login']); }, 2000);
          return;
        }
        this.form.bookingDate = dateStr;
        this.form.bookingTime = '';
        this.bookingService.getTakenSlots(dateStr).subscribe({
          next: (slots) => { this.takenSlots = slots; },
          error: () => { this.takenSlots = []; }
        });
      },
    });
  }

  isSlotTaken(slot: string){
    return this.takenSlots.includes(slot);
  }

  submit() {
    if (!this.form.customerName || !this.form.customerEmail || !this.form.tlf || !this.form.carPlate || !this.form.serviceType || !this.form.bookingDate || !this.form.bookingTime) {
      this.errorMessage = 'Please fill in all fields';
      setTimeout(() => { this.errorMessage = ''; }, 3000);
      return;
    }

    const user = this.Login.getUser();
    if (!user) {
      this.errorMessage = 'You must be logged in to make a booking';
      setTimeout(() => { this.errorMessage = ''; }, 3000);
      return;
    }

    this.bookingService.createBooking({ ...this.form, bookingTime: this.form.bookingTime + ':00' }).subscribe({
      next: () => {
        this.successMessage = 'Booking confirmed!';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/']);
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'Something went wrong, try again';
        setTimeout(() => { this.errorMessage = ''; }, 3000);
      }
    });
  }
}
