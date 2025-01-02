import { Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { Customer } from '../../../../interfaces/customer.interface';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
  imports: [MatCardModule],
})
export class CustomerDetailsComponent {
  public customer = input.required<Customer>();
}
