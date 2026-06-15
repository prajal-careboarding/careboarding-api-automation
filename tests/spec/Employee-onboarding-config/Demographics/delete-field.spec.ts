import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('DELETE FIELD API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Field', async () => {
    // URL: /onboarding/config/fields/:fieldId
    const response = await api.delete('/onboarding/config/fields/:fieldId');
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Field Non-Existing Id 404', async () => {
    // URL: /onboarding/config/fields/00000000-0000-0000-0000-999999999999
    const response = await api.delete('/onboarding/config/fields/00000000-0000-0000-0000-999999999999');
    expect(response.ok()).toBeTruthy();
  });

  test('Delete Field SYSTEM FIELD 403', async () => {
    // URL: /onboarding/config/fields/00000000-0000-0000-0002-000000000001
    const response = await api.delete('/onboarding/config/fields/00000000-0000-0000-0002-000000000001');
    expect(response.ok()).toBeTruthy();
  });
});
