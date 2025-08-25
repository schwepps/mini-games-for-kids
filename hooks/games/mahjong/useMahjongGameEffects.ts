'use client';

import { useEffect, useState } from 'react';
import { MahjongGameState } from '@/types/mahjong';
import { MahjongGenerator } from '@/lib/games/mahjong/generator';

/**
 * Effects hook for Mahjong game
 * Handles side effects: auto-matching, screen resize, timeouts
 */
export function useMahjongGameEffects(
  state: MahjongGameState,
  dispatch: (action: any) => void
) {
  const [screenWidth, setScreenWidth] = useState(768);

  // Handle screen resize for responsive tile sizing
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Auto-match when 2 matching tiles are selected
  useEffect(() => {
    if (state.selectedTiles.length === 2 && !state.showingHint && state.board) {
      const tile1 = state.board.tiles.find(t => t.id === state.selectedTiles[0]);
      const tile2 = state.board.tiles.find(t => t.id === state.selectedTiles[1]);
      
      if (tile1 && tile2 && MahjongGenerator.canMatchTiles(tile1, tile2)) {
        // Match found - brief delay for visual feedback
        const matchTimeout = setTimeout(() => {
          dispatch({ type: 'MATCH_TILES', tileIds: state.selectedTiles });
        }, 300);
        
        return () => clearTimeout(matchTimeout);
      } else if (tile1 && tile2) {
        // No match - deselect after delay
        const deselectTimeout = setTimeout(() => {
          dispatch({ type: 'DESELECT_TILES', tileIds: state.selectedTiles });
        }, 500);
        
        return () => clearTimeout(deselectTimeout);
      }
    }
  }, [state.selectedTiles, state.showingHint, state.board, dispatch]);

  // Auto-hide hint after timeout
  useEffect(() => {
    if (state.showingHint) {
      const hintTimeout = setTimeout(() => {
        dispatch({ type: 'HIDE_HINT' });
      }, 3000);
      
      return () => clearTimeout(hintTimeout);
    }
  }, [state.showingHint, dispatch]);

  return {
    screenWidth
  };
}