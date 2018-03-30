import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { NgStyle } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Song } from './song';
import { SongService } from './song.service';
import { SpotifyService } from './spotify.service';

import { SongKeyPipe } from './song-key.pipe';

@Component({
    selector: 'song-detail',
    templateUrl: './song-detail.component.html',
})

export class SongDetailComponent implements OnInit {
    sub: any;
    position: number[] = [];
    private spotifyTrack: any[] = [];    
    private spotifyAnalysis: any[] = [];
    private spotifyAudioFeatures: any[] = [];

    // private trackID: string = this.song.spotifyID;
    
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
    }

    getTrack(trackID: string): void {
        this.spotifyService
            .getTrack(trackID)
            .subscribe(data => {
                console.log(data)
                this.spotifyTrack = data;
            })
    }

    getAnalysis(trackID: string): void {
        this.spotifyService
        .getAnalysis(trackID)
        .subscribe(data => {
            console.log(data)
            this.spotifyAnalysis = data;
        })
    }

    getAudioFeatures(trackID: string): void {
        this.spotifyService
            .getAudioFeatures(trackID)
            .subscribe(data => {
                console.log(data)
                this.spotifyAudioFeatures = data;
            })
    }

    getDuration(ms: number): any {
            const minutes: number = Math.floor(ms / 60000);
            const seconds: any = ((ms % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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
                    if (this.song.spotifyID) { 
                        this.getTrack(this.song.spotifyID);
                        this.getAnalysis(this.song.spotifyID);
                        this.getAudioFeatures(this.song.spotifyID);
                    }
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