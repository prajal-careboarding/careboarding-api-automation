import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('GET CATEGORY API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Get Category Requirements', async () => {
    // URL: /onboarding/config/template-categories/03c6a513-769b-49c8-8f09-0eb40507a730/requirements
    const response = await api.get(
      '/onboarding/config/template-categories/03c6a513-769b-49c8-8f09-0eb40507a730/requirements'
    );
    expect(response.ok()).toBeTruthy();
  });

  test('Get Category Requirements — Non-existent ID (404)', async () => {
    // URL: /onboarding/config/template-categories/00000000-0000-0000-0000-000000000000/requirements
    const response = await api.get(
      '/onboarding/config/template-categories/00000000-0000-0000-0000-000000000000/requirements'
    );
    expect(response.ok()).toBeTruthy();
  });
});
