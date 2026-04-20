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
    return this.http.get<ReserveParts[]>(`${this.url}/SearchByName?name=${name}`);
  }
  updatePart(id: number, data: ReserveParts) {
    return this.http.put(`${this.url}/${id}`, data);
  }
}
