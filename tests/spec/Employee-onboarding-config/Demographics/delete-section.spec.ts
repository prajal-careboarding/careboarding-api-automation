import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('DELETE SECTION API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Section', async () => {
    // URL: /onboarding/config/sections/db52ee08-2864-4866-bc16-2540dcdcf487
    const response = await api.delete('/onboarding/config/sections/db52ee08-2864-4866-bc16-2540dcdcf487');
    expect(response.ok()).toBeTruthy();
  });
});
