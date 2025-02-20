import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private readonly systemBaseUrl = environment.baseUrl + '/system';

  constructor(private httpClient: HttpClient) {}

  public findVersion(): Observable<{ version: string }> {
    return this.httpClient.get<{ version: string }>(
      this.systemBaseUrl + '/version'
    );
  }
}
