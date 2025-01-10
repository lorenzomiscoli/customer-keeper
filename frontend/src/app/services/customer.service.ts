import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { Customer, CustomerSearch } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly customerBaseUrl = environment.baseUrl + '/customers';

  constructor(private httpClient: HttpClient) {}

  public findAll(customerSearch?: CustomerSearch): Observable<Customer[]> {
    let headers: HttpParams | {} = {};
    if (customerSearch) {
      headers = {
        params: new HttpParams()
          .set('name', customerSearch.name)
          .set('sort', customerSearch.sort),
      };
    }
    return this.httpClient.get<Customer[]>(this.customerBaseUrl, headers).pipe(
      map((customers) => {
        customers.forEach(
          (customer) =>
            (customer.logoLink = `${this.customerBaseUrl}/${customer.id}/logo`)
        );
        return customers;
      })
    );
  }
}
