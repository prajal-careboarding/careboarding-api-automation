import { test, expect } from '@playwright/test';
import { ApiClient } from '../../../helpers/api-client';

test.describe('DELETE CATEGORY API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
  });

  test('Delete Category - 200', async () => {
    // URL: /onboarding/config/template-categories/57a16870-490c-44c8-9098-e61f9d297af9
    const response = await api.delete('/onboarding/config/template-categories/57a16870-490c-44c8-9098-e61f9d297af9');
    expect(response.ok()).toBeTruthy();
  });
});
