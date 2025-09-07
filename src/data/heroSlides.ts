export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Discover',
    subtitle: 'Extraordinary',
    description: 'Immerse yourself in a world of artistic wonder. From abstract masterpieces to contemporary gems, find the perfect piece to transform your space.',
    image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
    cta: 'Explore Gallery'
  },
  {
    id: '2',
    title: 'Curated',
    subtitle: 'Collections',
    description: 'Each artwork is carefully selected for its artistic merit and emotional impact, bringing you only the finest pieces from talented artists worldwide.',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
    cta: 'View Collections'
  },
  {
    id: '3',
    title: 'Support',
    subtitle: 'Artists',
    description: 'When you purchase from Allure Art, you directly support independent artists and help them continue creating beautiful works that inspire us all.',
    image: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg',
    cta: 'Meet Artists'
  }
];