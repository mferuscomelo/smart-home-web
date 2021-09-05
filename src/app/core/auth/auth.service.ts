import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User | undefined>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private platformLocation: PlatformLocation
  ) {
    this.user = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(undefined);
        }
      })
    );
  }

  async emailSignUp(displayName: string, email: string, password: string) {
    const credential = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = credential.user!;
    await user.updateProfile({
      displayName,
    });
    return await this.updateUserData(user);
  }

  async emailSignIn(email: string, password: string) {
    const credential = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    return await this.updateUserData(credential.user!);
  }

  async signOut() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  async handleResetPassword(actionCode: string, lang: string) {
    const email = await this.auth.verifyPasswordResetCode(actionCode);

    // TODO: prompt user for new password
    const newPassword = 'test1234';

    return await this.auth.confirmPasswordReset(actionCode, newPassword);
  }

  async handleRecoverEmail(actionCode: string, lang: string) {
    const info = await this.auth.checkActionCode(actionCode);
    const restoredEmail = info.data.email;
    return await this.auth.applyActionCode(actionCode);
  }

  async handleVerifyEmail(actionCode: string, lang: string) {
    return await this.auth.applyActionCode(actionCode);
  }

  private async updateUserData(user: firebase.User) {
    // TODO: update user data after custom email action handler
    // TODO: simplify
    const data: User = {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email!,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      phoneNumber: user.phoneNumber || '',
      photoURL: user.photoURL || '',
    };

    if (!user.emailVerified) {
      await user.sendEmailVerification({
        url: `${environment.url}/dashboard`,
      });
    }

    return this.firestore
      .doc<User>(`users/${user.uid}`)
      .set(data, { merge: true });
  }
}
