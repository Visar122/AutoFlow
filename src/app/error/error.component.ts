import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
constructor(private router:Router){}


ngOnInit(): void {
  setTimeout(() => {
    this.router.navigate(['/Home']);
  }, 2100); 
}
}