import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Buffer } from 'buffer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class SpotifyService {

    constructor (private http: Http) {}

    private authToken = '';
    private baseUrl = 'https://api.spotify.com/v1/';
    private clientID = '88d8c5ca2a17477ab787f2d559f53e57';
    private clientSecret = '2cff6bfe538443dfa27b74dca691d302';

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
