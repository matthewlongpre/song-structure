import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth-config';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Buffer } from 'buffer';
import { Subscription } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  // get the Spotify code to retrieve the auth token
  private subscription: Subscription;
  code: string;

  constructor(
    private router: Router, private http: Http,
    private route: ActivatedRoute) {
    this.subscription = route.queryParams.subscribe(
      (queryParam: any) => this.code = queryParam['code']
    );
   }

  private _generateRandomString(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public _login(): void {
    // your application requests authorization
    const state = this._generateRandomString(16);
    const stateKey = 'spotify_auth_state';
    const scope = 'user-read-private user-read-email';
    const baseURL = 'https://accounts.spotify.com/authorize?';

    const options = {
      response_type: 'code',
      client_id: AUTH_CONFIG.clientID,
      scope: scope,
      redirect_uri: AUTH_CONFIG.redirect,
      state: state
    };

    const params = new URLSearchParams();
    for (const key of Object.keys(options)) {
      params.set(key, options[key]);
    }

    window.location.href = `${baseURL}${params.toString()}`;

  }

  public _requestToken() {
    console.log('requestToken');

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: this.code,
        redirect_uri: AUTH_CONFIG.redirect,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(AUTH_CONFIG.clientID + ':' + AUTH_CONFIG.clientSecret).toString('base64'))
      },
      json: true
    };
    console.log(authOptions);

    const headers = new Headers({ 'Authorization': 'Basic ' +
    (new Buffer(AUTH_CONFIG.clientID + ':' + AUTH_CONFIG.clientSecret).toString('base64')) });

    const options = new RequestOptions({ headers: headers });
    const body = authOptions.form;
    const url = `https://accounts.spotify.com/api/token`;
    this.http.post(url, body, options).map((res: Response) => {
      console.log(res.json());
      res.json();
    });
  }

}
