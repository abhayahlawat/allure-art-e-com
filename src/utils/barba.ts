import barba from '@barba/core';
import { gsap } from 'gsap';

// Define transition animations
const fadeTransition = {
  name: 'fade',
  leave(data: any) {
    return gsap.to(data.current.container, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  },
  enter(data: any) {
    return gsap.from(data.next.container, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }
};

const slideTransition = {
  name: 'slide',
  leave(data: any) {
    return gsap.to(data.current.container, {
      x: '-100%',
      duration: 0.6,
      ease: 'power2.inOut'
    });
  },
  enter(data: any) {
    gsap.set(data.next.container, { x: '100%' });
    return gsap.to(data.next.container, {
      x: '0%',
      duration: 0.6,
      ease: 'power2.inOut'
    });
  }
};

const scaleTransition = {
  name: 'scale',
  leave(data: any) {
    return gsap.to(data.current.container, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    });
  },
  enter(data: any) {
    gsap.set(data.next.container, { scale: 1.2, opacity: 0 });
    return gsap.to(data.next.container, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    });
  }
};

// Initialize Barba.js
export const initBarba = () => {
  barba.init({
    transitions: [fadeTransition, slideTransition, scaleTransition],
    views: [
      {
        namespace: 'home',
        beforeEnter() {
          // Initialize home page specific animations
          console.log('Entering home page');
        }
      },
      {
        namespace: 'about',
        beforeEnter() {
          // Initialize about page specific animations
          console.log('Entering about page');
        }
      },
      {
        namespace: 'gallery',
        beforeEnter() {
          // Initialize gallery page specific animations
          console.log('Entering gallery page');
        }
      },
      {
        namespace: 'contact',
        beforeEnter() {
          // Initialize contact page specific animations
          console.log('Entering contact page');
        }
      }
    ]
  });

  // Add loading indicator
  barba.hooks.before(() => {
    document.body.classList.add('is-loading');
  });

  barba.hooks.after(() => {
    document.body.classList.remove('is-loading');
  });
};

export default barba;
