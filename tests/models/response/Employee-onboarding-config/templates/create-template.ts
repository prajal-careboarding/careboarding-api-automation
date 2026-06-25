export interface CreateTemplateResponse {
  success: boolean;
  message: string;
  data: Template;
}

export interface Template {
  id: string;
  entityId: string;
  organizationId: string;
  branchId: string;
  name: string;
  description: string | null;
  stateCode: string | null;
  type: 'AGENCY_FORM';
  version: number;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  isSystem: boolean;
  categoryId: string | null;
  categoryName: string | null;
  policyType: string | null;
  requiresAcknowledgement: boolean | null;
  config: Record<string, unknown> | null;
  effectiveFrom: string | null;
  effectiveUntil: string | null;
  sections: TemplateSection[];
  signees: TemplateSignee[];
  groupKey: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  positionTemplates: PositionTemplate[];
  conditionalRules: ConditionalRule[];
  category: TemplateCategory | null;
}

export interface TemplateSection {
  id: string;
  name: string;
  description?: string | null;
}

export interface TemplateSignee {
  id: string;
  role: string;
}

export interface PositionTemplate {
  id: string;
  positionId?: string;
  positionName?: string;
}

export interface ConditionalRule {
  id: string;
  name?: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
}
