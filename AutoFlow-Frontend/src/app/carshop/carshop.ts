import { CarshopService } from './../Services/carshop.service';
import { Component } from '@angular/core';
import { SHARED } from '../shared';
import { CarShop } from '../interfaces';

@Component({
  selector: 'app-carshop',
  imports: [SHARED],
  templateUrl: './carshop.html',
  styleUrl: './carshop.css',
})
export class Carshop {

  activeTab:'cars' | 'parts' = 'cars';
  searchCar='';

  allCars:CarShop[]=[];

  sidebarOpen = false;
  filterMaxPrice: number | null = null;
  selectedCategory = '';
  selectedCarName = '';
  selectedCarModel = '';
  availableCategories: string[] = [];
  availableCarNames: string[] = [];
  availableCarModels: string[] = [];

  constructor(private carshopService:CarshopService){}

  ngOnInit(): void {
    this.carshopService.getCars().subscribe((data)=>{
      this.allCars = data;
      this.availableCategories = [...new Set(data.map(c => c.category))];
      this.availableCarNames = [...new Set(data.map(c => c.carName))];
    })
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  OnCarNameChange() {
    this.selectedCarModel = '';
    this.availableCarModels = [
      ...new Set(
        this.allCars
          .filter(c => c.carName === this.selectedCarName)
          .map(c => c.carModel)
          .filter(Boolean)
      )
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.carshopService.FilterCars(
      this.selectedCarName || undefined,
      this.selectedCarModel || undefined,
      this.selectedCategory || undefined,
      this.filterMaxPrice ?? undefined
    ).subscribe(data => { this.allCars = data; });
  }

  clearFilters() {
    this.filterMaxPrice = null;
    this.selectedCategory = '';
    this.selectedCarName = '';
    this.selectedCarModel = '';
    this.availableCarModels = [];
    this.carshopService.getCars().subscribe(data => { this.allCars = data; });
  }

  SearchCarByName(){
    if(!this.searchCar.trim()) {
      this.carshopService.getCars().subscribe((data) => { this.allCars = data; });
      return;
    }
    this.carshopService.SearchCarByName(this.searchCar).subscribe((data)=>{
      this.allCars=data;
    })
  }

  ClearSearch(){
    this.searchCar='';
    this.carshopService.getCars().subscribe((data)=>{
      this.allCars=data;
    })
  }

}
