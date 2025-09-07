# Barba.js Integration with React Router - Hybrid Approach

This project now includes Barba.js for smooth page transitions while maintaining React Router for client-side routing.

## Installation

Run the following command to install the required dependencies:

```bash
npm install @barba/core @barba/css gsap
```

## How It Works

### Hybrid Architecture
- **React Router**: Handles client-side routing and component rendering
- **Barba.js**: Provides smooth page transitions and animations
- **GSAP**: Powers the transition animations

### Key Components

1. **BarbaWrapper** (`src/components/BarbaWrapper.tsx`)
   - Wraps each page component
   - Initializes Barba.js on first mount
   - Provides namespace for page-specific transitions

2. **Barba Configuration** (`src/utils/barba.ts`)
   - Defines transition animations (fade, slide, scale)
   - Sets up page-specific views
   - Handles loading states

3. **Type Definitions** (`src/types/barba.d.ts`)
   - TypeScript definitions for Barba.js and GSAP
   - Ensures type safety

4. **Styles** (`src/styles/barba.css`)
   - CSS animations and transitions
   - Loading indicators
   - Page-specific backgrounds

## Available Transitions

### 1. Fade Transition
- Smooth opacity transition
- Default transition for most pages

### 2. Slide Transition
- Horizontal sliding effect
- Great for gallery/portfolio pages

### 3. Scale Transition
- Scale and fade effect
- Perfect for modal-like transitions

## Usage

Each route is automatically wrapped with BarbaWrapper:

```tsx
<Route path="/" element={<BarbaWrapper namespace="home"><Home /></BarbaWrapper>} />
```

## Page Namespaces

- `home` - Home page
- `gallery` - Gallery page
- `artists` - Artists page
- `about` - About page
- `contact` - Contact page
- `wishlist` - Wishlist page
- `login` - Login page

## Customization

### Adding New Transitions

1. Define transition in `src/utils/barba.ts`:
```typescript
const customTransition = {
  name: 'custom',
  leave(data: any) {
    return gsap.to(data.current.container, {
      // Your exit animation
    });
  },
  enter(data: any) {
    return gsap.from(data.next.container, {
      // Your enter animation
    });
  }
};
```

2. Add to transitions array in `initBarba()`

### Page-Specific Animations

Add view configurations in `src/utils/barba.ts`:
```typescript
{
  namespace: 'your-page',
  beforeEnter() {
    // Initialize page-specific animations
  }
}
```

## Performance Considerations

- Transitions are hardware-accelerated using GSAP
- Loading indicator provides visual feedback
- Smooth scroll behavior enabled
- Minimal impact on bundle size

## Browser Support

- Modern browsers with ES6+ support
- Fallback to standard navigation if Barba.js fails to load

## Troubleshooting

1. **Transitions not working**: Ensure all pages are wrapped with BarbaWrapper
2. **TypeScript errors**: Check type definitions in `src/types/barba.d.ts`
3. **Performance issues**: Reduce animation duration or complexity

## Future Enhancements

- Add more transition types
- Implement page preloading
- Add transition sound effects
- Create transition based on scroll direction
