import { AfterViewInit, Component, OnInit } from '@angular/core';
import { login, signup } from '../interfaces';
import { LoginService } from '../services/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected here
})
export class LoginComponent implements OnInit {
  showlogin = true;
  SignupError = '';
  LoginError = '';
  SignUpEmptyError = '';
  LoginEmptyError = '';
  signUpcharacterError = '';
  logincharacterError = '';
  UserCreated = '';

  constructor(private Userlogin: LoginService,private route:Router) {}

  ngOnInit(): void {
    this.eventlistener();
    this.Userlogin.reloadUser();

    
  }

  openlogin() {
    this.showlogin = true;
    this.removepanel();
  }

  closelogin() {
    this.showlogin = false;
    this.addpanel();
  }

  addpanel() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.add('right-panel-active');
    }
  }

  removepanel() {
    const container = document.getElementById('container');
    if (container) {
      container.classList.remove('right-panel-active');
    }
  }

  eventlistener() {
    const loginbutton = document.getElementById('login');
    const container = document.getElementById('container');

    if (loginbutton && container) {
      loginbutton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });
    }
  }

  signUp(data: any) {
    if (!data.name || !data.email || !data.password) {
      this.SignUpEmptyError = 'Please fill in all required fields';

      setTimeout(() => {
        this.SignUpEmptyError = '';
      }, 1000);
      return;
    }

    if (data.password.length < 8) {
      this.signUpcharacterError = 'Password must be at least 8 characters long';
      setTimeout(() => {
        this.signUpcharacterError = '';
      }, 1000);
      return;
    }
    
      // Ensure the status is set to "user" by default
      const signUpData: signup = {
        ...data,  // Spread the existing data
        status: 'user'  // Explicitly set the status to "user"
    };

    this.Userlogin.UserSignUp(signUpData); //storing and calling  singupData to UserSignup method in login service
    this.Userlogin.UserAdded.subscribe((usercreated)=>{
      if(usercreated){ 
      this.UserCreated="Account Sucsessfully created "
    }
    setTimeout(() => {
      this.UserCreated = '';
    }, 1000);
     
    setTimeout(() => {
      this.openlogin();
    }, 1000);
    })
    this.Userlogin.signupError.subscribe((error) => {
      if (error) {
        this.SignupError = 'User you entered already exists';

        setTimeout(() => {
          this.SignupError = '';
        }, 1000);
      }
    });
  }

  Login(data: login) {
    if (!data.email || !data.password) {
      this.LoginEmptyError = 'Please fill all the required fields';
      setTimeout(() => {
        this.LoginEmptyError = '';
      }, 1000);
      return;
    }

    if (data.password.length < 8) {
      this.logincharacterError = 'Password must be at least 8 characters long';

      setTimeout(() => {
        this.logincharacterError = '';
      }, 1000);
      return;
    }
    

    this.Userlogin.UserLogin(data);

    this.Userlogin.loginError.subscribe((error) => {
       if(error){ 
        this.LoginError = 'Email or password is incorrect';
        setTimeout(() => {
          this.LoginError = '';
        }, 1000);
      
        return;
      }else{
       setTimeout(()=>{
        window.location.reload();
       },200)
     
      }
    });
  }
}


/* openlogin() and closelogin(): These methods toggle the showlogin variable and call methods to add or remove the CSS class right-panel-active,
                                         which controls the display of forms.*/