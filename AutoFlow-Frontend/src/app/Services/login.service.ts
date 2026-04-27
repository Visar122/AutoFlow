import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { login, signup } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  UserAdded = new Subject<boolean>();
  signupError = new Subject<boolean>();
  loginError = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private decodeToken(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1].replaceAll('-', '+').replaceAll('_', '/')));
    } catch {
      return null;
    }
  }

  getRoleFromToken(): string | null {
    return this.decodeToken()?.['role'] ?? null;
  }

  getUser() {
    const payload = this.decodeToken();
    if (!payload) return null;
    return {
      email: payload['email'],
      firstName: payload['firstName'],
      lastName: payload['lastName'],
      carPlate: payload['carPlate'],
      carPlate2: payload['carPlate2']
    };
  }

 

  UserSignUp(data: signup) {
    this.http.post('https://localhost:7069/api/Users/SignUp', data, { observe: 'response' }).subscribe({
      next: () => this.UserAdded.next(true),
      error: () => this.signupError.next(true),
    });
  }

  UserLogin(data: login) {
    this.http.post<any>('https://localhost:7069/api/Users/Logins', data, { observe: 'response' }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.body.token);
        this.loginError.next(false);
      },
      error: () => this.loginError.next(true),
    });
  }
  
  GetMyInfo(email:string){
    return this.http.get(`https://localhost:7069/api/Users/GetMyInfo?mail=${email}`);
  }

  UpdateInfo(data: any) {
    return this.http.put(`https://localhost:7069/api/Users/UpdateInfo`, data);
  }
  
  GetAllUsers(){
    return this.http.get<any[]>(`https://localhost:7069/api/Users/GetAllUsers`);
  }

  SearchUsers(search: string) {
    return this.http.get<any[]>(`https://localhost:7069/api/Users/SearchUsers?search=${search}`);
  }

  UpdateUserStatus(email: string, status: string) {
    return this.http.put(`https://localhost:7069/api/Users/UpdateStatus`, { email, status });
  }

  DeleteUser(email: string) {
    return this.http.delete(`https://localhost:7069/api/Users/DeleteUser?email=${email}`);
  }
}
