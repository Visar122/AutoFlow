import { Location } from '@angular/common';
import { ReservepartsService } from './../Services/reserveparts.service';
import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservepartsdetails',
  imports: [SHARED],
  templateUrl: './reservepartsdetails.html',
  styleUrl: './reservepartsdetails.css',
})
export class Reservepartsdetails implements OnInit {
  parts:any = null;
  activeImage = '';

  constructor(private route: ActivatedRoute, private  reserveService:ReservepartsService,private router: Router, private location: Location) {}
  goBack(){this.location.back();}
  
  ngOnInit(): void {
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.reserveService.getpartsbyId(id).subscribe({
      next:(data)=>{this.parts=data,this.activeImage=data.imageUrl1},
      error:()=>this.router.navigate(['/reserveparts'])
    });
    
  }
}
