import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterOption' })
export class FilterOptionPipe
  implements PipeTransform {
  transform(
    value: string | undefined | null,
  ): string {
    switch (value) {
      case 'balls':
        return 'Balls';
      default:
        return '';
    }
  }
}
