import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('LIST ALL API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('List All Categories', async () => {
    // URL: /onboarding/config/template-categories
    const response = await api.get('/onboarding/config/template-categories');
    expect(response.ok()).toBeTruthy();
  });
});
