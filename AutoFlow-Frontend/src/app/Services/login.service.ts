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
    return !!localStorage.getItem('user');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

 

  UserSignUp(data: signup) {
    this.http.post('https://localhost:7069/api/Logins/SignUp', data, { observe: 'response' }).subscribe({
      next: () => this.UserAdded.next(true),
      error: () => this.signupError.next(true),
    });
  }

  UserLogin(data: login) {
    this.http.post<any>('https://localhost:7069/api/Logins/Logins', data, { observe: 'response' }).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.body));
        this.loginError.next(false);
      },
      error: () => this.loginError.next(true),
    });
  }
}
