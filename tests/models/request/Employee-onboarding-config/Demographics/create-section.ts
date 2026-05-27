import { FillerRole } from 'tests/enums/Field.enums';

/**
 * Base request model for the Create Section API.
 * All fields are optional to allow partial payloads for negative/edge-case test scenarios.
 */
export interface CreateSectionItem {
  name: string;
  description: string;
  order: number;
  requiredRole?: FillerRole | string;
  isRepeatable?: boolean;
  isRehireOnly?: boolean;
  isVisible?: boolean;
  fields?: any[];
}

export type CreateSectionsRequest = CreateSectionItem[];