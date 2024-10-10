import { Component } from '@angular/core';
import { CarShop } from '../interfaces';
import { CarShopServiceService } from '../services/carshop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrl: './add-cars.component.css'
})
export class AddCarsComponent {

  CarShop:CarShop[]=[];
  CarAdded:string='';
  constructor (private CarShopService:CarShopServiceService,private toastr:ToastrService){ }

  AddCars(data:CarShop){
    this.CarShopService.AddCars(data).subscribe((result)=>{
     
     
        if (result) {
      
          this.toastr.success('Product Added Successfully', 'Success');
        } else {
          
          this.toastr.error('Product Not Added', 'Error');
        }
      },
      (error) => {
        this.toastr.error('Car Not Added', 'Error');
      });
  }
  

}
