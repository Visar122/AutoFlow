import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


import { login, signup } from '../interfaces';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private route:Router) {}

     UserAdded=new  EventEmitter<boolean>(false);
     signupError= new  EventEmitter<boolean>(false);
     loginError=new EventEmitter<boolean>(false);
     userisLoggedIn=new BehaviorSubject<boolean>(false);



     UserSignUp(data:signup){

        return this.http.post('https://localhost:7204/api/Logins/SignUp',data,{observe:'response'}).subscribe((result)=>{
             if(result){
              this.UserAdded.emit(true);
             }  else{
              this.http.get(`https://localhost:7204/api/Logins/UserExists?email=${data.email}`,{observe:'response'}).subscribe((result)=>{
                
              if(result){
                 this.signupError.emit(true);
              }
              });
              }
       });
      
  

      }
      reloadUser(){
        if(localStorage.getItem('user')){
          this.userisLoggedIn.next(true);
        }
        else {
          this.userisLoggedIn.next(false);
        }
    
      }

      UserLogin(data:login){
        this.http.get(`https://localhost:7204/api/Logins/Logins?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
          if(result&&result.body &&result.body){
           this.loginError.emit(false);
            localStorage.setItem('user',JSON.stringify(result.body));
            this.route.navigate(['Home']);
            this.userisLoggedIn.next(true);
            
          }    else{
            this.loginError.emit(true);
          
          }
      
        });
        
      }
}
