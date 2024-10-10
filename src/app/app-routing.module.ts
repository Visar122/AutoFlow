import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarRepairComponent } from './car-repair/car-repair.component';
import { CarShopComponent } from './car-shop/car-shop.component';
import { CarSprayingComponent } from './car-spraying/car-spraying.component';
import { CarPolishComponent } from './car-polish/car-polish.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Shop', component: CarShopComponent },
  {path:'Repair',component:CarRepairComponent},
  {path:'Spraying',component:CarSprayingComponent},
  {path:'Polish',component:CarPolishComponent},
  {path:'login',component:LoginComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
