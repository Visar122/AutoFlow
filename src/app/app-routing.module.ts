import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Shop', component: CarShopComponent },
  {path:'Repair',component:CarRepairComponent,canActivate:[AuthGuard]},
  {path:'Spraying',component:CarSprayingComponent,canActivate:[AuthGuard]},
  {path:'Polish',component:CarPolishComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent,canActivate:[AuthGuard]},
  {path:'shop',component:CarShopComponent},
  {path:'item-list',component:ItemListComponent},
  {path:'Add-Cars',component:AddCarsComponent},
  {path:'update-product/:id',component:UpdateProductComponent},
  {path:'Details/:id',component:CarDetailsComponent},
  {path:'Booking',component:BookingComponent},
  {path:'My-Bookings',component:UserBookingComponent},
  {path:'Bookings',component:AdminBookingsComponent},
  {path:'**',component:ErrorComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
