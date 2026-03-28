import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { DkPricePipe } from './dk-price.pipe';

export const SHARED = [RouterOutlet, RouterLink, CommonModule, FormsModule, NgxMaskDirective, DkPricePipe];
