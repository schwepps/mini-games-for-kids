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
      {showHomeButton && <HomeButton variant={homeButtonVariant} />}
      {children}
    </PageWrapper>
  );
}