// src/vite-env.d.ts
/// <reference types="vite/client" />

// Declare CSS modules globally for general CSS imports
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }
  
  // Explicit declarations for Swiper CSS to ensure they are recognized
  declare module 'swiper/css' {
    const content: string;
    export default content;
  }
  
  declare module 'swiper/css/autoplay' {
    const content: string;
    export default content;
  }
  
  // Add any other specific Swiper CSS imports you might use (e.g., navigation, pagination)
  declare module 'swiper/css/navigation' {
    const content: string;
    export default content;
  }
  
  declare module 'swiper/css/pagination' {
    const content: string;
    export default content;
  }