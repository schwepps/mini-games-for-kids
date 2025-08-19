/**
 * Zod schemas for runtime validation of game data structures
 */

import { z } from 'zod';

// Characteristic type enum
export const CharacteristicTypeSchema = z.enum(['boolean', 'enum', 'range', 'number', 'string']);

// Characteristic schema definition
export const CharacteristicSchemaSchema = z.object({
  type: CharacteristicTypeSchema,
  displayName: z.string(),
  values: z.array(z.union([z.string(), z.number()])).optional(),
  category: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  description: z.string().optional(),
});

// Character schema
export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(), // Just filename, will be resolved to full path
  characteristics: z.record(z.string(), z.unknown()), // Flexible for different characteristic types
  metadata: z.object({
    description: z.string().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
});

// Profile metadata schema
export const ProfileMetadataSchema = z.object({
  author: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  difficulty: z.string().optional(),
});

// Complete profile schema
export const ProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  version: z.string(),
  characteristicSchema: z.record(z.string(), CharacteristicSchemaSchema),
  characters: z.array(CharacterSchema),
  metadata: ProfileMetadataSchema.optional(),
});

// Question schema for game logic
export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  characteristicKey: z.string(),
  value: z.unknown(),
  answer: z.boolean(),
  timestamp: z.date(),
});

// Game state schema
export const GameStateSchema = z.object({
  profile: ProfileSchema,
  hiddenCharacter: CharacterSchema,
  remainingCharacters: z.array(CharacterSchema),
  eliminatedCharacters: z.array(CharacterSchema),
  questionsAsked: z.array(QuestionSchema),
  gameStatus: z.enum(['setup', 'playing', 'won', 'lost']),
});

// Game configuration schema
export const GameConfigSchema = z.object({
  maxQuestions: z.number().optional(),
  enableHints: z.boolean().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  timeLimit: z.number().optional(), // in seconds
});

// Filter criteria schema (flexible for different characteristic types)
export const FilterCriteriaSchema = z.record(z.string(), z.unknown());

// Validation helper functions
export class GameValidation {
  /**
   * Validate a profile object
   */
  static validateProfile(data: unknown): z.infer<typeof ProfileSchema> {
    return ProfileSchema.parse(data);
  }

  /**
   * Validate a character object
   */
  static validateCharacter(data: unknown): z.infer<typeof CharacterSchema> {
    return CharacterSchema.parse(data);
  }

  /**
   * Validate game state
   */
  static validateGameState(data: unknown): z.infer<typeof GameStateSchema> {
    return GameStateSchema.parse(data);
  }

  /**
   * Validate a question
   */
  static validateQuestion(data: unknown): z.infer<typeof QuestionSchema> {
    return QuestionSchema.parse(data);
  }

  /**
   * Validate game configuration
   */
  static validateGameConfig(data: unknown): z.infer<typeof GameConfigSchema> {
    return GameConfigSchema.parse(data);
  }

  /**
   * Validate filter criteria
   */
  static validateFilterCriteria(data: unknown): z.infer<typeof FilterCriteriaSchema> {
    return FilterCriteriaSchema.parse(data);
  }

  /**
   * Validate characteristic schema
   */
  static validateCharacteristicSchema(data: unknown): z.infer<typeof CharacteristicSchemaSchema> {
    return CharacteristicSchemaSchema.parse(data);
  }

  /**
   * Safe validation with error handling
   */
  static safeValidateProfile(data: unknown): { 
    success: boolean; 
    data?: z.infer<typeof ProfileSchema>; 
    error?: z.ZodError 
  } {
    const result = ProfileSchema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.error };
    }
  }

  /**
   * Get validation error messages in a readable format
   */
  static getValidationErrors(error: z.ZodError): string[] {
    return error.issues.map((err: z.ZodIssue) => {
      const path = err.path.length > 0 ? `${err.path.join('.')}: ` : '';
      return `${path}${err.message}`;
    });
  }

  /**
   * Validate characteristic values against their schema
   */
  static validateCharacteristicValue(
    value: unknown, 
    schema: z.infer<typeof CharacteristicSchemaSchema>
  ): boolean {
    try {
      switch (schema.type) {
        case 'boolean':
          return typeof value === 'boolean';
        
        case 'enum':
          return schema.values ? schema.values.includes(value as string | number) : false;
        
        case 'range':
          return schema.values ? schema.values.includes(value as string | number) : false;
        
        case 'number':
          const num = typeof value === 'number' ? value : parseFloat(value as string);
          if (isNaN(num)) return false;
          if (schema.min !== undefined && num < schema.min) return false;
          if (schema.max !== undefined && num > schema.max) return false;
          return true;
        
        case 'string':
          return typeof value === 'string';
        
        default:
          return true; // Allow unknown types for flexibility
      }
    } catch {
      return false;
    }
  }

  /**
   * Validate all characteristics of a character against the profile schema
   */
  static validateCharacterCharacteristics(
    character: z.infer<typeof CharacterSchema>,
    profileSchema: Record<string, z.infer<typeof CharacteristicSchemaSchema>>
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check if all required characteristics are present
    for (const [key, schema] of Object.entries(profileSchema)) {
      if (!(key in character.characteristics)) {
        errors.push(`Missing characteristic: ${key} (${schema.displayName})`);
        continue;
      }

      const value = character.characteristics[key];
      if (!this.validateCharacteristicValue(value, schema)) {
        errors.push(`Invalid value for ${key}: ${value} (expected ${schema.type})`);
      }
    }

    // Check for extra characteristics not in schema
    for (const key of Object.keys(character.characteristics)) {
      if (!(key in profileSchema)) {
        errors.push(`Unknown characteristic: ${key}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Type exports for use in other files
export type Profile = z.infer<typeof ProfileSchema>;
export type Character = z.infer<typeof CharacterSchema>;
export type CharacteristicSchema = z.infer<typeof CharacteristicSchemaSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type GameState = z.infer<typeof GameStateSchema>;
export type GameConfig = z.infer<typeof GameConfigSchema>;
export type FilterCriteria = z.infer<typeof FilterCriteriaSchema>;