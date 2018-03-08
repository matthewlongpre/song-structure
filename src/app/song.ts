export class Song {
  id: number;
  spotifyID?: string;
  artist: string;
  title: string;
  sections: Array<{
    id: number;
    order: number;
    title: string;
    bars: number;
  }>;
}