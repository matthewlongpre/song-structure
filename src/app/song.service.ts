import { Injectable }  from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
            .get(`${this.baseUrl}/songs.json`, { headers: this.getHeaders() })
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
        return this.http.post(`${this.baseUrl}/songs.json`, body, options).map((res: Response) => res.json());
    }

    updateSong(song) {
        song.id = this.currentSong;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(song);
        return this.http.put(`${this.baseUrl}/songs/${song.id}.json`, body, options).map((res: Response) => res.json());
    }

    // getSongs():  Promise<Song[]> {
    //     return Promise.resolve(SONGS);
    // }
    // getSong(id: number): Promise<Song> {
    //     return this.getSongs()
    //             .then(songs => songs.find(song => song.id === id))
    // }

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
        sections: r.sections
    });
    console.log('Parsed song:', song);
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