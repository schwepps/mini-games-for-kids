'use client';

import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SudokuErrorStateProps {
  error: string;
  onReset: () => void;
}

export default function SudokuErrorState({
  error,
  onReset
}: SudokuErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 max-w-md text-center bg-white/90 backdrop-blur-sm">
        <CardContent className="space-y-4">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-red-600">Oups !</h2>
          <p className="text-gray-600">{error}</p>
          <Button 
            onClick={onReset} 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Recommencer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}