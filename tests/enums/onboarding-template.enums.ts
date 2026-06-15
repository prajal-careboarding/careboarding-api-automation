// tests/enums/OnboardingTemplate.enums.ts

export enum OnboardingTemplateType {
  DEMOGRAPHICS = 'DEMOGRAPHICS',
  POLICY = 'POLICY',
  GOVERNMENT_FORM = 'GOVERNMENT_FORM',
  DEFAULT_FORM = 'DEFAULT_FORM',
  AGENCY_FORM = 'AGENCY_FORM',
  ONBOARDING_QUESTION = 'ONBOARDING_QUESTION',
  DOCUMENT_REQUIREMENT = 'DOCUMENT_REQUIREMENT',
  REFERENCE = 'REFERENCE',
}

export enum TemplateStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum PolicyType {
  TEXT_SINGLE = 'TEXT_SINGLE',
  TEXT_SECTIONAL = 'TEXT_SECTIONAL',
  PDF_SINGLE = 'PDF_SINGLE',
  PDF_ENVELOPE = 'PDF_ENVELOPE',
}

export enum DocumentLifecycle {
  ONE_TIME = 'ONE_TIME',
  EXPIRING = 'EXPIRING',
}

export enum PositionTemplateTab {
  POLICIES = 'POLICIES',
  FORMS = 'FORMS',
  DOCUMENTS = 'DOCUMENTS',
}

export enum GovernmentFormCode {
  I9 = 'I-9',
  W4 = 'W-4',
  LOCAL_TAX = 'LOCAL_TAX',
}

export enum StateCode {
  PA = 'PA',
  OH = 'OH',
  CO = 'CO',
}
