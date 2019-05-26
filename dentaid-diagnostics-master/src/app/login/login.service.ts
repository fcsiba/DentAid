import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.router.navigate(['dashboard']);
          } else {
            localStorage.setItem('user', null);
          }
        });
      }).catch(error => {
        console.log(error);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['auth/login']);
  }
  isLoggedIn(): boolean {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      return true;
    } else {
      return false;
    }
  }
}
