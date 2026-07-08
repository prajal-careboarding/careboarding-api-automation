import { faker } from '@faker-js/faker';

/**
 * Valid template types supported by the API.
 */
export type TemplateType =
  | 'POLICY'
  | 'DEMOGRAPHICS'
  | 'FORMS'
  | 'DOCUMENT_REQUIREMENT'
  | 'AGENCY_FORM'
  | 'GOVERNMENT_FORM'
  | 'ONBOARDING_QUESTION'
  | 'DEFAULT_FORM'
  | 'REFERENCE';

/**
 * 1. ONE SOURCE-OF-TRUTH INTERFACE
 * This represents a perfectly valid payload. We make required fields mandatory,
 * and optional fields optional. We do NOT create separate interfaces for bad requests (400, 404).
 */
export interface CreateTemplateRequest {
  name: string; // Required
  type: TemplateType; // Required
  policyType?: string;
  categoryId?: string;
  requiresAcknowledgement?: boolean;
  config?: Record<string, any>;
  effectiveFrom?: string;
  assignPositions?: string[];
  signees?: any[];
}

/**
 * 2. PAYLOAD BUILDER FACTORY
 * This function generates a randomized, perfectly valid default payload.
 * Test files can use it to get a base payload, and optionally pass in `overrides`
 * to change specific fields (like changing the type to 'DEMOGRAPHICS' or the name).
 *
 * @param overrides - Pass an object here to overwrite any default fields.
 */
export function buildCreateTemplatePayload(
  overrides?: Partial<CreateTemplateRequest>
): CreateTemplateRequest {
  return {
    name: `Automation Template ${faker.string.alphanumeric(8)}`,
    type: 'POLICY', // Default valid type
    ...overrides, // Applies any overrides the test specifies
  };
}
