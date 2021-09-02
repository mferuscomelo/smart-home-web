import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User | undefined>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
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
    return this.updateUserData(user);
  }

  async emailSignIn(email: string, password: string) {
    const credential = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    return this.updateUserData(credential.user!);
  }

  async signOut() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  private updateUserData(user: firebase.User) {
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

    return this.firestore
      .doc<User>(`users/${user.uid}`)
      .set(data, { merge: true });
  }
}
