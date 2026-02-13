import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() label = '';
  @Input() placeholder = '';
  searchControl = new FormControl('');

  @Output() searchChange = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchChange.emit(value ?? '');
    });
  }
}
