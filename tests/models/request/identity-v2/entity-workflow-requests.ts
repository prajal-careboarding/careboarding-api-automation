/**
 * Request DTO — POST /identity/v2/entities/{id}/decline
 * Super Admin declines a pending entity (reason ≥ 20 chars).
 */
export interface DeclineEntityRequest {
  /** Must be at least 20 characters */
  reason: string;
}

/**
 * Request DTO — POST /identity/v2/entities/{id}/submit
 * Resubmit a declined entity for approval.
 */
export interface SubmitEntityRequest {
  note?: string;
}
