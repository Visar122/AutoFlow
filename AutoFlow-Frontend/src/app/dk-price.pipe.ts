import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dkPrice', standalone: true })
export class DkPricePipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('da-DK');
  }
}
