import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { ReserveParts } from '../interfaces';
import { ReservepartsService } from '../Services/reserveparts.service';

@Component({
  selector: 'app-reserve-parts',
  imports: [SHARED],
  templateUrl: './reserve-parts.html',
  styleUrl: './reserve-parts.css',
})
export class ReservePartsComponent implements OnInit {
  activeTab: 'cars' | 'parts' = 'parts';

  searchPart = '';

  parts: ReserveParts[] = [];
  allParts: ReserveParts[] = [];

  sidebarOpen = false;
  filterMaxPrice: number | null = null;
  selectedCategory = '';
  selectedCarName = '';
  selectedCarModel = '';
  availableCategories: string[] = [];
  availableCarNames: string[] = [];
  availableCarModels: string[] = [];

  constructor(private reservePartsService: ReservepartsService) {}

  ngOnInit() {
    this.reservePartsService.getParts().subscribe((data) => {
      this.parts = data;
      this.allParts = data;
      this.availableCategories = [...new Set(data.map(p => p.category))];
      this.availableCarNames = [...new Set(data.map(p => p.carName))];
    });
  }

  onCarNameChange() {
    this.selectedCarModel = '';
    this.availableCarModels = [
      ...new Set(
        this.allParts
          .filter(p => p.carName === this.selectedCarName)
          .map(p => p.carModel)
          .filter(Boolean)
      )
    ];
    this.applyFilters();
  }

  applyFilters() {
    this.reservePartsService.FilterParts(
      this.selectedCarName || undefined,
      this.selectedCarModel || undefined,
      this.selectedCategory || undefined,
      this.filterMaxPrice ?? undefined
    ).subscribe(data => { this.parts = data; });
  }

  clearFilters() {
    this.filterMaxPrice = null;
    this.selectedCategory = '';
    this.selectedCarName = '';
    this.selectedCarModel = '';
    this.availableCarModels = [];
    this.reservePartsService.getParts().subscribe(data => { this.parts = data; });
  }

  SearchPartByName() {
    if (!this.searchPart.trim()) {
      this.reservePartsService.getParts().subscribe((data) => { this.parts = data; });
      return;
    }
    this.reservePartsService.SearchPartByName(this.searchPart).subscribe((data) => {
      this.parts = data;
    });
  }

  ClearSearch() {
    this.searchPart = '';
    this.reservePartsService.getParts().subscribe((data) => { this.parts = data; });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
