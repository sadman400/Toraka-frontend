import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Badge {
  type: 'popularity' | 'rating';
  rank: number;
  color: string;
}

interface MangaInfoProps {
  title: string;
  badges: Badge[];
  className?: string;
}

const MangaInfo: React.FC<MangaInfoProps> = ({ title, badges, className }) => {
  const getIcon = (type: Badge['type']) => {
    if (type === 'popularity') {
      return (
        <Image
          src="/assets/icons/fire-icon.svg"
          alt="Fire icon"
          width={12}
          height={15}
          className="w-3 h-[15px]"
        />
      );
    } else {
      return (
        <Image
          src="/assets/icons/star-icon.svg"
          alt="Star icon"
          width={13}
          height={13}
          className="w-[13px] h-[13px]"
        />
      );
    }
  };

  const getBadgeText = (badge: Badge) => {
    return badge.type === 'popularity' ? `Popularity #${badge.rank}` : `Rating #${badge.rank}`;
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Title */}
      <h1 className="text-[#F5F5F5] text-2xl font-semibold leading-[1.19] text-center md:text-left font-sans">
        {title}
      </h1>

      {/* Badges */}
      <div className="flex items-center justify-center md:justify-start gap-2">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-1 px-3 py-0.5 rounded-[24px] text-white text-sm font-medium leading-[1.5] tracking-[-0.022em] font-sans"
            style={{ backgroundColor: badge.color }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {getIcon(badge.type)}
            </div>
            <span>{getBadgeText(badge)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaInfo;
