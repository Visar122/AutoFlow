import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarRepairComponent } from './car-repair/car-repair.component';
import { CarShopComponent } from './car-shop/car-shop.component';
import { LoginComponent } from './login/login.component';
import { CarSprayingComponent } from './car-spraying/car-spraying.component';
import { CarPolishComponent } from './car-polish/car-polish.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ItemListComponent } from './item-list/item-list.component';
import { AddCarsComponent } from './add-cars/add-cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ZoomDirective } from './directives/zoom.directive';
import { UpdateProductComponent } from './update-product/update-product.component';
import { FourDigitsDirective } from './directives/four-digits.directive';
import { BookingComponent } from './booking/booking.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarRepairComponent,
    CarShopComponent,
    LoginComponent,
    CarSprayingComponent,
    CarPolishComponent,
    ItemListComponent,
    AddCarsComponent,
    CarDetailsComponent,
    ZoomDirective,
    UpdateProductComponent,
    FourDigitsDirective,
    BookingComponent,
    UserBookingComponent,
    AdminBookingsComponent,
    ErrorComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SlickCarouselModule,
    NgbCarouselModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule, // Toastr required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      closeButton: true,

    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
