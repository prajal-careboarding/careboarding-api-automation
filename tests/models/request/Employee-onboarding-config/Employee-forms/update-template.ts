/**
 * Request model for updating an onboarding form template.
 * All fields are optional to allow partial updates.
 */
export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  type?: string;
}
