import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { Customer } from '../../../../interfaces/customer.interface';
import { CustomerDateFormatPipe } from '../../../../pipes/customer-date-format.pipe';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
  imports: [MatCardModule, CustomerDateFormatPipe, RouterLink],
})
export class CustomerDetailsComponent {
  public customer = input.required<Customer>();
}
