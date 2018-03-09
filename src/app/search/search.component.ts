import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  inputField: FormControl = new FormControl();
  results: any[] = [];

  constructor(private spotifyService: SpotifyService) { }

  selectSong(track: any) {
    this.trackID.emit(track);
    this.inputField.setValue("");
  }

  @Output() trackID = new EventEmitter;

  ngOnInit() {
    this.inputField.valueChanges
    .subscribe(inputField => this.spotifyService.search(inputField, "track,artist")
    .subscribe(result => {
        this.results = result;
        console.log(this.results);
      }
    ));
  }

}
