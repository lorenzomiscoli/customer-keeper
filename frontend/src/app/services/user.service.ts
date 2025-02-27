import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { environment } from '../../enviroments/enviroment';
import {
  UserPasswordUpdate,
  UserProfile,
  UserUpdate,
} from '../interfaces/user.interface';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userBaseUrl = environment.baseUrl + '/users';

  constructor(
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

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

  public updatePassword(
    userPasswordUpdate: UserPasswordUpdate
  ): Observable<void> {
    return this.httpClient
      .patch<void>(
        this.userBaseUrl + '/authenticated/password',
        userPasswordUpdate
      )
      .pipe(
        tap(() => {
          const userData = sessionStorage.getItem('user');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            parsedUserData.password = userPasswordUpdate.newPassword;
            sessionStorage.setItem('user', JSON.stringify(parsedUserData));
            this.authService.user$.next(parsedUserData);
          }
        })
      );
  }
}
