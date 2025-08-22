interface BackgroundDecorationsProps {
  variant?: 'default' | 'celebration' | 'minimal';
}

export default function BackgroundDecorations({ variant = 'default' }: BackgroundDecorationsProps) {
  if (variant === 'minimal') {
    return (
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">⭐</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">🌈</div>
      </div>
    );
  }

  if (variant === 'celebration') {
    return (
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🎉</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse">🎊</div>
        <div className="absolute bottom-20 left-40 text-6xl animate-spin slow">🎈</div>
        <div className="absolute bottom-40 right-10 text-5xl animate-bounce delay-300">🎁</div>
        <div className="absolute top-1/2 left-20 text-4xl animate-pulse">✨</div>
        <div className="absolute top-1/3 right-1/3 text-5xl animate-bounce delay-500">🌟</div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 text-6xl animate-bounce">⭐</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse">🌈</div>
      <div className="absolute bottom-20 left-40 text-5xl animate-spin slow">🎮</div>
      <div className="absolute bottom-40 right-10 text-6xl animate-bounce delay-300">🎯</div>
      <div className="absolute top-1/2 left-20 text-4xl animate-pulse">✨</div>
      <div className="absolute top-1/3 right-1/3 text-5xl animate-bounce delay-500">🌟</div>
    </div>
  );
}