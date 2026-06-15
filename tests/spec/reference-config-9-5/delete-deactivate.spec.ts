import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';


test.describe('DELETE DEACTIVATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete (Deactivate) Reference Template (204)', async () => {
    // URL: /onboarding/config/reference/templates/
    const response = await api.delete('/onboarding/config/reference/templates/');
    expect(response.ok()).toBeTruthy();
  });
});
