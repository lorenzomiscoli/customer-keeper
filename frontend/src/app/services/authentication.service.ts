import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../enviroments/enviroment';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public user$!: BehaviorSubject<User | null>;

    constructor(private router: Router, private http: HttpClient) { }

    public init(): void {
        this.user$ = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')!));
    }

    public login(user: User): Observable<User> {
        return this.http.post<User>(`${environment.baseUrl}/login`, user)
            .pipe(tap(authUser => {
                authUser.password = user.password;
                sessionStorage.setItem('user', JSON.stringify(authUser));
                this.user$.next(authUser);
            }));
    }

    public logout(): void {
        sessionStorage.removeItem('user');
        this.user$.next(null);
        this.router.navigate(['/login'], { queryParams: { status: 'signed_out' } });
    }

}
