/**
 * Request model for the Create Position API.
 */
export interface CreatePositionRequest {
  name: string;
  description?: string;
  branchId?: string;
}
