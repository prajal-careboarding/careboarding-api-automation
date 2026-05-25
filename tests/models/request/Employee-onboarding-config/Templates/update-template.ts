/**
 * Request model for updating a template.
 * All fields are optional to allow partial updates.
 */
export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  assignPositions?: any[];
  status?: string;
}
