import { useEffect, useState } from "react";

const useScreenSizer = () => {
  // Initialize with undefined to prevent hydration mismatch
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'laptop' | 'desktop' | undefined>(undefined);

  useEffect(() => {
      const handleResize = () => {
        if (typeof window === 'undefined') return;

        const width = window.innerWidth;
        let newScreenSize: 'mobile' | 'tablet' | 'desktop' | 'laptop';

        if (width >= 1280) {
          newScreenSize = 'desktop';
        } else if(width >= 1024) {
          newScreenSize = 'laptop';
        } else if (width >= 768) {
          newScreenSize = 'tablet';
        } else {
          newScreenSize = 'mobile';
        }

        // Only update if screen size actually changed
        if (newScreenSize !== screenSize) {
          setScreenSize(newScreenSize);
        }
      };

      // Only run on client side
      if (typeof window !== 'undefined') {
        handleResize(); // Set initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, [screenSize]);
  
    return screenSize;
  };
  
  export default useScreenSizer;
  