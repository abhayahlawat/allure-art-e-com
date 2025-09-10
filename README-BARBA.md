# Framer Motion Page Transitions with React Router

This project uses Framer Motion for smooth page transitions while maintaining React Router for client-side routing.

## Installation

Framer Motion is already included as a dependency:

```bash
npm install framer-motion
```

## How It Works

### Architecture
- **React Router**: Handles client-side routing and component rendering
- **Framer Motion**: Provides smooth page transitions and animations
- **AnimatePresence**: Manages enter/exit animations between routes

### Key Components

1. **PageWrapper** (in `src/App.tsx`)
   - Wraps each page component with motion.div
   - Provides consistent enter/exit animations
   - Uses Framer Motion variants for smooth transitions

2. **AnimatePresence** (in `src/App.tsx`)
   - Manages page transition animations
   - Ensures smooth enter/exit sequences
   - Uses `mode="wait"` for sequential animations

## Available Transitions

### Current Transition
- **Fade + Scale + Slide**: Combined effect with opacity, scale, and vertical movement
- **Duration**: 0.5 seconds with anticipate easing
- **Enter**: Fades in from below with slight scale up
- **Exit**: Fades out upward with slight scale up

## Usage

Each route is automatically wrapped with PageWrapper:

```tsx
<Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
```

## Customization

### Adding New Transitions

1. Modify the `pageVariants` object in `src/App.tsx`:
```typescript
const pageVariants = {
  initial: {
    opacity: 0,
    x: -100, // Slide from left
    scale: 0.95
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: 100, // Slide to right
    scale: 1.05
  }
};
```

2. Adjust the `pageTransition` object:
```typescript
const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30
};
```

### Page-Specific Animations
Create different variants for specific pages:
```typescript
const galleryVariants = {
  initial: { opacity: 0, scale: 1.1 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.9 }
};
```

## Performance Considerations

- Transitions are hardware-accelerated using Framer Motion
- Smooth 60fps animations
- Smooth scroll behavior enabled
- Minimal impact on bundle size
- Optimized for mobile devices

## Browser Support

- Modern browsers with CSS transforms support
- Graceful degradation on older browsers
- Mobile-optimized animations

## Troubleshooting

1. **Transitions not working**: Ensure all pages are wrapped with PageWrapper
2. **Performance issues**: Reduce animation duration or complexity
3. **Performance issues**: Reduce animation duration or complexity
4. **Layout shifts**: Use `layout` prop on motion components if needed

## Future Enhancements

- Add more transition types
- Page-specific transition variants
- Gesture-based navigation
- Shared element transitions
