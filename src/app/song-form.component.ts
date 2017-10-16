import { Component, Input } from '@angular/core';
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
    // model = new SongModel(0,'','');
    submitted = false;
    onSubmit() { this.submitted = true;}

    @Input()
    songDetail: any;

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
    }

    setSections(){
        let control = <FormArray>this.addForm.controls.sections;
        this.songDetail.sections.forEach(x => {
            control.push(this.formBuilder.group({title: x.title, bars: x.bars}))
        })
    }

    initSection(){
        if (this.songDetail){
            return this.formBuilder.group({
                title: [this.songDetail.sections.title, Validators.required],
                bars: [this.songDetail.sections.bars, Validators.required]
            })
        } else {
            return this.formBuilder.group({
                title: ['',Validators.required],
                bars: ['',Validators.required]
            })
        }
    }

    addLink() {
        const control = <FormArray>this.addForm.controls['sections'];
        control.push(this.initSection());
    }
    removeLink(i: number) {
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
                console.log(song)
                // refresh the list
                // this.getFoods();
                return true;
            },
            error => {
                console.error("Error saving song!");
                return Observable.throw(error);
            }
        );
    }
    // TODO: Remove this when we're done
    // get diagnostic() { return JSON.stringify(this.model); }
}