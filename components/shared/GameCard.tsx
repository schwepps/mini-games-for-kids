import Image from 'next/image';
import Link from 'next/link';
import { GameConfig } from '@/types/games';

interface GameCardProps {
  game: GameConfig;
}

export default function GameCard({ game }: GameCardProps) {
  const CardContent = (
    <div className={`
      relative overflow-hidden rounded-3xl shadow-2xl 
      bg-gradient-to-br ${game.bgColor} 
      transform transition-all duration-300 
      ${game.available ? 'hover:scale-102 hover:shadow-3xl' : 'opacity-75'}
      h-[360px] md:h-96 lg:h-[400px]
      max-w-sm mx-auto
    `}>
      <div className="p-3 md:p-6 h-full">
        <div className="bg-white/95 rounded-2xl p-3 md:p-6 h-full flex flex-col">
          {/* Logo Section - Fixed aspect ratio */}
          <div className="mb-3 flex-shrink-0">
            <div className="relative aspect-[5/2] md:aspect-[2/1] w-full">
              <Image
                src={game.logo}
                alt={game.title}
                fill
                className={`object-contain ${!game.available ? 'grayscale opacity-50' : ''}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          
          {/* Content Section - Flexible */}
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                {game.title}
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-2 md:mb-4 line-clamp-2">
                {game.description}
              </p>
            </div>
            
            {/* Button Section - Fixed at bottom */}
            <div className="flex-shrink-0 min-h-[44px] pt-2">
              {game.available ? (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2.5 px-5 rounded-full text-base group-hover:from-purple-600 group-hover:to-pink-600 transition-colors">
                  Jouer maintenant
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-gray-400 text-white font-bold py-2.5 px-5 rounded-full text-base">
                  {game.comingSoonText || 'Bientôt disponible'}
                  <span className="text-lg">🔒</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {game.available && (
        <>
          <div className="absolute -top-2 -right-2 text-3xl md:text-4xl animate-spin slow">⭐</div>
          <div className="absolute -bottom-2 -left-2 text-2xl md:text-3xl animate-pulse">✨</div>
        </>
      )}
    </div>
  );

  if (game.available) {
    return (
      <Link href={game.href} className="group relative">
        {CardContent}
      </Link>
    );
  }

  return (
    <div className="relative pointer-events-none">
      {CardContent}
    </div>
  );
}