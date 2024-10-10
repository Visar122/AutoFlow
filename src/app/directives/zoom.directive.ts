import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective implements OnInit {
  ngOnInit(): void {
      this.onWindowScroll()
  }

  constructor(private el:ElementRef) { }// ElementRef or connects it just gives acess to manipulate with the html div or element

// HostListener listens for the 'scroll' event on the window
  @HostListener('window:scroll',['$event'])
  onWindowScroll(event?: Event) { //event makes it so the method exepts an event (e.g., clicks, key presses)
    // event ?runs even if it is  empty or so something dosent need to be added 
      // Get the element to which the directive is applied
      const element = this.el.nativeElement;
       
      //Native elements makes  lets u  u style or manipulate the actual element
      this.el.nativeElement.classList.add('zoom'); // so inside the div which the diractive is called im adding a zoom class
      // Apply zoom-in effect when window scrollY is greater than 100px
      if (window.scrollY > 100) {
        element.classList.add('zoomed-in');
        element.classList.remove('zoomed-out');
      } else {
        element.classList.add('zoomed-out');
        element.classList.remove('zoomed-in');
      }
    }
  }