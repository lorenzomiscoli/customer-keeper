import { Component, OnInit } from '@angular/core';

import { combineLatest, map, Observable, switchMap } from 'rxjs';

import { Customer } from '../../interfaces/customer.interface';
import { CustomerService } from '../../services/customer.service';
import { CustomerState } from '../../services/customer.state';
import { CUSTOMER_LIST_DEPS } from './customer-list.dependencies';

@Component({
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  imports: [CUSTOMER_LIST_DEPS],
  providers: [CustomerState],
})
export default class CustomerListComponent implements OnInit {
  public customers$!: Observable<Customer[]>;
  public currentPage = 0;
  public totalPages = 0;

  constructor(
    private customerService: CustomerService,
    private customerState: CustomerState
  ) {}

  ngOnInit(): void {
    this.customers$ = combineLatest([
      this.customerState.currentPage$,
      this.customerState.searchFilter$,
    ]).pipe(
      switchMap(([currentPage, searchFilter]) => {
        this.currentPage = currentPage;
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

  public changePage(page: number): void {
    this.customerState.saveCurrentPage(page);
  }
}
