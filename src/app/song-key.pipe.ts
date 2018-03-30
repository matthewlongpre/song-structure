import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'songKey' })
export class SongKeyPipe implements PipeTransform {
    transform(key: number, mode: number): string {
        const keys: string[] = [
            "C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Ab", "B"
        ];
        const modes: string[] = [
            "Minor", "Major"
        ]
        return `${keys[key]} ${modes[mode]}`;
    }
}