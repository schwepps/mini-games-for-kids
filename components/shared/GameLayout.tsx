import { ReactNode } from 'react';
import PageWrapper from './PageWrapper';
import HomeButton from './HomeButton';

interface GameLayoutProps {
  children: ReactNode;
  gradient?: string;
  decorations?: 'default' | 'celebration' | 'minimal' | 'none';
  showHomeButton?: boolean;
  homeButtonVariant?: 'home' | 'back';
}

export default function GameLayout({ 
  children, 
  gradient = 'from-blue-400 via-purple-400 to-pink-400',
  decorations = 'minimal',
  showHomeButton = true,
  homeButtonVariant = 'home'
}: GameLayoutProps) {
  return (
    <PageWrapper gradient={gradient} decorations={decorations}>
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-game-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-yellow-400 focus:text-black focus:rounded-md focus:font-bold focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      
      {showHomeButton && <HomeButton variant={homeButtonVariant} />}
      <main id="main-game-content" className="focus:outline-none" tabIndex={-1}>
        {children}
      </main>
    </PageWrapper>
  );
}