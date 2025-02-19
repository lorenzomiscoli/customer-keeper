import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { User } from '../../../app/interfaces/user.interface';
import { AuthenticationService } from '../../../app/services/authentication.service';
import { LoginForm, LoginStatus } from './login-form.interface';
import { LOGIN_DEPS } from './login.dependencies';
import { getHttpErrorMsg } from '../../utils/string.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [LOGIN_DEPS],
})
export default class LoginComponent implements OnInit {
  public loginForm!: FormGroup<LoginForm>;
  public returnUrl = '/';
  public message = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
    this.route.queryParams.subscribe((value) => {
      if (value['returnUrl']) {
        this.returnUrl = value['returnUrl'];
      }
      this.checkStatus(value['status']);
    });
  }

  public checkStatus(status: LoginStatus): void {
    if (status === LoginStatus.SIGNED_OUT) {
      this.message = 'You have successfully signed out';
    } else if (status === LoginStatus.EXPIRED) {
      this.message = 'Your session has been terminated due to inactivity';
    }
  }

  public submit(): void {
    if (!this.loginForm.valid) return;
    this.authService
      .login(this.loginForm.value as User)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl], { relativeTo: this.route });
        },
        error: (error) => {
          this.message = getHttpErrorMsg(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
