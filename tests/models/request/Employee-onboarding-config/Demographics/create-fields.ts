import { FieldType, DataTarget } from 'tests/enums/Field.enums';

/**
 * Interface representing a single field object to be created within a section.
 */
export interface CreateFieldItem {
  key?: string | null;
  type: FieldType | string;
  component: string;
  label: string;
  dataTarget: DataTarget | string;
  isRequired: boolean;
  order: number;
  helpText?: string;
  validation?: Record<string, any>;
  options?: any[];
  visibilityRules?: any[];
  fileConfig?: Record<string, any>;
}

/**
 * Base request model for the Create Fields API.
 * The payload is an array of fields to be created.
 */
export type CreateFieldsRequest = CreateFieldItem[];
