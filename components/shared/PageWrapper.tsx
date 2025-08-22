import { ReactNode } from 'react';
import BackgroundDecorations from './BackgroundDecorations';

interface PageWrapperProps {
  children: ReactNode;
  gradient?: string;
  decorations?: 'default' | 'celebration' | 'minimal' | 'none';
}

export default function PageWrapper({ 
  children, 
  gradient = 'from-blue-400 via-purple-400 to-pink-400',
  decorations = 'default'
}: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient}`}>
      {decorations !== 'none' && <BackgroundDecorations variant={decorations} />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}