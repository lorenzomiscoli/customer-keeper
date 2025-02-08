import { Component, effect, input, OnDestroy, output } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { ImageUploadService } from './image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent implements OnDestroy {
  private selectedFile: File | null = null;
  public logo = 'assets/images/default-user.svg';
  public imageUrl = input<string | undefined>();
  public imageChanged = output<File>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private imageUploadService: ImageUploadService) {
    effect(() => this.onImageUrlChange(this.imageUrl()));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onImageUrlChange(url: string | undefined): void {
    if (url) {
      this.imageUploadService
        .getImageFile(url)
        .pipe(takeUntil(this.destroy$))
        .subscribe((value: File) => {
          if (value.size > 0) {
            this.updateImage(value);
          }
        });
    }
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.updateImage(input.files[0]);
    }
  }

  private updateImage(file: File): void {
    this.selectedFile = file;
    this.logo = URL.createObjectURL(this.selectedFile);
    this.imageChanged.emit(this.selectedFile);
  }
}
