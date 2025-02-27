import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { finalize, Subject, takeUntil } from 'rxjs';

import { UserService } from '../../../../services/user.service';
import { getHttpErrorMsg } from '../../../../utils/string.utils';
import { UserPasswordUpdateForm } from '../../user.interface';
import { SECURITY_SETTINGS_DEPS } from './security-settings.dependencies';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  imports: [SECURITY_SETTINGS_DEPS],
})
export class SecuritySettingsComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public errorMessage = '';
  public successMessage = '';
  public editForm!: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initializeForm(): void {
    this.editForm = new FormGroup<UserPasswordUpdateForm>({
      oldPassword: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      confirmNewPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, this.passwordMatchValidator],
      }),
    });
  }

  public passwordMatchValidator(
    control: FormGroup
  ): { [s: string]: boolean } | null {
    let confirmNewPassword = control.value;
    let newPassword = control.parent?.get('newPassword')?.value;
    return confirmNewPassword === newPassword
      ? null
      : { passwordMismatch: true };
  }

  public showPasswordErrors(): string {
    return this.editForm.get('confirmNewPassword')?.hasError('passwordMismatch')
      ? 'passwordsMismatch'
      : 'requiredField';
  }

  public onSubmit(): void {
    if (this.isLoading) return;
    this.editForm.get('confirmNewPassword')?.updateValueAndValidity();
    if (!this.editForm.valid) return;
    this.isLoading = true;
    this.userService
      .updatePassword(this.editForm.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          this.errorMessage = '';
          this.successMessage = 'savedSuccessfully';
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage = getHttpErrorMsg(err);
        },
      });
  }
}
