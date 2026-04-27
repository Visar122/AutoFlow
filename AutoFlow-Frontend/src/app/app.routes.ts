import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { loginPageGuard, adminGuard, AdminsGuard, loggedInGuard } from './guards/auth.guard';
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
import { Reservepartsdetails } from './reservepartsdetails/reservepartsdetails';
import { Users } from './users/users';
import { MyOrders } from './my-orders/my-orders';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'Home', component: Home },
  { path: 'login', component: Login, canActivate: [loginPageGuard] },
  { path:'booking', component: Booking},
  { path:'carshop', component: Carshop},
  { path:'reserveParts', component: ReservePartsComponent},
  { path:'booking-list', component: BookingList, canActivate: [AdminsGuard]},
  { path:'bookings-user', component: BookingsUser, canActivate: [loggedInGuard]},
  {path:'add-cars',component:AddCars, canActivate: [AdminsGuard]},
    {path:'add-reserveparts',component:AddReserveparts, canActivate: [AdminsGuard]},
    {path:'item-list',component:ItemList, canActivate: [AdminsGuard]},
    { path:'my-account', component: MyAccount},
    { path:'booking-details/:id', component: BookingDetails, canActivate: [AdminsGuard]},
    { path:'carshopdetails/:id', component: Carshopdetails},
        { path:'reservepartsdetails/:id', component: Reservepartsdetails},
        {path:'AllUsers',component: Users, canActivate: [adminGuard]},
        {path:'my-orders', component: MyOrders}

];
