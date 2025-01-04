import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { Customer, CustomerSearch } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  public findAll(searchParams?: CustomerSearch): Observable<Customer[]> {
    let headers: HttpParams | {} = {};
    if (searchParams) {
      const propertyName = Object.keys(searchParams)[0];
      const propertyValue = searchParams[propertyName];
      if (propertyValue.trim())
        headers = {
          params: new HttpParams().set(propertyName, propertyValue),
        };
    }
    return this.httpClient.get<Customer[]>(
      environment.baseUrl + '/customers',
      headers
    );
  }
}
