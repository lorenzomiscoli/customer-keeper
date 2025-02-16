import { Component, OnDestroy, OnInit, output } from '@angular/core';

import { MatSelectChange } from '@angular/material/select';
import { TranslocoService } from '@jsverse/transloco';
import { debounceTime, Subject, takeUntil } from 'rxjs';

import { environment } from '../../../../../enviroments/enviroment';
import {
  CustomerSort,
  CustomerSortLabelMapping,
} from '../../constants/customer-sort';
import { CustomerSearch } from '../../interfaces/customer.interface';
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
  private searchChanged$ = new Subject<CustomerSearch>();
  public customerSortLabelMapping = CustomerSortLabelMapping;
  public customerSortTypes = Object.values(CustomerSort);
  public searchChanged = output<CustomerSearch>();
  private destroy$ = new Subject<boolean>();

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.searchChanged$
      .pipe(takeUntil(this.destroy$), debounceTime(400))
      .subscribe((value) => {
        this.searchChanged.emit(value);
      });
    this.handleTranslations();
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
    this.searchChanged$.next(customerSearch);
  }

  public onSelection(change: MatSelectChange): void {
    this.searchValue = '';
    this.search('', change.value);
  }

  private handleTranslations(): void {
    this.translocoService
      .selectTranslation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.customerSortLabelMapping.NAME = value['name'];
        this.customerSortLabelMapping.UPDATED_DATE = value['updatedDate'];
      });
  }
}
