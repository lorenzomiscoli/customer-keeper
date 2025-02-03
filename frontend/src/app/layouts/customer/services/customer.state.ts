import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerSearch } from '../interfaces/customer.interface';
import { CustomerSort } from '../constants/customer-sort';

@Injectable()
export class CustomerState {
  private currentPage = new BehaviorSubject<number>(0);
  public currentPage$ = this.currentPage.asObservable();
  private searchFilter = new BehaviorSubject<CustomerSearch>({
    name: '',
    sort: CustomerSort.NAME,
  });
  public searchFilter$ = this.searchFilter.asObservable();

  public saveCurrentPage(currentPage: number): void {
    this.currentPage.next(currentPage);
  }

  public saveSearchFilter(searchFilter: CustomerSearch): void {
    this.searchFilter.next(searchFilter);
  }
}
