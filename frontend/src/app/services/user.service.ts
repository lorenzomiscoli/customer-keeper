import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import { UserProfile, UserUpdate } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userBaseUrl = environment.baseUrl + '/users';

  constructor(private httpClient: HttpClient) {}

  // Retrive user by Basic Authentication
  public findByAuth(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(
      this.userBaseUrl + '/authenticated'
    );
  }

  public update(userUpdate: UserUpdate): Observable<void> {
    return this.httpClient.patch<void>(
      this.userBaseUrl + '/authenticated',
      userUpdate
    );
  }
}
