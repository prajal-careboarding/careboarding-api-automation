import { FillerRole } from 'tests/enums/Field.enums';

/**
 * Request model for the Update Section API.
 * All fields are optional to allow partial updates.
 */
export interface UpdateSectionRequest {
  name?: string;
  description?: string;
  order?: number;
  requiredRole?: FillerRole | string;
  isRepeatable?: boolean;
  isRehireOnly?: boolean;
  isVisible?: boolean;
}
