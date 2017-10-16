export class Song {
  id: number;
  artist: string;
  title: string;
  sections: Array<{
    id: number;
    order: number;
    title: string;
    bars: number;
  }>;
}