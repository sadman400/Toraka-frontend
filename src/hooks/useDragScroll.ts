import { useRef, useCallback, MouseEvent } from 'react';

interface UseDragScrollReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

export function useDragScroll(): UseDragScrollReturn {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    isDragging.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    
    // Add cursor style
    ref.current.style.cursor = 'grabbing';
    ref.current.style.userSelect = 'none';
    
    // Prevent text selection
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !ref.current) return;
    
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    ref.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!ref.current) return;
    
    isDragging.current = false;
    ref.current.style.cursor = 'grab';
    ref.current.style.userSelect = '';
  }, []);

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    
    isDragging.current = false;
    ref.current.style.cursor = 'grab';
    ref.current.style.userSelect = '';
  }, []);

  return {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
}
