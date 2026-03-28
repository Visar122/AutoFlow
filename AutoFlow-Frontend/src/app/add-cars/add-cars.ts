import { CarshopService } from './../Services/carshop.service';
import { Component } from '@angular/core';
import { SHARED } from '../shared';
import { CarShop } from '../interfaces';


@Component({
  selector: 'app-add-cars',
  imports: [SHARED],
  providers: [],
  templateUrl: './add-cars.html',
  styleUrl: './add-cars.css',
})
export class AddCars {

  successMessage = '';
  errorMessage = '';

  CarCategory=[
    'Sedan',
    'SUV',
    'station bil',
    'Coupe',
    'Cabriolet',
    'Varevogn',
    'Pickup truck',
    'Sportsvogn',
    'Elbil',
    'Hybrid',
    'Luksusbil',
    'Lastbil',
  ]
  // Holder de 3 images  som base64 strings efter de bliver valgt
  uploadedUrl:string[]=["","",""];


  constructor(private carshopService:CarshopService) {}

  // bliver kaldt når burgeren vælger en  file — læser den og laver den til base64 string
  onFileChange(event:Event,index:number){
    const input=event.target as HTMLInputElement;
    if(input.files && input.files[0]){ // tjekker hvis brugen har lagt en fil 
      const reader = new FileReader(); // den læser filen 
      reader.onload = () => { this.uploadedUrl[index] = reader.result as string }; // reader.result — inholder  base64 string af image og as string gemmer den som string,så onload giver mulighedhen at lave noget mens filen bliver læst
      reader.readAsDataURL(input.files[0]); // start reading the file and convert it to base64
    }
  }


  submit(data: CarShop){
    const payload = { ...data, imageUrl1: this.uploadedUrl[0], imageUrl2: this.uploadedUrl[1], imageUrl3: this.uploadedUrl[2] };
    this.carshopService.AddCars(payload).subscribe({
      next: () => { this.successMessage = 'Bilen er tilføjet i systemet'; 
        setTimeout(() => window.location.reload(), 1900)
      }
      
      ,
      error: () => { this.errorMessage = 'Error adding car';

         setTimeout(() => window.location.reload(), 1900)
       }
    });
  }
}
