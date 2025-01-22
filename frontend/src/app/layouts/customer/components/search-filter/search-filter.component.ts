import { Component, OnDestroy, OnInit, output } from '@angular/core';

import { MatSelectChange } from '@angular/material/select';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { environment } from '../../../../../enviroments/enviroment';
import {
  CustomerSort,
  CustomerSortLabelMapping,
} from '../../../../constants/customer-sort';
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
  public defaultSelectValue = environment.defaultCustomerSort;
  public searchedValue = output<CustomerSearch>();
  private searchChanged = new Subject<CustomerSearch>();
  public customerSortLabelMapping = CustomerSortLabelMapping;
  public customerSortTypes = Object.values(CustomerSort);
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

  public search(searchValue: string, selectValue: CustomerSort): void {
    let customerSearch: CustomerSearch = {
      name: searchValue,
      sort: selectValue,
    };
    this.searchChanged.next(customerSearch);
  }

  public onSelection(change: MatSelectChange): void {
    this.searchValue = '';
    this.search('', change.value);
  }
}
