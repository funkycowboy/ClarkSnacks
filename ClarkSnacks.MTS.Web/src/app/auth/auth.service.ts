import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.js';
import * as config from '../../../auth_config.json';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';

import Auth0Lock from 'auth0-lock';
import { concatMap, tap } from 'rxjs/operators';


@Injectable()
export class AuthService {
  auth0Options = {
    theme: {
      logo: '/assets/clark-snacks-logo.gif',
      primaryColor: '#DFA612'
    },
    auth: {
      redirectUrl: environment.auth0RedirectUrl,
      responseType: 'token id_token',
      audience: config.audience,
      params: {
        scope: 'openid profile'
      }
    },
    languageDictionary: {
      title: "MTS Login"
    },
    autoclose: true,
    oidcConformant: true,
    allowSignUp: false
  };

  lock = new Auth0Lock(
    config.clientId,
    config.domain,
    this.auth0Options
  );

  isAuthenticated: boolean = false;

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  constructor(private router: Router) {

    this.lock.on('authenticated', (authResult: any) => {

      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        
        if (error) {
          throw new Error(error);
        }

        this.isAuthenticated = true;
        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('profile', profile);
        this.userProfileSubject$.next(profile)
        this.router.navigateByUrl(localStorage.getItem('redirect_url'));
      })
    });

    this.lock.on('authorization_error', error => {
      console.log('something went wrong', error);
    });

  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.userProfileSubject$.next(null);
    this.router.navigate(['/home']);
  }

  getTokenSilently$(): Observable<string> {
    return from(localStorage.getItem('token'));

  }
}

