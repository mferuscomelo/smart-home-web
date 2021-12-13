import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, mergeMapTo } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messaging: AngularFireMessaging) {}

  requestPermission() {
    this.messaging.requestToken.subscribe({
      next: (token) => {
        console.log('Permission granted! Save to the server!', token);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  listen() {
    this.messaging.messages.subscribe({
      next: (message) => {
        console.log(message);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
