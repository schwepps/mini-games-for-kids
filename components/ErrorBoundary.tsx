'use client';

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Optionally reload the page for a fresh start
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  override render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm border-4 border-red-300">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Oups ! Quelque chose s&apos;est mal passé 😅
              </h2>
              
              <p className="text-gray-600 mb-6">
                Ne t&apos;inquiète pas, ça arrive parfois ! Clique sur le bouton pour recommencer.
              </p>

              {/* Show error details in development */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 text-left">
                  <p className="text-sm text-red-800 font-mono">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <Button
                onClick={this.handleReset}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                <RefreshCcw className="w-5 h-5 mr-2" />
                Recommencer le jeu
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;