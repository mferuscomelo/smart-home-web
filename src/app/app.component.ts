import { Component, OnInit } from '@angular/core';
import { NotificationService } from './core/services/notification.service';
import { PwaService } from './core/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private pwaService: PwaService
  ) {
    this.notificationService.requestPermission();
    this.notificationService.listen();
  }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.pwaService.deferredPrompt = e;
    });
  }
}
