import { Component, OnInit } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
} from 'rxjs';

import { CustomerSort } from '../../constants/customer-sort';
import { Customer, CustomerSearch } from '../../interfaces/customer.interface';
import { CustomerService } from '../../services/customer.service';
import { CUSTOMER_LIST_DEPS } from './customer-list.dependencies';

@Component({
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  imports: [CUSTOMER_LIST_DEPS]
})
export default class CustomerListComponent implements OnInit {
  public customers$!: Observable<Customer[]>;
  private currentPage$ = new BehaviorSubject<number>(0);
  private searchFilter$ = new BehaviorSubject<CustomerSearch>({
    name: '',
    sort: CustomerSort.NAME,
  });
  public totalPages = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = combineLatest([
      this.currentPage$,
      this.searchFilter$,
    ]).pipe(
      switchMap(([currentPage, searchFilter]) => {
        return this.customerService
          .findAll({ ...searchFilter, page: currentPage })
          .pipe(
            map((pageResult) => {
              this.totalPages = pageResult.totalPages;
              return pageResult.content;
            })
          );
      })
    );
  }

  public onSearchChanged(search: CustomerSearch): void {
    this.searchFilter$.next(search);
  }

  public onPageChanged(page: number): void {
    this.currentPage$.next(page);
  }
}
