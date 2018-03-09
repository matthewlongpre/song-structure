import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Song } from './song';
// import { SONGS } from './mock-songs';

@Injectable()

export class SongService {
    private baseUrl: string = 'https://song-structure-d17fd.firebaseio.com';
    constructor(private http: Http) {
    }

    currentSong: string;

    getSongs(): Promise<Song[]> {
        let song$ = this.http
            .get(`${this.baseUrl}/songs.json?`, { headers: this.getHeaders() })
            .toPromise()
            .then(mapSongs)
            .catch(handleError);
        return song$;
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    get(id: any): Observable<Song> {
        this.currentSong = id;
        let song$ = this.http
            .get(`${this.baseUrl}/songs/${id}.json`, { headers: this.getHeaders() })
            .map(mapSong);
        return song$;
    }

    createSong(song) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(song);
        let url = `${this.baseUrl}/songs.json`;
        return this.http.post(url, body, options).map((res: Response) => res.json());
    }

    updateSong(song) {
        song.id = this.currentSong;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(song);
        let url = `${this.baseUrl}/songs/${song.id}.json`;
        return this.http.put(url, body, options).map((res: Response) => res.json());
    }

    deleteSong() {
        let headers = new Headers({ 'Content-Type': 'application/json' });     
        let options = new RequestOptions({ 
            headers: headers
        }); 
        let url = `${this.baseUrl}/songs/${this.currentSong}.json`;
        return this.http.delete(url, options).catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

function mapSongs(response: Response): Song[] {
    let resultObj = response.json();
    var result = Object.keys(resultObj).map(function (key) {
        resultObj[key].id = key;
        return resultObj[key];
    });
    return result.map(toSong)
}

function toSong(r: any): Song {
    let song = <Song>({
        id: r.id,
        title: r.title,
        artist: r.artist,
        sections: r.sections,
        spotifyID: r.spotifyID
    });
    return song;
}

function mapSong(response: Response): Song {
    return toSong(response.json());
}

function handleError(error: any) {
    let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);
    // instead of Observable we return a rejected Promise
    return Promise.reject(errorMsg);
}