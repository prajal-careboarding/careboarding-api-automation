import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('DELETE SECTION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Section', async () => {
    // URL: /onboarding/config/sections/
    const response = await api.delete('/onboarding/config/sections/');
    expect(response.ok()).toBeTruthy();
  });
});
