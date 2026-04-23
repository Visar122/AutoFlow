import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReserveParts } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReservepartsService {

  private url = 'https://localhost:7069/api/ReserveParts';

  constructor(private http: HttpClient) {}

  getParts() {
    return this.http.get<ReserveParts[]>(this.url);
  }

  addPart(data: ReserveParts) {
    return this.http.post<ReserveParts>(this.url, data);
  }

  deletePart(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

   getpartsbyId(id: number) {
    return this.http.get<ReserveParts>(`${this.url}/${id}`);
  }

  SearchPartByName(name: string) {
    return this.http.get<ReserveParts[]>(`${this.url}/SearchParts?name=${name}`);
  }

  FilterParts(carName?: string, carModel?: string, category?: string, maxPrice?: number) {
    let params: any = {};
    if (carName) params['carName'] = carName;
    if (carModel) params['carModel'] = carModel;
    if (category) params['category'] = category;
    if (maxPrice != null) params['maxPrice'] = maxPrice;
    return this.http.get<ReserveParts[]>(`${this.url}/Filter`, { params });
  }
  updatePart(id: number, data: ReserveParts) {
    return this.http.put(`${this.url}/${id}`, data);
  }
}
