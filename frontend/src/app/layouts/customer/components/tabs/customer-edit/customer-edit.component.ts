import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { finalize, Subject, switchMap, takeUntil } from 'rxjs';

import { getHttpErrorMsg } from '../../../../../utils/string.utils';
import {
  Customer,
  CustomerSaveForm,
} from '../../../interfaces/customer.interface';
import { CustomerService } from '../../../services/customer.service';
import { CUSTOMER_EDIT_DEPS } from './customer-edit.dependencies';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCustomerDialog } from '../../delete-customer-dialog/delete-customer-dialog.component';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss',
  imports: [CUSTOMER_EDIT_DEPS],
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  public editForm!: FormGroup;
  private selectedImage: File | null = null;
  public errorMessage = '';
  public successMessage = '';
  public isSaveDisabled = true;
  public customerId!: number;
  public isLoading = false;
  public customerImageUrl: string | undefined;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.customerId = params['id'];
          return this.customerService.findById(this.customerId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (customer) => this.updateForm(customer),
        error: (err) => {
          this.errorMessage = getHttpErrorMsg(err);
        },
      });
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initializeForm(): void {
    this.editForm = new FormGroup<CustomerSaveForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(null, Validators.email),
      phone: new FormControl(null),
    });
  }

  private updateForm(customer: Customer) {
    this.customerImageUrl = customer.logoLink;
    this.editForm.patchValue(customer);
    this.isSaveDisabled = false;
  }

  public onImageChanged(image: File): void {
    this.selectedImage = image;
  }

  public openDeleteDialog(): void {
    this.matDialog.open(DeleteCustomerDialog, {
      data: { customerId: this.customerId },
    });
  }

  public onSubmit(): void {
    if (!this.editForm.valid) return;
    this.isLoading = true;
    this.isSaveDisabled = true;
    this.customerService
      .update(this.customerId, this.editForm.value, this.selectedImage)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.isSaveDisabled = false;
        })
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Customer successfully saved';
          this.errorMessage = '';
        },
        error: (err) => {
          console.log(err);
          this.successMessage = '';
          this.errorMessage = getHttpErrorMsg(err);
        },
      });
  }
}
