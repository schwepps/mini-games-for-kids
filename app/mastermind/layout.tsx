import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mastermind - Jeu de logique',
  description: 'Devine la combinaison secrète de tes personnages préférés !',
  keywords: ['jeu', 'mastermind', 'logique', 'déduction', 'dessins animés', 'enfants'],
};

export default function MastermindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}