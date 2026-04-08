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

  getBookingsThisWeek() {
    return this.http.get<any[]>(`${this.url}/ThisWeek`);
  }
    getNextWeekBookings() {
    return this.http.get<any[]>(`${this.url}/NextWeek`);
  }

  getLastWeekBookings() {
    return this.http.get<any[]>(`${this.url}/LastWeek`);
  }
  
   getThisMonthBookings() {
    return this.http.get<any[]>(`${this.url}/ThisMonth`);
   }
  getLastMonthBookings() {
    return this.http.get<any[]>(`${this.url}/LastMonth`);
  }
  getBookingByMail(email:string){
    return this.http.get<any[]>(`${this.url}/GetByEmail`, { params: { Mail: email } });
  }

  getBookingById(id: number) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateBooking(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }
}
