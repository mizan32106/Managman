import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin,
  Share2,
  Pin,
} from 'lucide-react';
import type { SocialPlatform } from '../types';

interface PlatformSelectorProps {
  selectedPlatforms: SocialPlatform[];
  onSelect: (platform: SocialPlatform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selectedPlatforms, onSelect }) => {
  const platforms: Array<{
    id: SocialPlatform;
    name: string;
    icon: React.ElementType;
    color: string;
  }> = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-600' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'bg-red-600' },
    { id: 'x', name: 'X (Twitter)', icon: Twitter, color: 'bg-black' },
    { id: 'tiktok', name: 'TikTok', icon: Share2, color: 'bg-black' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { id: 'pinterest', name: 'Pinterest', icon: Pin, color: 'bg-red-700' },
    { id: 'threads', name: 'Threads', icon: Share2, color: 'bg-black' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map((platform) => {
        const isSelected = selectedPlatforms.includes(platform.id);
        const Icon = platform.icon;
        
        return (
          <button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className={`
              flex items-center px-4 py-2 rounded-lg transition-all
              ${isSelected 
                ? `${platform.color} text-white` 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <Icon className="w-5 h-5 mr-2" />
            <span>{platform.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PlatformSelector;