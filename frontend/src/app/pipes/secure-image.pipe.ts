import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable, of } from 'rxjs';

@Pipe({
  name: 'appSecureImage',
})
export class SecureImagePipe implements PipeTransform {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  transform(url: string | undefined): Observable<SafeUrl> {
    if (url) {
      return this.http
        .get(url, { responseType: 'blob' })
        .pipe(
          map((val) =>
            this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))
          )
        );
    } else {
      return of();
    }
  }
}
