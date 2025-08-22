import { GameConfig } from '@/types/games';

export const GAMES: GameConfig[] = [
  {
    id: 'qui-est-ce',
    title: 'Qui est-ce ?',
    description: 'Devine les personnages !',
    logo: '/images/logo/qui-est-ce-logo-large.png',
    href: '/qui-est-ce',
    bgColor: 'from-blue-400 to-purple-400',
    available: true,
    metadata: {
      title: 'Qui est-ce ?',
      description: 'Devine les personnages de dessins animés !',
      keywords: ['jeu', 'devinettes', 'dessins animés', 'enfants', 'qui est-ce'],
    },
  },
  {
    id: 'memo',
    title: 'Mémo',
    description: 'Retrouve les paires !',
    logo: '/images/logo/memo-logo-large.png',
    href: '/memo',
    bgColor: 'from-green-400 to-blue-400',
    available: true,
    metadata: {
      title: 'Mémo - Jeu de mémoire',
      description: 'Jeu de mémoire avec tes personnages préférés !',
      keywords: ['jeu', 'mémoire', 'mémo', 'dessins animés', 'enfants', 'memory'],
    },
  },
];

export const PLATFORM_METADATA = {
  title: 'Jeux pour Enfants',
  description: 'Découvre nos jeux amusants avec tes personnages préférés !',
  keywords: ['jeux', 'enfants', 'dessins animés', 'qui est-ce', 'mémo', 'memory', 'devinettes'],
  logo: '/images/logo/logo-large.png',
};