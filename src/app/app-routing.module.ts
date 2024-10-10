import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarRepairComponent } from './car-repair/car-repair.component';
import { CarShopComponent } from './car-shop/car-shop.component';
import { CarSprayingComponent } from './car-spraying/car-spraying.component';
import { CarPolishComponent } from './car-polish/car-polish.component';
import { LoginComponent } from './login/login.component';
import { ItemListComponent } from './item-list/item-list.component';
import { AddCarsComponent } from './add-cars/add-cars.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { BookingComponent } from './booking/booking.component';
import { UserBookingComponent } from './user-booking/user-booking.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Shop', component: CarShopComponent },
  {path:'Repair',component:CarRepairComponent},
  {path:'Spraying',component:CarSprayingComponent},
  {path:'Polish',component:CarPolishComponent},
  {path:'login',component:LoginComponent},
  {path:'shop',component:CarShopComponent},
  {path:'item-list',component:ItemListComponent},
  {path:'Add-Cars',component:AddCarsComponent},
  {path:'update-product/:id',component:UpdateProductComponent},
  {path:'Details/:id',component:CarDetailsComponent},
  {path:'Booking',component:BookingComponent},
  {path:'My-Bookings',component:UserBookingComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
