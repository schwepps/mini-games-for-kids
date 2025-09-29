'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HistoryModalProps } from '@/types/mastermind';
import { ProfileLoader } from '@/lib/profileLoader';

export default function HistoryModal({
  open,
  onOpenChange,
  guesses,
}: HistoryModalProps) {
  
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-purple-700 text-center mb-4">
              Historique des Tentatives 📋
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mb-4">
              Voici tous tes essais précédents avec les indices reçus
            </DialogDescription>
            
            <div className="space-y-4">
              {guesses.length === 0 ? (
                <Card className="p-6 text-center bg-gray-50">
                  <p className="text-gray-500">
                    Aucune tentative pour le moment.<br />
                    Commence à jouer pour voir ton historique ! 🎮
                  </p>
                </Card>
              ) : (
                guesses.map((guess, index) => (
                  <motion.div
                    key={guess.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4">
                        {/* Attempt Number */}
                        <div className="text-center min-w-[60px]">
                          <div className="text-2xl font-bold text-purple-600">
                            #{guess.attemptNumber}
                          </div>
                          <div className="text-xs text-gray-500">Essai</div>
                        </div>

                        {/* Combination */}
                        <div className="flex gap-2 flex-1">
                          {guess.combination.map((character, charIndex) => (
                            <div
                              key={charIndex}
                              className="relative w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg shadow-sm border overflow-hidden"
                            >
                              {character && (
                                <Image
                                  src={ProfileLoader.getImageUrl(character.image)}
                                  alt={character.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 48px, 64px"
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Feedback */}
                        <div className="min-w-[100px]">
                          <div className="text-xs text-gray-500 mb-1">Indices:</div>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {guess.feedback.length > 0 ? (
                              guess.feedback.map((peg, pegIndex) => (
                                <motion.span
                                  key={pegIndex}
                                  className="text-xl"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.1 * pegIndex }}
                                >
                                  {peg.emoji}
                                </motion.span>
                              ))
                            ) : (
                              <span className="text-gray-400 text-sm">Aucun</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Analysis Help */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex gap-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <span className="text-base">⭐</span>
                            <span>{guess.feedback.filter(f => f.type === 'correct-position').length} bon(s) emplacement(s)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-base">💖</span>
                            <span>{guess.feedback.filter(f => f.type === 'correct-character').length} bon(s) personnage(s)</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>

            {/* Legend */}
            <Card className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50">
              <h4 className="font-bold text-purple-700 mb-2">Rappel des indices 🔍</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-gray-700">Bon personnage au bon endroit</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💖</span>
                  <span className="text-gray-700">Bon personnage au mauvais endroit</span>
                </div>
              </div>
            </Card>

            {/* Close Button */}
            <div className="mt-6 text-center">
              <Button
                onClick={() => onOpenChange(false)}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600"
              >
                Fermer 👍
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}