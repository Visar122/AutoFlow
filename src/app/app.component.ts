import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'AutoFlow';

  isSticky:boolean=false;
  userOnline="";
  UserName="";
  TheUserStatus="";
  isWindowOpen:boolean=false;
  isDropDownOpen:boolean=false;


constructor(private route:Router,private UserLogin:LoginService){}
  @ViewChild('underline') underline:ElementRef | undefined; // Reference to the underline element, it can be undefined if the element is not found

ngOnInit(): void {
this.onWindowScroll();
const logoElement = this.getLogoElement() ;// Get the logo element after view initialization
    if (logoElement) {
      this.setUnderlinePosition(logoElement); // Set the underline under the logo initially
    }
    this.checkUserStatus();
       this.userStatus();
  }
  @HostListener('window:scroll',[])
  onWindowScroll(){
    this.isSticky = window.pageYOffset > 0;
  }

  windowtoggle() {
    this.isWindowOpen = !this.isWindowOpen;
  }
  @HostListener('document:click',['$event'])
  CloseWindow(event:MouseEvent){
    const menuicon=document.querySelector('.menu-icon');

    if(!menuicon?.contains(event.target as Node)){
      this.isWindowOpen=false;
    }

  }


  private getLogoElement(): HTMLElement | null { 
    return document.querySelector('.navbar-logo img');  // Return the logo  // basically returns the underline to logo if it is not pointing in the list 
  }

  moveUnderline(event: MouseEvent)  {
    const target = event.target as HTMLElement; // Cast the event target to HTMLElement
    if (target) {
      this.setUnderlinePosition(target);  // Set the underline position to the target element
    }

  }

  private setUnderlinePosition(element: HTMLElement) {
    const rect = element.getBoundingClientRect(); // Get the bounding rectangle of the element
    const containerRect = document.querySelector('.navbar-container')!.getBoundingClientRect();  // Get the bounding rectangle of the navbar container
    if (this.underline && this.underline.nativeElement) {
      const underlineWidth = 40; // Fixed width for the underline in pixels (adjust as needed)
      const leftOffset = rect.left + (rect.width / 2) - (underlineWidth / 2) - containerRect.left; // Center the underline under the target element

      this.underline.nativeElement.style.left = `${leftOffset}px`; // Set the left position of the underline
      this.underline.nativeElement.style.width = `${underlineWidth}px`; // Set the fixed width of the underline
      
    }
  }

  @HostListener('document:mouseover', ['$event'])
  onDocumentMouseOver(event: MouseEvent) {
    // Reset the underline to the logo when hovering outside the navbar items
    const target = event.target as HTMLElement;// Cast the event target to HTMLElement
    const isNavbarItem = target.closest('.navbar-container'); // Check if the target is within the navbar container
    if (!isNavbarItem) {
      const logoElement = this.getLogoElement();// Get the logo element
      if (logoElement) {
        this.setUnderlinePosition(logoElement);  // Reset the underline to the logo
      }
    }
  }

private checkUserStatus() {
   //User Login

    // Check if the user is logged in
    this.UserLogin.userisLoggedIn.subscribe(isLoggedIn=>{ // here i use  userisLoggedIn to controll if  the user is logged in so if its true in service that means i logged in  a user 
      this.userOnline=isLoggedIn? 'online':'offline'; //basically if its true is online if its false than offline
      if(isLoggedIn){
        const storeUser=localStorage.getItem("user");
        if(storeUser){
          const UserData=JSON.parse(storeUser);
          this.UserName=UserData.name; //this is to get the name 
        }
      }
    });
      // Check for existing user in localStorage on app initialization
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    this.UserLogin.userisLoggedIn.next(true);
  } else {
    this.UserLogin.userisLoggedIn.next(false);
  }
}

logout(){
  localStorage.removeItem('user');
  this.UserLogin.userisLoggedIn.next(false);
  
}
toggleDropDown(){
  this.isDropDownOpen=!this.isDropDownOpen;

}
/*@HostListener('document:click',['$event'])
CloseToggleDropDown(event:MouseEvent)
{
  const dropdown = document.querySelector('.dropdown-menu');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    this.isDropDownOpen=false;
  }
}*/

//User Status 
userStatus(){
   const getUser=localStorage.getItem('user');
   if(getUser){
    const userData=JSON.parse(getUser);
    this.TheUserStatus=userData.status;
   
 
   }
  
}
}
