import { Component, OnInit } from '@angular/core';
import { bookings } from '../interfaces';
import { ToastrService } from 'ngx-toastr';
import { CarShopServiceService } from '../services/carshop.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{



  selectedDate: Date = new Date();
  mindate = this.selectedDate.toISOString().split('T')[0];
  AvaliableTimes:string[]= ['11:00', '12:30', '14:00', '15:00', '16:00']; // Time slots
  filteredTimes: string[] = this.AvaliableTimes.slice(); // This will hold available times after filtering.Initialize to all available times,so it takes the times and filters them so fx it can take only 15:00 and 16:00
  selectedTime:string|null=null; //Stores the time

  ServiceType:string[]= ['Repair','Bil-Sprøjtning','Bil-Polering'];

  constructor(private toastr:ToastrService,private carshopService:CarShopServiceService){

  }

  booking:bookings={
    bookingDate: this.selectedDate,
    bookingTime: '',
    userName: '',
    servicetype: '',
    mail: '',
    tlf: null,
    createdDate: new Date() // Initialize createdDate
  }
  
  ngOnInit(): void {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        this.booking.userName = userData.name;
        this.booking.mail = userData.email;
      }
         
         // Call the method to check availability based on the default selected date
         this.checkAvaliableTimes();
  }
 /* private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; //  Removes time 
  }*/

  isWeekend(date:Date){ /* In JavaScript, the getDay() method on a Date object returns a numeric value representing the day of the week:
                         0 for Sunday
                         1 for Monday
                         2 for Tuesday
                         3 for Wednesday
                         4 for Thursday
                         5 for Friday
                         6 for Saturday*/
                         
    const day=date.getDay();
    return day===0 || day=== 6;

  }

  OnDateChange(event:any){
    const newDate=new Date(event.target.value);
    if(this.isWeekend(newDate)){
      this.toastr.error('Kan ikke Book tid i Weekend ')
      event.target.value = this.selectedDate.toISOString().split('T')[0]; // Reset to the previous valid date
      return;
    }



    this.selectedDate = newDate; // Update selected date
    this.checkAvaliableTimes();
    
    // When you pick a date and update this.selectedDate  = newDate;, it tells the component to look for available times just for that date.
// So, when we call checkAvailableTimes(), it uses this.selectedDate to get times specifically for that day.
// If the user picks a time, like 12:00 on the chosen date, the component checks if that time is available for just that date.
  }

  selectTime(time:string){
    this.selectedTime = time;
    this.booking.bookingTime = `${time}:00`; // Ensure ASP.NET-compatible format
   
  }


 private checkAvaliableTimes(){
  const formattedDate = this.selectedDate.toISOString().split('T')[0];
    
    this.carshopService.GetAvailableTimes(formattedDate).subscribe((times)=>(this.filteredTimes=times),

    (error: any)=>{
      console.error('Error fetching available times:', error);
      this.toastr.error('Could not retrieve available times');
    }
    );
 }
  BookService(){ 
    if (!this.selectedTime) {
      this.toastr.error('Please select a time for your booking.');
      return;
    }
    console.log('Booking data:', this.booking);

    // Format the date as YYYY-MM-DD
    const formattedDate = this.selectedDate.toISOString().split('T')[0];
    this.booking.bookingDate = new Date(formattedDate);  // Ensures correct date

    if (this.selectedTime) {
      this.carshopService.CheckAailability(formattedDate, this.selectedTime).subscribe((isAvailable) => {
          if (isAvailable) {
            this.carshopService.Booking(this.booking).subscribe((result) => {
              if (result) {
                this.toastr.success(`Thanks for your Booking ${this.booking.userName}, your booking is confirmed`);
              } else {
                this.toastr.error('Booking not confirmed. Please try again.');
              }
            });
          } else {
            this.toastr.error('The selected time is not available. Please choose another time.');
          }
        },
        (error) => {
          this.toastr.error('Error checking availability. Please try again.');
          console.error('Error checking availability:', error);
        }
      );
      }
}
noLetters(event: KeyboardEvent) {
  // Allow only numeric keys
  if (event.key && !/\d/.test(event.key)) {
    event.preventDefault(); // Prevent the input


  }

}


 
}
   
