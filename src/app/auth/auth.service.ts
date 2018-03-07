import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth-config';
import { Router } from '@angular/router';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private router: Router, private http: Http) { }

  private _generateRandomString(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  public _login(): void {
    // your application requests authorization
    const state = this._generateRandomString(16);
    const stateKey = 'spotify_auth_state';
    const scope = 'user-read-private user-read-email';
    const baseURL = 'https://accounts.spotify.com/authorize?';

    let options = {
      response_type: 'code',
      client_id: AUTH_CONFIG.clientID,
      scope: scope,
      redirect_uri: AUTH_CONFIG.redirect,
      state: state
    };
    let params = new URLSearchParams();
    for (let key in options) {
      params.set(key, options[key])
    }

    window.location.href = `${baseURL}${params.toString()}`;

  }

}
