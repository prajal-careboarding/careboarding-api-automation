import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/ApiClient';

test.describe('FAIL DELETE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('[Fail] Delete Field Already DeletedId 404', async () => {
    // URL: /onboarding/config/fields/715c0d99-7391-48bb-9bea-8dc1f7966655
    const response = await api.delete('/onboarding/config/fields/715c0d99-7391-48bb-9bea-8dc1f7966655');
    expect(response.ok()).toBeTruthy();
  });
});
