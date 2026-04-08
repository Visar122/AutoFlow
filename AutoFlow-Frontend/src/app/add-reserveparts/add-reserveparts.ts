import { Component } from '@angular/core';
import { SHARED } from '../shared';
import { ReserveParts } from '../interfaces';
import { ReservepartsService } from '../Services/reserveparts.service';

@Component({
  selector: 'app-add-reserveparts',
  imports: [SHARED],
  templateUrl: './add-reserveparts.html',
  styleUrl: './add-reserveparts.css',
})
export class AddReserveparts {

  successMessage = '';
  errorMessage = '';

  uploadedUrl: string[] = ['', '', ''];

   

  PartsCategory = [
    'Motor', 'Bremser','Affjedring','Udstødning','Transmission','Elektrisk','Karosseri',
    'Køling','Styring','SommerDæk','VinterDæk','HelÅrsDæk','Andet',
  ];

  CarName=[ 'BMW', 'Mercedes', 'Porsche','Audi', 'Volkswagen', 'Hyundai','Toyota', 'Honda', 'Kia', 'Mazda', 'Volvo', 'Land Rover',
    'Renault','Peugeot','Citroën','Fiat','Alfa Romeo','Skoda','Seat','Opel','Mini','Smart','Suzuki'];

  constructor(private reservePartsService: ReservepartsService) {}

  onFileChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => { this.uploadedUrl[index] = reader.result as string };
      reader.readAsDataURL(input.files[0]);
    }
  }

  submit(data: ReserveParts) {
    const payload = { ...data, imageUrl1: this.uploadedUrl[0], imageUrl2: this.uploadedUrl[1], imageUrl3: this.uploadedUrl[2] };
    this.reservePartsService.addPart(payload).subscribe({
      next: () => {
        this.successMessage = 'Del tilføjet i systemet';
        setTimeout(() => window.location.reload(), 1900);
      },
      error: () => {
        this.errorMessage = 'Error adding part';
        setTimeout(() => window.location.reload(), 1900);
      }
    });
  }
}
