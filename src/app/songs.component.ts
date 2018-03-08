import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Song } from './song';
import { SongService } from './song.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-my-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {

  songs: Song[];
  selectedSong: Song;

  constructor(
    private songService: SongService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSelect(song: Song): void {
    this.selectedSong = song;
    this.router.navigate(['/detail', this.selectedSong.id]);
  }

  getSongs(): void {
    this.songService.getSongs()
    .then(songs => this.songs = songs)
    .then(songs => this.sortSongs());
  }

  sortSongs(): void {
    this.songs.sort(function (name1, name2) {
      if (name1.artist < name2.artist) {
        return -1;
      } else if (name1.artist > name2.artist) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedSong.id]);
  }

  ngOnInit() {
    this.getSongs();
    this.authService._requestToken();
  }

}


