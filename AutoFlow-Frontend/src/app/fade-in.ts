import { Directive, ElementRef, Input, OnInit } from '@angular/core';
type RevealType = 'fade' | 'fade-up' |  'fade-down' | 'fade-left' | 'fade-right'| 'zoom-in' | 'zoom-out';
@Directive({
  selector: '[appFadeIn]',
})
export class FadeIn implements OnInit {
  
  @Input('appFadeIn')kind:RevealType = 'fade';

  @Input('appReveal')set legacyKind(value:RevealType){
    this.kind=value;
  }
  


   /** Duration in ms */
  @Input() revealDuration = 550;

  private io?:IntersectionObserver;
  private revealed=false;
  
  constructor(private el:ElementRef<HTMLElement>) {}


  ngOnInit(): void {
    // Respect reduced motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      this.applyFinalStyles();
      return;
    }

    // Set initial (hidden) state
    this.applyInitalStyles();

    this.io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.play();
          
          } else if ( this.revealed) {
            // allow replay when leaving the viewport
            this.applyInitalStyles();
            this.revealed = false;
          }
        });
      },
      { threshold:  0.2, rootMargin: '0px 0px -10% 0px' }
    );

    this.io.observe(this.el.nativeElement);
  }
   
  private getStartTransform():string{
    switch(this.kind){
      case 'fade-up': return 'translateY(124px)';
      case 'fade-down': return 'translateY(-144px)';
      case 'fade-left': return 'translateX(124px)';
      case 'fade-right': return 'translateX(-184px)';
      case 'zoom-in': return 'scale(1.95)';
      case 'zoom-out': return 'scale(2.05)';
      default: return '';
    }
  }
   private applyInitalStyles(){
    const node=this.el.nativeElement;
    node.style.willChange='opacity, transform';
    node.style.opacity='0';
     node.style.transform=this.getStartTransform();
  }
   private applyFinalStyles(){
    const node =this.el.nativeElement;
    node.style.opacity='1';
    node.style.transform='none';
  }
   private play(){
    const node=this.el.nativeElement;
    const keyframes=[
      {opacity:0, transform:this.getStartTransform()},
      { opacity: 1, transform: 'none' }
    ];
    node.animate(keyframes,{
      duration:550,
      delay:0,
      fill:'forwards',
    });
     this.revealed = true;
   }

   }

