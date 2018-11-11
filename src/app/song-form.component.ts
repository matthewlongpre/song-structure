import { Component, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { SongModel } from './song-model';
import { SongService } from './song.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchComponent } from './search/search.component';

@Component({
    selector: 'song-form',
    templateUrl: './song-form.component.html'
})

export class SongFormComponent {
    addForm: FormGroup;
    constructor(
        private songService: SongService,
        private formBuilder: FormBuilder,
        private router: Router
    ){}

    submitted = false;
    onSubmit(data) { 
        this.submitted = true;
        if (this.songDetail) {
            this.updateSong(data);
        } else {
            this.createSong(data);
        }
    }

    @Input() songDetail: any;
    @Input() hideMetaEdit: boolean;
    @Input() hideSectionEdit: boolean;
    @Input() actionMenu: boolean;
    @Input() hideSearch: boolean;

    trackID(track: any) {
        this.addForm.controls['artist'].setValue(track.artists[0].name);
        this.addForm.controls['title'].setValue(track.name);
        this.addForm.controls['spotifyID'].setValue(track.id);
    }
    
    public editSongMeta: boolean = true;
    public editSections: boolean = true;

    @Output() formChanges = new EventEmitter();

    ngOnInit(){
        if (this.actionMenu) {
            this.editSongMeta = false;
            this.editSections = false;
        }

        if (this.songDetail) {
            this.addForm = this.formBuilder.group({
                title:[this.songDetail.title, [Validators.required]],
                artist: [this.songDetail.artist, [Validators.required]],
                spotifyID: [this.songDetail.spotifyID],
                sections: this.formBuilder.array([])
            });
            this.setSections();
        } else {
            this.addForm = this.formBuilder.group({
                title: ['', [Validators.required]],
                artist: ['', [Validators.required]],
                spotifyID: [''],
                sections: this.formBuilder.array([
                    this.initSection(),
                ])
            });            
        }
        this.onChanges();
    }

    ngAfterViewChecked() {
        if (this.editSections) {
            // TODO
            // this.scrollSections();
        }
    }

    onChanges(): void {
        this.addForm.valueChanges.subscribe(val => {
            this.formChanges.emit(val);
            return val;
        });
    }

    setSections(): void {
        const control = <FormArray>this.addForm.controls.sections;
        this.songDetail.sections.forEach(x => {
            control.push(this.formBuilder.group({
                title: x.title,
                bars: x.bars,
                space: x.space,
                texture: x.texture,
                lead_instrument: x.lead_instrument,
                melody_range: x.melody_range
            }))
        })
        this.formBuilder.group({
            title: [this.songDetail.sections.title, Validators.required],
            bars: [this.songDetail.sections.bars, Validators.required],
            space: [this.songDetail.sections.space],
            texture: [this.songDetail.sections.texture],
            lead_instrument: [this.songDetail.sections.lead_instrument],
            melody_range: [this.songDetail.sections.melody_range]
        })
    }

    initSection() {
        return this.formBuilder.group({
            title: ['',Validators.required],
            bars: ['',Validators.required],
            space: [''],
            texture: [''],
            lead_instrument: [''],
            melody_range: ['']
        })
    }

    addSection(): void {
        const control = <FormArray>this.addForm.controls['sections'];
        control.push(this.initSection());
        this.editSections = true;
    }

    scrollSections(): void {
        const sectionContainer = document.querySelector(".sections");
        sectionContainer.scrollIntoView(false);
    }
    
    removeSection(i: number) {
        const control = <FormArray>this.addForm.controls['sections'];
        control.removeAt(i);
    }

    createSong(data: any): void {
        const song = {
            title: data._value.title,
            artist: data._value.artist,
            spotifyID: data.value.spotifyID,
            sections: data._value.sections
        };
        this.songService.createSong(song).subscribe(
            data => {
                this.router.navigateByUrl("/songs");
                return true;
            },
            error => {
                console.error("Error saving song!");
                return Observable.throw(error);
            }
        );
    }

    updateSong(data: any): void {
        const song = {
            title: data._value.title,
            artist: data._value.artist,
            spotifyID: data.value.spotifyID,
            sections: data._value.sections
        };
        this.songService.updateSong(song).subscribe(
            song => {
                this.router.navigateByUrl("/songs");                
                return true;
            },
            error => {
                console.error("Error saving song!");
                return Observable.throw(error);
            }
        );
    }

    handleDelete(): void {
        if (confirm("Delete this song?")) {
            this.deleteSong();
        }
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