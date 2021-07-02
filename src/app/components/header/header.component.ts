import { Component, Input } from '@angular/core';

/**
 * Header component
 */
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() title = '';
}
