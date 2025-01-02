import { Component, OnDestroy, OnInit, output } from '@angular/core';

import { debounceTime, Subject, takeUntil } from 'rxjs';

import { SEARCH_FILTER_DEPS } from './search-filter.dependencies';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
  imports: [SEARCH_FILTER_DEPS],
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  public searchedValue = output<string>();
  private searchChanged = new Subject<string>();
  private destroy$ = new Subject<boolean>();

  ngOnInit(): void {
    this.searchChanged
      .pipe(takeUntil(this.destroy$), debounceTime(400))
      .subscribe((value) => {
        this.searchedValue.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public search(value: string): void {
    this.searchChanged.next(value);
  }
}
