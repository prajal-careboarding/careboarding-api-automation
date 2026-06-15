/**
 * Request DTO — POST /identity/v2/entities/{entityId}/branches
 */
export interface CreateBranchV2Request {
  name: string;
  npi?: string;
  address?: BranchV2AddressDto;
  isPrimary?: boolean;
}

export interface BranchV2AddressDto {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

/**
 * Request DTO — PATCH /identity/v2/branches/{id}
 */
export interface UpdateBranchV2Request {
  name?: string;
  npi?: string;
  address?: Partial<BranchV2AddressDto>;
}
