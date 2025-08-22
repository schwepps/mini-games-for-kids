import Image from 'next/image';
import PageWrapper from '@/components/shared/PageWrapper';
import GameCard from '@/components/shared/GameCard';
import { GAMES, PLATFORM_METADATA } from '@/lib/constants/games';

export default function Home() {
  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <header className="pt-8 pb-4 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-6">
              <Image
                src={PLATFORM_METADATA.logo}
                alt={PLATFORM_METADATA.title}
                width={600}
                height={300}
                className="mx-auto drop-shadow-2xl rounded-4xl"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
              Choisis ton jeu ! 🎉
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow">
              Amuse-toi avec tes personnages préférés
            </p>
          </div>
        </header>

        {/* Games Grid */}
        <main className="flex-1 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {GAMES.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 text-center text-white/80">
          <p className="text-sm">
            Fait avec ❤️ pour les enfants
          </p>
        </footer>
      </div>
    </PageWrapper>
  );
}
