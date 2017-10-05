import { Component, OnInit } from '@angular/core';

import { Song } from './song';
import { SongService } from './song.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

    songs: Song[] = [];

    constructor(private songService: SongService) {}

    ngOnInit(): void {
        this.songService.getSongs()
        // .then(songs => this.songs = songs.slice(1,5));
    }
 
}