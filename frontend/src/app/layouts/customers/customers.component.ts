import { Component } from '@angular/core';

import { CUSTOMERS_DEPS } from './customers.dependencies';

@Component({
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  imports: [CUSTOMERS_DEPS],
})
export default class CustomersComponent {}
