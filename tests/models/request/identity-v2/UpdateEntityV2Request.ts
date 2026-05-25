/**
 * Request DTO — PATCH /identity/v2/entities/{id}
 * Partial update with optimistic lock. Pass `expectedVersion` from the most recent read.
 */
export interface UpdateEntityV2Request {
  /** Pass the `version` field from the most recent GET response */
  expectedVersion: number;
  name?: string;
  npi?: string;
  taxId?: string;
  type?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}
