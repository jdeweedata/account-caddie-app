// Browser-compatible logger implementation
class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Error logging method
  error(error: Error | string, context?: string) {
    const timestamp = new Date().toISOString();
    const errorMessage = error instanceof Error ? error.message : error;
    const stackTrace = error instanceof Error ? error.stack : new Error().stack;

    const logEntry = `[${timestamp}] ${context ? `[${context}] ` : ''}ERROR: ${errorMessage}\n${stackTrace}\n\n`;

    // Store in memory
    this.logs.push(logEntry);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${timestamp}] ${context ? `[${context}] ` : ''}`, error);
    }
  }

  // Info logging method (newly added)
  info(message: string, context?: string) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${context ? `[${context}] ` : ''}INFO: ${message}\n`;

    // Store in memory
    this.logs.push(logEntry);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${timestamp}] ${context ? `[${context}] ` : ''}INFO: ${message}`);
    }
  }

  // Retrieve all logs
  getErrorLogs(): string[] {
    return [...this.logs];
  }

  // Clear logs
  clearErrorLogs() {
    this.logs = [];
  }
}

export const logger = Logger.getInstance();