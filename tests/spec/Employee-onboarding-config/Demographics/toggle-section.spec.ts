import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('TOGGLE SECTION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Toggle Section Visibility', async () => {
    // URL: /onboarding/config/sections//visibility
    const response = await api.patch('/onboarding/config/sections//visibility');
    expect(response.ok()).toBeTruthy();
  });
});
