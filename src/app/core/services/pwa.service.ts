import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, interval, concat } from 'rxjs';
import { BeforeInstallPromptEvent } from 'src/app/shared/models/before-install-prompt-event.model';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  deferredPrompt?: BeforeInstallPromptEvent;
  updateAvailable: boolean = false;

  constructor(private appRef: ApplicationRef, private updates: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      this.updateAvailable = await this.updates.checkForUpdate();
    });
  }

  async installPWA() {
    this.deferredPrompt?.prompt();
    const choiceResult = await this.deferredPrompt?.userChoice;
    if (choiceResult?.outcome == 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  }

  async updatePWA() {
    console.log('Checking for updates...');
    const updated = await this.updates.activateUpdate();
    if (updated) {
      console.log('PWA Updated');
    } else {
      console.log('No update available / Not updated');
    }
    document.location.reload();
  }
}
