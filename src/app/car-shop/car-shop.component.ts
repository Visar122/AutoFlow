import { Component, ElementRef, Host, HostListener, OnInit, ViewChild, viewChild } from '@angular/core';
import { CarShop } from '../interfaces';
import { CarShopServiceService } from '../services/carshop.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-shop',
  templateUrl: './car-shop.component.html',
  styleUrl: './car-shop.component.css',


})
export class CarShopComponent implements OnInit{
  isSidebarVisable:boolean=false;
  carTypes: string[] = []; // Initialize with empty array
  selectedPrice:number=10000;
  selectedCarType: string = ''; // To store selected car type
  carshop: CarShop[] = [];
  ShowCarsAfterNoCarsErrorShows: CarShop[] = [];
  NoCars: boolean = false;

//Search
  isSearchopen:boolean=false;
  searchquery="";

  
 constructor(private carService:CarShopServiceService,private toastr:ToastrService){}

  ngOnInit(): void {
   this.carService.AllCars().subscribe((data:CarShop[])=>{
        if(data.length>0){
          this.carshop=data;
          this.ShowCarsAfterNoCarsErrorShows=data;
        }

       
   })
   this.carService.OnlyCarTypes().subscribe((data:string[])=>{
    this.carTypes=data;

  })
 
  
  }

  //Sidebar
  toggleSidebar(){
   this.isSidebarVisable=!this.isSidebarVisable;  //!this.isSidebarVisable akes the current value of isSidebarVisable and flips it.
   // So when this is called if  isSidebarVisable is true  it makes it false  or if its false it makes it true when u call or click it 

  }
  //@HostListener('document:click', ['$event']):
  //document:click: This tells Angular to listen for any click event (click) that happens
  @HostListener('document:click',['$event'])  //['$event']: This part is  the event object (which contains information about the click)
  ClickOutSidebar(event:MouseEvent){  //event: MouseEvent: This is the function that gets called whenever there’s a click event. The event parameter is an object that contains details about the click, like where it happened.
    const sidebar=document.querySelector('.sidebar'); 
    const btn=document.querySelector('.btn1');
    if (sidebar && !sidebar.contains(event.target as Node) && !btn?.contains(event.target as Node)) {
      this.isSidebarVisable = false;

     // sidebar &&: This checks if the sidebar element actually exists. If it doesn’t, there’s no need to continue.

    //!sidebar.contains(event.target as Node): This checks if the clicked element (event.target) is not inside the sidebar. so it dosent go out if it i click inside the sidebar.

   //!btn?.contains(event.target as Node): This checks if the clicked element is not the button (.btn1) or inside it. 
     //so basically when sortby button is clicked it dosent  remove the sidebar or affect it ,  btn1 is the button that oppens sidebar
    }

  }
  resetSidebar(): void {
    this.selectedPrice = 10000; // Set to the default minimum price
    this.carService.AllCars().subscribe((data:CarShop[])=>{
      if(data.length>0){
        this.carshop=data;
        this.ShowCarsAfterNoCarsErrorShows=data;
      }

     
 })
 this.toggleSidebar();
  }
    
  
  filterByCarType(type: string) {
    this.selectedCarType=type; // did this so i  can get and sort cars price by cartype 
    this.carService.CarsByCarType(type).subscribe((data: CarShop[]) => {
      this.carshop = data;
      this.toggleSidebar();
      
    }, (error) => {
      console.error('Error fetching cars by type:', error);
    });
  }

 // Fetch cars closest to the selected price and filter by type
 GetCarsClosestPrice() {
  this.carService.ClosestPrice(this.selectedPrice).subscribe(
    (data: CarShop[]) => {
      if (this.selectedCarType) {
        // Filter cars by the selected car type on the frontend
        this.carshop = data.filter(car => car.cartype === this.selectedCarType);
      } else {
        this.carshop = data; // No type filtering, show all cars closest to the price
      }
      this.IfNoCarsFound();
      this.toggleSidebar();
    },
   
  );
}

// Fetch cars below the selected price and filter by type
getCarsBelowPrice() {
  this.carService.BelowPrice(this.selectedPrice).subscribe(
    (data: CarShop[]) => {
      if (this.selectedCarType) {
        // Filter cars by the selected car type on the frontend
        this.carshop = data.filter(car => car.cartype === this.selectedCarType);
      } else {
        this.carshop = data; // No type filtering, show all cars below the price
      }
      this.IfNoCarsFound();
      this.toggleSidebar();
    }
  );
}
//To check if there are no cars found
// need to call it in  other methods  else it wont take the  carshop.length from them when they are called 
IfNoCarsFound(){
  if(this.carshop.length === 0){
    this.NoCars = true;




   setTimeout(() => {
    this.NoCars = false; // Hide the "No cars" message
    this.carshop=this.ShowCarsAfterNoCarsErrorShows;
  }, 2000); // Duration should match the toastr timeout
} else {
  this.NoCars = false; // Ensure the "No cars" message is hidden if cars are found
}
}
//Search
openSearch(){
  this.isSearchopen=true;
}
closeSearch(){
  this.isSearchopen=false;
  this.carshop = this.ShowCarsAfterNoCarsErrorShows;
}

  
    Search() {
      if (this.searchquery) {
        this.carService.SearchCars(this.searchquery).subscribe((data: CarShop[]) => {
          if (data && data.length > 0) {
            this.carshop = data;
            this.IfNoCarsFound(); // This might be called if no cars are found based on your function's logic
          } else {
            // Handle case when no cars are found
            this.IfNoCarsFound(); // You can modify this if you need a different behavior
          }
        });
      } else {
        // If search query is empty, show all cars or handle as needed
        this.carshop = this.ShowCarsAfterNoCarsErrorShows;
      }
    }
  }
