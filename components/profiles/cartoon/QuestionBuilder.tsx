'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CharacterFilter } from '@/lib/characterFilter';
import { IProfile, ICharacter, IQuestion } from '@/types/game';
import { 
  Palette, 
  Users, 
  PawPrint as Paw, 
  Crown, 
  Eye, 
  Smile, 
  HardHat as Hat,
  CheckCircle,
  XCircle,
  HelpCircle
} from 'lucide-react';

interface QuestionBuilderProps {
  onAskQuestion: (characteristicKey: string, value: unknown) => void;
  profile: IProfile | null;
  remainingCharacters: ICharacter[];
  questionsAsked: IQuestion[];
  disabled: boolean;
}

type CharacteristicIcon = {
  [key: string]: {
    icon: React.ReactNode;
    color: string;
    bgColor: string;
  };
};

const pictogramMapping: { [key: string]: string } = {
  age: '/images/questions/age.png',
  eyeColor: '/images/questions/eyes-color.png',
  hairColor: '/images/questions/hair-color.png',
  hasHat: '/images/questions/has-hat.png',
  isSmiling: '/images/questions/is-smilling.png',
  isSuperhero: '/images/questions/is-superhero.png',
  species: '/images/questions/species.png'
};

const characteristicIcons: CharacteristicIcon = {
  hairColor: {
    icon: <Palette className="w-6 h-6" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 hover:bg-purple-200'
  },
  age: {
    icon: <Users className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 hover:bg-blue-200'
  },
  species: {
    icon: <Paw className="w-6 h-6" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100 hover:bg-green-200'
  },
  isSuperhero: {
    icon: <Crown className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-100 hover:bg-red-200'
  },
  eyeColor: {
    icon: <Eye className="w-6 h-6" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100 hover:bg-amber-200'
  },
  isSmiling: {
    icon: <Smile className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 hover:bg-yellow-200'
  },
  hasHat: {
    icon: <Hat className="w-6 h-6" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 hover:bg-indigo-200'
  }
};

const colorSwatches: { [key: string]: string } = {
  marron: 'bg-amber-800',
  blond: 'bg-yellow-400',
  noir: 'bg-gray-900',
  rouge: 'bg-red-600',
  blanc: 'bg-gray-200',
  bleu: 'bg-blue-600',
  vert: 'bg-green-600',
  jaune: 'bg-yellow-500',
  aucune: 'bg-gray-400'
};

const ageEmojis: { [key: string]: string } = {
  enfant: '👶',
  adolescent: '🧑',
  adulte: '👩',
  âgé: '👴'
};

const speciesEmojis: { [key: string]: string } = {
  humain: '👤',
  animal: '🐾',
  robot: '🤖',
  alien: '👽',
  monstre: '👹'
};

export default function QuestionBuilder({ 
  onAskQuestion, 
  profile, 
  remainingCharacters, 
  questionsAsked,
  disabled 
}: QuestionBuilderProps) {
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<string | null>(null);

  if (!profile) return null;

  const handleCharacteristicSelect = (characteristic: string) => {
    setSelectedCharacteristic(characteristic);
  };

  const handleValueSelect = (characteristic: string, value: unknown) => {
    // Immediately ask the question when value is selected
    onAskQuestion(characteristic, value);
    
    // Reset selected characteristic
    setSelectedCharacteristic(null);
  };


  const renderCharacteristicButtons = () => {
    return Object.entries(profile.characteristicSchema).map(([key, schema]) => {
      const iconConfig = characteristicIcons[key];
      const isSelected = selectedCharacteristic === key;
      
      return (
        <motion.div
          key={key}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleCharacteristicSelect(key)}
            disabled={disabled}
            variant={isSelected ? "default" : "outline"}
            className={`
              h-32 w-full p-4 rounded-2xl border-2 transition-all duration-200
              ${isSelected 
                ? `${iconConfig.bgColor} border-current ${iconConfig.color}` 
                : `${iconConfig.bgColor} border-gray-200 hover:border-gray-300`
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <Image
                src={pictogramMapping[key]}
                alt={schema.displayName}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </Button>
        </motion.div>
      );
    });
  };

  const renderValueOptions = () => {
    if (!selectedCharacteristic || !profile) return null;
    
    const schema = profile.characteristicSchema[selectedCharacteristic];
    
    if (schema.type === 'boolean') {
      const trueCount = CharacterFilter.getCharactersWithTrait(remainingCharacters, selectedCharacteristic, true).length;
      const falseCount = CharacterFilter.getCharactersWithTrait(remainingCharacters, selectedCharacteristic, false).length;
      
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white text-center">
            {schema.displayName}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleValueSelect(selectedCharacteristic, true)}
                className="h-28 w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl relative border-4 border-green-400 hover:border-green-300"
                disabled={disabled}
                aria-label={`Oui - ${trueCount} personnages`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-6xl text-white">✓</div>
                  {trueCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold border-4 border-white shadow-lg">
                      {trueCount}
                    </div>
                  )}
                </div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleValueSelect(selectedCharacteristic, false)}
                className="h-28 w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl relative border-4 border-red-400 hover:border-red-300"
                disabled={disabled}
                aria-label={`Non - ${falseCount} personnages`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-6xl text-white">✗</div>
                  {falseCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold border-4 border-white shadow-lg">
                      {falseCount}
                    </div>
                  )}
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      );
    }

    if (schema.type === 'enum' && schema.values) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white text-center">
            Choisis {schema.displayName}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {schema.values.map((value) => {
              const matchCount = CharacterFilter.getCharactersWithTrait(remainingCharacters, selectedCharacteristic, value).length;
              
              if (matchCount === 0) return null; // Don't show options that would eliminate everyone
              
              return (
                <motion.div 
                  key={String(value)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleValueSelect(selectedCharacteristic, value)}
                    className="h-28 w-full p-4 rounded-2xl bg-white/90 hover:bg-white text-gray-800 border-4 border-gray-300 hover:border-blue-400 relative shadow-lg hover:shadow-xl transition-all"
                    disabled={disabled}
                    aria-label={`${String(value)} - ${matchCount} personnages`}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      {/* Large visual representation */}
                      {selectedCharacteristic === 'hairColor' && (
                        <div className="relative">
                          <div className="text-6xl">👤</div>
                          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-6 rounded-t-full ${colorSwatches[String(value)]} opacity-80`} />
                        </div>
                      )}
                      {selectedCharacteristic === 'eyeColor' && (
                        <div className="relative">
                          <div className="text-6xl">👁️</div>
                          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${colorSwatches[String(value)]}`} />
                        </div>
                      )}
                      {selectedCharacteristic === 'age' && (
                        <div className="text-6xl">{ageEmojis[String(value)]}</div>
                      )}
                      {selectedCharacteristic === 'species' && (
                        <div className="text-6xl">{speciesEmojis[String(value)]}</div>
                      )}
                      
                      {/* Large, prominent number badge */}
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold border-4 border-white shadow-lg">
                        {matchCount}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-center text-xl">
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6" />
            Pose une Question !
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Choose what to ask about */}
        <div>
          <h3 className="text-white font-medium mb-3 text-center">
            Que veux-tu savoir ?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {renderCharacteristicButtons()}
          </div>
        </div>

        {/* Step 2: Choose specific value */}
        <AnimatePresence>
          {selectedCharacteristic && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                {renderValueOptions()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual Feedback for Last Question */}
        <AnimatePresence>
          {questionsAsked.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`rounded-2xl p-4 border-2 ${
                questionsAsked[questionsAsked.length - 1].answer 
                  ? 'bg-green-100 border-green-400' 
                  : 'bg-red-100 border-red-400'
              }`}
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {questionsAsked[questionsAsked.length - 1].answer ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <h4 className={`font-bold text-lg ${
                    questionsAsked[questionsAsked.length - 1].answer 
                      ? 'text-green-800' 
                      : 'text-red-800'
                  }`}>
                    {questionsAsked[questionsAsked.length - 1].answer ? 'OUI !' : 'NON !'}
                  </h4>
                </div>
                
                <p className={`font-medium mb-2 ${
                  questionsAsked[questionsAsked.length - 1].answer 
                    ? 'text-green-700' 
                    : 'text-red-700'
                }`}>
                  {questionsAsked[questionsAsked.length - 1].text}
                </p>
                
                <div className="text-sm text-gray-600">
                  {questionsAsked[questionsAsked.length - 1].answer 
                    ? '✨ Les personnages sans ce trait ont été éliminés !'
                    : '✨ Les personnages avec ce trait ont été éliminés !'
                  }
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Questions asked */}
        {questionsAsked.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-white font-medium text-sm">Questions posées:</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {questionsAsked.map((question, index) => (
                <div 
                  key={question.id}
                  className="text-xs bg-white/10 rounded-lg p-2 text-white/80"
                >
                  <span className="font-medium">Q{index + 1}:</span> {question.text}{' '}
                  <Badge 
                    variant={question.answer ? "default" : "destructive"}
                    className="ml-1 text-xs"
                  >
                    {question.answer ? 'YES' : 'NO'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}