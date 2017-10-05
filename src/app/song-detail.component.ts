import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { NgStyle } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Song } from './song';
import { SongService } from './song.service';

@Component({
    selector: 'song-detail',
    templateUrl: './song-detail.component.html',
})

export class SongDetailComponent implements OnInit {
    sub: any;
    constructor(
        private songService: SongService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    @Input() song: Song;

    ngOnInit(): void {
        // console.log(this)
        this.route.paramMap
        // .switchMap((params: ParamMap) => this.songService.getSong(+params.get('id')))
        // .subscribe(song => this.song = song);
        this.sub = this.route.params.subscribe(params => {
            let id = Number.parseInt(params['id']);
            console.log('getting person with id: ', id);
            this.songService
                .get(id)
                .subscribe(p => this.song = p);
        });
    }

    getTotal(): number {
        var total = 0;
        for (var i = 0; i < this.song.sections.length; i++) {
            var section = this.song.sections[i];
            total += section.length;
        }
        return total;
    }    

    goBack(): void {
        this.location.back();
    }

}