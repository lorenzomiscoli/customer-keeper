import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isVisible$ = new BehaviorSubject<boolean>(false);

  public getIsVisible(): Observable<boolean> {
    return this.isVisible$;
  }

  public setIsVisible(value: boolean): void {
    this.isVisible$.next(value);
  }

}
