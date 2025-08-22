/**
 * Shared mapping of character characteristics to their corresponding image paths
 * Used by both QuestionBuilder and CharacterCard components
 */

export const characteristicImages: { [key: string]: { [value: string]: string } } = {
  age: {
    enfant: '/images/games/guess-who/answers/age/enfant.png',
    adulte: '/images/games/guess-who/answers/age/adulte.png'
  },
  eyeColor: {
    marron: '/images/games/guess-who/answers/eyeColor/marron.png',
    bleu: '/images/games/guess-who/answers/eyeColor/bleu.png',
    noir: '/images/games/guess-who/answers/eyeColor/noir.png'
  },
  hairColor: {
    marron: '/images/games/guess-who/answers/hairColor/marron.png',
    noir: '/images/games/guess-who/answers/hairColor/noir.png',
    bleu: '/images/games/guess-who/answers/hairColor/bleu.png',
    jaune: '/images/games/guess-who/answers/hairColor/jaune.png',
    aucune: '/images/games/guess-who/answers/hairColor/aucune.png'
  },
  hasHat: {
    true: '/images/games/guess-who/answers/hasHat/hasHat.png',
    false: '/images/games/guess-who/answers/hasHat/noHat.png'
  },
  isSmiling: {
    true: '/images/games/guess-who/answers/isSmiling/isSmiling.png',
    false: '/images/games/guess-who/answers/isSmiling/isNotSmiling.png'
  },
  isSuperhero: {
    true: '/images/games/guess-who/answers/isSuperhero/isSuperhero.png',
    false: '/images/games/guess-who/answers/isSuperhero/isNotSuperhero.png'
  },
  species: {
    humain: '/images/games/guess-who/answers/species/humain.png',
    animal: '/images/games/guess-who/answers/species/animal.png',
    robot: '/images/games/guess-who/answers/species/robot.png',
    alien: '/images/games/guess-who/answers/species/alien.png'
  }
};

/**
 * Mapping of characteristics to their question pictogram images
 * Used for displaying characteristic selection buttons
 */
export const pictogramMapping: { [key: string]: string } = {
  age: '/images/games/guess-who/questions/age.png',
  eyeColor: '/images/games/guess-who/questions/eyes-color.png',
  hairColor: '/images/games/guess-who/questions/hair-color.png',
  hasHat: '/images/games/guess-who/questions/has-hat.png',
  isSmiling: '/images/games/guess-who/questions/is-smilling.png',
  isSuperhero: '/images/games/guess-who/questions/is-superhero.png',
  species: '/images/games/guess-who/questions/species.png'
};

/**
 * Get the image path for a specific characteristic and value
 * @param characteristic The characteristic key (e.g., 'species', 'hairColor')
 * @param value The characteristic value (e.g., 'animal', 'marron')
 * @returns The image path or null if not found
 */
export function getCharacteristicImage(characteristic: string, value: unknown): string | null {
  const characteristicMap = characteristicImages[characteristic];
  if (!characteristicMap) return null;
  
  const stringValue = String(value);
  return characteristicMap[stringValue] || null;
}

