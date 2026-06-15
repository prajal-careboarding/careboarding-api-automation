/**
 * Request DTO — POST /identity/v2/organizations/{organizationId}/agreements
 * Register an uploaded agreement (file lives in asset service).
 */
export interface RegisterAgreementRequest {
  /** Asset service file ID */
  fileId: string;
  type: AgreementType;
  /** Display name for the agreement */
  name?: string;
}

export type AgreementType = 'BAA' | 'MSA' | 'SOW' | string;
