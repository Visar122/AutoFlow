import { Component, OnInit } from '@angular/core';
import { CarShop } from '../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { CarShopServiceService } from '../services/carshop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit{
  CarData:CarShop|undefined; 
  constructor(private activatedroute:ActivatedRoute,private router:Router,private carshopService:CarShopServiceService,private toastr:ToastrService){}
  ngOnInit(): void {
      let productID=this.activatedroute.snapshot.paramMap.get('id'); // gets the id from the url
     // productID &&  is a shorthand way of writing an if statement 
      productID && this.carshopService.GetCarByById(productID).subscribe((data)=>{
        this.CarData=data;
      })
  }
  submit(data2:any){
    if(this.CarData){
      data2.id=this.CarData.carId;
    }
    this.carshopService.Update(data2).subscribe((data)=>{
      if (data) {
      
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
