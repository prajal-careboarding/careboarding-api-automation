import { DataTarget, FieldType } from 'tests/enums/field.enums';
import { OnboardingTemplateType } from 'tests/enums/onboarding-template.enums';

export interface CreateTemplateRequest {
  name: string;
  type: OnboardingTemplateType;
  description?: string;
  stateCode?: string;
  version?: number;
  sections?: Section[];
}

export interface Section {
  name: string;
  description: string;
  order: number;
  fields: Field[];
}

export interface Field {
  component: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  isRequired: boolean;
  dataTarget?: DataTarget;
  validation?: Validation;
  order: number;
}

export interface Validation {
  required?: boolean;
  customError?: string;
}
