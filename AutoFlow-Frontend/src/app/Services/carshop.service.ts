import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarShop } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CarshopService {

  private url="https://localhost:7069/api/Carshops";

  constructor(private http: HttpClient) {}

  AddCars(data:CarShop){
    return this.http.post<CarShop[]>(this.url,data);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.url}/upload`, formData);
  }
  getCars() {
    return this.http.get<CarShop[]>(this.url);
  }

  deleteCar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateCar(id: number, data: CarShop) {
    return this.http.put(`${this.url}/${id}`, data);
  }
}
