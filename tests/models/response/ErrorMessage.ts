/**
 * Represents a standard error response structure for the application.
 */
export interface ErrorMessage {
  /** Indicates the failure of the operation, usually set to false. */
  success: boolean;

  /** A human-readable description of the error. */
  message: string;

  /**
   * An optional machine-readable error code (e.g., 'AUTH_EXPIRED', 'VALIDATION_FAILED').
   * Useful for frontend logic to trigger specific behaviors.
   */
  errorCode?: string;

  /**
   * Optional additional details about the error.
   * This could be an array of validation errors or an object with specific field failures.
   */
  details?: Record<string, any> | string[];

  /** The ISO timestamp of when the error occurred. */
  timestamp: string;

  /** The request path or resource that triggered the error. */
  path?: string;

  /**
   * The stack trace of the error.
   * Caution: This should typically be omitted in production environments for security.
   */
  stack?: string;

  /** HTTP Status code associated with the error. */
  statusCode?: number;
}
