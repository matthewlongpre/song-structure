import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class SpotifyService {

    constructor (
        private http: Http
    ){}

    private baseUrl: string = "https://api.spotify.com/v1/";
    private authToken: string = "BQD4fkUbHjEE6tIljOLYxpZ4DZurL289Bl1tmw2m-5NFcqf81EJS6l2jljLdtA_WPaxDP__14_7vorjTGu7nRMWV7egsiEH4vA7ucJKSetkHVb5Iecah5Ge5lbxouwMktmQTALpncmcVlaniU9AVjq81lNKhhplWIhbP6eg";
    private clientID: string = "88d8c5ca2a17477ab787f2d559f53e57";
    private clientSecret: string = "2cff6bfe538443dfa27b74dca691d302";

    getAnalysis(trackID) {
        let headers = new Headers();
        headers.append("authorization", "Bearer " + this.authToken);
        let url = `${this.baseUrl}audio-analysis/${trackID}`;
        return this.http.get(url, { headers })
            .map(res => {
                return res.json();
            });
    }

    getAudioFeatures(trackID) {
        let headers = new Headers();
        headers.append("authorization", "Bearer " + this.authToken);
        let url = `${this.baseUrl}audio-features/${trackID}`;
        return this.http.get(url, { headers })
            .map(res => {
                return res.json();
            });
    }
}