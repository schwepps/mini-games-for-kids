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
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Résous les grilles !',
    logo: '/images/logo/sudoku-logo-large.png',
    href: '/sudoku',
    bgColor: 'from-orange-400 to-red-400',
    available: true,
    metadata: {
      title: 'Sudoku - Jeu de logique',
      description: 'Jeu de Sudoku avec tes personnages préférés !',
      keywords: ['jeu', 'sudoku', 'logique', 'dessins animés', 'enfants', 'puzzle'],
    },
  },
  {
    id: 'mahjong',
    title: 'MahJong',
    description: 'Trouve les paires !',
    logo: '/images/logo/mahjong-logo-large.png',
    href: '/mahjong',
    bgColor: 'from-indigo-400 to-purple-400',
    available: true,
    metadata: {
      title: 'MahJong - Jeu de logique',
      description: 'Jeu de MahJong avec tes personnages préférés !',
      keywords: ['jeu', 'mahjong', 'paires', 'dessins animés', 'enfants', 'logique'],
    },
  },
];

export const PLATFORM_METADATA = {
  title: 'Jeux pour Enfants',
  description: 'Découvre nos jeux amusants avec tes personnages préférés !',
  keywords: ['jeux', 'enfants', 'dessins animés', 'qui est-ce', 'mémo', 'memory', 'devinettes', 'sudoku', 'logique'],
  logo: '/images/logo/logo-large.png',
};