export interface GameConfig {
  id: string;
  title: string;
  description: string;
  logo: string;
  href: string;
  bgColor: string;
  available: boolean;
  comingSoonText?: string;
  metadata?: {
    title: string;
    description: string;
    keywords: string[];
  };
}