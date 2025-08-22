/**
 * CharacterFilter - Utilities for filtering characters and managing game logic
 */

import { ICharacter, IProfile, IFilterCriteria, IQuestion } from '@/types/game';

export class CharacterFilter {
  /**
   * Filter characters based on criteria
   */
  static filterCharacters(
    characters: ICharacter[], 
    criteria: IFilterCriteria
  ): ICharacter[] {
    return characters.filter(character => {
      return Object.entries(criteria).every(([key, value]) => {
        const characterValue = character.characteristics[key];
        
        if (value === null || value === undefined) {
          return true; // No filter applied for this characteristic
        }
        
        // Handle different comparison types
        if (typeof value === 'boolean') {
          return characterValue === value;
        }
        
        if (Array.isArray(value)) {
          return value.includes(characterValue);
        }
        
        return characterValue === value;
      });
    });
  }

  /**
   * Get characters that match a specific characteristic value
   */
  static getCharactersWithTrait(
    characters: ICharacter[], 
    characteristicKey: string, 
    value: unknown
  ): ICharacter[] {
    return characters.filter(character => 
      character.characteristics[characteristicKey] === value
    );
  }

  /**
   * Get characters that do NOT match a specific characteristic value
   */
  static getCharactersWithoutTrait(
    characters: ICharacter[], 
    characteristicKey: string, 
    value: unknown
  ): ICharacter[] {
    return characters.filter(character => 
      character.characteristics[characteristicKey] !== value
    );
  }

  /**
   * Generate suggested questions based on remaining characters
   */
  static generateQuestionSuggestions(
    characters: ICharacter[], 
    profile: IProfile,
    excludeCharacteristics?: string[]
  ): Array<{ 
    question: string; 
    characteristicKey: string; 
    value: unknown;
    effectiveness: number; // 0-1 score of how well this question divides the remaining characters
  }> {
    const suggestions: Array<{
      question: string;
      characteristicKey: string;
      value: unknown;
      effectiveness: number;
    }> = [];

    const schema = profile.characteristicSchema;
    const excludeSet = new Set(excludeCharacteristics || []);

    Object.entries(schema).forEach(([key, schemaItem]) => {
      if (excludeSet.has(key)) return;

      if (schemaItem.type === 'boolean') {
        // For boolean characteristics, ask about true value
        const trueCount = this.getCharactersWithTrait(characters, key, true).length;
        const falseCount = characters.length - trueCount;
        const effectiveness = this.calculateEffectiveness(trueCount, falseCount);

        if (trueCount > 0 && falseCount > 0) {
          suggestions.push({
            question: `Does your character ${schemaItem.displayName.toLowerCase()}?`,
            characteristicKey: key,
            value: true,
            effectiveness
          });
        }
      } else if (schemaItem.type === 'enum' && schemaItem.values) {
        // For enum characteristics, ask about each possible value
        schemaItem.values.forEach(value => {
          const matchCount = this.getCharactersWithTrait(characters, key, value).length;
          const nonMatchCount = characters.length - matchCount;
          const effectiveness = this.calculateEffectiveness(matchCount, nonMatchCount);

          if (matchCount > 0 && nonMatchCount > 0) {
            suggestions.push({
              question: `Is your character's ${schemaItem.displayName.toLowerCase()} ${value}?`,
              characteristicKey: key,
              value,
              effectiveness
            });
          }
        });
      }
    });

    // Sort by effectiveness (best questions first)
    return suggestions.sort((a, b) => b.effectiveness - a.effectiveness);
  }

  /**
   * Calculate question effectiveness (how well it divides the remaining characters)
   * Perfect effectiveness (0.5) means the question divides characters in half
   */
  private static calculateEffectiveness(matchCount: number, nonMatchCount: number): number {
    const total = matchCount + nonMatchCount;
    if (total === 0) return 0;
    
    const ratio = matchCount / total;
    // Effectiveness is highest when ratio is closest to 0.5
    return 1 - Math.abs(ratio - 0.5) * 2;
  }

  /**
   * Apply a question result to filter characters
   */
  static applyQuestionResult(
    characters: ICharacter[],
    question: IQuestion
  ): ICharacter[] {
    if (question.answer) {
      return this.getCharactersWithTrait(characters, question.characteristicKey, question.value);
    } else {
      return this.getCharactersWithoutTrait(characters, question.characteristicKey, question.value);
    }
  }

  /**
   * Get unique values for a characteristic from the current character set
   */
  static getUniqueCharacteristicValues(
    characters: ICharacter[],
    characteristicKey: string
  ): (string | number | boolean)[] {
    const values = characters.map(char => char.characteristics[characteristicKey]);
    return [...new Set(values)].filter(value => value !== undefined && value !== null) as (string | number | boolean)[];
  }

  /**
   * Get statistics about remaining characters
   */
  static getCharacterStats(
    characters: ICharacter[],
    profile: IProfile
  ): Record<string, Record<string, number>> {
    const stats: Record<string, Record<string, number>> = {};

    Object.keys(profile.characteristicSchema).forEach(key => {
      stats[key] = {};
      const values = this.getUniqueCharacteristicValues(characters, key);
      
      values.forEach(value => {
        const statKey = stats[key];
        if (statKey) {
          statKey[String(value)] = this.getCharactersWithTrait(characters, key, value).length;
        }
      });
    });

    return stats;
  }

  /**
   * Find the best question to ask next
   */
  static getBestQuestion(
    characters: ICharacter[],
    profile: IProfile,
    previousQuestions?: IQuestion[]
  ): string | null {
    if (characters.length <= 1) return null;

    const askedCharacteristics = new Set(
      previousQuestions?.map(q => `${q.characteristicKey}:${q.value}`) || []
    );

    const suggestions = this.generateQuestionSuggestions(characters, profile);
    
    // Find the first suggestion that hasn't been asked yet
    const bestSuggestion = suggestions.find(suggestion => 
      !askedCharacteristics.has(`${suggestion.characteristicKey}:${suggestion.value}`)
    );

    return bestSuggestion?.question || null;
  }

  /**
   * Check if a character matches all the given criteria from questions
   */
  static doesCharacterMatchQuestions(
    character: ICharacter,
    questions: IQuestion[]
  ): boolean {
    return questions.every(question => {
      const characterValue = character.characteristics[question.characteristicKey];
      
      if (question.answer) {
        return characterValue === question.value;
      } else {
        return characterValue !== question.value;
      }
    });
  }
}