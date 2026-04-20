import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { ReserveParts } from '../interfaces';
import { ReservepartsService } from '../Services/reserveparts.service';

@Component({
  selector: 'app-reserve-parts',
  imports: [SHARED],
  templateUrl: './reserve-parts.html',
  styleUrl: './reserve-parts.css',
})
export class ReservePartsComponent implements OnInit {
  activeTab: 'cars' | 'parts' = 'parts';
 
  searchPart='';

  parts: ReserveParts[] = [];

  constructor(private reservePartsService: ReservepartsService) {}

  ngOnInit() {
    this.reservePartsService.getParts().subscribe((data) => {
      this.parts = data;
    });
  }
  SearchPartByName(){
    if(!this.searchPart.trim()){
      this.reservePartsService.getParts().subscribe((data) => { this.parts = data; });
    } 
    this.reservePartsService.SearchPartByName(this.searchPart).subscribe((data)=>{
      this.parts=data;
    })
  }
  ClearSearch(){
    this.searchPart='';
    this.reservePartsService.getParts().subscribe((data)=>{
      this.parts=data;
    });
  }
  
}


