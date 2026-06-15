/**
 * Represents the structure of a general error response returned by the API.
 */
export interface GeneralErrorResponse {
  /** The HTTP status code of the error response. */
  statusCode: number;

  /** Indicates success status, which is always false for error responses. */
  success: boolean;

  /** The specific machine-readable error code/identifier (e.g., 'INVALID_TEMPLATE_CONFIG'). */
  error: string;

  /** A human-readable message describing the error. */
  message: string;

  /** The ISO timestamp of when the error occurred. */
  timestamp: string;

  /** List of validation-specific errors, if any. */
  validationErrors: any[];
}
