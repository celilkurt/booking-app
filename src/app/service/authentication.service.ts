import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;


  constructor(
      private db: AngularFireDatabase,
      public afStore: AngularFirestore,
      public ngFireAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
    this.db.list('/roles');
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  GetRole(uid) {

    console.log(uid);
    const docRef = this.afStore.collection('users').doc(uid);

    docRef.get().toPromise().then(doc => {
      if (doc.exists) {
        console.log('Document data:', doc.data().role);
        localStorage.setItem('role', doc.data().role);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch(error => {
      console.log('Error getting document:', error);
    });
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
        .then(() => {
          this.router.navigate(['verify-email']);
        });
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email has been sent, please check your inbox.');
        }).catch((error) => {
          window.alert(error);
        });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  getLoggedUser(): User {
    let user: User;
    user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.auth.signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error);
        });
  }

  // Store user in localStorage
  SetUserData(user) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    return userRef.set(user, {
      merge: true
    });
  }

  SignOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['login']);
    });
  }


}
