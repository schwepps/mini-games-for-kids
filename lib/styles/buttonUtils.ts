/**
 * Reusable styling utilities for buttons and common UI elements
 */

export const gradientButtons = {
  primary: "bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 hover:from-orange-500 hover:via-red-500 hover:to-pink-500",
  hints: "bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 hover:from-yellow-500 hover:via-orange-500 hover:to-amber-500",
  hintsOff: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:from-gray-500 hover:via-gray-600 hover:to-gray-700",
  difficulty: "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500",
  newGame: "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500",
  memo: "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:from-purple-500 hover:via-pink-500 hover:to-red-500",
  setup: "bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 hover:from-green-500 hover:via-blue-500 hover:to-purple-500",
  mahjongHint: "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500"
} as const;

export const buttonBase = "text-white font-bold rounded-full border-3 border-white/50 backdrop-blur-sm transform transition-all duration-200 shadow-xl";

export const gameButton = (gradient: keyof typeof gradientButtons, shadow?: string) => 
  `${gradientButtons[gradient]} ${buttonBase} px-6 py-3 ${shadow || ''}`;

export const largeButton = (gradient: keyof typeof gradientButtons) =>
  `${gradientButtons[gradient]} ${buttonBase} text-lg sm:text-xl lg:text-2xl px-8 sm:px-10 lg:px-16 py-4 sm:py-5 lg:py-6 shadow-2xl`;

export const outlineButton = (shadow?: string) =>
  `border-2 border-white/70 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-medium rounded-full transition-all duration-200 px-6 py-3 ${shadow || ''}`;

export const cardStyles = {
  base: "bg-white/90 backdrop-blur-sm shadow-xl border-2 border-white/50",
  selected: "ring-4 ring-yellow-400 bg-yellow-50 shadow-lg transform scale-105",
  hover: "hover:bg-white shadow-md hover:scale-102"
} as const;