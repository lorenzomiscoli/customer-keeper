import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { UserService } from '../../../../services/user.service';
import { getHttpErrorMsg } from '../../../../utils/string.utils';
import { PROFILE_INFO_DEPS } from './profile-info.dependencies';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  imports: [PROFILE_INFO_DEPS],
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public errorMessage = '';
  public successMessage = '';
  public isSaveDisabled = true;
  public editForm!: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.userService
      .findByAuth()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.editForm.patchValue(user);
          this.isSaveDisabled = false;
        },
        error: (err) => {
          this.errorMessage = getHttpErrorMsg(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initializeForm(): void {
    this.editForm = new FormGroup({
      username: new FormControl({
        value: '',
        disabled: true,
      }),
      name: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
    });
  }

  public onSubmit(): void {
    if (!this.editForm.valid) return;
    this.userService
      .update(this.editForm.value)
      .pipe(takeUntil(this.destroy$))
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
