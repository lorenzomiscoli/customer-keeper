import { Component } from '@angular/core';

import { CUSTOMER_ADD_DEPS } from './customer-add.dependencies';

@Component({
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss',
  imports: [CUSTOMER_ADD_DEPS],
})
export default class CustomerAddComponent {}
