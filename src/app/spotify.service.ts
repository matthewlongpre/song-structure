import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Rx';
import { Buffer } from 'buffer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth/auth.service';

@Injectable()

export class SpotifyService {

    constructor (private http: Http, private authService: AuthService) {}

    private authToken = this.authService.access_token;
    private baseUrl = 'https://api.spotify.com/v1/';

    search(q: string, type?: string): Observable<any> {
        if (!q) {
            q = " ";
        }
        const headers = new Headers();
        headers.append('authorization', 'Bearer ' + this.authToken);
        const url = `${this.baseUrl}search?q=${q}&type=${type}`;
        return this.http
            .get(url, { headers })
            .map(res => {
                console.log(res.json());
                return res.json();
            })
            .catch(e => {
                if (e.status === 401) {
                    this.authService._login();
                    return Observable.throw('Unauthorized');
                }
            });
    }

    getTrack(trackID) {
        const headers = new Headers();
        headers.append('authorization', 'Bearer ' + this.authToken);
        const url = `${this.baseUrl}tracks/${trackID}`;
        return this.http
            .get(url, { headers })
            .map(res => {
                return res.json();
            })
            .catch(e => {
                if (e.status === 401) {
                    this.authService._login();
                    return Observable.throw('Unauthorized');
                }
            });
    }

    getAnalysis(trackID) {
        const headers = new Headers();
        headers.append('authorization', 'Bearer ' + this.authToken);
        const url = `${this.baseUrl}audio-analysis/${trackID}`;
        return this.http
            .get(url, { headers })
            .map(res => {
                return res.json();
            });
    }

    getAudioFeatures(trackID) {
        const headers = new Headers();
        headers.append('authorization', 'Bearer ' + this.authToken);
        const url = `${this.baseUrl}audio-features/${trackID}`;
        return this.http
            .get(url, { headers })
            .map(res => {
                return res.json();
            });
    }
}
