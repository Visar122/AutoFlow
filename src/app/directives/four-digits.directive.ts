import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appFourDigits]'
})
export class FourDigitsDirective {

  constructor() { }

  @HostListener('input',['$event']) /*does the same thing as if a made it in 1 component (input)="FourDigits($event)">  */
  FourDigits(event:Event){
   const inputElement=event.target as HTMLInputElement;

   if(inputElement.value.length>4){
    inputElement.value=inputElement.value.slice(0,4);

   }
  }

}
/*

FourDigits(event:Event){
    const InuptElement=event.target as HTMLInputElement;
     if(InuptElement.value.length > 4){
    InuptElement.value=InuptElement.value.slice(0,4);// Limit to 4 digits
  }
} 

<input type="number" name="modelYear" placeholder="Year Model" ngModel  (input)="FourDigits($event)"> 

*/