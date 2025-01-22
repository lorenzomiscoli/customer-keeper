import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../enviroments/enviroment';
import { Customer, CustomerSearch } from '../../interfaces/customer.interface';
import { CustomerService } from '../../services/customer.service';
import { CUSTOMER_DEPS } from './customer.dependencies';

@Component({
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  imports: [CUSTOMER_DEPS],
})
export default class CustomerComponent implements OnInit {
  public customers$!: Observable<Customer[]>;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.findAll({
      name: '',
      sort: environment.defaultCustomerSort,
    });
  }

  public onSearchedValue(search: CustomerSearch): void {
    this.customers$ = this.customerService.findAll(search);
  }
}
