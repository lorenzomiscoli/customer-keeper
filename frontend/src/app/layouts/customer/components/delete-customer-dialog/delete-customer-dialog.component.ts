import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, Subject, takeUntil } from 'rxjs';

import { SnackBarService } from '../../../../services/snackbar.service';
import { getHttpErrorMsg } from '../../../../utils/string.utils';
import { CustomerService } from '../../services/customer.service';
import { DELETE_CUSTOMER_DIALOG_DEPS } from './delete-customer-dialog.dependencies';

@Component({
  templateUrl: './delete-customer-dialog.component.html',
  imports: [DELETE_CUSTOMER_DIALOG_DEPS],
})
export class DeleteCustomerDialog implements OnDestroy {
  public isLoading = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number },
    public dialogRef: MatDialogRef<DeleteCustomerDialog>,
    private router: Router,
    private customerService: CustomerService,
    private snackBarService: SnackBarService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public delete(successMessage: string): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.customerService
      .delete(this.data.customerId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.dialogRef.close();
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/customers']);
          this.snackBarService.success(successMessage);
        },
        error: (err) => {
          this.snackBarService.error(getHttpErrorMsg(err));
        },
      });
  }
}
