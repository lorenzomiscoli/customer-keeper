import { Component, input } from '@angular/core';

import { CUSTOMER_CARD_DEPS } from './customer-card.dependencies';
import { Customer } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
  imports: [CUSTOMER_CARD_DEPS],
})
export class CustomerCardComponent {
  public customer = input.required<Customer>();
}
