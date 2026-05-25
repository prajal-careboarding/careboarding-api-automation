/**
 * Request model for the Update Position API.
 * All fields are optional to allow partial updates.
 */
export interface UpdatePositionRequest {
  name?: string;
  description?: string;
  branchId?: string;
}
