'use client';

import Image from 'next/image';
import { ICharacter } from '@/types/guess-who';

interface ImagePreloaderProps {
  characters: ICharacter[];
}

/**
 * Hidden component that preloads character images for memo game
 * Eliminates grey placeholder delay when cards are flipped for the first time
 */
export default function ImagePreloader({ characters }: ImagePreloaderProps) {
  if (characters.length === 0) return null;

  return (
    <div 
      className="fixed -top-[9999px] -left-[9999px] opacity-0 pointer-events-none"
      aria-hidden="true"
    >
      {characters.map((character) => (
        <Image
          key={`preload-${character.id}`}
          src={`/images/profiles/cartoon-characters/${character.image}`}
          alt=""
          width={300}
          height={300}
          priority
          sizes="(max-width: 768px) 200px, 300px"
        />
      ))}
    </div>
  );
}