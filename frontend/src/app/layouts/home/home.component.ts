import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../enviroments/enviroment';
import { Customer, CustomerSearch } from '../../interfaces/customer.interface';
import { CustomerService } from '../../services/customer.service';
import { HOME_DEPS } from './home.dependencies';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HOME_DEPS],
})
export default class HomeComponent implements OnInit {
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
