/**
 * Game Types for Guess Who Character Management System
 */

import { IProfile, ICharacter } from './shared';

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

export interface IGameConfig {
  maxQuestions?: number;
  enableHints?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in seconds
}