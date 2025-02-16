import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';

import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  imports: [AsyncPipe, MatProgressSpinnerModule],
})
export class SpinnerComponent implements OnInit {
  public isVisible$!: Observable<boolean>;

  constructor(private spinnerSerivce: SpinnerService) {}

  ngOnInit(): void {
    this.isVisible$ = this.spinnerSerivce.getIsVisible();
  }
}
