import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() searchValue = '';
  searchControl = new FormControl('');

  @Output() searchChange = new EventEmitter<string>();
  private destroy$ = new Subject<void>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchValue'] && changes['searchValue'].currentValue !== undefined) {
      this.searchControl.setValue(this.searchValue, { emitEvent: false });
    }
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchChange.emit(value ?? '');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
