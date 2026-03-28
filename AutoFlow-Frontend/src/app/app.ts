import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SHARED } from './shared';
import { LoginService } from './Services/login.service';

@Component({
  selector: 'app-root',
  imports: [SHARED],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  @ViewChild('underline')underline!:ElementRef<HTMLDivElement>;



  isLoggedIn = false;
  UserName = '';
  TheUserStatus = '';

  isdropdownOpen = false;
  constructor(private Loginservice: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.Loginservice.isLoggedIn();
    this.UserName = this.Loginservice.getUser()?.firstName ?? '';
    this.TheUserStatus = this.Loginservice.getUser()?.status ?? '';
    const logo = this.getLogoElement();
    if(logo)this.setUnderlinePosition(logo);
  }


  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

    moveUnderline(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.setUnderlinePosition(target);
  }
  resetUnderline(){
    const logo = this.getLogoElement();
    if(logo)this.setUnderlinePosition(logo);
  }
    private setUnderlinePosition(target:HTMLElement){

      const rect=target.getBoundingClientRect(); //den tager  size og position af  hovered element  
      this.underline.nativeElement.style.width=`40px`;
      this.underline.nativeElement.style.left = `${rect.left + rect.width / 2 - 20}px`; // for at flyte den til midten 
    }
   private getLogoElement():HTMLElement|null{
    return document.querySelector('.logo');

  }
   toggleDropdown(){  this.isdropdownOpen = !this.isdropdownOpen;} //! betyder den modsætte af  værdien af variblen


}
