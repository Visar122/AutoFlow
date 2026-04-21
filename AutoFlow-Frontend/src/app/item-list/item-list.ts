import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { CarshopService } from '../Services/carshop.service';
import { ReservepartsService } from '../Services/reserveparts.service';
import { CarShop, ReserveParts } from '../interfaces';

@Component({
  selector: 'app-item-list',
  imports: [SHARED],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList implements OnInit {

  activeTab: 'cars' | 'parts' = 'cars';

  FuelTypes = ['Benzin', 'Diesel', 'Elektrisk', 'Hybrid', 'Plugin-hybrid', 'Brint'];
  GearTypes = ['Automatik', 'Manuel'];

  cars: CarShop[] = [];
  parts: ReserveParts[] = [];

  editingCar: CarShop | null = null;
  editingPart: ReserveParts | null = null;


  carImages: string[] = ['', '', ''];
  partImages: string[] = ['', '', ''];


  constructor(
    private carService: CarshopService,
    private partsService: ReservepartsService
  ) {}

  ngOnInit() {
    this.loadCars();
    this.loadParts();
  }

  loadCars() {
    this.carService.getCars().subscribe(data => this.cars = data);
  }

  loadParts() {
    this.partsService.getParts().subscribe(data => this.parts = data);
  }

  deleteCar(id: number) {
    if (!confirm('Slet denne bil?')) return;
    this.carService.deleteCar(id).subscribe(() => this.loadCars());
  }

  deletePart(id: number) {
    if (!confirm('Slet denne reservedel?')) return;
    this.partsService.deletePart(id).subscribe(() => this.loadParts());
  }

  editCar(car: CarShop) {
    this.editingCar = { ...car };
    this.carImages = ['', '', ''];
  
  }

  editPart(part: ReserveParts) {
    this.editingPart = { ...part };
    this.partImages = ['', '', ''];

  }

  onCarImageChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => { this.carImages[index] = reader.result as string; };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onPartImageChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => { this.partImages[index] = reader.result as string; };
      reader.readAsDataURL(input.files[0]);
    }
  }

  saveCar() {
    if (!this.editingCar) return;
    const payload = {
      ...this.editingCar,
      imageUrl1: this.carImages[0] || this.editingCar.imageUrl1,
      imageUrl2: this.carImages[1] || this.editingCar.imageUrl2,
      imageUrl3: this.carImages[2] || this.editingCar.imageUrl3,
      imageUrl4: this.carImages[3] || this.editingCar.imageUrl4,
    };
    this.carService.updateCar(this.editingCar.carId, payload).subscribe(() => {
      this.editingCar = null;
      this.loadCars();
    });
  }

  savePart() {
    if (!this.editingPart) return;
    const payload = {
      ...this.editingPart,
      imageUrl1: this.partImages[0] || this.editingPart.imageUrl1,
      imageUrl2: this.partImages[1] || this.editingPart.imageUrl2,
      imageUrl3: this.partImages[2] || this.editingPart.imageUrl3,
    };
    this.partsService.updatePart(this.editingPart.id, payload).subscribe(() => {
      this.editingPart = null;
      this.loadParts();
    });
  }
}
