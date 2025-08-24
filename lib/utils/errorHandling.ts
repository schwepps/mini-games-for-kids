/**
 * Reusable error handling utilities for consistent error management
 */

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorContext {
  component?: string;
  operation?: string;
  userId?: string;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

export interface ProcessedError {
  message: string;
  originalError: Error | unknown;
  severity: ErrorSeverity;
  context: ErrorContext;
  userMessage: string;
}

/**
 * Safely extract error message from unknown error types
 */
export function getErrorMessage(error: unknown, fallback = 'An unknown error occurred'): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  
  return fallback;
}

/**
 * Create a user-friendly error message from technical error
 */
export function createUserFriendlyMessage(error: unknown, context: ErrorContext): string {
  const operation = context.operation || 'operation';
  
  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
      return 'Problème de connexion. Vérifiez votre connexion internet et réessayez.';
    }
    
    if (error.message.includes('profile') || error.message.includes('characters')) {
      return 'Impossible de charger les données du jeu. Veuillez réessayer.';
    }
    
    if (error.message.includes('validation')) {
      return 'Données invalides détectées. Veuillez vérifier les paramètres.';
    }
  }
  
  // Generic fallback messages
  switch (context.component) {
    case 'game':
      return 'Une erreur est survenue dans le jeu. Veuillez redémarrer la partie.';
    case 'profile':
      return 'Impossible de charger le profil. Veuillez réessayer.';
    case 'api':
      return 'Erreur de communication avec le serveur. Veuillez réessayer.';
    default:
      return `Une erreur est survenue lors de l'${operation}. Veuillez réessayer.`;
  }
}

/**
 * Determine error severity based on error type and context
 */
export function getErrorSeverity(error: unknown, context: ErrorContext): ErrorSeverity {
  if (error instanceof Error) {
    // Critical errors
    if (error.message.includes('security') || error.message.includes('auth')) {
      return 'critical';
    }
    
    // High severity errors
    if (error.message.includes('Failed to load') || error.message.includes('network')) {
      return 'high';
    }
    
    // Medium severity errors
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return 'medium';
    }
  }
  
  // Default to medium for component errors, low for others
  return context.component ? 'medium' : 'low';
}

/**
 * Process an error with context and return structured error information
 */
export function processError(
  error: unknown, 
  context: ErrorContext = {},
  customUserMessage?: string
): ProcessedError {
  const message = getErrorMessage(error);
  const severity = getErrorSeverity(error, context);
  const userMessage = customUserMessage || createUserFriendlyMessage(error, context);
  
  const processedContext: ErrorContext = {
    ...context,
    timestamp: context.timestamp || new Date()
  };
  
  return {
    message,
    originalError: error,
    severity,
    context: processedContext,
    userMessage
  };
}

/**
 * Log error with appropriate level based on severity
 */
export function logError(processedError: ProcessedError): void {
  const { message, severity, context } = processedError;
  const logData = {
    message,
    severity,
    component: context.component,
    operation: context.operation,
    timestamp: context.timestamp,
    metadata: context.metadata
  };
  
  if (process.env.NODE_ENV !== 'production') {
    switch (severity) {
      case 'critical':
        console.error('🚨 CRITICAL ERROR:', logData);
        break;
      case 'high':
        console.error('🔴 HIGH SEVERITY ERROR:', logData);
        break;
      case 'medium':
        console.warn('🟡 MEDIUM SEVERITY ERROR:', logData);
        break;
      case 'low':
        console.info('🔵 LOW SEVERITY ERROR:', logData);
        break;
    }
  }
}

/**
 * Complete error handling function that processes, logs, and returns user message
 */
export function handleError(
  error: unknown,
  context: ErrorContext = {},
  customUserMessage?: string
): string {
  const processedError = processError(error, context, customUserMessage);
  logError(processedError);
  return processedError.userMessage;
}

/**
 * Higher-order function to wrap async operations with error handling
 */
export function withErrorHandling<T extends unknown[], R>(
  operation: (...args: T) => Promise<R>,
  context: ErrorContext = {},
  customErrorMessage?: string
) {
  return async (...args: T): Promise<R> => {
    try {
      return await operation(...args);
    } catch (error) {
      const userMessage = handleError(error, context, customErrorMessage);
      throw new Error(userMessage);
    }
  };
}

/**
 * React hook utility for handling errors in components
 */
export function createErrorHandler(
  setError: (message: string | null) => void,
  context: ErrorContext = {}
) {
  return (error: unknown, customMessage?: string) => {
    const userMessage = handleError(error, context, customMessage);
    setError(userMessage);
  };
}