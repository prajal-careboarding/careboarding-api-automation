import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('DELETE SYSTEM API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete System Section — (403)', async () => {
    // URL: /onboarding/config/sections/00000000-0000-0000-0001-000000000001
    const response = await api.delete('/onboarding/config/sections/00000000-0000-0000-0001-000000000001');
    expect(response.ok()).toBeTruthy();
  });
});
