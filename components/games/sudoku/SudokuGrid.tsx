'use client';

import { motion } from 'framer-motion';
import { SudokuGridProps } from '@/types/sudoku';
import SudokuCell from './SudokuCell';

export default function SudokuGrid({
  grid,
  selectedCharacter,
  showingHints,
  validationErrors,
  onCellClick,
  disabled
}: SudokuGridProps) {

  // Get responsive classes for grid container - optimized for mobile consistency
  const getGridContainerClasses = () => {
    const baseClasses = "relative mx-auto bg-white rounded-2xl shadow-2xl border-4 border-gray-300";
    
    // Mobile-optimized responsive sizing with proper padding
    const sizeClasses = {
      4: "max-w-sm sm:max-w-lg lg:max-w-2xl p-3 sm:p-4",
      6: "max-w-md sm:max-w-xl lg:max-w-3xl p-3 sm:p-4", 
      9: "max-w-[20rem] sm:max-w-2xl lg:max-w-4xl p-2 sm:p-4" // Constrained mobile width for 9x9
    };
    
    return `${baseClasses} ${sizeClasses[grid.size] || sizeClasses[4]}`;
  };

  // Get responsive cell size classes - mobile-optimized for consistency
  const getCellSizeClasses = () => {
    const sizeClasses = {
      4: "w-[3.75rem] h-[3.75rem] sm:w-20 sm:h-20 lg:w-[6.25rem] lg:h-[6.25rem]",      // 60px -> 80px -> 100px
      6: "w-[3.125rem] h-[3.125rem] sm:w-[4.0625rem] sm:h-[4.0625rem] lg:w-20 lg:h-20", // 50px -> 65px -> 80px
      9: "w-[2rem] h-[2rem] sm:w-[3.25rem] sm:h-[3.25rem] lg:w-16 lg:h-16"            // 32px -> 52px -> 64px (reduced mobile size)
    };
    
    return sizeClasses[grid.size] || sizeClasses[4];
  };
  
  // Check if a cell should show a hint
  const shouldShowHint = (row: number, col: number): boolean => {
    if (!showingHints || !selectedCharacter) return false;
    
    const cell = grid.cells[row]?.[col];
    if (!cell) return false;
    return !cell.value && !cell.isGiven;
  };

  // Check if a cell has validation errors
  const hasValidationError = (row: number, col: number): boolean => {
    return validationErrors.some(error => error.row === row && error.col === col);
  };

  // Check if a cell is highlighted (same row, column, or region as selected cell)
  const isHighlighted = (): boolean => {
    // For now, we'll implement basic highlighting
    // This could be enhanced to highlight related cells
    return false;
  };

  // Get region styling for visual separation
  const getRegionStyling = (row: number, col: number): string => {
    const cell = grid.cells[row]?.[col];
    if (!cell) return 'bg-white';
    const regionIndex = cell.region;
    
    // Different background colors for different regions to make them visually distinct
    const regionColors = [
      'bg-slate-50',    // region 0
      'bg-blue-50',     // region 1  
      'bg-slate-50',    // region 2
      'bg-blue-50',     // region 3
      'bg-slate-50',    // region 4
      'bg-blue-50',     // region 5
      'bg-slate-50',    // region 6
      'bg-blue-50',     // region 7
      'bg-slate-50',    // region 8
    ];
    
    return regionColors[regionIndex] || 'bg-white';
  };

  // Get responsive borders for region separation
  const getRegionBorders = (row: number, col: number): string => {
    let borderClasses = '';

    // Responsive border thickness - lighter and more proportional
    const borderThickness = 'border-r-2 sm:border-r-3';
    const borderColor = 'border-r-gray-600';
    const bottomBorderThickness = 'border-b-2 sm:border-b-3';
    const bottomBorderColor = 'border-b-gray-600';

    // For different grid sizes, we need different region border logic
    if (grid.size === 4) {
      // 4x4 grid: 2x2 regions
      if (col === 1) borderClasses += `${borderThickness} ${borderColor} `;
      if (row === 1) borderClasses += `${bottomBorderThickness} ${bottomBorderColor} `;
    } else if (grid.size === 6) {
      // 6x6 grid: 2x3 regions - proper 2×3 rectangular regions
      if (col === 2) borderClasses += `${borderThickness} ${borderColor} `;
      if (row === 1 || row === 3) borderClasses += `${bottomBorderThickness} ${bottomBorderColor} `;
    } else if (grid.size === 9) {
      // 9x9 grid: 3x3 regions
      if (col === 2 || col === 5) borderClasses += `${borderThickness} ${borderColor} `;
      if (row === 2 || row === 5) borderClasses += `${bottomBorderThickness} ${bottomBorderColor} `;
    }

    return borderClasses;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      <div className={getGridContainerClasses()}>
        <div 
          className={`grid gap-0.5 p-1 sm:p-2 bg-gray-100 rounded-xl`}
          style={{
            gridTemplateColumns: `repeat(${grid.size}, minmax(0, 1fr))`,
          }}
        >
          {grid.cells.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`${getRegionStyling(rowIndex, colIndex)} ${getRegionBorders(rowIndex, colIndex)} ${getCellSizeClasses()} p-0.5 rounded`}
              >
                <SudokuCell
                  cell={cell}
                  row={rowIndex}
                  col={colIndex}
                  selectedCharacter={selectedCharacter}
                  isHighlighted={isHighlighted() || hasValidationError(rowIndex, colIndex)}
                  showHint={shouldShowHint(rowIndex, colIndex)}
                  onClick={onCellClick}
                  disabled={disabled}
                />
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            <span className="text-blue-600 font-mono font-bold">
              {grid.size}×{grid.size}
            </span>
            <span>•</span>
            <span>
              {grid.characters.length} personnages
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}