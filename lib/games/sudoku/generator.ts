import { GridSize, SudokuGrid, SudokuCell, REGIONS } from '@/types/sudoku';
import { ICharacter } from '@/types/guess-who';

/**
 * Sudoku puzzle generator and solver
 */

export class SudokuGenerator {
  private grid: (number | null)[][];
  private size: GridSize;
  private regions: number[][];

  constructor(size: GridSize) {
    this.size = size;
    this.grid = Array(size).fill(null).map(() => Array(size).fill(null));
    this.regions = REGIONS[size];
  }

  /**
   * Check if a number can be placed at the given position
   */
  private isValid(row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < this.size; x++) {
      if (this.grid[row]?.[x] === num) return false;
    }

    // Check column
    for (let x = 0; x < this.size; x++) {
      if (this.grid[x]?.[col] === num) return false;
    }

    // Check region/box
    const cellIndex = row * this.size + col;
    const regionIndex = this.getRegionIndex(cellIndex);
    const regionCells = this.regions[regionIndex];

    if (regionCells) {
      for (const cellIdx of regionCells) {
        const r = Math.floor(cellIdx / this.size);
        const c = cellIdx % this.size;
        if (this.grid[r]?.[c] === num) return false;
      }
    }

    return true;
  }

  /**
   * Get the region index for a given cell index
   */
  private getRegionIndex(cellIndex: number): number {
    for (let i = 0; i < this.regions.length; i++) {
      const region = this.regions[i];
      if (region && region.includes(cellIndex)) {
        return i;
      }
    }
    return 0;
  }

  /**
   * Solve the Sudoku puzzle using backtracking
   */
  private solveSudoku(): boolean {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.grid[row]?.[col] === null) {
          // Try numbers 1 to size
          const numbers = this.shuffleArray(Array.from({ length: this.size }, (_, i) => i + 1));
          
          for (const num of numbers) {
            if (this.isValid(row, col, num)) {
              if (!this.grid[row]) this.grid[row] = [];
              this.grid[row]![col] = num;
              
              if (this.solveSudoku()) {
                return true;
              }
              
              if (this.grid[row]) this.grid[row]![col] = null; // backtrack
            }
          }
          
          return false; // No valid number found
        }
      }
    }
    
    return true; // All cells filled
  }

  /**
   * Count the number of solutions for a given grid (for uniqueness validation)
   */
  private countSolutions(grid: (number | null)[][], maxSolutions: number = 2): number {
    const tempGrid = grid.map(row => [...row]);
    return this.countSolutionsRecursive(tempGrid, 0, maxSolutions);
  }

  /**
   * Recursive helper to count solutions with early termination and optimizations
   */
  private countSolutionsRecursive(grid: (number | null)[][], cellIndex: number, maxSolutions: number): number {
    if (cellIndex >= this.size * this.size) {
      return 1; // Found a complete solution
    }

    const row = Math.floor(cellIndex / this.size);
    const col = cellIndex % this.size;

    if (grid[row]?.[col] !== null) {
      // Cell already filled, continue to next
      return this.countSolutionsRecursive(grid, cellIndex + 1, maxSolutions);
    }

    let solutionCount = 0;
    
    // Optimization: Try numbers in a smarter order (most constrained first)
    const candidates = this.getCandidates(grid, row, col);
    
    for (const num of candidates) {
      if (!grid[row]) grid[row] = [];
      grid[row]![col] = num;
      
      solutionCount += this.countSolutionsRecursive(grid, cellIndex + 1, maxSolutions);
      
      // Early termination if we found multiple solutions
      if (solutionCount >= maxSolutions) {
        grid[row]![col] = null; // cleanup
        return solutionCount;
      }
      
      grid[row]![col] = null; // backtrack
    }

    return solutionCount;
  }

  /**
   * Get valid candidates for a cell (optimization for solver)
   */
  private getCandidates(grid: (number | null)[][], row: number, col: number): number[] {
    const candidates = [];
    
    for (let num = 1; num <= this.size; num++) {
      if (this.isValidInGrid(grid, row, col, num)) {
        candidates.push(num);
      }
    }
    
    // Return candidates (could be optimized further with constraint propagation)
    return candidates;
  }

  /**
   * Check if a number is valid in a specific grid (without modifying class grid)
   */
  private isValidInGrid(grid: (number | null)[][], row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < this.size; x++) {
      if (grid[row]?.[x] === num) return false;
    }

    // Check column
    for (let x = 0; x < this.size; x++) {
      if (grid[x]?.[col] === num) return false;
    }

    // Check region/box
    const cellIndex = row * this.size + col;
    const regionIndex = this.getRegionIndex(cellIndex);
    const regionCells = this.regions[regionIndex];

    if (regionCells) {
      for (const cellIdx of regionCells) {
        const r = Math.floor(cellIdx / this.size);
        const c = cellIdx % this.size;
        if (grid[r]?.[c] === num) return false;
      }
    }

    return true;
  }

  /**
   * Check if a puzzle has exactly one unique solution
   */
  private hasUniqueSolution(grid: (number | null)[][]): boolean {
    return this.countSolutions(grid, 2) === 1;
  }

  /**
   * Check if a puzzle is solvable (has at least one solution)
   */
  private isSolvable(grid: (number | null)[][]): boolean {
    return this.countSolutions(grid, 1) >= 1;
  }

  /**
   * Generate a complete valid Sudoku grid
   */
  private generateCompleteGrid(): number[][] {
    // Reset grid
    this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
    
    // Fill diagonal regions first to speed up generation
    this.fillDiagonalRegions();
    
    // Solve the rest using backtracking
    this.solveSudoku();
    
    return this.grid.map(row => [...row]) as number[][];
  }

  /**
   * Fill diagonal regions with random valid numbers
   */
  private fillDiagonalRegions(): void {
    const diagonalRegions = this.getDiagonalRegions();
    
    for (const regionIndex of diagonalRegions) {
      const regionCells = this.regions[regionIndex];
      if (!regionCells) continue;
      
      const numbers = this.shuffleArray(Array.from({ length: this.size }, (_, i) => i + 1));
      
      for (let i = 0; i < regionCells.length; i++) {
        const cellIndex = regionCells[i];
        if (cellIndex === undefined) continue;
        const row = Math.floor(cellIndex / this.size);
        const col = cellIndex % this.size;
        const number = numbers[i];
        if (number !== undefined) {
          if (!this.grid[row]) this.grid[row] = [];
          this.grid[row]![col] = number;
        }
      }
    }
  }

  /**
   * Get diagonal region indices based on grid size
   */
  private getDiagonalRegions(): number[] {
    switch (this.size) {
      case 4:
        return [0, 3]; // top-left and bottom-right 2x2 regions
      case 6:
        return [0, 4]; // diagonal 2x3 regions
      case 9:
        return [0, 4, 8]; // diagonal 3x3 regions
      default:
        return [];
    }
  }

  /**
   * Shuffle an array using Fisher-Yates algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      const tempJ = shuffled[j];
      if (temp !== undefined && tempJ !== undefined) {
        shuffled[i] = tempJ;
        shuffled[j] = temp;
      }
    }
    return shuffled;
  }

  /**
   * Remove cells from complete grid based on difficulty (ensuring unique solution)
   */
  private removeCells(completeGrid: number[][], removePercentage: number): (number | null)[][] {
    const grid = completeGrid.map(row => [...row] as (number | null)[]);
    const totalCells = this.size * this.size;
    const targetRemovals = Math.floor(totalCells * (1 - removePercentage));
    
    // Define minimum clues based on grid size to ensure solvability
    const minClues = this.getMinimumClues();
    const maxRemovals = Math.min(targetRemovals, totalCells - minClues);
    
    // Get all cell positions and shuffle them for random removal order
    const positions = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        positions.push({ row, col });
      }
    }
    const shuffledPositions = this.shuffleArray(positions);
    
    let removedCells = 0;
    let attemptedPositions = 0;
    
    // Iteratively try to remove cells while maintaining unique solution
    for (const position of shuffledPositions) {
      if (removedCells >= maxRemovals) break;
      if (attemptedPositions >= totalCells) break; // Prevent infinite loops
      
      attemptedPositions++;
      const { row, col } = position;
      
      if (!grid[row] || grid[row][col] === null) continue; // Already removed
      
      // Temporarily remove the cell
      const originalValue = grid[row][col];
      grid[row][col] = null;
      
      // Check if puzzle still has unique solution
      if (this.hasUniqueSolution(grid)) {
        // Safe to remove - keep it removed
        removedCells++;
      } else {
        // Not safe to remove - restore the value
        if (originalValue !== undefined) {
          grid[row][col] = originalValue;
        }
      }
    }
    
    // If we couldn't remove enough cells safely, continue with what we have
    
    return grid;
  }

  /**
   * Get minimum number of clues required for solvability based on grid size
   */
  private getMinimumClues(): number {
    switch (this.size) {
      case 4: return 4;  // 25% of 16 cells - very conservative for kids
      case 6: return 8;  // ~22% of 36 cells - manageable for children
      case 9: return 17; // Known mathematical minimum for 9x9 Sudoku
      default: return Math.floor(this.size * this.size * 0.25); // 25% fallback
    }
  }

  /**
   * Validate that a generated puzzle meets quality standards
   */
  private validatePuzzleQuality(grid: (number | null)[][]): boolean {
    // Check 1: Must be solvable with unique solution
    if (!this.hasUniqueSolution(grid)) {
      return false;
    }

    // Check 2: Must have minimum required clues
    const filledCells = grid.flat().filter(cell => cell !== null).length;
    const minClues = this.getMinimumClues();
    if (filledCells < minClues) {
      return false;
    }

    // Check 3: Each row, column, and region should have some clues for guidance
    if (!this.hasReasonableClueDistribution(grid)) {
      return false;
    }

    return true;
  }

  /**
   * Check that clues are reasonably distributed across the grid
   */
  private hasReasonableClueDistribution(grid: (number | null)[][]): boolean {
    // Each row should have at least 1 clue (except for very hard puzzles)
    for (let row = 0; row < this.size; row++) {
      const rowClues = grid[row]?.filter(cell => cell !== null).length || 0;
      if (rowClues === 0) return false;
    }

    // Each column should have at least 1 clue
    for (let col = 0; col < this.size; col++) {
      const colClues = grid.map(row => row?.[col]).filter(cell => cell !== null).length;
      if (colClues === 0) return false;
    }

    // Each region should have at least 1 clue
    for (let regionIdx = 0; regionIdx < this.regions.length; regionIdx++) {
      const regionCells = this.regions[regionIdx];
      if (!regionCells) continue;
      
      const regionClues = regionCells.filter(cellIdx => {
        const row = Math.floor(cellIdx / this.size);
        const col = cellIdx % this.size;
        return grid[row]?.[col] !== null;
      }).length;
      
      if (regionClues === 0) return false;
    }

    return true;
  }

  /**
   * Simple fallback cell removal (less safe but guaranteed to work)
   */
  private removeCellsSimple(completeGrid: number[][], removePercentage: number): (number | null)[][] {
    const grid = completeGrid.map(row => [...row] as (number | null)[]);
    const totalCells = this.size * this.size;
    const minClues = this.getMinimumClues();
    
    // Calculate safe number of cells to remove
    const maxRemovals = Math.floor(totalCells * (1 - removePercentage));
    const safeRemovals = Math.min(maxRemovals, totalCells - minClues);
    
    // Get all positions and shuffle
    const positions = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        positions.push({ row, col });
      }
    }
    
    const shuffledPositions = this.shuffleArray(positions);
    
    // Remove cells up to the safe limit
    for (let i = 0; i < safeRemovals && i < shuffledPositions.length; i++) {
      const position = shuffledPositions[i];
      if (position && grid[position.row] && position.col < this.size) {
        const row = grid[position.row];
        if (row) {
          row[position.col] = null;
        }
      }
    }
    
    return grid;
  }

  /**
   * Generate a Sudoku puzzle with given difficulty
   */
  generatePuzzle(characters: ICharacter[], preFilledPercentage: number): SudokuGrid {
    // Validate we have enough characters for the grid size
    if (characters.length < this.size) {
      throw new Error(`Not enough characters provided: need ${this.size}, got ${characters.length}`);
    }
    
    const maxAttempts = 10;
    let attempts = 0;
    let puzzleGrid: (number | null)[][] | null = null;
    
    // Try multiple times to generate a valid puzzle
    while (attempts < maxAttempts && !puzzleGrid) {
      attempts++;
      
      try {
        // Generate complete grid
        const completeGrid = this.generateCompleteGrid();
        
        // Validate the complete grid has a solution (should always be true)
        if (!this.hasUniqueSolution(completeGrid)) {
          continue;
        }
        
        // Remove cells based on difficulty while maintaining solvability
        const candidateGrid = this.removeCells(completeGrid, preFilledPercentage);
        
        // Quality assurance: verify the puzzle meets our standards
        if (this.validatePuzzleQuality(candidateGrid)) {
          puzzleGrid = candidateGrid;
        }
      } catch {
        // Continue to next attempt
      }
    }
    
    // If we couldn't generate a valid puzzle, fall back to a simpler approach
    if (!puzzleGrid) {
      const completeGrid = this.generateCompleteGrid();
      puzzleGrid = this.removeCellsSimple(completeGrid, preFilledPercentage);
    }
    
    // Convert to SudokuCell format
    const cells: SudokuCell[][] = [];
    for (let row = 0; row < this.size; row++) {
      cells[row] = [];
      for (let col = 0; col < this.size; col++) {
        const cellIndex = row * this.size + col;
        const gridValue = puzzleGrid[row]?.[col];
        
        // Determine if this cell should be visible (given) or empty
        const isGivenCell = gridValue !== null;
        
        if (!cells[row]) cells[row] = [];
        cells[row]![col] = {
          value: isGivenCell && gridValue ? characters[gridValue - 1]?.id || null : null,
          character: isGivenCell && gridValue ? characters[gridValue - 1] || null : null,
          isGiven: isGivenCell,
          isValid: true,
          row,
          col,
          region: this.getRegionIndex(cellIndex)
        };
      }
    }

    return {
      size: this.size,
      cells,
      characters: characters.slice(0, this.size),
      regions: this.regions
    };
  }
}

/**
 * Validate if a move is legal in the current grid state
 */
export function validateMove(
  grid: SudokuCell[][],
  row: number,
  col: number,
  characterId: string,
  characters: ICharacter[]
): boolean {
  const size = grid.length;
  const character = characters.find(c => c.id === characterId);
  if (!character) return false;

  // Check row
  for (let c = 0; c < size; c++) {
    const cell = grid[row]?.[c];
    if (c !== col && cell?.value === characterId) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < size; r++) {
    const cell = grid[r]?.[col];
    if (r !== row && cell?.value === characterId) {
      return false;
    }
  }

  // Check region
  const targetCell = grid[row]?.[col];
  if (!targetCell) return false;
  
  const regionCells = REGIONS[size as GridSize][targetCell.region];
  if (!regionCells) return true;

  for (const cellIdx of regionCells) {
    const r = Math.floor(cellIdx / size);
    const c = cellIdx % size;
    const cell = grid[r]?.[c];
    if ((r !== row || c !== col) && cell?.value === characterId) {
      return false;
    }
  }

  return true;
}

/**
 * Check if the puzzle is completely solved
 */
export function isPuzzleSolved(grid: SudokuCell[][]): boolean {
  const size = grid.length;
  
  // Check if all cells are filled
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = grid[row]?.[col];
      if (!cell?.value) return false;
    }
  }
  
  // Check if all cells are valid
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = grid[row]?.[col];
      if (!cell?.isValid) return false;
    }
  }
  
  return true;
}

/**
 * Get hint cells for a specific character
 */
export function getHintCells(
  grid: SudokuCell[][],
  characterId: string,
  characters: ICharacter[]
): { row: number; col: number }[] {
  const size = grid.length;
  const hints: { row: number; col: number }[] = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = grid[row]?.[col];
      if (cell && !cell.value && !cell.isGiven) {
        if (validateMove(grid, row, col, characterId, characters)) {
          hints.push({ row, col });
        }
      }
    }
  }

  return hints;
}