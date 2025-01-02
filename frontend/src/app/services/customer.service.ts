import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Customer } from '../interfaces/customer.interface';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  public findAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(environment.baseUrl + '/customers');
  }
}
