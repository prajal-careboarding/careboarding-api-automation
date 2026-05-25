/**
 * Request model for the Create Category API.
 */
export interface CreateCategoryRequest {
  name: string;
  templateType: 'POLICY' | 'DOCUMENT_REQUIREMENT' | string;
}
