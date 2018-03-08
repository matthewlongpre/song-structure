import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth-config';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Buffer } from 'buffer';
import { Subscription } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  public stateKey = 'spotify_auth_state';

  public params: any = this._getHashParams();
  public access_token = this._checkAccessToken();
  public state = this.params.state;
  public storedState = localStorage.getItem(this.stateKey);

  constructor(
    private router: Router,
    private http: Http){}

  private _getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }    

  private _generateRandomString(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public _checkAccessToken(){
    if (this.params.access_token) {
      localStorage.setItem('access_token', this.params.access_token);
      return this.params.access_token;
    } else {
      if (localStorage.getItem('access_token')) {
        return localStorage.getItem('access_token');
      } else {
        return null;
      }
    }
  }

  public _login(){

    const state = this._generateRandomString(16);

    localStorage.setItem(this.stateKey, state);
    const scope = AUTH_CONFIG.scope;

    let url = AUTH_CONFIG.authURL;
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(AUTH_CONFIG.clientID);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(AUTH_CONFIG.redirect);
    url += '&state=' + encodeURIComponent(state);

    window.location.href = url;
  }

}