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
            
                
             // Handle error cases
        if (result.status === 200) {
          // Conflict error (e.g., email already exists)
          this.UserAdded.emit(true);
        } 
      },
      (error)=> {
         if(error.status===409){
          this.signupError.emit(true);
         }
      }
      );
      };
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
          if(result&&result.body &&result.body ){
           this.loginError.emit(false);
            localStorage.setItem('user',JSON.stringify(result.body));
            this.route.navigate(['Home']);
            this.userisLoggedIn.next(true);
            
          }  
          },(error)=>{
            if(error.status===404){
            this.loginError.emit(true);
          
          }
      
        });
        
      }
}
