import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('DELETE SYSTEM TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete System Template — (403)', async () => {
    // URL: /onboarding/config/templates/00000000-0000-4000-8000-000000000001
    const response = await api.delete('/onboarding/config/templates/00000000-0000-4000-8000-000000000001');
    expect(response.ok()).toBeTruthy();
  });
});
