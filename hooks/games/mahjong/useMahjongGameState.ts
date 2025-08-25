'use client';

import { useReducer } from 'react';
import { 
  MahjongGameState, 
  MahjongGameAction, 
  DIFFICULTY_OPTIONS 
} from '@/types/mahjong';
import { MahjongGenerator } from '@/lib/games/mahjong/generator';

// Initial state
const initialMahjongGameState: MahjongGameState = {
  gamePhase: 'setup',
  difficulty: 'easy',
  board: null,
  selectedTiles: [],
  matchedPairs: 0,
  totalPairs: 0,
  moves: 0,
  hints: 5,
  showingHint: false,
  startTime: null,
  loading: false,
  error: null,
};

// Reducer - Pure state management
function mahjongGameReducer(state: MahjongGameState, action: MahjongGameAction): MahjongGameState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading };

    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };

    case 'SELECT_DIFFICULTY':
      return { 
        ...state, 
        difficulty: action.difficulty,
        error: null 
      };

    case 'START_GAME':
      return {
        ...state,
        gamePhase: 'playing',
        board: action.board,
        loading: false,
        error: null,
        moves: 0,
        matchedPairs: 0,
        totalPairs: Math.floor(action.board.tiles.length / 2),
        selectedTiles: [],
        showingHint: false,
        startTime: new Date(),
        hints: DIFFICULTY_OPTIONS.find(d => d.difficulty === state.difficulty)?.hintsAvailable || 3
      };

    case 'SELECT_TILE':
      if (!state.board) return state;

      const tile = state.board.tiles.find(t => t.id === action.tileId);
      if (!tile || !tile.isSelectable || tile.isMatched) return state;

      // If tile already selected, deselect it
      if (state.selectedTiles.includes(action.tileId)) {
        const newBoard = {
          ...state.board,
          tiles: state.board.tiles.map(t => 
            t.id === action.tileId ? { ...t, isSelected: false } : t
          )
        };
        return {
          ...state,
          board: newBoard,
          selectedTiles: state.selectedTiles.filter(id => id !== action.tileId),
          showingHint: false
        };
      }

      // If we already have 2 tiles selected, clear selection and select this tile
      if (state.selectedTiles.length >= 2) {
        const newBoard = {
          ...state.board,
          tiles: state.board.tiles.map(t => {
            if (t.id === action.tileId) {
              return { ...t, isSelected: true };
            }
            return { ...t, isSelected: false };
          })
        };
        return {
          ...state,
          board: newBoard,
          selectedTiles: [action.tileId],
          showingHint: false
        };
      }

      // Select the tile
      const newBoardWithSelection = {
        ...state.board,
        tiles: state.board.tiles.map(t => 
          t.id === action.tileId ? { ...t, isSelected: true } : t
        )
      };
      const newSelectedTiles = [...state.selectedTiles, action.tileId];

      return {
        ...state,
        board: newBoardWithSelection,
        selectedTiles: newSelectedTiles,
        showingHint: false
      };

    case 'MATCH_TILES':
      if (!state.board || action.tileIds.length !== 2) return state;
      if (!action.tileIds[0] || !action.tileIds[1]) return state;

      const tile1 = state.board.tiles.find(t => t.id === action.tileIds[0]);
      const tile2 = state.board.tiles.find(t => t.id === action.tileIds[1]);
      
      if (!tile1 || !tile2 || !MahjongGenerator.canMatchTiles(tile1, tile2)) {
        return { ...state, moves: state.moves + 1 };
      }

      // Create new board with matched tiles
      const newBoardWithMatches = {
        ...state.board,
        tiles: state.board.tiles.map(t => {
          if (t.id === action.tileIds[0] || t.id === action.tileIds[1]) {
            return { ...t, isMatched: true, isSelected: false, isSelectable: false };
          }
          return t;
        })
      };

      // Update coverage and selectability for the new board
      MahjongGenerator.updateTileCoverage(newBoardWithMatches);
      MahjongGenerator.updateTileSelectability(newBoardWithMatches);

      const newMatchedPairs = state.matchedPairs + 1;
      const newMoves = state.moves + 1;
      
      // Check if game is won
      const gameWon = MahjongGenerator.isGameWon(newBoardWithMatches);
      
      return {
        ...state,
        board: newBoardWithMatches,
        selectedTiles: [],
        matchedPairs: newMatchedPairs,
        moves: newMoves,
        gamePhase: gameWon ? 'won' : 'playing'
      };

    case 'DESELECT_TILES':
      if (!state.board) return state;
      
      const newBoardDeselected = {
        ...state.board,
        tiles: state.board.tiles.map(t => {
          if (action.tileIds && action.tileIds.includes(t.id)) {
            return { ...t, isSelected: false };
          }
          return t;
        })
      };
      
      return {
        ...state,
        board: newBoardDeselected,
        selectedTiles: []
      };

    case 'SHOW_HINT':
      if (!state.board || state.hints <= 0) return state;

      const hintPair = MahjongGenerator.findHintPair(state.board);
      if (!hintPair) return state;

      // Create new board with highlighted hint tiles
      const newBoardWithHints = {
        ...state.board,
        tiles: state.board.tiles.map(t => {
          if (t.id === hintPair[0].id || t.id === hintPair[1].id) {
            return { ...t, isSelected: true };
          }
          return t;
        })
      };

      return {
        ...state,
        board: newBoardWithHints,
        showingHint: true,
        selectedTiles: [hintPair[0].id, hintPair[1].id]
      };

    case 'HIDE_HINT':
      if (!state.board) return state;

      // Create new board with hint highlights removed
      const newBoardHintsRemoved = {
        ...state.board,
        tiles: state.board.tiles.map(t => {
          if (state.showingHint && state.selectedTiles.includes(t.id)) {
            return { ...t, isSelected: false };
          }
          return t;
        })
      };

      return {
        ...state,
        board: newBoardHintsRemoved,
        showingHint: false,
        selectedTiles: []
      };

    case 'USE_HINT':
      return {
        ...state,
        hints: Math.max(0, state.hints - 1)
      };

    case 'RESET_GAME':
      return { ...initialMahjongGameState };

    case 'GAME_WON':
      return { ...state, gamePhase: 'won' };

    default:
      return state;
  }
}

/**
 * Pure state management hook for Mahjong game
 * Handles only state transitions via reducer pattern
 */
export function useMahjongGameState() {
  const [state, dispatch] = useReducer(mahjongGameReducer, initialMahjongGameState);

  return {
    state,
    dispatch,
    // Export initial state for testing
    initialState: initialMahjongGameState
  };
}