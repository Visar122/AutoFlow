import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';


@Injectable({
  providedIn:'root'
})
export class AuthGuard  implements CanActivate{

  constructor(private route:Router){}
  canActivate(): boolean{
    // Check if the user is not  logged in 
   
    const isLoggedIn=!localStorage.getItem('user');
    if(isLoggedIn){
      return true;
    }else{
 // Redirect to Home and not give acces to login  page if  logged in
      this.route.navigate(['/Home']);
      return false;
    }
  }
}

