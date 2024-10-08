import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CarShop } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit{

carouselImages=[
  { src: './assets/image1.jpg', alt: 'Image 1' },
    { src: './assets/image2.jpg', alt: 'Image 2' },
    { src: './assets/image3.jpg', alt: 'Image 3' }
]

  ngOnInit() {
  
  }

  ngAfterViewInit(): void {
    this.addScrollFadeInEffect();
  }

  
  private addScrollFadeInEffect() {
    const financeContainer = document.querySelector('.finance-container')!;

    if (financeContainer) {
      function handleScroll() {
        const containerPosition = financeContainer.getBoundingClientRect().top;
        const containerBottom = financeContainer.getBoundingClientRect().bottom;
        const screenPosition = window.innerHeight / 2.2;

        if (containerPosition < screenPosition && containerBottom > 0) {
          financeContainer.classList.add('visible');
          //this.financeContainerVisible = true;
        } else {
          financeContainer.classList.remove('visible');
          //this.financeContainerVisible = false;
        }
      }

      window.addEventListener('scroll', handleScroll);

      // Run initially to check if the element is already in view
      handleScroll();

      // Remove event listener when component is destroyed
    
    }
  }
 
}