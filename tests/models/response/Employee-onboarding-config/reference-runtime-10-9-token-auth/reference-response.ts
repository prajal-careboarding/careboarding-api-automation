// ─────────────────────────────────────────────────────────────────────────────
// Response models for GET /onboarding/reference/:referenceToken
// and POST /onboarding/reference/:referenceToken/answers
// ─────────────────────────────────────────────────────────────────────────────

/** A single question the referee must answer. */
export interface ReferenceQuestion {
  id: string;
  key: string;
  label: string;
  type: 'TEXT' | 'NUMBER' | 'SELECT' | 'BOOLEAN';
  isRequired: boolean;
  options?: string[]; // only present for SELECT questions
}

/** 200 response when loading the referee page via token. */
export interface GetReferenceResponse {
  id: string;
  status: 'PENDING' | 'COMPLETED' | 'EXPIRED';
  refereeName: string;
  employeeName: string;
  organizationName: string;
  questions: ReferenceQuestion[];
}

/** 200 response after successfully submitting answers. */
export interface SubmitReferenceAnswersResponse {
  message: string;
  referenceId: string;
  status: 'COMPLETED';
}

/** Generic error envelope returned by 400 / 401 / 404 / 422 responses. */
export interface ReferenceErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, string>;
}
