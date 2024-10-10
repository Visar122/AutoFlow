import { Component, OnInit } from '@angular/core';
import { CarShop } from '../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CarShopServiceService } from '../services/carshop.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  CarData:CarShop|undefined;
  selectedImage:string | undefined;

  constructor(private activatedRoute:ActivatedRoute,private carshopService:CarShopServiceService){}
  ngOnInit(): void {
      const ProductID=this.activatedRoute.snapshot.paramMap.get('id');
      
      ProductID && this.carshopService.GetCarByById(ProductID).subscribe((data)=>{
      this.CarData=data;
      this.selectedImage=this.CarData.image1;
      })
    

  }

  ChangeImage(newImage:string){
 this.selectedImage=newImage;
  }
 
}
