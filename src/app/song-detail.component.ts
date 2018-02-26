import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { NgStyle } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Song } from './song';
import { SongService } from './song.service';
import { SpotifyService } from './spotify.service';

@Component({
    selector: 'song-detail',
    templateUrl: './song-detail.component.html',
})

export class SongDetailComponent implements OnInit {
    sub: any;
    position: number[] = [];
    private spotifySections: any[] = [];
    constructor(
        private songService: SongService,
        private spotifyService: SpotifyService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    @Input() song: Song;

    ngOnInit(): void {
        this.loadSong();
        this.getAnalysis("6K4t31amVTZDgR3sKmwUJJ");
    }

    getAnalysis(trackID: string): void {
        this.spotifyService
        .getAnalysis(trackID)
        .subscribe(analysis => {
            console.log(analysis.sections)
            this.spotifySections = analysis.sections;
        })
    }

    loadSong(): void {
        this.route.paramMap
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            this.songService
                .get(id)
                .subscribe(song => {
                    this.song = song
                    this.setPosition();
                });
        });
    }

    getTotal(): number {
        let total: number = 0;
        for (let i: number = 0; i < this.song.sections.length; i++) {
            let section = this.song.sections[i];
            total += section.bars;
        }
        return total;
    }

    setPosition(): number[] {
        let currentPosition: number = 0;
        for (let i: number = 0; i < this.song.sections.length; i++) {
            let section = this.song.sections[i];
            currentPosition += section.bars;
            this.position.push(currentPosition - section.bars);
        }
        return this.position;
    }

    getPosition(index: number): number {
        let position = this.position[index];
        return position;
    }

    goBack(): void {
        this.location.back();
    }

    getSectionName(section): string {
        var returnTitle = '';
        returnTitle = section.toLowerCase().replace(" ", "-").replace("'", "-").replace("/", "-");
        return returnTitle;
    }

    formChanges(data: any) {
        this.song = data;
    }

    deleteSong(): void {
        this.songService.deleteSong().subscribe(
            song => {
                this.router.navigateByUrl("/songs");
                return true;
            },
            error => {
                console.error("Error deleting song!");
                return Observable.throw(error);
            }
        );
    }
}