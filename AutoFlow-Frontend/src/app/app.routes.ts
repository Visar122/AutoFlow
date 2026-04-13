import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { loginPageGuard, adminGuard, userGuard } from './guards/auth.guard';
import { Booking } from './booking/booking';
import { Carshop } from './carshop/carshop';

import { BookingList } from './booking-list/booking-list';
import { BookingsUser } from './bookings-user/bookings-user';
import { AddCars } from './add-cars/add-cars';
import { ReservePartsComponent } from './reserve-parts/reserve-parts';
import { AddReserveparts } from './add-reserveparts/add-reserveparts';
import { ItemList } from './item-list/item-list';
import { MyAccount } from './my-account/my-account';
import { BookingDetails } from './booking-details/booking-details';
import { Carshopdetails } from './carshopdetails/carshopdetails';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'Home', component: Home },
  { path: 'login', component: Login, canActivate: [loginPageGuard] },
  { path:'booking', component: Booking},
  { path:'carshop', component: Carshop},
  { path:'reserveParts', component: ReservePartsComponent},
  { path:'booking-list', component: BookingList, canActivate: [adminGuard]},
  { path:'bookings-user', component: BookingsUser, canActivate: [userGuard]},
  {path:'add-cars',component:AddCars, canActivate: [adminGuard]},
    {path:'add-reserveparts',component:AddReserveparts, canActivate: [adminGuard]},
    {path:'item-list',component:ItemList, canActivate: [adminGuard]},
    { path:'my-account', component: MyAccount},
    { path:'booking-details/:id', component: BookingDetails, canActivate: [adminGuard]},
    { path:'carshopdetails/:id', component: Carshopdetails},

];
