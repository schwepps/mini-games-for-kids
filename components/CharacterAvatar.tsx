'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProfileLoader } from '@/lib/profileLoader';

interface CharacterAvatarProps {
  characterName: string;
  imageName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CharacterAvatar({ 
  characterName, 
  imageName, 
  size = 'md', 
  className = '' 
}: CharacterAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-base'
  };

  const imageUrl = ProfileLoader.getImageUrl(imageName);
  const initials = characterName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Show placeholder while loading or on error
  if (imageLoading || imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className} 
        bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 
        rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600
        font-semibold text-gray-600 dark:text-gray-300 shadow-sm`}
      >
        {!imageLoading && imageError ? (
          <span>{initials}</span>
        ) : (
          <div className="animate-pulse">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        )}
        
        {/* Hidden image element for loading detection */}
        <Image
          src={imageUrl}
          alt={characterName}
          width={1}
          height={1}
          className="hidden"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 relative`}>
      <Image
        src={imageUrl}
        alt={`${characterName} character portrait`}
        fill
        className="object-cover"
        onError={handleImageError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}