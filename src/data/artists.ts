export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  specialty: string;
  artworkCount: number;
  featured: boolean;
  socialLinks: {
    instagram?: string;
    website?: string;
    twitter?: string;
  };
}

export const artists: Artist[] = [
  {
    id: '1',
    name: 'Marina Celestine',
    bio: 'Marina creates ethereal abstract pieces that capture the essence of dreams and emotions through flowing pastels and organic forms.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    specialty: 'Abstract Art',
    artworkCount: 15,
    featured: true,
    socialLinks: {
      instagram: '@marina_celestine',
      website: 'marinacelestine.com'
    }
  },
  {
    id: '2',
    name: 'Elena Botanical',
    bio: 'Elena specializes in delicate botanical watercolors, bringing the serenity of nature into contemporary spaces.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    specialty: 'Botanical Art',
    artworkCount: 22,
    featured: true,
    socialLinks: {
      instagram: '@elena_botanical',
      website: 'elenabotanical.art'
    }
  },
  {
    id: '3',
    name: 'Marco Azul',
    bio: 'Marco captures the calming essence of ocean waves through textured brushstrokes and mesmerizing azure tones.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    specialty: 'Seascape Art',
    artworkCount: 18,
    featured: false,
    socialLinks: {
      instagram: '@marco_azul_art',
      twitter: '@marcoazulart'
    }
  },
  {
    id: '4',
    name: 'Luna Nocturne',
    bio: 'Luna creates contemplative night scenes where moonbeams illuminate dreamy landscapes in silver and lavender hues.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    specialty: 'Landscape Art',
    artworkCount: 12,
    featured: true,
    socialLinks: {
      website: 'lunanocturne.studio'
    }
  }
];