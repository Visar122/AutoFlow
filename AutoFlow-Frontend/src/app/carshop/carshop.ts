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
  Cars:CarShop[]=[];

  sidebarOpen = false;
  filterName = '';
  filterMaxPrice: number | null = null;
  selectedCategory = '';
  selectedCarName = '';
  availableCategories: string[] = [];
  availableCarNames: string[] = [];

  constructor(private carshopService:CarshopService){}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  applyFilters() {
    this.carshopService.FilterCars(
      this.selectedCarName || undefined,
      this.selectedCategory || undefined,
      undefined,
      this.filterMaxPrice ?? undefined
    ).subscribe(data => { this.Cars = data; });
  }

  clearFilters() {
    this.filterMaxPrice = null;
    this.selectedCategory = '';
    this.selectedCarName = '';
    this.carshopService.getCars().subscribe(data => { this.Cars = data; });
  }

  SearchCarByName(){
    if(!this.searchCar.trim()) {
      this.carshopService.getCars().subscribe((data) => { this.Cars = data; });
      return;
    }
    this.carshopService.SearchCarByName(this.searchCar).subscribe((data)=>{
      this.Cars=data;
    })
  }

  ClearSearch(){
    this.searchCar='';
    this.carshopService.getCars().subscribe((data)=>{
      this.Cars=data;
    })
  }

  ngOnInit(): void {
    this.carshopService.getCars().subscribe((data)=>{
      this.Cars=data;
      this.availableCategories = [...new Set(data.map(c => c.category))];
      this.availableCarNames = [...new Set(data.map(c => c.carName))];
    })
  }
}
