import { Component, OnDestroy, OnInit, output } from '@angular/core';

import { MatSelectChange } from '@angular/material/select';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { CustomerSearch } from '../../../../interfaces/customer.interface';
import { SEARCH_FILTER_DEPS } from './search-filter.dependencies';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
  imports: [SEARCH_FILTER_DEPS],
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  public searchValue = '';
  public searchedValue = output<CustomerSearch>();
  private searchChanged = new Subject<CustomerSearch>();
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

  public search(searchValue: string, selectValue: string): void {
    let customerSearch: CustomerSearch = {
      [selectValue]: searchValue,
    };
    this.searchChanged.next(customerSearch);
  }

  public onSelection(change: MatSelectChange): void {
    this.searchValue = '';
    this.search('', change.value);
  }
}