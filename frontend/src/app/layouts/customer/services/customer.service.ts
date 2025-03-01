import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../../../enviroments/enviroment';
import {
  Customer,
  CustomerSave,
  CustomerSearch,
} from '../interfaces/customer.interface';
import { PageResult } from '../../../interfaces/page-result.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly customerBaseUrl = environment.baseUrl + '/customers';

  constructor(private httpClient: HttpClient) {}

  public findAll(
    customerSearch?: CustomerSearch
  ): Observable<PageResult<Customer>> {
    let headers: HttpParams | {} = {};
    if (customerSearch) {
      headers = {
        params: new HttpParams()
          .set('name', customerSearch.name)
          .set('sort', customerSearch.sort)
          .set('page', customerSearch.page ? customerSearch.page : 0),
      };
    }
    return this.httpClient
      .get<PageResult<Customer>>(this.customerBaseUrl, headers)
      .pipe(
        map((pageResult) => {
          pageResult.content.forEach(
            (customer) =>
              (customer.logoLink = `${this.customerBaseUrl}/${customer.id}/logo`)
          );
          return pageResult;
        })
      );
  }

  public findById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.customerBaseUrl}/${id}`).pipe(
      map((customer) => {
        customer.logoLink = `${this.customerBaseUrl}/${customer.id}/logo`;
        return customer;
      })
    );
  }

  public insert(
    customerSave: CustomerSave,
    logo: File | null
  ): Observable<void> {
    const formData: FormData = new FormData();
    formData.append(
      'customer',
      new Blob([JSON.stringify(customerSave)], { type: 'application/json' })
    );
    if (logo) {
      formData.append('logo', logo);
    }
    return this.httpClient.post<void>(this.customerBaseUrl, formData);
  }

  public update(
    customerId: number,
    customerSave: CustomerSave,
    logo: File | null
  ): Observable<void> {
    const url = this.customerBaseUrl + '/' + customerId;
    const formData: FormData = new FormData();
    formData.append(
      'customer',
      new Blob([JSON.stringify(customerSave)], { type: 'application/json' })
    );
    if (logo) {
      formData.append('logo', logo);
    }
    return this.httpClient.put<void>(url, formData);
  }

  public delete(customerId: number): Observable<void> {
    const url = this.customerBaseUrl + '/' + customerId;
    return this.httpClient.delete<void>(url);
  }
}
