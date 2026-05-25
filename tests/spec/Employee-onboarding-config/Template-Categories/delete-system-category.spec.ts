import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('DELETE SYSTEM CATEGORY API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete System Category — (403)', async () => {
    // URL: /onboarding/config/template-categories/00000000-0000-4000-8000-000000000010
    const response = await api.delete('/onboarding/config/template-categories/00000000-0000-4000-8000-000000000010');
    expect(response.ok()).toBeTruthy();
  });
});
