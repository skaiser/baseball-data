import { Component, Output, EventEmitter } from '@angular/core';

import { strikeTypes } from 'src/app/shared/constants';

export declare interface FilterOption {
  value: string;
  displayName: string;
}

/**
 * Filters component
 */
@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<string[]>();
  options: FilterOption[] = [
    { value: 'all', displayName: 'All' },
    { value: 'ball', displayName: 'Balls' },
    { value: 'strike', displayName: 'Strikes' },
    {
      value: 'swinging_strike',
      displayName: 'Swinging Strikes',
    },
    { value: 'strikeout', displayName: 'Strikeouts' },
    { value: 'hit_into_play', displayName: 'In Play' },
  ];
  selected: string[] = [this.options[0].value];

  emitFiltersChanged(filters: string[] | string): void {
    if (typeof filters === 'string') {
      filters = [filters];
    }
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      if (filter === 'strike') {
        filters = filters.concat(strikeTypes);
        break;
      }
    }
    this.filtersChanged.emit(filters);
  }
}
