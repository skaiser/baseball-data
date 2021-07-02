import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * Search component.
 */
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  // styleUrls: ['./header.css'],
})
export class SearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>();
  @Input() options: string[] | Set<string> = [];
  searchCtrl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value))
    );
  }

  emitSearch(query: string): void {
    this.onSearch.emit(query);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const options =
      this.options instanceof Set ? [...this.options] : this.options;
    return options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
