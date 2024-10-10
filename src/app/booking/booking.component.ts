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
CheckAailability(arg0: Date,_t11: string) {
throw new Error('Method not implemented.');
}
  constructor(private toastr:ToastrService,private carshopService:CarShopServiceService){}

  today :Date=new Date();
  selectedDate:Date=new Date(this.today.setDate(this.today.getDate()+7)); //new Date() is Default to today's date

  AvaliableTimes:string[]= ['11:00', '12:30', '14:00', '15:00', '16:00']; // Time slots
  filteredTimes: string[] = this.AvaliableTimes.slice(); // This will hold available times after filtering.Initialize to all available times
  selectedTime:string|null=null; //Stores the time

  ServiceType:string[]= ['Repair','Bil-Sprøjtning','Bil-Polering'];


  UserName='';
  UserMail='';
  booking:bookings={
    BookingDate: new Date(),
    BookingTime: '',
    UserName: '',
    Servicetype: '',
    Mail: '',
    Tlf: null
  }
  
  ngOnInit(): void {
      const storeuser=localStorage.getItem('user');
      if(storeuser){
       const userData=JSON.parse(storeuser);
       this.UserName=userData.name;
       this.UserMail=userData.email;
      
        // This makes it possible so name and email are added in the database, i dont mean apper in the input but before it didnt show in the database even thoug it was on the input 
       this.booking.UserName = this.UserName;
       this.booking.Mail = this.UserMail;
      }
         
         // Call the method to check availability based on the default selected date
         this.checkAvaliableTimes();
  }
 /* private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; //  Removes time 
  }*/

  OnDateChange(event:any){
    this.selectedDate=new Date(event.target.value);
    this.booking.BookingDate = this.selectedDate 
    console.log('time:',this.booking.BookingDate)

    this.checkAvaliableTimes();
  }

  Onselectedtime(time:string){
    this.selectedTime=time;
    this.booking.BookingTime=this.ConvertStringToTime(time);   // Convert to TimeSpan format
    console.log('time:',this.booking.BookingTime)
   
  }
  private ConvertStringToTime(time:string){ //this converts the string makes it to time that works with asp.net
    const [hours,minutes]=time.split(':').map(Number)


    const formattedMinutes=minutes.toString().padStart(2,'0') //makes it because before 13:00:00 would apper as 13:0:000
    return `${hours}:${formattedMinutes}:00`; //Format as HH:mm:00
  }
 private checkAvaliableTimes(){
  const formattedDate = this.selectedDate.toISOString().split('T')[0];
    
    this.carshopService.GetAvailableTimes(formattedDate).subscribe((availableTimes:string[])=>{
      console.log('Available times:', availableTimes);
      this.filteredTimes = availableTimes; // Update filteredTimes with available times

    })
 }
  BookService(){ 
   
    console.log('Booking data:', this.booking);

    // Format the date as YYYY-MM-DD
    const formattedDate = this.selectedDate.toISOString().split('T')[0];

    if (this.selectedTime) {
      this.carshopService.CheckAailability(formattedDate, this.selectedTime).subscribe((isAvailable) => {
          if (isAvailable) {
            this.carshopService.Booking(this.booking).subscribe((result) => {
              if (result) {
                this.toastr.success(`Thanks for your Booking ${this.booking.UserName}, your booking is confirmed`);
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
    } else {
      this.toastr.error('Please select a time for your booking.');
    }
}
noLetters(event: KeyboardEvent) {
  // Allow only numeric keys
  if (event.key && !/\d/.test(event.key)) {
    event.preventDefault(); // Prevent the input


  }

}


 
}
   
