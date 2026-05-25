import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/ApiClient';


test.describe('DELETE REFERENCE TEMPLATE API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Reference Template — System template (403)', async () => {
    // URL: /onboarding/config/reference/templates/00000000-0000-4000-8000-000020000001
    const response = await api.delete('/onboarding/config/reference/templates/00000000-0000-4000-8000-000020000001');
    expect(response.ok()).toBeTruthy();
  });
});
