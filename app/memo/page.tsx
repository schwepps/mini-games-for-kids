import Image from 'next/image';
import GameLayout from '@/components/shared/GameLayout';

export default function MemoPage() {
  return (
    <GameLayout gradient="from-green-400 via-blue-400 to-purple-400" decorations="celebration">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-2xl">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/logo/memo-logo-large.png"
              alt="Mémo"
              width={400}
              height={200}
              className="mx-auto"
              priority
            />
          </div>
          
          {/* Coming Soon Message */}
          <div className="bg-white/90 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
              Bientôt disponible ! 🎊
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              Le jeu de mémoire arrive très bientôt...
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Retrouve tes personnages préférés dans un jeu de mémoire amusant !
            </p>
            
            {/* Animation placeholder */}
            <div className="flex justify-center gap-2">
              <div className="w-16 h-16 bg-yellow-400 rounded-lg animate-pulse"></div>
              <div className="w-16 h-16 bg-pink-400 rounded-lg animate-pulse delay-100"></div>
              <div className="w-16 h-16 bg-blue-400 rounded-lg animate-pulse delay-200"></div>
              <div className="w-16 h-16 bg-green-400 rounded-lg animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
}