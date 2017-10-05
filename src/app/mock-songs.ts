import { Song } from './song';

export const SONGS: Song[] = [
  { 
    id: 1,
    artist: 'Arctic Monkeys',
    title: 'Do I Wanna Know',
    sections: [{
        id: 1,
        order: 0,
        title: 'Intro',
        length: 4
      },
      {
        id: 2,
        order: 1,
        title: 'Verse',
        length: 16
      },
      {
        id: 3,
        order: 2,
        title: 'Prechorus',
        length: 8
      },
      {
        id: 4,
        order: 3,
        title: 'Chorus',
        length: 8
      },
      {
        id: 5,
        order: 4,
        title: 'Verse',
        length: 16
      },      
    ]
  },
  {
    id: 2,
    artist: 'The Beatles',
    title: 'We Can Work it Out',
    sections: [{
      id: 1,
      order: 0,
      title: 'Verse',
      length: 8
    },
    {
      id: 2,
      order: 1,
      title: 'Verse',
      length: 8
    },
    {
      id: 3,
      order: 2,
      title: 'Bridge',
      length: 8
    },
    {
      id: 4,
      order: 3,
      title: 'Verse',
      length: 8
    }
    ]
  },
  {
    id: 3,
    artist: 'Phantogram',
    title: 'Howling at the Moon',
    sections: [{
      id: 1,
      order: 0,
      title: 'Intro',
      length: 4
    },
    {
      id: 2,
      order: 1,
      title: 'Verse',
      length: 8
    },
    {
      id: 3,
      order: 2,
      title: 'Intro',
      length: 4
    },
    {
      id: 4,
      order: 3,
      title: 'Verse',
      length: 8
    },
    {
      id: 5,
      order: 4,
      title: 'Chorus',
      length: 8
    },
    {
      id: 6,
      order: 5,
      title: 'Break',
      length: 2
    },
    {
      id: 7,
      order: 6,
      title: 'Verse',
      length: 8
    },
    {
      id: 8,
      order: 7,
      title: 'Break',
      length: 2
    },
    {
      id: 9,
      order: 8,
      title: 'Bridge',
      length: 16
    },
    {
      id: 10,
      order: 9,
      title: 'Chorus',
      length: 16
    },
    {
      id: 10,
      order: 9,
      title: 'Break',
      length: 2
    },
    {
      id: 10,
      order: 10,
      title: 'Intro',
      length: 4
    },
  ]
}
];