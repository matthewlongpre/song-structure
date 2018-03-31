import { Pipe } from '@angular/core';

@Pipe({ name: 'songTempo' })
export class SongTempoPipe {
    transform(input: number) {
        return Math.round(input);
    }
}