import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';
import { SetPositionReferenceOverride201Request, SetPositionReferenceOverrideMinimumCount0400Request } from '../../models/request/reference-config-9-5/set-position';


test.describe('SET POSITION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Set Position Reference Override (201)', async () => {
    // URL: /onboarding/config/reference/position-templates
    const payload: SetPositionReferenceOverride201Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/position-templates', payload);
    expect(response.ok()).toBeTruthy();
  });

  test('Set Position Reference Override — minimumCount 0 (400)', async () => {
    // URL: /onboarding/config/reference/position-templates
    const payload: SetPositionReferenceOverrideMinimumCount0400Request = {}; // TODO: Populate payload
    const response = await api.post('/onboarding/config/reference/position-templates', payload);
    expect(response.ok()).toBeTruthy();
  });
});
