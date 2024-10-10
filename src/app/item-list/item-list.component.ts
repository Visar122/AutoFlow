import { Component, OnInit } from '@angular/core';
import { CarShop } from '../interfaces';
import { CarShopServiceService } from '../services/carshop.service';
import { ToastrService } from 'ngx-toastr';
import { window } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {

   carlist:undefined|CarShop[];
   deletemessage:string=" ";
   constructor(private CarService:CarShopServiceService,private toastr:ToastrService){}
  
   ngOnInit(): void {
       this.list();
   }

   list(){
    this.CarService.AllCars().subscribe((result)=>{
      if(result){
        this.carlist=result;
      }
    })
   }
   
   DeleteProduct(id:number){
    const IsConfirmed=confirm('Are you sure u want to dele thisproduct')
    if(IsConfirmed){
    this.CarService.Delete(id).subscribe((data)=>{
      this.list();
      this.deletemessage="Item Removed Sucessfully."
      if(data){
    
    setTimeout(()=>{
      this.deletemessage=" ";
    },3000)
  }
  });
}

   }
}
