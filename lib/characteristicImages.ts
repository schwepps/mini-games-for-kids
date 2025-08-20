/**
 * Shared mapping of character characteristics to their corresponding image paths
 * Used by both QuestionBuilder and CharacterCard components
 */

export const characteristicImages: { [key: string]: { [value: string]: string } } = {
  age: {
    enfant: '/images/answers/age/enfant.png',
    adulte: '/images/answers/age/adulte.png'
  },
  eyeColor: {
    marron: '/images/answers/eyeColor/marron.png',
    bleu: '/images/answers/eyeColor/bleu.png',
    noir: '/images/answers/eyeColor/noir.png'
  },
  hairColor: {
    marron: '/images/answers/hairColor/marron.png',
    noir: '/images/answers/hairColor/noir.png',
    bleu: '/images/answers/hairColor/bleu.png',
    jaune: '/images/answers/hairColor/jaune.png',
    aucune: '/images/answers/hairColor/aucune.png'
  },
  hasHat: {
    true: '/images/answers/hasHat/hasHat.png',
    false: '/images/answers/hasHat/noHat.png'
  },
  isSmiling: {
    true: '/images/answers/isSmiling/isSmiling.png',
    false: '/images/answers/isSmiling/isNotSmiling.png'
  },
  isSuperhero: {
    true: '/images/answers/isSuperhero/isSuperhero.png',
    false: '/images/answers/isSuperhero/isNotSuperhero.png'
  },
  species: {
    humain: '/images/answers/species/humain.png',
    animal: '/images/answers/species/animal.png',
    robot: '/images/answers/species/robot.png',
    alien: '/images/answers/species/alien.png'
  }
};

/**
 * Mapping of characteristics to their question pictogram images
 * Used for displaying characteristic selection buttons
 */
export const pictogramMapping: { [key: string]: string } = {
  age: '/images/questions/age.png',
  eyeColor: '/images/questions/eyes-color.png',
  hairColor: '/images/questions/hair-color.png',
  hasHat: '/images/questions/has-hat.png',
  isSmiling: '/images/questions/is-smilling.png',
  isSuperhero: '/images/questions/is-superhero.png',
  species: '/images/questions/species.png'
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

