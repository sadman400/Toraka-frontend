declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode, RefObject } from 'react';

  export interface SplideInstance {
    index: number;
    go: (index: number | string) => void;
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
    Components: {
      Controller: {
        getEnd: () => number;
      };
    };
  }

  export interface SplideProps {
    options?: Record<string, unknown>;
    onMoved?: (splide: SplideInstance, newIndex: number) => void;
    onMounted?: (splide: SplideInstance) => void;
    className?: string;
    children?: ReactNode;
    ref?: RefObject<SplideInstance | null>;
  }

  export interface SplideSlideProps {
    children?: ReactNode;
    key?: string | number;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
