import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface HomeButtonProps {
  variant?: 'home' | 'back';
  className?: string;
}

export default function HomeButton({ variant = 'home', className = '' }: HomeButtonProps) {
  const text = variant === 'home' ? 'Accueil' : 'Retour';
  
  return (
    <Link
      href="/"
      className={`
        absolute top-4 left-4 z-40
        inline-flex items-center gap-2
        min-w-[100px] sm:min-w-[140px] min-h-[48px] sm:min-h-[56px] px-3 sm:px-4 py-2 sm:py-3
        bg-gradient-to-r from-yellow-400 to-orange-500
        border-2 border-white/30
        rounded-full shadow-xl
        text-white font-bold text-xs sm:text-sm md:text-base
        hover:from-yellow-300 hover:to-orange-400 hover:shadow-2xl hover:scale-110
        focus:outline-none focus:ring-4 focus:ring-yellow-400/50
        transition-all duration-300 ease-out transform
        active:scale-95
        ${className}
      `}
      aria-label={`${text} - Retourner à la page d'accueil`}
    >
      {variant === 'home' ? (
        <div className="relative w-6 h-6 md:w-7 md:h-7 flex-shrink-0">
          <Image
            src="/images/logo/logo-square.png"
            alt="Accueil"
            fill
            className="object-contain"
            sizes="28px"
          />
        </div>
      ) : (
        <ArrowLeft className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />
      )}
      <span className="hidden sm:inline-block whitespace-nowrap font-bold drop-shadow-sm">
        {text}
      </span>
    </Link>
  );
}