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
    private authToken: string = "BQCsc8RLdcnAjOZepK9ydVJJ3ifb6IByqV46ODIJqO0JxQM94BSpZohXCZfUIVDpTHndYnIR2o8e7RgqzQVTSuFXyCa7kiiRKmHxiGNVjPgXJME1M3jWy5PNlvB_eqrikxm5Gk3MF3OuTem-ADGmVGqslWWj1PeOsuXZe2c";
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

}