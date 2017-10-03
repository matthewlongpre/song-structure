export class Song {
  id: number;
  title: string;
  sections: Array<{
    id: number;
    order: number;
    title: string;
    length: number;
  }>;
}