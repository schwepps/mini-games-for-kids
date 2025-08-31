'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ICharacter } from '@/types/shared';
import {
  GameState,
  Tower,
  CharacterDisc,
  DifficultyLevel,
  GameMove,
  GameStats
} from '@/types/tours-de-hanoi';

interface UseToursDeHanoiGameProps {
  characters: ICharacter[];
  difficulty: DifficultyLevel;
  onComplete: (stats: GameStats) => void;
}

export function useToursDeHanoiGame({
  characters,
  difficulty,
  onComplete
}: UseToursDeHanoiGameProps) {
  // Create character discs with sizes
  const createInitialDiscs = useCallback((): CharacterDisc[] => {
    return characters.map((character, index) => ({
      character,
      size: characters.length - index, // Bigger size for first characters
      id: character.id
    }));
  }, [characters]);

  // Initialize towers with all discs on the first tower
  const createInitialTowers = useCallback((): Tower[] => {
    const discs = createInitialDiscs();
    return [
      { id: 0, discs, isSource: true },
      { id: 1, discs: [] },
      { id: 2, discs: [], isTarget: true }
    ];
  }, [createInitialDiscs]);

  const [gameState, setGameState] = useState<GameState>({
    towers: createInitialTowers(),
    selectedDisc: null,
    selectedTower: null,
    moveCount: 0,
    isComplete: false,
    startTime: Date.now(),
    endTime: null,
    difficulty,
    showHint: false,
    hintMove: null,
    history: []
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const hintsUsedRef = useRef(0);

  // Timer effect
  useEffect(() => {
    if (gameState.startTime && !gameState.isComplete) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - gameState.startTime!) / 1000));
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [gameState.startTime, gameState.isComplete]);

  // Check win condition
  useEffect(() => {
    const targetTower = gameState.towers.find(t => t.isTarget);
    if (targetTower && targetTower.discs.length === characters.length && !gameState.isComplete) {
      // Game completed!
      const endTime = Date.now();
      setGameState(prev => ({ 
        ...prev, 
        isComplete: true, 
        endTime,
        selectedDisc: null,
        selectedTower: null 
      }));
      
      const stats: GameStats = {
        moveCount: gameState.moveCount,
        optimalMoves: difficulty.minMoves,
        timeElapsed,
        efficiency: Math.round((difficulty.minMoves / Math.max(gameState.moveCount, 1)) * 100),
        difficulty,
        hintsUsed: hintsUsedRef.current
      };
      
      onComplete(stats);
    }
  }, [gameState.towers, characters.length, gameState.isComplete, gameState.moveCount, difficulty, timeElapsed, onComplete]);

  // Validate if a disc can be placed on a tower
  const canPlaceDisc = useCallback((disc: CharacterDisc, tower: Tower): boolean => {
    if (tower.discs.length === 0) return true;
    const topDisc = tower.discs[tower.discs.length - 1];
    if (!topDisc) return true;
    return disc.size < topDisc.size;
  }, []);

  // Select a disc from a tower by tower ID
  const selectDiscFromTower = useCallback((towerId: number) => {
    const tower = gameState.towers[towerId];
    if (!tower || tower.discs.length === 0) return;

    const topDisc = tower.discs[tower.discs.length - 1];
    if (!topDisc) return;
    
    if (gameState.selectedDisc?.id === topDisc.id) {
      // Deselect if clicking the same disc
      setGameState(prev => ({
        ...prev,
        selectedDisc: null,
        selectedTower: null
      }));
    } else {
      // Select the top disc
      setGameState(prev => ({
        ...prev,
        selectedDisc: topDisc,
        selectedTower: towerId
      }));
    }
  }, [gameState.towers, gameState.selectedDisc]);

  // Select a specific disc directly
  const selectDisc = useCallback((disc: CharacterDisc) => {
    // Find which tower contains this disc
    const towerWithDisc = gameState.towers.find(tower => 
      tower.discs.some(d => d.id === disc.id)
    );
    
    if (!towerWithDisc) return;
    
    // Only allow selecting the top disc
    const topDisc = towerWithDisc.discs[towerWithDisc.discs.length - 1];
    if (!topDisc || topDisc.id !== disc.id) return;
    
    if (gameState.selectedDisc?.id === disc.id) {
      // Deselect if clicking the same disc
      setGameState(prev => ({
        ...prev,
        selectedDisc: null,
        selectedTower: null
      }));
    } else {
      // Select the disc
      setGameState(prev => ({
        ...prev,
        selectedDisc: disc,
        selectedTower: towerWithDisc.id
      }));
    }
  }, [gameState.towers, gameState.selectedDisc]);

  // Move a disc to a tower
  const moveDiscToTower = useCallback((targetTowerId: number) => {
    if (!gameState.selectedDisc || gameState.selectedTower === null) return;
    
    const targetTower = gameState.towers[targetTowerId];
    if (!targetTower) return;
    
    // Check if move is valid
    if (!canPlaceDisc(gameState.selectedDisc, targetTower)) {
      // Invalid move - could add shake animation here
      return;
    }

    // If clicking the same tower, just deselect
    if (gameState.selectedTower === targetTowerId) {
      setGameState(prev => ({
        ...prev,
        selectedDisc: null,
        selectedTower: null
      }));
      return;
    }

    // Perform the move
    const newTowers = gameState.towers.map(tower => {
      if (tower.id === gameState.selectedTower) {
        // Remove disc from source tower
        return {
          ...tower,
          discs: tower.discs.slice(0, -1)
        };
      } else if (tower.id === targetTowerId) {
        // Add disc to target tower
        return {
          ...tower,
          discs: [...tower.discs, gameState.selectedDisc!]
        };
      }
      return tower;
    });

    const move: GameMove = {
      from: gameState.selectedTower,
      to: targetTowerId,
      disc: gameState.selectedDisc,
      timestamp: Date.now()
    };

    setGameState(prev => ({
      ...prev,
      towers: newTowers,
      selectedDisc: null,
      selectedTower: null,
      moveCount: prev.moveCount + 1,
      history: [...prev.history, move],
      hintMove: null,
      showHint: false
    }));
  }, [gameState, canPlaceDisc]);

  // Handle tower click
  const handleTowerClick = useCallback((towerId: number) => {
    if (gameState.selectedDisc) {
      // If a disc is selected, try to move it
      moveDiscToTower(towerId);
    } else {
      // Otherwise, try to select a disc from this tower
      selectDiscFromTower(towerId);
    }
  }, [gameState.selectedDisc, moveDiscToTower, selectDiscFromTower]);

  // Calculate next best move for hint
  const calculateHint = useCallback(() => {
    // Find tower with smallest moveable disc
    let bestMove: { from: number; to: number } | null = null;
    let smallestSize = Infinity;

    gameState.towers.forEach((fromTower) => {
      if (fromTower.discs.length === 0) return;
      
      const disc = fromTower.discs[fromTower.discs.length - 1];
      if (!disc) return;
      
      gameState.towers.forEach((toTower) => {
        if (fromTower.id === toTower.id) return;
        
        if (canPlaceDisc(disc, toTower) && disc.size < smallestSize) {
          // Prefer moves toward the target
          if (toTower.isTarget || (fromTower.isSource && !toTower.isTarget)) {
            bestMove = { from: fromTower.id, to: toTower.id };
            smallestSize = disc.size;
          }
        }
      });
    });

    return bestMove;
  }, [gameState.towers, canPlaceDisc]);

  // Toggle hint
  const toggleHint = useCallback(() => {
    if (!gameState.showHint) {
      const hint = calculateHint();
      hintsUsedRef.current += 1;
      setGameState(prev => ({
        ...prev,
        showHint: true,
        hintMove: hint
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        showHint: false,
        hintMove: null
      }));
    }
  }, [gameState.showHint, calculateHint]);

  // Undo last move
  const undoLastMove = useCallback(() => {
    if (gameState.history.length === 0) return;

    const lastMove = gameState.history[gameState.history.length - 1];
    if (!lastMove) return;
    
    // Reverse the move
    const newTowers = gameState.towers.map(tower => {
      if (tower.id === lastMove.from) {
        // Add disc back to source tower
        return {
          ...tower,
          discs: [...tower.discs, lastMove.disc]
        };
      } else if (tower.id === lastMove.to) {
        // Remove disc from target tower
        return {
          ...tower,
          discs: tower.discs.slice(0, -1)
        };
      }
      return tower;
    });

    setGameState(prev => ({
      ...prev,
      towers: newTowers,
      history: prev.history.slice(0, -1),
      moveCount: Math.max(0, prev.moveCount - 1),
      selectedDisc: null,
      selectedTower: null
    }));
  }, [gameState.history, gameState.towers]);

  // Reset game
  const resetGame = useCallback(() => {
    hintsUsedRef.current = 0;
    setTimeElapsed(0);
    setGameState({
      towers: createInitialTowers(),
      selectedDisc: null,
      selectedTower: null,
      moveCount: 0,
      isComplete: false,
      startTime: Date.now(),
      endTime: null,
      difficulty,
      showHint: false,
      hintMove: null,
      history: []
    });
  }, [createInitialTowers, difficulty]);

  return {
    gameState,
    timeElapsed,
    handleTowerClick,
    selectDisc,
    canPlaceDisc,
    toggleHint,
    undoLastMove,
    resetGame
  };
}