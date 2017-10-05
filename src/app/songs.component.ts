import { Component, OnInit, Input } from '@angular/core';
import { Router }  from '@angular/router';

import { Song } from './song';
import { SongService } from './song.service';

@Component({
  selector: 'my-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {

  songs: Song[];
  selectedSong: Song;

  constructor(
    private songService: SongService,
    private router: Router
  ) {}

  onSelect(song: Song): void {
    this.selectedSong = song;
    this.router.navigate(['/detail', this.selectedSong.id]);
  }

  getSongs(): void {
    this.songService.getSongs()
    // .then(songs => this.songs = songs);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedSong.id]);
  }

  ngOnInit() {
    this.getSongs();
  }

}


