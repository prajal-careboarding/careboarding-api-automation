import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';


test.describe('LIST REFERENCE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('List Reference Templates', async () => {
    // URL: /onboarding/config/reference/templates
    const response = await api.get('/onboarding/config/reference/templates');
    expect(response.ok()).toBeTruthy();
  });
});
