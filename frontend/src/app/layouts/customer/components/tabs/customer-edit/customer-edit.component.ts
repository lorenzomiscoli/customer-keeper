import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { filter, finalize, Subject, switchMap, takeUntil } from 'rxjs';

import { SnackBarService } from '../../../../../services/snackbar.service';
import {
  Customer,
  CustomerAddForm,
} from '../../../interfaces/customer.interface';
import { CustomerService } from '../../../services/customer.service';
import { CUSTOMER_EDIT_DEPS } from './customer-edit.dependencies';

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
  public isLoading = false;
  public customerImageUrl: string | undefined;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        filter((params) => params['id']),
        switchMap((params) => {
          return this.customerService.findById(params['id']);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((customer) => this.updateForm(customer));
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private initializeForm(): void {
    this.editForm = new FormGroup<CustomerAddForm>({
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
  }

  public onImageChanged(image: File): void {
    this.selectedImage = image;
  }

  public onSubmit(): void {

  }
}
