import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SHARED } from './shared';

@Component({
  selector: 'app-root',
  imports: [SHARED],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{


  @ViewChild('underline')underline!:ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    const logo = this.getLogoElement();
    if(logo)this.setUnderlinePosition(logo);
  }
    moveUnderline(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.setUnderlinePosition(target);
  }
  resetUnderline(){
    const logo = this.getLogoElement();
    if(logo)this.setUnderlinePosition(logo);
  }
    private setUnderlinePosition(target:HTMLElement){

      const rect=target.getBoundingClientRect(); //den tager  size og position af  hovered element  
      this.underline.nativeElement.style.width=`40px`;
      this.underline.nativeElement.style.left = `${rect.left + rect.width / 2 - 20}px`; // for at flyte den til midten 
    }
   private getLogoElement():HTMLElement|null{
    return document.querySelector('.logo');

  }
}
