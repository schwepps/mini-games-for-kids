/**
 * ProfileLoader - Handles loading and managing character profiles
 * Automatically resolves paths based on NEXT_PUBLIC_GAME_PROFILE env variable
 */

import { IProfile } from '@/types/game';
import { GameValidation } from '@/lib/schemas';
import { ZodError } from 'zod';

export class ProfileLoader {
  private static _currentProfile: IProfile | null = null;
  private static _profileCache: Map<string, IProfile> = new Map();

  /**
   * Get the current profile ID from environment variables
   */
  static getCurrentProfileId(): string {
    return process.env.NEXT_PUBLIC_GAME_PROFILE || 'cartoon-characters';
  }

  /**
   * Get resolved paths for the current or specified profile
   */
  static getProfilePaths(profileId?: string) {
    const id = profileId || this.getCurrentProfileId();
    return {
      profileId: id,
      jsonPath: `/data/profiles/${id}.json`,
      imagePath: `/images/profiles/${id}/`,
      fullJsonUrl: typeof window !== 'undefined' 
        ? `${window.location.origin}/data/profiles/${id}.json`
        : `/data/profiles/${id}.json`
    };
  }

  /**
   * Load a profile by ID with caching
   */
  static async loadProfile(profileId?: string): Promise<IProfile> {
    const id = profileId || this.getCurrentProfileId();
    
    // Check cache first
    if (this._profileCache.has(id)) {
      const cached = this._profileCache.get(id)!;
      this._currentProfile = cached;
      return cached;
    }

    try {
      const { jsonPath } = this.getProfilePaths(id);
      const response = await fetch(jsonPath);
      
      if (!response.ok) {
        throw new Error(`Failed to load profile ${id}: ${response.status} ${response.statusText}`);
      }

      const profileData = await response.json();
      const profile = this.validateProfile(profileData);
      
      // Cache the loaded profile
      this._profileCache.set(id, profile);
      this._currentProfile = profile;
      
      return profile;
    } catch (error) {
      console.error(`Error loading profile ${id}:`, error);
      throw new Error(`Failed to load profile: ${id}`);
    }
  }

  /**
   * Get the current loaded profile
   */
  static getCurrentProfile(): IProfile | null {
    return this._currentProfile;
  }

  /**
   * Get full image URL for a character image
   */
  static getImageUrl(imageName: string, profileId?: string): string {
    const { imagePath } = this.getProfilePaths(profileId);
    return `${imagePath}${imageName}`;
  }

  /**
   * Get all available profile IDs (requires a profiles index or dynamic loading)
   */
  static async getAvailableProfiles(): Promise<string[]> {
    // In a real implementation, you might have a profiles.json index file
    // or use a server endpoint to list available profiles
    // For now, return known profiles
    return ['cartoon-characters'];
  }

  /**
   * Validate profile structure using Zod schemas
   */
  private static validateProfile(data: unknown): IProfile {
    try {
      const profile = GameValidation.validateProfile(data);
      
      // Additional validation: check character characteristics against schema
      for (const character of profile.characters) {
        const validation = GameValidation.validateCharacterCharacteristics(
          character, 
          profile.characteristicSchema
        );
        
        if (!validation.valid) {
          console.warn(`Character ${character.name} has validation issues:`, validation.errors);
          // Don't throw error, just warn - allows for flexible development
        }
      }
      
      return profile;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errors = GameValidation.getValidationErrors(error);
        throw new Error(`Profile validation failed: ${errors.join(', ')}`);
      }
      throw error;
    }
  }

  /**
   * Clear the profile cache
   */
  static clearCache(): void {
    this._profileCache.clear();
    this._currentProfile = null;
  }

  /**
   * Preload a profile for faster access
   */
  static async preloadProfile(profileId: string): Promise<void> {
    try {
      await this.loadProfile(profileId);
    } catch (error) {
      console.warn(`Failed to preload profile ${profileId}:`, error);
    }
  }

  /**
   * Switch to a different profile
   */
  static async switchProfile(profileId: string): Promise<IProfile> {
    return await this.loadProfile(profileId);
  }
}