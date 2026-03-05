import { Routes,RouterModule } from '@angular/router';
import { Home } from './home/home'; 
import { Login } from './login/login';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'Home', component:Home},
     {path:'login',component:Login},
     


];
