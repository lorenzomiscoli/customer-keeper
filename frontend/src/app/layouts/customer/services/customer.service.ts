import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from '../../../../enviroments/enviroment';
import {
  Customer,
  CustomerInsert,
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

  public insert(
    customerInsert: CustomerInsert,
    logo: File | null
  ): Observable<void> {
    const formData: FormData = new FormData();
    formData.append(
      'customer',
      new Blob([JSON.stringify(customerInsert)], { type: 'application/json' })
    );
    if (logo) {
      formData.append('logo', logo);
    }
    return this.httpClient.post<void>(this.customerBaseUrl, formData);
  }
}
