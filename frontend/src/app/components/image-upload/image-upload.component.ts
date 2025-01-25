import { Component, output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent {
  private selectedFile: File | null = null;
  public logo = 'assets/images/default-user.svg';
  public imageChanged = output<File>();

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.logo = URL.createObjectURL(this.selectedFile);
      this.imageChanged.emit(this.selectedFile);
    }
  }
}
