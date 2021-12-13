import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, interval, concat } from 'rxjs';
import { BeforeInstallPromptEvent } from 'src/app/shared/models/before-install-prompt-event.model';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  deferredPrompt?: BeforeInstallPromptEvent;

  constructor(private appRef: ApplicationRef, private updates: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() =>
      this.updates.checkForUpdate()
    );
  }

  installPWA() {
    this.deferredPrompt?.prompt();
    this.deferredPrompt?.userChoice.then((choiceResult) => {
      if (choiceResult.outcome == 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  }
}
