import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { login, signup } from '../interfaces';

@Component({
  selector: 'app-login',
  imports: [SHARED],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  showlogin = true;

  SignupError = '';
  LoginError = '';

  SignUpEmptyError = '';
  LoginEmptyError = '';

  signUpcharacterError = '';
  logincharacterError = '';
  UserCreated = '';

  constructor(private Userlogin: LoginService, private router: Router) {}

  ngOnInit() {
    if (this.Userlogin.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  openlogin() { this.showlogin = true;this.setpanel(false) }
  closelogin() { this.showlogin = false; this.setpanel(true) }

  private setpanel(active:boolean){
    document.getElementById('container')?.classList.toggle('right-panel-active',active);
  }

  signUp(data: signup) {
    if (!data.firstName ||!data.lastName || !data.email || !data.password) {
      this.SignUpEmptyError = 'Please fill in all required fields';
      setTimeout(() => this.SignUpEmptyError = '', 1000);
      return;
    }

    if (data.password.length < 8) {
      this.signUpcharacterError = 'Password must be at least 8 characters long';
      setTimeout(() => this.signUpcharacterError = '', 1000);
      return;
    }

    this.Userlogin.UserSignUp({ ...data, status: 'user' });

    this.Userlogin.UserAdded.subscribe(() => {
      this.UserCreated = 'Account successfully created';
      setTimeout(() => { this.UserCreated = ''; this.openlogin(); }, 1000);
    });

    this.Userlogin.signupError.subscribe(() => {
      this.SignupError = 'User already exists';
      setTimeout(() => this.SignupError = '', 1000);
    });
  }

  Login(data: login) {
    if (!data.email || !data.password) {
      this.LoginEmptyError = 'Please fill all the required fields';
      setTimeout(() => this.LoginEmptyError = '', 1000);
      return;
    }

    if (data.password.length < 8) {
      this.logincharacterError = 'Password must be at least 8 characters long';
      setTimeout(() => this.logincharacterError = '', 1000);
      return;
    }

    this.Userlogin.UserLogin(data);

    this.Userlogin.loginError.subscribe((error) => {
      if (error) {
        this.LoginError = 'Email or password is incorrect';
        setTimeout(() => this.LoginError = '', 1000);
      } else {
        this.router.navigate(['/']);
        window.location.reload();
      }
    });
  }
}
