import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize, Subject, takeUntil } from 'rxjs';

import { CustomerService } from '../../services/customer.service';
import { SnackBarService } from '../../../../services/snackbar.service';
import { CustomerSaveForm } from '../../interfaces/customer.interface';
import { CUSTOMER_ADD_DEPS } from './customer-add.dependencies';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss',
  imports: [CUSTOMER_ADD_DEPS],
})
export default class CustomerAddComponent implements OnInit, OnDestroy {
  public addForm!: FormGroup;
  private selectedImage: File | null = null;
  public errorMessage = '';
  public isLoading = false;
  public successMessage = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private snackBarService: SnackBarService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.handleTranslations();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initializeForm(): void {
    this.addForm = new FormGroup<CustomerSaveForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(null, Validators.email),
      phone: new FormControl(null),
    });
  }

  public handleTranslations(): void {
    this.translocoService
      .selectTranslate('customerSaved')
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.successMessage = value;
      });
  }

  public onImageChanged(image: File): void {
    this.selectedImage = image;
  }

  public onSubmit(): void {
    if (!this.addForm.valid) return;
    this.isLoading = true;
    this.customerService
      .insert(this.addForm.value, this.selectedImage)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => {
          this.errorMessage = '';
          this.router.navigate(['/customers']);
          this.snackBarService.success(this.successMessage);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }
}
