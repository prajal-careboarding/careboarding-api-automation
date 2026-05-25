/**
 * Request model for updating a category.
 * All fields are optional to allow partial updates.
 */
export interface UpdateCategoryRequest {
  name?: string;
  conditionalLogic?: Record<string, any>;
  [key: string]: any; // Allow arbitrary keys for testing edge cases like unknown fields
}
