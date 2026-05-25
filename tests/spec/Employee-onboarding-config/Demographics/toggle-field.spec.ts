import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('TOGGLE FIELD API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Toggle Field Visibility', async () => {
    // URL: /onboarding/config/fields//visibility
    const response = await api.patch('/onboarding/config/fields//visibility');
    expect(response.ok()).toBeTruthy();
  });
});
