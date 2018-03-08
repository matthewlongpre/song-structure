import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Buffer } from 'buffer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth/auth.service';

@Injectable()

export class SpotifyService {

    constructor (private http: Http, private authService: AuthService) {}

    private authToken = this.authService.access_token;
    private baseUrl = 'https://api.spotify.com/v1/';

    getAnalysis(trackID) {
        const headers = new Headers();
        headers.append('authorization', 'Bearer ' + this.authToken);
        const url = `${this.baseUrl}audio-analysis/${trackID}`;
        return this.http.get(url, { headers })
            .map(res => {
                return res.json();
            });
    }

    getAudioFeatures(trackID) {
        const headers = new Headers();
        headers.append('authorization', 'Bearer ' + this.authToken);
        const url = `${this.baseUrl}audio-features/${trackID}`;
        return this.http.get(url, { headers })
            .map(res => {
                return res.json();
            });
    }
}
