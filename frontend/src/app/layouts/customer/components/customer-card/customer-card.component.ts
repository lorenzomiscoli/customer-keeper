import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { Customer } from '../../../../interfaces/customer.interface';
import { CustomerDateFormatPipe } from '../../../../pipes/customer-date-format.pipe';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
  imports: [MatCardModule, CustomerDateFormatPipe, RouterLink],
})
export class CustomerCardComponent {
  public customer = input.required<Customer>();
}
