import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SongModel } from './song-model';
import { SongService } from './song.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'song-form',
    templateUrl: './song-form.component.html'
})

export class SongFormComponent {
    addForm: FormGroup;
    constructor(
        private songService: SongService,
        private formBuilder: FormBuilder
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

    @Output() formChanges = new EventEmitter();

    ngOnInit(){
        if (this.songDetail) {
            this.addForm = this.formBuilder.group({
                title:[this.songDetail.title, [Validators.required]],
                artist: [this.songDetail.artist, [Validators.required]],
                sections: this.formBuilder.array([])
            });
            this.setSections();
        } else {
            this.addForm = this.formBuilder.group({
                title: ['', [Validators.required]],
                artist: ['', [Validators.required]],
                sections: this.formBuilder.array([
                    this.initSection(),
                ])
            });            
        }
        this.onChanges();
    }

    onChanges(): void {
        this.addForm.valueChanges.subscribe(val => {
            console.log(val)
            this.formChanges.emit(val);
            return val;
        });
    }

    setSections(){
        let control = <FormArray>this.addForm.controls.sections;
        this.songDetail.sections.forEach(x => {
            control.push(this.formBuilder.group({title: x.title, bars: x.bars}))
        })
        this.formBuilder.group({
            title: [this.songDetail.sections.title, Validators.required],
            bars: [this.songDetail.sections.bars, Validators.required]
        })
    }

    initSection(){
        return this.formBuilder.group({
            title: ['',Validators.required],
            bars: ['',Validators.required]
        })
    }

    addSection() {
        const control = <FormArray>this.addForm.controls['sections'];
        control.push(this.initSection());
    }
    
    removeSection(i: number) {
        const control = <FormArray>this.addForm.controls['sections'];
        control.removeAt(i);
    }

    createSong(data: any): void {
        let song = {
            title: data._value.title,
            artist: data._value.artist,
            sections: data._value.sections
        };
        this.songService.createSong(song).subscribe(
            data => {
                // TO DO: refresh the list
                return true;
            },
            error => {
                console.error("Error saving song!");
                return Observable.throw(error);
            }
        );
    }

    updateSong(data: any): void {
        let song = {
            title: data._value.title,
            artist: data._value.artist,
            sections: data._value.sections
        };
        this.songService.updateSong(song).subscribe(
            song => {
                return true;
            },
            error => {
                console.error("Error saving song!");
                return Observable.throw(error);
            }
        );
    }

    deleteSong(): void {
        console.log('deleteSong');
        this.songService.deleteSong().subscribe(
            song => {
                return true;
            },
            error => {
                console.error("Error deleting song!");
                return Observable.throw(error);
            }
        );
    }

    // TODO: Remove this when we're done
    // get diagnostic() { return JSON.stringify(this.model); }
}