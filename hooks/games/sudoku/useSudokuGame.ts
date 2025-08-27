'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { IProfile, ICharacter } from '@/types/shared';
import { 
  SudokuGameState, 
  SudokuGameAction, 
  SudokuDifficulty,
  SudokuGrid,
  SudokuCell,
  GridSize,
  DIFFICULTY_OPTIONS 
} from '@/types/sudoku';
import { ProfileLoader } from '@/lib/profileLoader';
import { createErrorHandler } from '@/lib/utils/errorHandling';
import { 
  SudokuGenerator,
  validateMove,
  isPuzzleSolved,
  getHintCells
} from '@/lib/games/sudoku/generator';

// Initial state
const initialSudokuGameState: SudokuGameState = {
  gamePhase: 'setup',
  difficulty: 'easy',
  gridSize: 4,
  grid: null,
  selectedCharacter: null,
  moves: 0,
  loading: false,
  error: null,
  hints: true,
  showingHints: false,
  validationErrors: []
};

// Reducer
function sudokuGameReducer(state: SudokuGameState, action: SudokuGameAction): SudokuGameState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading };

    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };

    case 'SELECT_DIFFICULTY':
      return { 
        ...state, 
        difficulty: action.difficulty, 
        gridSize: action.gridSize,
        error: null 
      };

    case 'START_GAME':
      return {
        ...state,
        gamePhase: 'playing',
        grid: action.grid,
        loading: false,
        error: null,
        moves: 0,
        startTime: new Date(),
        selectedCharacter: null,
        validationErrors: []
      };

    case 'SELECT_CHARACTER':
      return { 
        ...state, 
        selectedCharacter: action.character,
        showingHints: false 
      };

    case 'PLACE_CHARACTER':
      if (!state.grid) return state;
      
      const newGrid = state.grid.cells.map(row => row.map(cell => ({ ...cell })));
      const targetCell = newGrid[action.row]?.[action.col];
      if (!targetCell) return state;
      
      // Don't allow editing given cells
      if (targetCell.isGiven) return state;
      
      // Place character
      targetCell.value = action.character.id;
      targetCell.character = action.character;
      
      // Validate the move
      targetCell.isValid = validateMove(
        newGrid,
        action.row,
        action.col,
        action.character.id,
        state.grid.characters
      );

      // Update validation for all cells in same row, column, and region
      const updatedGrid = { ...state.grid, cells: newGrid };
      updateCellValidation(updatedGrid, action.row, action.col);

      return {
        ...state,
        grid: updatedGrid,
        selectedCharacter: null,
        validationErrors: getValidationErrors(newGrid)
      };

    case 'CLEAR_CELL':
      if (!state.grid) return state;
      
      const clearedGrid = state.grid.cells.map(row => row.map(cell => ({ ...cell })));
      const cellToClear = clearedGrid[action.row]?.[action.col];
      if (!cellToClear) return state;
      
      // Don't allow clearing given cells
      if (cellToClear.isGiven) return state;
      
      cellToClear.value = null;
      cellToClear.character = null;
      cellToClear.isValid = true;

      // Update validation for affected cells
      const updatedClearedGrid = { ...state.grid, cells: clearedGrid };
      updateCellValidation(updatedClearedGrid, action.row, action.col);

      return {
        ...state,
        grid: updatedClearedGrid,
        validationErrors: getValidationErrors(clearedGrid)
      };

    case 'INCREMENT_MOVES':
      return { ...state, moves: state.moves + 1 };

    case 'VALIDATE_GRID':
      if (!state.grid) return state;
      
      const gridToValidate = { ...state.grid };
      validateAllCells(gridToValidate);

      return {
        ...state,
        grid: gridToValidate,
        validationErrors: getValidationErrors(gridToValidate.cells)
      };

    case 'TOGGLE_HINTS':
      return { ...state, hints: !state.hints, showingHints: false };

    case 'SHOW_HINTS':
      return { ...state, showingHints: action.show };

    case 'RESET_GAME':
      return { ...initialSudokuGameState };

    case 'CHANGE_DIFFICULTY_REQUEST':
      return { ...state, gamePhase: 'setup', grid: null, selectedCharacter: null, moves: 0, validationErrors: [], error: null };

    case 'GAME_WON':
      return { ...state, gamePhase: 'won' };

    default:
      return state;
  }
}

// Helper functions
function updateCellValidation(grid: SudokuGrid, changedRow: number, changedCol: number) {
  const size = grid.size;
  const cells = grid.cells;
  
  // Update validation for entire row
  for (let col = 0; col < size; col++) {
    const cell = cells[changedRow]?.[col];
    if (cell?.value) {
      cell.isValid = validateMove(
        cells,
        changedRow,
        col,
        cell.value,
        grid.characters
      );
    }
  }
  
  // Update validation for entire column
  for (let row = 0; row < size; row++) {
    const cell = cells[row]?.[changedCol];
    if (cell?.value) {
      cell.isValid = validateMove(
        cells,
        row,
        changedCol,
        cell.value,
        grid.characters
      );
    }
  }
  
  // Update validation for region
  const changedCell = cells[changedRow]?.[changedCol];
  if (!changedCell) return;
  
  const regionIndex = changedCell.region;
  const regionCells = grid.regions[regionIndex];
  if (!regionCells) return;
  
  for (const cellIdx of regionCells) {
    const row = Math.floor(cellIdx / size);
    const col = cellIdx % size;
    const cell = cells[row]?.[col];
    if (cell?.value) {
      cell.isValid = validateMove(
        cells,
        row,
        col,
        cell.value,
        grid.characters
      );
    }
  }
}

function validateAllCells(grid: SudokuGrid) {
  const size = grid.size;
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = grid.cells[row]?.[col];
      if (cell?.value) {
        cell.isValid = validateMove(
          grid.cells,
          row,
          col,
          cell.value,
          grid.characters
        );
      }
    }
  }
}

function getValidationErrors(cells: SudokuCell[][]): { row: number; col: number }[] {
  const errors = [];
  for (let row = 0; row < cells.length; row++) {
    const rowCells = cells[row];
    if (!rowCells) continue;
    
    for (let col = 0; col < rowCells.length; col++) {
      const cell = rowCells[col];
      if (cell && !cell.isValid) {
        errors.push({ row, col });
      }
    }
  }
  return errors;
}

export function useSudokuGame() {
  const [state, dispatch] = useReducer(sudokuGameReducer, initialSudokuGameState);
  
  // Create error handler
  const handleError = createErrorHandler(
    (error) => dispatch({ type: 'SET_ERROR', error }),
    { component: 'game', operation: 'sudoku-game' }
  );
  
  // Load character profile
  useEffect(() => {
    loadProfile();
  }, []);
  
  // Check for game completion
  useEffect(() => {
    if (state.grid && state.gamePhase === 'playing') {
      if (isPuzzleSolved(state.grid.cells)) {
        dispatch({ type: 'GAME_WON' });
      }
    }
  }, [state.grid, state.gamePhase]);

  const loadProfile = async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const profile = await ProfileLoader.loadProfile('cartoon-characters');
      
      if (!profile || profile.characters.length === 0) {
        throw new Error('No characters available for the game');
      }
      
      dispatch({ type: 'SET_LOADING', loading: false });
      return profile;
    } catch (err) {
      handleError(err, 'Impossible de charger les personnages du jeu');
    }
  };

  const selectDifficulty = useCallback((difficulty: SudokuDifficulty) => {
    const difficultyConfig = DIFFICULTY_OPTIONS.find(opt => opt.difficulty === difficulty);
    if (!difficultyConfig) return;
    
    dispatch({ 
      type: 'SELECT_DIFFICULTY', 
      difficulty,
      gridSize: difficultyConfig.gridSize 
    });
  }, []);

  const startNewGame = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      
      const profile = await loadProfile();
      if (!profile) return;
      
      const difficultyConfig = DIFFICULTY_OPTIONS.find(opt => opt.difficulty === state.difficulty);
      if (!difficultyConfig) return;
      
      // Shuffle characters and select required amount
      const shuffledCharacters = [...profile.characters].sort(() => Math.random() - 0.5);
      const gameCharacters = shuffledCharacters.slice(0, difficultyConfig.gridSize);
      
      // Generate puzzle
      const generator = new SudokuGenerator(difficultyConfig.gridSize);
      const grid = generator.generatePuzzle(gameCharacters, difficultyConfig.preFilledPercentage);
      
      dispatch({ type: 'START_GAME', grid });
      
    } catch (err) {
      handleError(err, 'Impossible de démarrer le jeu');
    }
  }, [state.difficulty]);

  const selectCharacter = useCallback((character: ICharacter | null) => {
    dispatch({ type: 'SELECT_CHARACTER', character });
    
    // Show hints if enabled and character selected
    if (character && state.hints) {
      dispatch({ type: 'SHOW_HINTS', show: true });
    } else {
      dispatch({ type: 'SHOW_HINTS', show: false });
    }
  }, [state.hints]);

  const placeCharacter = useCallback((row: number, col: number) => {
    if (!state.selectedCharacter || !state.grid) return;
    
    const targetCell = state.grid.cells[row]?.[col];
    if (!targetCell) return;
    
    // Don't allow editing given cells
    if (targetCell.isGiven) return;
    
    // If cell already has this character, clear it
    if (targetCell.value === state.selectedCharacter.id) {
      dispatch({ type: 'CLEAR_CELL', row, col });
    } else {
      dispatch({ 
        type: 'PLACE_CHARACTER', 
        row, 
        col, 
        character: state.selectedCharacter 
      });
    }
    
    dispatch({ type: 'INCREMENT_MOVES' });
  }, [state.selectedCharacter, state.grid]);

  const clearCell = useCallback((row: number, col: number) => {
    if (!state.grid) return;
    
    const targetCell = state.grid.cells[row]?.[col];
    if (!targetCell || targetCell.isGiven) return;
    
    dispatch({ type: 'CLEAR_CELL', row, col });
    dispatch({ type: 'INCREMENT_MOVES' });
  }, [state.grid]);

  const toggleHints = useCallback(() => {
    dispatch({ type: 'TOGGLE_HINTS' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const changeDifficulty = useCallback(() => {
    dispatch({ type: 'CHANGE_DIFFICULTY_REQUEST' });
  }, []);

  const getHintsForSelectedCharacter = useCallback((): { row: number; col: number }[] => {
    if (!state.selectedCharacter || !state.grid || !state.showingHints) {
      return [];
    }
    
    return getHintCells(state.grid.cells, state.selectedCharacter.id, state.grid.characters);
  }, [state.selectedCharacter, state.grid, state.showingHints]);

  return {
    // State
    gamePhase: state.gamePhase,
    difficulty: state.difficulty,
    gridSize: state.gridSize,
    grid: state.grid,
    selectedCharacter: state.selectedCharacter,
    moves: state.moves,
    startTime: state.startTime,
    loading: state.loading,
    error: state.error,
    hints: state.hints,
    showingHints: state.showingHints,
    validationErrors: state.validationErrors,
    
    // Actions
    selectDifficulty,
    startNewGame,
    selectCharacter,
    placeCharacter,
    clearCell,
    toggleHints,
    resetGame,
    changeDifficulty,
    
    // Computed
    gameTime: state.startTime ? Math.floor((Date.now() - state.startTime.getTime()) / 1000) : 0,
    hintCells: getHintsForSelectedCharacter(),
    isInteractionDisabled: state.loading || state.gamePhase !== 'playing'
  };
}