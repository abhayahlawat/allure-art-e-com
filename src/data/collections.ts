export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  artworkCount: number;
  featured: boolean;
}

export const collections: Collection[] = [
  {
    id: '1',
    title: 'Abstract Dreams',
    description: 'Ethereal compositions that blur the lines between reality and imagination',
    image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
    artworkCount: 24,
    featured: true
  },
  {
    id: '2',
    title: 'Botanical Serenity',
    description: 'Nature-inspired pieces celebrating the beauty of flora',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
    artworkCount: 18,
    featured: false
  },
  {
    id: '3',
    title: 'Ocean Whispers',
    description: 'Coastal scenes that capture the essence of maritime tranquility',
    image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg',
    artworkCount: 15,
    featured: true
  },
  {
    id: '4',
    title: 'Urban Expressions',
    description: 'Contemporary cityscapes and modern life interpretations',
    image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
    artworkCount: 21,
    featured: false
  },
  {
    id: '5',
    title: 'Vintage Romance',
    description: 'Timeless pieces with classical elegance and romantic charm',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
    artworkCount: 12,
    featured: true
  },
  {
    id: '6',
    title: 'Geometric Harmony',
    description: 'Modern compositions exploring balance through geometric forms',
    image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg',
    artworkCount: 16,
    featured: false
  }
];