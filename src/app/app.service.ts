import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private actionDataSubject = new Subject<any>();

  // Observable to expose the Subject
  actionData$ = this.actionDataSubject.asObservable();

  // Method to emit new actionData
  setActionData(actionData: any) {
    this.actionDataSubject.next(actionData);
  }
}
