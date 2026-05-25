/**
 * Request DTO — POST /identity/v2/entities
 * Creates an entity. Biz Admin → PENDING_APPROVAL. Super Admin → ACTIVE.
 */
export interface CreateEntityV2Request {
  /** Legal name of the entity */
  name: string;
  /** NPI number */
  npi?: string;
  /** Tax ID (EIN) */
  taxId?: string;
  /** Entity type, e.g. "AGENCY" */
  type?: string;
  address?: EntityV2AddressDto;
  /** Service lines to activate on creation */
  serviceLines?: string[];
}

export interface EntityV2AddressDto {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}
