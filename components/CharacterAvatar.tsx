'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProfileLoader } from '@/lib/profileLoader';

interface CharacterAvatarProps {
  characterName: string;
  imageName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
    lg: 'w-24 h-24 text-base',
    xl: 'w-48 h-48 text-lg'
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

  // If there's an error, show the fallback
  if (imageError) {
    return (
      <div className={`${className.includes('w-full') ? 'w-full h-full' : sizeClasses[size]} ${className} 
        bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 
        rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600
        font-semibold text-gray-600 dark:text-gray-300 shadow-sm`}
      >
        <span className={`${className.includes('w-full') ? 'text-2xl' : ''}`}>{initials}</span>
      </div>
    );
  }

  // Show the image (with optional loading state overlay)
  return (
    <div className={`${className.includes('w-full') ? 'w-full h-full' : sizeClasses[size]} ${className} rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600 relative`}>
      {/* Optional loading skeleton - visible while image loads */}
      {imageLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 animate-pulse z-10" />
      )}
      
      {/* Always render the Image component */}
      <Image
        src={imageUrl}
        alt={`${characterName} character portrait`}
        fill
        className="object-cover"
        onError={handleImageError}
        onLoadingComplete={handleImageLoad}
        sizes={size === 'xl' ? '192px' : size === 'lg' ? '96px' : size === 'md' ? '64px' : '32px'}
        priority={false}
        loading="lazy"
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
      />
    </div>
  );
}