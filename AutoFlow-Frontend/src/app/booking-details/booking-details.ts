import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../Services/booking.service';
import { SHARED } from '../shared';

@Component({
  selector: 'app-booking-details',
  imports: [SHARED],
  templateUrl: './booking-details.html',
  styleUrl: './booking-details.css',
})
export class BookingDetails implements OnInit {
  booking: any = null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookingService.getBookingById(id).subscribe({
      next: (data) => this.booking = data,
      error: () => this.router.navigate(['/booking-list'])
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => this.booking.workImg = reader.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

  onDefectImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => this.booking.defectImg = reader.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

  save() {
    this.bookingService.updateBooking(this.booking.id, this.booking).subscribe({
      next: () => {
        this.successMessage = 'Gemt!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Noget gik galt, prøv igen';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}
