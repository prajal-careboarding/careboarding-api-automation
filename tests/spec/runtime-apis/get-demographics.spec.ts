import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';


test.describe('GET DEMOGRAPHICS API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Demographics Schema', async () => {
    // URL: /onboarding/demographics/schema
    const response = await api.get('/onboarding/demographics/schema');
    expect(response.ok()).toBeTruthy();
  });
});
