import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private httpClient: HttpClient) {}

  public getImageFile(url: string): Observable<File> {
    const requestOptions: Object = {
      headers: new HttpHeaders(),
      responseType: 'blob',
    };
    return this.httpClient.get<File>(url, requestOptions);
  }
}
