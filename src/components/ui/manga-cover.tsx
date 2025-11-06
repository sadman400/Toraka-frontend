import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MangaCoverProps {
  src: string;
  alt: string;
  className?: string;
}

const MangaCover: React.FC<MangaCoverProps> = ({ src, alt, className }) => {
  return (
    <div className={cn("relative overflow-hidden rounded-[13px]", className)}>
      {/* Main Cover Image */}
      <Image
        src={src}
        alt={""}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 210px, (max-width: 768px) 210px, (max-width: 1024px) 280px, (max-width: 1280px) 320px, 360px"
        priority
      />

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/60 to-transparent z-10" />
    </div>
  );
};

export default MangaCover;
