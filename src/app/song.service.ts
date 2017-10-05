import { Injectable }  from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Song } from './song';
// import { SONGS } from './mock-songs';

@Injectable()

export class SongService {
    private baseUrl: string = 'https://song-structure-d17fd.firebaseio.com';
    constructor(private http: Http) {
    }

    getSongs(): Observable<Song[]> {
        let people$ = this.http
            .get(`${this.baseUrl}/songs`, { headers: this.getHeaders() })
            .map(mapPersons);
        return people$;
    }

    private getHeaders() {
        // I included these headers because otherwise FireFox
        // will request text/html instead of application/json
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
    get(id: number): Observable<Song> {
        let person$ = this.http
            .get(`${this.baseUrl}/songs/${id}.json`, { headers: this.getHeaders() })
            .map(mapPerson);
        return person$;
    }
    

    // getSongs():  Promise<Song[]> {
    //     return Promise.resolve(SONGS);
    // }
    // getSong(id: number): Promise<Song> {
    //     return this.getSongs()
    //             .then(songs => songs.find(song => song.id === id))
    // }

}

function mapPersons(response: Response): Song[] {
    // The response of the API has a results
    // property with the actual results
    return response.json().results.map(toPerson)
}

function toPerson(r: any): Song {
    let person = <Song>({
        id: r.id,
        title: r.title,
        artist: r.artist,
        sections: r.sections
    });
    console.log('Parsed person:', person);
    return person;
}

function mapPerson(response: Response): Song {
    // toPerson looks just like in the previous example
    return toPerson(response.json());
}