import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bookings, CarShop } from '../interfaces';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarShopServiceService {

  constructor(private http:HttpClient) { }

 AllCars():Observable<CarShop[]>{ //observable is like a streams lets the data run through and im able to subscribe to it
   return this.http.get<CarShop[]>('https://localhost:7204/api/CarShops');
  } 
  CarsByCarType(CarType: string): Observable<CarShop[]> {
    return this.http.get<CarShop[]>(`https://localhost:7204/api/CarShops/Cartype/${CarType}`);
}
  OnlyCarTypes():Observable<string[]>{
    return this.http.get<string[]>('https://localhost:7204/api/CarShops/OnlyCartypes');
  }
  ClosestPrice(price:number):Observable<CarShop[]>{
    return this.http.get<CarShop[]>(`https://localhost:7204/api/CarShops/ClosestToPrice/${price}`)
  }
  BelowPrice(price:number):Observable<CarShop[]>{
    return this.http.get<CarShop[]>(`https://localhost:7204/api/CarShops/BelowPrice/${price}`)
  }
  GetCarByById(id:string):Observable<CarShop>{//<CarShop[]> or it needs to get all the items in carshop here i need just the id
    return this.http.get<CarShop>(`https://localhost:7204/api/CarShops/${id}`)
  }
  Delete(id:number):Observable<CarShop[]>{
    return this.http.delete<CarShop[]>(`https://localhost:7204/api/CarShops/${id}`)

  }
  AddCars(data:CarShop):Observable<CarShop[]>{ //observable is like a streams lets the data run through and im able to subscribe to it
    return this.http.post<CarShop[]>('https://localhost:7204/api/CarShops',data);
   }
   Update(data:CarShop){
    return this.http.post<CarShop[]>(`https://localhost:7204/api/CarShops/${data.carId}`,data);

   }
   Booking(booking: bookings): Observable<any> {
   
    return this.http.post('https://localhost:7204/api/Bookings', booking);
  }
  CheckAailability(date:string,time:string):Observable<boolean>{
    return this.http.get<boolean>(`https://localhost:7204/api/Bookings/CheckAvailability?date=${date}&time=${time}`)
  }
  GetAvailableTimes(date:string):Observable<string[]>{
  return this.http.get<string[]>(`https://localhost:7204/api/Bookings/GetAvailableTimes?date=${date}`)
 }
}
