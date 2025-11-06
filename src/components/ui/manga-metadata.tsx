import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MangaMetadataProps {
  className?: string;
}

const MangaMetadata: React.FC<MangaMetadataProps> = ({ className }) => {
  const metadata = [
    {
      icon: '/assets/icons/type-icon.svg',
      label: 'Type',
      value: 'Manhwa'
    },
    {
      icon: '/assets/icons/score-icon.svg',
      label: 'Score',
      value: '9.2'
    },
    {
      icon: '/assets/icons/status-icon.svg',
      label: 'Status',
      value: 'Ongoing'
    },
    {
      icon: '/assets/icons/bookmarks-icon.svg',
      label: 'Bookmarks',
      value: '45.2K'
    },
    {
      icon: '/assets/icons/author-icon.svg',
      label: 'Author',
      value: 'Biga'
    },
    {
      icon: '/assets/icons/artist-icon.svg',
      label: 'Artist',
      value: 'LICO'
    },
    {
      icon: '/assets/icons/chapters-icon.svg',
      label: 'Chapters',
      value: '156'
    }
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {metadata.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-5 h-5 text-gray-400 flex-shrink-0">
            <Image
              src={item.icon}
              alt={""}
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-gray-400 text-sm">{item.label}</span>
            <span className="text-white text-sm font-medium truncate">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MangaMetadata;
