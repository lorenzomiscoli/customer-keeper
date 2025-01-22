import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { environment } from "../../../../../enviroments/enviroment";
import { Customer, CustomerSearch } from "../../../../interfaces/customer.interface";
import { CustomerService } from "../../../../services/customer.service";
import { CUSTOMER_LIST_DEPS } from "./customer-list.dependencies";

@Component({
  templateUrl:'./customer-list.component.html',
  styleUrl:'./customer-list.component.scss',
  imports:[CUSTOMER_LIST_DEPS]
})
export default class CustomerListComponent implements OnInit {
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
