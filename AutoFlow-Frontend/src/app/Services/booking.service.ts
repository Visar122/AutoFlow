import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bookings } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private url = 'https://localhost:7069/api/Bookings';

  constructor(private http: HttpClient) {}

  createBooking(data: bookings) {
    return this.http.post(this.url, data);
  }

  getBookings() {
    return this.http.get<any[]>(this.url);
  }
  getBookingByMailk(email:string){
    return this.http.get<any[]>(`${this.url}/GetByEmail`, { params: { Mail: email } });
  }
}
