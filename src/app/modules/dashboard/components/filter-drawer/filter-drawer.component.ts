import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

import { DashBoardFilter, sortByType, sortOrderType } from '@core/models/dashboard-filter.model';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrl: './filter-drawer.component.scss',
})
export class FilterDrawerComponent {
  readonly separatorKeysCodes = [ENTER, COMMA];
  @Input() tags: string[] = [];
  @Input() sortBy: sortByType = 'createdAt';
  @Input() sortOrder: sortOrderType = 'DESC';

  @Output() apply = new EventEmitter<DashBoardFilter>();
  @Output() clear = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    event.chipInput?.clear();
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  onApply(): void {
    this.apply.emit({
      tags: this.tags,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
    });
  }
}
