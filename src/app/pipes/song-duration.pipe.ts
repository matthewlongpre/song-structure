import { Pipe } from '@angular/core';

@Pipe({ name: 'songDuration' })
export class SongDurationPipe {
    transform(ms: number) {
        const minutes: number = Math.floor(ms / 60000);
        const seconds: any = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
}