import React from 'react';
import { cn } from '@/lib/utils';

interface MangaTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const MangaTabs: React.FC<MangaTabsProps> = ({ activeTab, onTabChange, className }) => {
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'chapters', label: 'Chapters' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'similar', label: 'Similar' }
  ];

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-white border-b-2 border-[#FF8140]"
                : "text-gray-400 hover:text-gray-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'description' && (
          <div className="text-gray-300 leading-relaxed">
            <p className="mb-4">
              The Mount Hua Sect, once the greatest sect in the world, has fallen into decline. 
              Chung Myung, the 13th disciple of the Mount Hua Sect, one of the Three Great Swordsmen, 
              plum blossom sword saint, defeated Chun Ma, who brought destruction and disarray onto the world.
            </p>
            <p className="mb-4">
              After the battle, he breathed his last breath on top of the headquarter mountain of the 
              Heavenly Demon Sect. He is reborn after 100 years in the body of a child.
            </p>
            <p>
              What? The Mount Hua declined? Then I&apos;ll have to save it! Let&apos;s go, Mount Hua!
            </p>
          </div>
        )}
        
        {activeTab === 'chapters' && (
          <div className="text-gray-300">
            <p>Chapter list will be displayed here...</p>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="text-gray-300">
            <p>Reviews will be displayed here...</p>
          </div>
        )}
        
        {activeTab === 'similar' && (
          <div className="text-gray-300">
            <p>Similar manga recommendations will be displayed here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MangaTabs;
