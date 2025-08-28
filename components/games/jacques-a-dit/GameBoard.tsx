'use client';

import { motion } from 'framer-motion';
import CharacterButton from './CharacterButton';
import { GameBoardProps } from '@/types/jacques-a-dit';
import { JACQUES_GRID_LAYOUTS } from '@/types/jacques-a-dit';

export default function GameBoard({
  characters,
  showingIndex,
  playerInput,
  sequence,
  gamePhase,
  onCharacterClick,
  disabled
}: GameBoardProps) {
  
  // Get grid layout based on character count
  const layout = JACQUES_GRID_LAYOUTS[characters.length] || JACQUES_GRID_LAYOUTS[8]!;
  
  // Get character feedback state
  const getCharacterFeedback = (characterId: string) => {
    // Check if this character is currently being shown
    const isShowing = gamePhase === 'showing' && 
                      showingIndex >= 0 && 
                      sequence[showingIndex] === characterId;
    
    // Check if this character was just played correctly or incorrectly
    const lastPlayerInput = playerInput[playerInput.length - 1];
    const expectedInput = sequence[playerInput.length - 1];
    
    const isCorrect = gamePhase === 'playing' && 
                     lastPlayerInput === characterId && 
                     lastPlayerInput === expectedInput &&
                     playerInput.length > 0;
                     
    const isWrong = gamePhase === 'wrong' && 
                    lastPlayerInput === characterId &&
                    playerInput.length > 0;
    
    return {
      isShowing,
      isCorrect,
      isWrong
    };
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
    gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
    gap: layout.gap,
    maxWidth: `${layout.cols * 140}px`, // Responsive max width
    margin: '0 auto'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-4"
    >
      <div style={gridStyle} className="justify-items-center">
        {characters.map((character, index) => {
          const feedback = getCharacterFeedback(character.id);
          
          return (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }}
              style={{ maxWidth: layout.maxCardSize }}
              className="w-full"
            >
              <CharacterButton
                character={character}
                isShowing={feedback.isShowing}
                isCorrect={feedback.isCorrect}
                isWrong={feedback.isWrong}
                onClick={onCharacterClick}
                disabled={disabled}
              />
            </motion.div>
          );
        })}
      </div>
      
      {/* Visual hint for mobile users */}
      {gamePhase === 'playing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
            <p className="text-white/90 text-sm">
              👆 Tape sur les personnages dans l&apos;ordre !
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Wrong answer feedback */}
      {gamePhase === 'wrong' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center mt-6"
        >
          <div className="bg-red-500/90 backdrop-blur-sm rounded-2xl px-6 py-4 inline-block shadow-lg">
            <p className="text-white font-bold text-lg mb-1">
              Oups ! 😅
            </p>
            <p className="text-white/90 text-sm">
              Pas grave, essaie encore !
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Sequence complete feedback */}
      {gamePhase === 'playing' && playerInput.length === sequence.slice(0, playerInput.length).length && 
       playerInput.every((input, index) => input === sequence[index]) && 
       playerInput.length > 0 && playerInput.length < sequence.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-6"
        >
          <div className="bg-green-500/90 backdrop-blur-sm rounded-2xl px-6 py-4 inline-block shadow-lg">
            <p className="text-white font-bold text-lg">
              Excellent ! 🎉
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}