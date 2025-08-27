/**
 * Game Types for Guess Who Character Management System
 */

export type CharacteristicType = 'boolean' | 'enum' | 'range' | 'number' | 'string';

export interface ICharacteristicSchema {
  type: CharacteristicType;
  displayName: string;
  values?: (string | number)[];
  category?: string;
  min?: number;
  max?: number;
  description?: string;
}

export interface IProfile {
  id: string;
  name: string;
  description: string;
  version: string;
  characteristicSchema: Record<string, ICharacteristicSchema>;
  characters: ICharacter[];
  metadata?: {
    author?: string;
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
  };
}

export interface ICharacter {
  id: string;
  name: string;
  image: string; // Just filename, full path resolved by ProfileLoader
  characteristics: Record<string, unknown>;
  metadata?: {
    description?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
  };
}

export interface IGameState {
  profile: IProfile;
  hiddenCharacter: ICharacter;
  remainingCharacters: ICharacter[];
  eliminatedCharacters: ICharacter[];
  questionsAsked: IQuestion[];
  gameStatus: 'setup' | 'playing' | 'won' | 'lost';
}

export interface IQuestion {
  id: string;
  text: string;
  characteristicKey: string;
  value: unknown;
  answer: boolean;
  timestamp: Date;
}

export interface IFilterCriteria {
  [characteristicKey: string]: unknown;
}

export interface IGameConfig {
  maxQuestions?: number;
  enableHints?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in seconds
}