import { Component } from '@angular/core';
import { SHARED } from '../shared';
import { FadeIn } from '../fade-in';

@Component({
  selector: 'app-home',
  imports: [SHARED, FadeIn],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
