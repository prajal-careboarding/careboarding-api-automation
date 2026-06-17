import { FieldType, DataTarget } from 'tests/enums/field.enums';

/**
 * Request model for the Update Field API.
 * All fields are optional to allow partial updates.
 */
export interface UpdateFieldRequest {
  type?: FieldType | string;
  component?: string;
  label?: string;
  dataTarget?: DataTarget | string;
  isRequired?: boolean;
  order?: number;
  helpText?: string;
  validation?: Record<string, any>;
  options?: any[];
  visibilityRules?: Record<string, any>;
  fileConfig?: Record<string, any>;
}
