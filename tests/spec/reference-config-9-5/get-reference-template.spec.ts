import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';


test.describe('GET REFERENCE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Reference Template by ID', async () => {
    // URL: /onboarding/config/reference/templates/
    const response = await api.get('/onboarding/config/reference/templates/');
    expect(response.ok()).toBeTruthy();
  });

  test('Get Reference Template — Non-existent (404)', async () => {
    // URL: /onboarding/config/reference/templates/00000000-0000-0000-0000-000000000000
    const response = await api.get('/onboarding/config/reference/templates/00000000-0000-0000-0000-000000000000');
    expect(response.ok()).toBeTruthy();
  });
});
