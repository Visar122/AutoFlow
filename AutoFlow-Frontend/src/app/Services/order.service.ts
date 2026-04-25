import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private url = 'https://localhost:7069/api/Orders';

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number) {
    return this.http.post<{ clientSecret: string }>(`${this.url}/CreatePaymentIntent`, { amount, currency: 'dkk' });
  }

  placeOrder(data: any) {
    return this.http.post(this.url, data);
  }


  GetOrderByEmail(email:string){
    return this.http.get<any[]>(`${this.url}/ByEmail?email=${email}`);
  }

  getAllOrders() {
    return this.http.get<any[]>(this.url);
  }
}
