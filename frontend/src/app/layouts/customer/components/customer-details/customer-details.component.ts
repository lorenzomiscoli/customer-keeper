import { Component } from '@angular/core';

import { CUSTOMER_DETAILS_DEPS } from './customer-details.dependencies';

@Component({
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
  imports: [CUSTOMER_DETAILS_DEPS],
})
export default class CustomersComponent {}
