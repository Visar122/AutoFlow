import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED } from '../shared';
import { BookingService } from '../Services/booking.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-booking',
  imports: [SHARED],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  successMessage = '';
  errorMessage = '';

  Times = ['11:00', '12:30', '14:00', '15:00', '16:00'];
  takenSlots: string[] = [];

  minDate = '';
  maxDate = '';

  form = {
    customerName: '',
    customerEmail: '',
    tlf: '',
    serviceType: '',
    bookingDate: '',
    bookingTime: '',
    carPlate: '',
    status: '',
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

  constructor(private bookingService: BookingService,private Login: LoginService, private router: Router,) {}

  ngOnInit() {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = nextWeek.toISOString().split('T')[0];

    const user = this.Login.getUser();
    if (user) {
      this.form.customerName = user.firstName ?? '';
      this.form.customerEmail = user.email ?? '';
    }
  }

  onDateChange() {
    this.form.bookingTime = '';
    if (!this.form.bookingDate) return;

    this.bookingService.getBookingsThisWeek().subscribe({
      next: (bookings) => {
        this.takenSlots = bookings
          .filter(b => b.bookingDate?.startsWith(this.form.bookingDate))
          .map(b => (b.bookingTime as string).substring(0, 5));
      },
      error: () => {
        this.takenSlots = [];
      }
    });
  }

  isSlotTaken(slot: string): boolean {
    return this.takenSlots.includes(slot);
  }

  submit() {
    if (!this.form.customerName || !this.form.customerEmail || !this.form.tlf || !this.form.carPlate || !this.form.serviceType || !this.form.bookingDate || !this.form.bookingTime) {
      this.errorMessage = 'Please fill in all fields';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    const payload = {
      ...this.form,
      bookingTime: this.form.bookingTime + ':00',
    };

    const user = this.Login.getUser();
    if (!user) {
      this.errorMessage = 'You must be logged in to make a booking';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
  

    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        this.takenSlots = [...this.takenSlots, this.form.bookingTime];
        this.successMessage = 'Booking confirmed!';
        setTimeout(() => {
          this.successMessage = '';
          this.takenSlots = [];
          this.router.navigate(['/']);
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'Something went wrong, try again';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}
