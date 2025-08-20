import CartoonGame from '@/components/profiles/cartoon/CartoonGame';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      {/* Background pattern for kids */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">⭐</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">🌈</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-300">🎮</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-pulse delay-500">✨</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-bounce delay-700">🎯</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-pulse delay-1000">🎪</div>
      </div>
      
      {/* Main game content */}
      <div className="relative z-10">
        <CartoonGame />
      </div>
    </div>
  );
}
