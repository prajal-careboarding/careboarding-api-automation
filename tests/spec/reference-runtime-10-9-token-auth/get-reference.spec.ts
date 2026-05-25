import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';
import { ENDPOINTS } from '../../api/endpoints/api-endpoints';
import { GetReferenceResponse, ReferenceErrorResponse } from '../../models/response/Employee-onboarding-config/reference-runtime-10-9-token-auth/reference-response';

// ─────────────────────────────────────────────────────────────────────────────
// NOTE: These endpoints authenticate via a URL token, NOT a Bearer JWT.
//   • GET /onboarding/reference/:referenceToken  → loads referee context
//   • A valid token returns 200; an invalid/missing token returns 401.
// ─────────────────────────────────────────────────────────────────────────────

const VALID_REFERENCE_TOKEN = process.env.REFERENCE_TOKEN ?? '<REPLACE_WITH_VALID_TOKEN>';

test.describe('GET REFERENCE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Reference — valid token (200)', async () => {
    const response = await api.get(
      ENDPOINTS.REFERENCE_RUNTIME.BY_TOKEN(VALID_REFERENCE_TOKEN),
    );
    expect(response.status()).toBe(200);

    const body: GetReferenceResponse = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('questions');
    expect(Array.isArray(body.questions)).toBeTruthy();
  });

  test('Get Reference — invalid token (401)', async () => {
    const response = await api.get(
      ENDPOINTS.REFERENCE_RUNTIME.BY_TOKEN('invalid-token-here'),
    );
    // An invalid token should NOT be ok — expect 401 Unauthorized
    expect(response.status()).toBe(401);
  });
});
